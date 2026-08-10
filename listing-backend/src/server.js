import { createServer } from 'node:http'
import { randomUUID, createHash } from 'node:crypto'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { getStorehouseOptions, resolveStorehouse } from './storehouse.js'
import { createQwenListingProposal, createQwenSiteTranslations, createQwenStudioImage, hasQwenImageConfig, hasQwenTextConfig } from './qwen.js'
import { persistGeneratedImage } from './media.js'
import { stableIdentityFromPayload, stableIdentityFromToken } from './identity.js'
import { extractExternalProductId, matchingPublishedProduct } from './publish-result.js'
import { createFixedWindowRateLimiter, requestClientKey } from './rate-limit.js'

const port = Number(process.env.PORT || 8789)
const dbPath = resolve(process.env.LISTING_DB_PATH || './data/listings.sqlite')
const codApiBaseUrl = process.env.COD_API_BASE_URL || 'https://codropshipping.com/api'
const identityPath = process.env.COD_IDENTITY_PATH || '/customer/api/user/home/info'
const production = process.env.NODE_ENV === 'production'
const publicTranslationRateLimit = Math.max(1, Number(process.env.PUBLIC_TRANSLATION_RATE_LIMIT_PER_MINUTE || 30))
const allowedOrigins = new Set(String(process.env.LISTING_ALLOWED_ORIGINS || (production ? '' : 'http://127.0.0.1:3000,http://localhost:3000'))
  .split(',').map((value) => value.trim()).filter(Boolean))
const translationRateLimiter = createFixedWindowRateLimiter({ limit: publicTranslationRateLimit, windowMs: 60_000 })

if (production && !allowedOrigins.size) throw new Error('LISTING_ALLOWED_ORIGINS is required in production')
if (production && !hasQwenTextConfig()) throw new Error('QWEN_API_KEY and QWEN_BASE_URL are required in production')

mkdirSync(dirname(dbPath), { recursive: true })
const db = new DatabaseSync(dbPath)
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS listing_drafts (
    id TEXT PRIMARY KEY,
    owner_id TEXT NOT NULL,
    source_product_id TEXT NOT NULL,
    source_type TEXT NOT NULL,
    mode TEXT NOT NULL CHECK (mode IN ('ai', 'manual')),
    target_language TEXT NOT NULL DEFAULT 'en-US',
    status TEXT NOT NULL DEFAULT 'draft',
    revision INTEGER NOT NULL DEFAULT 1,
    source_snapshot TEXT NOT NULL,
    merchant_content TEXT NOT NULL,
    selected_store_id TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS listing_drafts_owner_updated
    ON listing_drafts(owner_id, updated_at DESC);

  CREATE TABLE IF NOT EXISTS listing_ai_proposals (
    id TEXT PRIMARY KEY,
    draft_id TEXT NOT NULL REFERENCES listing_drafts(id) ON DELETE CASCADE,
    owner_id TEXT NOT NULL,
    input_revision INTEGER NOT NULL,
    target_language TEXT NOT NULL,
    status TEXT NOT NULL,
    proposal TEXT,
    error_code TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS listing_ai_image_proposals (
    id TEXT PRIMARY KEY,
    draft_id TEXT NOT NULL REFERENCES listing_drafts(id) ON DELETE CASCADE,
    owner_id TEXT NOT NULL,
    input_revision INTEGER NOT NULL,
    source_image_url TEXT NOT NULL,
    style TEXT NOT NULL,
    status TEXT NOT NULL,
    result TEXT,
    error_code TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS publish_jobs (
    id TEXT PRIMARY KEY,
    draft_id TEXT NOT NULL REFERENCES listing_drafts(id),
    owner_id TEXT NOT NULL,
    draft_revision INTEGER NOT NULL,
    store_id TEXT NOT NULL,
    payload_hash TEXT NOT NULL,
    status TEXT NOT NULL,
    external_product_id TEXT,
    error_code TEXT,
    response TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    UNIQUE(owner_id, draft_id, draft_revision, store_id, payload_hash)
  );

  CREATE TABLE IF NOT EXISTS listing_events (
    id TEXT PRIMARY KEY,
    draft_id TEXT NOT NULL REFERENCES listing_drafts(id) ON DELETE CASCADE,
    owner_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    event_data TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS site_translation_cache (
    source_hash TEXT NOT NULL,
    target_language TEXT NOT NULL,
    source_text TEXT NOT NULL,
    translated_text TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    PRIMARY KEY(source_hash, target_language)
  );
`)

// A process restart interrupts in-flight model requests. Mark those rows as
// failed so the client can retry instead of showing a permanent loading state.
const recoveredAt = new Date().toISOString()
db.prepare(`UPDATE listing_ai_proposals
  SET status = 'failed', error_code = 'REQUEST_INTERRUPTED', updated_at = ?
  WHERE status = 'processing'`).run(recoveredAt)
db.prepare(`UPDATE listing_ai_image_proposals
  SET status = 'failed', error_code = 'REQUEST_INTERRUPTED', updated_at = ?
  WHERE status = 'processing'`).run(recoveredAt)

function json(response, status, payload) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'same-origin'
  })
  response.end(JSON.stringify(payload))
}

async function readBody(request) {
  const chunks = []
  let size = 0
  for await (const chunk of request) {
    size += chunk.length
    if (size > 2 * 1024 * 1024) throw Object.assign(new Error('Request body is too large'), { status: 413 })
    chunks.push(chunk)
  }
  if (!chunks.length) return {}
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

function waitFor(delay) { return new Promise((resolve) => setTimeout(resolve, delay)) }

function tokenFrom(request) {
  const header = request.headers.token || request.headers.authorization || ''
  return String(header).replace(/^Bearer\s+/i, '').trim()
}

async function codRequest(path, token, body) {
  const base = codApiBaseUrl.replace(/\/$/, '')
  const response = await fetch(`${base}/${String(path).replace(/^\//, '')}`, {
    method: body === undefined ? 'GET' : 'POST',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok || payload?.code && Number(payload.code) !== 0) {
    const upstreamMessage = payload?.msg || payload?.message || `request failed with status ${response.status}`
    const error = new Error(`CoD ${path} failed: ${upstreamMessage}`)
    error.status = response.status >= 400 ? response.status : 502
    error.code = payload?.code || 'COD_API_ERROR'
    throw error
  }
  return payload
}

async function authenticate(request) {
  const token = tokenFrom(request)
  if (!token) throw Object.assign(new Error('Sign in to continue'), { status: 401, code: 'AUTH_REQUIRED' })
  const payload = await codRequest(identityPath, token)
  const user = payload?.data?.user || payload?.data?.userInfo || payload?.data?.customer || payload?.data?.profile || payload?.data || {}
  const stableOwnerId = stableIdentityFromPayload(payload) || stableIdentityFromToken(token)
  const sessionOwnerId = `session:${createHash('sha256').update(`cod-listing:${token}`).digest('hex')}`
  const ownerId = stableOwnerId || sessionOwnerId

  // The legacy home endpoint validates the session but returns dashboard
  // aggregates rather than the customer's profile. In that case, isolate
  // drafts with a one-way fingerprint of the already-verified session token;
  // the raw credential is never stored or returned.
  if (stableOwnerId && stableOwnerId !== sessionOwnerId) migrateSessionOwner(sessionOwnerId, stableOwnerId)
  return { token, ownerId, user }
}

function migrateSessionOwner(sessionOwnerId, stableOwnerId) {
  const ownedDrafts = db.prepare('SELECT id FROM listing_drafts WHERE owner_id = ?').all(sessionOwnerId)
  if (!ownedDrafts.length) return
  db.exec('BEGIN IMMEDIATE')
  try {
    for (const table of ['listing_ai_proposals', 'listing_ai_image_proposals', 'publish_jobs', 'listing_events']) {
      db.prepare(`UPDATE ${table} SET owner_id = ? WHERE owner_id = ?`).run(stableOwnerId, sessionOwnerId)
    }
    db.prepare('UPDATE listing_drafts SET owner_id = ? WHERE owner_id = ?').run(stableOwnerId, sessionOwnerId)
    db.exec('COMMIT')
  } catch (error) {
    db.exec('ROLLBACK')
    console.warn(`[listing-orchestrator] Session draft migration deferred: ${error.message || 'migration failed'}`)
  }
}

function parse(value, fallback) {
  try { return JSON.parse(value) } catch { return fallback }
}

async function translateSiteContent(request) {
  if (!hasQwenTextConfig()) throw Object.assign(new Error('Site translation service is not configured'), { status: 503, code: 'TRANSLATION_NOT_CONFIGURED' })
  const body = await readBody(request)
  const targetLanguage = String(body.targetLanguage || '').trim()
  const supported = new Set(['en-US', 'zh-CN', 'es-ES', 'fr-FR', 'de-DE', 'pt-BR', 'ar-SA', 'ja-JP', 'ko-KR', 'ru-RU'])
  if (!supported.has(targetLanguage)) throw Object.assign(new Error('Unsupported target language'), { status: 400, code: 'UNSUPPORTED_LANGUAGE' })
  const texts = Array.isArray(body.texts) ? body.texts.map((value) => String(value || '').trim()).filter(Boolean) : []
  if (!texts.length || texts.length > 30 || texts.some((text) => text.length > 2000) || texts.join('').length > 25000) {
    throw Object.assign(new Error('Translation request exceeds the allowed size'), { status: 400, code: 'INVALID_TRANSLATION_REQUEST' })
  }

  const uniqueTexts = [...new Set(texts)]
  const translatedByText = new Map()
  const missing = []
  const lookup = db.prepare('SELECT translated_text FROM site_translation_cache WHERE source_hash = ? AND target_language = ? AND source_text = ?')
  for (const sourceText of uniqueTexts) {
    const sourceHash = createHash('sha256').update(sourceText).digest('hex')
    const cached = lookup.get(sourceHash, targetLanguage, sourceText)
    if (cached) translatedByText.set(sourceText, cached.translated_text)
    else missing.push(sourceText)
  }

  if (missing.length) {
    const translated = await createQwenSiteTranslations({ texts: missing, targetLanguage })
    const updatedAt = new Date().toISOString()
    const save = db.prepare(`INSERT INTO site_translation_cache
      (source_hash, target_language, source_text, translated_text, updated_at)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(source_hash, target_language) DO UPDATE SET
        source_text = excluded.source_text,
        translated_text = excluded.translated_text,
        updated_at = excluded.updated_at`)
    db.exec('BEGIN IMMEDIATE')
    try {
      missing.forEach((sourceText, index) => {
        const translatedText = translated[index] || sourceText
        translatedByText.set(sourceText, translatedText)
        save.run(createHash('sha256').update(sourceText).digest('hex'), targetLanguage, sourceText, translatedText, updatedAt)
      })
      db.exec('COMMIT')
    } catch (error) {
      db.exec('ROLLBACK')
      throw error
    }
  }
  return texts.map((sourceText) => translatedByText.get(sourceText) || sourceText)
}

function normalizeDraft(row) {
  if (!row) return null
  const sourceSnapshot = parse(row.source_snapshot, {})
  const merchantContent = parse(row.merchant_content, {})
  const storehouseOptions = getStorehouseOptions(sourceSnapshot, row.source_type)
  merchantContent.storehouse = resolveStorehouse(sourceSnapshot, row.source_type, merchantContent.storehouse)
  return {
    id: row.id,
    sourceProductId: row.source_product_id,
    sourceType: row.source_type,
    mode: row.mode,
    targetLanguage: row.target_language,
    status: row.status,
    revision: row.revision,
    sourceSnapshot,
    merchantContent,
    storehouseOptions,
    selectedStoreId: row.selected_store_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

function event(draftId, ownerId, eventType, eventData = {}) {
  db.prepare('INSERT INTO listing_events (id, draft_id, owner_id, event_type, event_data, created_at) VALUES (?, ?, ?, ?, ?, ?)')
    .run(randomUUID(), draftId, ownerId, eventType, JSON.stringify(eventData), new Date().toISOString())
}

function merchantContentFromSource(info = {}, sourceType = '', deliveryRegion = '') {
  return {
    title: String(info.title || ''),
    description: String(info.body_html || ''),
    seoTitle: String(info.title || '').slice(0, 70),
    seoDescription: '',
    images: Array.isArray(info.images) ? info.images.map(url => ({ url, selected: true, origin: 'source' })) : [],
    variants: Array.isArray(info.variants) ? info.variants : [],
    productType: info.product_type || '',
    country: 'US',
    storehouse: resolveStorehouse(info, sourceType, '', deliveryRegion),
    specificationIds: []
  }
}

async function createDraft(request, owner) {
  const body = await readBody(request)
  const sourceProductId = String(body.sourceProductId || '').trim()
  const sourceType = String(body.sourceType || '1').trim()
  const mode = body.mode === 'manual' ? 'manual' : 'ai'
  const targetLanguage = String(body.targetLanguage || 'en-US')
  if (!sourceProductId) throw Object.assign(new Error('sourceProductId is required'), { status: 400 })

  const sourcePayload = await codRequest('/shipping/Order/getGoodsInfo', owner.token, {
    type: 2,
    product_id: sourceProductId,
    source: sourceType,
    country: 'US',
    delivery_region: body.deliveryRegion || ''
  })
  const info = sourcePayload?.data?.info
  if (!info) throw Object.assign(new Error('The product service returned no listing source data'), { status: 502 })

  const existing = db.prepare('SELECT * FROM listing_drafts WHERE owner_id = ? AND source_product_id = ? AND source_type = ? AND status != ? ORDER BY updated_at DESC LIMIT 1')
    .get(owner.ownerId, sourceProductId, sourceType, 'published')
  if (existing) {
    const now = new Date().toISOString()
    db.prepare('UPDATE listing_drafts SET mode = ?, target_language = ?, updated_at = ? WHERE id = ? AND owner_id = ?')
      .run(mode, targetLanguage, now, existing.id, owner.ownerId)
    event(existing.id, owner.ownerId, 'draft.reopened', { mode, targetLanguage })
    return normalizeDraft(getOwnedDraft(existing.id, owner.ownerId))
  }

  const id = randomUUID()
  const now = new Date().toISOString()
  const merchant = merchantContentFromSource(info, sourceType, body.deliveryRegion)
  db.prepare(`INSERT INTO listing_drafts
    (id, owner_id, source_product_id, source_type, mode, target_language, status, revision, source_snapshot, merchant_content, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, 'draft', 1, ?, ?, ?, ?)`)
    .run(id, owner.ownerId, sourceProductId, sourceType, mode, targetLanguage, JSON.stringify(info), JSON.stringify(merchant), now, now)
  event(id, owner.ownerId, 'draft.created', { mode, targetLanguage })
  return normalizeDraft(db.prepare('SELECT * FROM listing_drafts WHERE id = ?').get(id))
}

function getOwnedDraft(id, ownerId) {
  const row = db.prepare('SELECT * FROM listing_drafts WHERE id = ? AND owner_id = ?').get(id, ownerId)
  if (!row) throw Object.assign(new Error('Listing draft not found'), { status: 404 })
  return row
}

async function updateDraft(request, id, owner) {
  const row = getOwnedDraft(id, owner.ownerId)
  const body = await readBody(request)
  const merchant = body.merchantContent && typeof body.merchantContent === 'object'
    ? body.merchantContent
    : parse(row.merchant_content, {})
  const language = String(body.targetLanguage || row.target_language)
  const selectedStoreId = body.selectedStoreId == null ? row.selected_store_id : String(body.selectedStoreId)
  const now = new Date().toISOString()
  db.prepare(`UPDATE listing_drafts SET merchant_content = ?, target_language = ?, selected_store_id = ?, revision = revision + 1, status = 'draft', updated_at = ? WHERE id = ? AND owner_id = ?`)
    .run(JSON.stringify(merchant), language, selectedStoreId || null, now, id, owner.ownerId)
  event(id, owner.ownerId, 'draft.updated', { previousRevision: row.revision, targetLanguage: language })
  return normalizeDraft(getOwnedDraft(id, owner.ownerId))
}

async function createAiProposal(request, id, owner) {
  const row = getOwnedDraft(id, owner.ownerId)
  const aiUrl = process.env.AI_LISTING_API_URL
  if (!hasQwenTextConfig() && !aiUrl) throw Object.assign(new Error('AI listing service is not configured'), { status: 503, code: 'AI_NOT_CONFIGURED' })
  const proposalId = randomUUID()
  const now = new Date().toISOString()
  db.prepare(`INSERT INTO listing_ai_proposals (id, draft_id, owner_id, input_revision, target_language, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, 'processing', ?, ?)`)
    .run(proposalId, id, owner.ownerId, row.revision, row.target_language, now, now)
  event(id, owner.ownerId, 'ai.requested', { proposalId, revision: row.revision })

  try {
    const input = {
        targetLanguage: row.target_language,
        source: parse(row.source_snapshot, {}),
        merchantContent: parse(row.merchant_content, {}),
        instructions: 'Return suggestions only. Do not publish, apply changes, or invent product claims.'
    }
    let proposal
    if (hasQwenTextConfig()) {
      proposal = await createQwenListingProposal(input)
    } else {
      const aiResponse = await fetch(aiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.AI_LISTING_API_KEY ? `Bearer ${process.env.AI_LISTING_API_KEY}` : ''
        },
        body: JSON.stringify(input)
      })
      proposal = await aiResponse.json().catch(() => ({}))
      if (!aiResponse.ok) throw new Error(proposal?.error || `AI service failed with status ${aiResponse.status}`)
    }
    const updated = new Date().toISOString()
    db.prepare(`UPDATE listing_ai_proposals SET status = 'ready', proposal = ?, updated_at = ? WHERE id = ?`)
      .run(JSON.stringify(proposal), updated, proposalId)
    db.prepare(`UPDATE listing_drafts SET status = 'ai_ready', updated_at = ? WHERE id = ? AND owner_id = ?`)
      .run(updated, id, owner.ownerId)
    event(id, owner.ownerId, 'ai.ready', { proposalId, revision: row.revision })
    return { id: proposalId, status: 'ready', inputRevision: row.revision, targetLanguage: row.target_language, proposal }
  } catch (error) {
    const updated = new Date().toISOString()
    db.prepare(`UPDATE listing_ai_proposals SET status = 'failed', error_code = ?, updated_at = ? WHERE id = ?`)
      .run('AI_REQUEST_FAILED', updated, proposalId)
    event(id, owner.ownerId, 'ai.failed', { proposalId })
    throw Object.assign(new Error(error.message || 'AI request failed'), { status: 502, code: 'AI_REQUEST_FAILED' })
  }
}

async function createAiImageProposal(request, id, owner) {
  const row = getOwnedDraft(id, owner.ownerId)
  const aiUrl = process.env.AI_IMAGE_API_URL
  if (!hasQwenImageConfig() && !aiUrl) throw Object.assign(new Error('AI image service is not configured'), { status: 503, code: 'AI_IMAGE_NOT_CONFIGURED' })

  const body = await readBody(request)
  const sourceImageUrl = String(body.sourceImageUrl || '').trim()
  const supportedStyles = new Set(['studio-white', 'premium-studio', 'natural-lifestyle', 'brand-editorial'])
  const style = supportedStyles.has(body.style) ? body.style : ''
  if (!sourceImageUrl || !style) throw Object.assign(new Error('Choose a source image and supported studio style'), { status: 400, code: 'AI_IMAGE_INPUT_INVALID' })

  const merchant = parse(row.merchant_content, {})
  const source = parse(row.source_snapshot, {})
  const allowedImages = [
    ...(Array.isArray(source.images) ? source.images : []),
    ...(Array.isArray(merchant.images) ? merchant.images.map(item => typeof item === 'string' ? item : item.url) : [])
  ].filter(Boolean)
  if (!allowedImages.includes(sourceImageUrl)) throw Object.assign(new Error('The selected source image is not part of this listing'), { status: 400, code: 'AI_IMAGE_SOURCE_INVALID' })

  const proposalId = randomUUID()
  const now = new Date().toISOString()
  db.prepare(`INSERT INTO listing_ai_image_proposals
    (id, draft_id, owner_id, input_revision, source_image_url, style, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, 'processing', ?, ?)`) 
    .run(proposalId, id, owner.ownerId, row.revision, sourceImageUrl, style, now, now)
  event(id, owner.ownerId, 'ai_image.requested', { proposalId, revision: row.revision, style })

  try {
    const input = {
        sourceImageUrl,
        style,
        instructions: 'Create a clean white-background studio product image. Preserve the exact product, colors, shape, packaging and labels. Do not add claims, accessories, logos or text.'
    }
    let result
    if (hasQwenImageConfig()) {
      result = await createQwenStudioImage(input)
    } else {
      const aiResponse = await fetch(aiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.AI_IMAGE_API_KEY ? `Bearer ${process.env.AI_IMAGE_API_KEY}` : ''
        },
        body: JSON.stringify(input)
      })
      result = await aiResponse.json().catch(() => ({}))
      if (!aiResponse.ok) throw new Error(result?.error || result?.message || `AI image service failed with status ${aiResponse.status}`)
    }
    let imageUrl = String(result?.imageUrl || result?.url || result?.data?.imageUrl || result?.data?.url || '').trim()
    if (!imageUrl) throw new Error('AI image service returned no proposed image')
    let persisted = result?.provider !== 'qwen'
    if (result?.provider === 'qwen') {
      try {
        imageUrl = await persistGeneratedImage(imageUrl, owner.token, { codApiBaseUrl })
        persisted = true
      } catch (error) {
        // Qwen URLs remain usable for a limited period. Keep the proposal
        // available for review if CoD media storage is temporarily unavailable.
        console.warn(`[listing-orchestrator] AI image persistence deferred: ${error.message || 'upload failed'}`)
      }
    }
    const updated = new Date().toISOString()
    const normalized = { imageUrl, style, persisted }
    db.prepare(`UPDATE listing_ai_image_proposals SET status = 'ready', result = ?, updated_at = ? WHERE id = ?`)
      .run(JSON.stringify(normalized), updated, proposalId)
    event(id, owner.ownerId, 'ai_image.ready', { proposalId, revision: row.revision, style })
    return { id: proposalId, status: 'ready', inputRevision: row.revision, sourceImageUrl, ...normalized }
  } catch (error) {
    const updated = new Date().toISOString()
    db.prepare(`UPDATE listing_ai_image_proposals SET status = 'failed', error_code = ?, updated_at = ? WHERE id = ?`)
      .run('AI_IMAGE_REQUEST_FAILED', updated, proposalId)
    event(id, owner.ownerId, 'ai_image.failed', { proposalId, code: 'AI_IMAGE_REQUEST_FAILED' })
    throw Object.assign(new Error(error.message || 'AI image request failed'), { status: 502, code: 'AI_IMAGE_REQUEST_FAILED' })
  }
}

function latestProposal(id, ownerId) {
  const row = db.prepare('SELECT * FROM listing_ai_proposals WHERE draft_id = ? AND owner_id = ? ORDER BY created_at DESC LIMIT 1').get(id, ownerId)
  if (!row) return null
  return {
    id: row.id,
    status: row.status,
    inputRevision: row.input_revision,
    targetLanguage: row.target_language,
    proposal: parse(row.proposal, null),
    errorCode: row.error_code,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

function latestImageProposals(id, ownerId) {
  const rows = db.prepare(`SELECT * FROM listing_ai_image_proposals
    WHERE draft_id = ? AND owner_id = ? AND status = 'ready'
    ORDER BY created_at DESC`).all(id, ownerId)
  const seen = new Set()
  return rows.flatMap((row) => {
    const key = `${row.style}:${row.source_image_url}`
    if (seen.has(key)) return []
    seen.add(key)
    const result = parse(row.result, {})
    if (!result.imageUrl) return []
    return [{
      id: row.id,
      inputRevision: row.input_revision,
      sourceImageUrl: row.source_image_url,
      style: row.style,
      imageUrl: result.imageUrl,
      persisted: Boolean(result.persisted),
      createdAt: row.created_at,
    }]
  })
}

async function publish(request, id, owner) {
  const row = getOwnedDraft(id, owner.ownerId)
  const body = await readBody(request)
  const merchant = parse(row.merchant_content, {})
  const variants = Array.isArray(merchant.variants) ? merchant.variants.filter(item => item.selected !== false) : []
  const images = Array.isArray(merchant.images) ? merchant.images.filter(item => item.selected).map(item => item.url) : []
  const storeId = String(body.storeId || row.selected_store_id || '')
  if (!storeId) throw Object.assign(new Error('Select a connected store before publishing'), { status: 400, code: 'STORE_REQUIRED' })
  if (!merchant.title || !variants.length || !images.length) throw Object.assign(new Error('Title, at least one image, and at least one variant are required'), { status: 400, code: 'DRAFT_INVALID' })

  const sourceSnapshot = parse(row.source_snapshot, {})
  const storehouse = resolveStorehouse(sourceSnapshot, row.source_type, merchant.storehouse)
  if (!storehouse) throw Object.assign(new Error('Select a shipping origin before publishing'), { status: 400, code: 'STOREHOUSE_REQUIRED' })

  const payload = {
    goods_info_id: sourceSnapshot.id,
    goods_id: row.source_product_id,
    type: 2,
    store_id: storeId,
    title: merchant.title,
    body_html: merchant.description,
    variants,
    images,
    selected_images: images,
    product_type: merchant.productType || '',
    country: merchant.country || 'US',
    storehouse,
    source: row.source_type,
    specification_id: merchant.specificationIds || []
  }
  const payloadHash = createHash('sha256').update(JSON.stringify(payload)).digest('hex')
  const existing = db.prepare('SELECT * FROM publish_jobs WHERE owner_id = ? AND draft_id = ? AND draft_revision = ? AND store_id = ? AND payload_hash = ?')
    .get(owner.ownerId, id, row.revision, storeId, payloadHash)
  if (existing?.status === 'published') return parse(existing.response, {})

  const jobId = existing?.id || randomUUID()
  const now = new Date().toISOString()
  if (!existing) {
    db.prepare(`INSERT INTO publish_jobs (id, draft_id, owner_id, draft_revision, store_id, payload_hash, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, 'publishing', ?, ?)`)
      .run(jobId, id, owner.ownerId, row.revision, storeId, payloadHash, now, now)
  } else {
    db.prepare(`UPDATE publish_jobs SET status = 'publishing', error_code = NULL, updated_at = ? WHERE id = ?`).run(now, jobId)
  }
  event(id, owner.ownerId, 'publish.requested', { jobId, revision: row.revision, storeId })

  try {
    const result = await codRequest('/shipping/Order/pushToShop', owner.token, payload)
    const updated = new Date().toISOString()
    let externalId = extractExternalProductId(result)
    let verification = null
    if (!externalId) {
      for (let attempt = 1; attempt <= 4 && !externalId; attempt += 1) {
        if (attempt > 1) await waitFor(1500 * attempt)
        try {
          const products = await codRequest('/shipping/StoreProduct/getProductList', owner.token, {
            pageIndex: 1,
            pageCount: 10,
            title: merchant.title,
            store_id: storeId,
            is_local: 1,
          })
          const match = matchingPublishedProduct(products, merchant.title)
          externalId = extractExternalProductId(match)
          verification = { matched: Boolean(match), externalProductId: externalId || null, attempt }
        } catch (error) {
          verification = { matched: false, externalProductId: null, attempt, code: error.code || 'PRODUCT_LOOKUP_FAILED' }
        }
      }
    }
    const recordedResult = verification ? { ...result, listingPublication: verification } : result
    db.prepare(`UPDATE publish_jobs SET status = 'published', external_product_id = ?, response = ?, updated_at = ? WHERE id = ?`)
      .run(externalId || null, JSON.stringify(recordedResult), updated, jobId)
    db.prepare(`UPDATE listing_drafts SET status = 'published', updated_at = ? WHERE id = ? AND owner_id = ?`).run(updated, id, owner.ownerId)
    event(id, owner.ownerId, 'publish.succeeded', { jobId, externalId })
    return recordedResult
  } catch (error) {
    const updated = new Date().toISOString()
    db.prepare(`UPDATE publish_jobs SET status = 'failed', error_code = ?, response = ?, updated_at = ? WHERE id = ?`)
      .run(error.code || 'PUBLISH_FAILED', JSON.stringify({ message: error.message }), updated, jobId)
    event(id, owner.ownerId, 'publish.failed', { jobId, code: error.code || 'PUBLISH_FAILED' })
    throw error
  }
}

const server = createServer(async (request, response) => {
  const origin = String(request.headers.origin || '').trim()
  if (origin && !allowedOrigins.has(origin)) {
    return json(response, 403, { error: { code: 'ORIGIN_NOT_ALLOWED', message: 'Request origin is not allowed' } })
  }
  if (origin) {
    response.setHeader('Access-Control-Allow-Origin', origin)
    response.setHeader('Vary', 'Origin')
  }
  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Headers': 'Content-Type, token, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS'
    })
    return response.end()
  }
  const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`)
  if (request.method === 'GET' && url.pathname === '/health') {
    db.prepare('SELECT 1').get()
    return json(response, 200, {
      status: 'ok',
      database: 'ready',
      aiText: hasQwenTextConfig() ? 'configured' : 'unconfigured',
      aiImage: hasQwenImageConfig() ? 'configured' : 'unconfigured',
      service: 'codropshipping-listing-api'
    })
  }

  // Storefront translation must work before sign-in. It is intentionally the
  // only public AI route and is protected by exact-origin checks, small request
  // limits, an IP window and the persistent translation cache.
  if (request.method === 'POST' && url.pathname === '/v1/site-translations') {
    if (production && !origin) return json(response, 403, { error: { code: 'ORIGIN_REQUIRED', message: 'A trusted browser origin is required' } })
    const allowance = translationRateLimiter.take(requestClientKey(request))
    if (!allowance.allowed) {
      response.setHeader('Retry-After', String(Math.max(1, Math.ceil(allowance.retryAfterMs / 1000))))
      return json(response, 429, { error: { code: 'RATE_LIMITED', message: 'Too many translation requests. Please try again shortly.' } })
    }
    try {
      return json(response, 200, { data: { translations: await translateSiteContent(request) } })
    } catch (error) {
      console.error(`[listing-orchestrator] ${request.method} ${url.pathname}: ${error.message || 'Unexpected error'}`)
      return json(response, error.status || 500, { error: { code: error.code || 'INTERNAL_ERROR', message: error.message || 'Unexpected error' } })
    }
  }

  try {
    const owner = await authenticate(request)
    if (request.method === 'GET' && url.pathname === '/v1/listings') {
      const rows = db.prepare('SELECT * FROM listing_drafts WHERE owner_id = ? ORDER BY updated_at DESC').all(owner.ownerId)
      return json(response, 200, { data: rows.map(normalizeDraft) })
    }
    if (request.method === 'POST' && url.pathname === '/v1/listings') {
      return json(response, 201, { data: await createDraft(request, owner) })
    }
    if (request.method === 'GET' && url.pathname === '/v1/channels') {
      const channels = await codRequest('/shipping/Store/getStoreList', owner.token)
      return json(response, 200, { data: channels?.data?.list || [] })
    }
    const match = url.pathname.match(/^\/v1\/listings\/([^/]+)(?:\/(ai-proposals|ai-images|publish))?$/)
    if (!match) return json(response, 404, { error: { code: 'NOT_FOUND', message: 'Route not found' } })
    const id = match[1]
    const action = match[2]
    if (request.method === 'GET' && !action) {
      const draft = normalizeDraft(getOwnedDraft(id, owner.ownerId))
      return json(response, 200, { data: {
        ...draft,
        aiProposal: latestProposal(id, owner.ownerId),
        aiImageProposals: latestImageProposals(id, owner.ownerId),
      } })
    }
    if (request.method === 'PATCH' && !action) return json(response, 200, { data: await updateDraft(request, id, owner) })
    if (request.method === 'POST' && action === 'ai-proposals') return json(response, 201, { data: await createAiProposal(request, id, owner) })
    if (request.method === 'POST' && action === 'ai-images') return json(response, 201, { data: await createAiImageProposal(request, id, owner) })
    if (request.method === 'POST' && action === 'publish') return json(response, 200, { data: await publish(request, id, owner) })
    return json(response, 405, { error: { code: 'METHOD_NOT_ALLOWED', message: 'Method not allowed' } })
  } catch (error) {
    console.error(`[listing-orchestrator] ${request.method} ${url.pathname}: ${error.message || 'Unexpected error'}`)
    return json(response, error.status || 500, { error: { code: error.code || 'INTERNAL_ERROR', message: error.message || 'Unexpected error' } })
  }
})

server.listen(port, '0.0.0.0', () => {
  console.log(`CoD listing orchestrator listening on 0.0.0.0:${port}`)
})

function shutdown(signal) {
  console.log(`[listing-orchestrator] ${signal} received; closing cleanly`)
  server.close(() => {
    db.close()
    process.exit(0)
  })
  setTimeout(() => process.exit(1), 10000).unref()
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
