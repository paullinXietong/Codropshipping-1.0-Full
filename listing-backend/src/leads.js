import { randomUUID } from 'node:crypto'

const EVENT_RULES = {
  page_view: { score: 1, label: '浏览页面', intent: false },
  catalog_search: { score: 3, label: '搜索商品', intent: false },
  product_view: { score: 5, label: '查看商品详情', intent: false },
  ai_listing_start: { score: 28, label: '开始 AI 刊登', intent: true },
  publish_review: { score: 24, label: '进入刊登审核', intent: true },
  channel_connect: { score: 24, label: '查看销售渠道连接', intent: true },
  checkout_start: { score: 34, label: '进入结账', intent: true },
  order_view: { score: 12, label: '查看订单', intent: false },
  support_open: { score: 22, label: '打开在线咨询', intent: true },
  support_message: { score: 36, label: '发送咨询消息', intent: true },
}

const ALLOWED_EVENT_NAMES = new Set(Object.keys(EVENT_RULES))
const ALLOWED_STATUSES = new Set(['new', 'engaged', 'qualified', 'contacted', 'follow_up', 'won', 'lost'])

function clean(value, max = 255) {
  return String(value == null ? '' : value).trim().slice(0, max)
}

function safePath(value) {
  const raw = clean(value, 500)
  if (!raw) return ''
  try {
    const url = new URL(raw, 'https://cod.local')
    for (const key of [...url.searchParams.keys()]) {
      if (/(token|auth|password|secret|code|email|phone|redirect)/i.test(key)) url.searchParams.delete(key)
    }
    const query = url.searchParams.toString()
    return `${url.pathname}${query ? `?${query}` : ''}`.slice(0, 500)
  } catch { return raw.split('?')[0] }
}

function safeReferrer(value) {
  const raw = clean(value, 500)
  if (!raw) return ''
  try { const url = new URL(raw); return `${url.origin}${url.pathname}`.slice(0, 500) }
  catch { return raw.split('?')[0] }
}

function safeJson(value, fallback = {}) {
  try { return JSON.parse(value) } catch { return fallback }
}

function scoreBand(score) {
  if (score >= 70) return 'hot'
  if (score >= 35) return 'warm'
  return 'new'
}

function inferEventName(name, path) {
  const explicit = clean(name, 64)
  if (ALLOWED_EVENT_NAMES.has(explicit)) return explicit
  const route = clean(path, 500).toLowerCase()
  if (route.includes('/account/publish')) return 'publish_review'
  if (route.includes('/workspace/checkout')) return 'checkout_start'
  if (route.includes('/workspace/orders')) return 'order_view'
  if (route.includes('/account/shopify')) return 'channel_connect'
  if (route.includes('/productdetail')) return 'product_view'
  if (route.includes('/searchresult') || route.includes('/dropshipping')) return 'catalog_search'
  return 'page_view'
}

function leadName(body, visitorId) {
  const identity = body.identity && typeof body.identity === 'object' ? body.identity : {}
  const name = clean(identity.name, 120)
  const email = clean(identity.email, 180)
  return name || email || `访客 ${visitorId.slice(-6).toUpperCase()}`
}

function normalizeLead(row) {
  if (!row) return null
  return {
    id: row.id,
    visitorId: row.visitor_id,
    customerId: row.customer_id || '',
    name: row.display_name,
    email: row.email || '',
    company: row.company || '',
    owner: row.owner_name || '待分配',
    status: row.status,
    score: row.score,
    temperature: scoreBand(row.score),
    visitCount: row.visit_count,
    eventCount: row.event_count,
    firstSeenAt: row.first_seen_at,
    lastSeenAt: row.last_seen_at,
    followUpAt: row.follow_up_at || '',
    latestEvent: row.latest_event,
    latestReason: row.latest_reason,
    latestPath: row.latest_path || '',
    unreadCount: row.unread_count || 0,
  }
}

export function installLeadSchema(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS journey_leads (
      id TEXT PRIMARY KEY,
      visitor_id TEXT NOT NULL UNIQUE,
      customer_id TEXT,
      display_name TEXT NOT NULL,
      email TEXT,
      company TEXT,
      owner_name TEXT NOT NULL DEFAULT '待分配',
      status TEXT NOT NULL DEFAULT 'new',
      score INTEGER NOT NULL DEFAULT 0,
      visit_count INTEGER NOT NULL DEFAULT 0,
      event_count INTEGER NOT NULL DEFAULT 0,
      first_seen_at TEXT NOT NULL,
      last_seen_at TEXT NOT NULL,
      last_session_id TEXT,
      follow_up_at TEXT,
      latest_event TEXT NOT NULL DEFAULT 'page_view',
      latest_reason TEXT NOT NULL DEFAULT '首次访问官网',
      latest_path TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS journey_leads_priority
      ON journey_leads(status, score DESC, last_seen_at DESC);
    CREATE INDEX IF NOT EXISTS journey_leads_customer
      ON journey_leads(customer_id);

    CREATE TABLE IF NOT EXISTS journey_events (
      id TEXT PRIMARY KEY,
      lead_id TEXT NOT NULL REFERENCES journey_leads(id) ON DELETE CASCADE,
      visitor_id TEXT NOT NULL,
      session_id TEXT NOT NULL,
      event_name TEXT NOT NULL,
      event_label TEXT NOT NULL,
      path TEXT,
      page_title TEXT,
      referrer TEXT,
      metadata TEXT NOT NULL DEFAULT '{}',
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS journey_events_lead_created
      ON journey_events(lead_id, created_at DESC);

    CREATE TABLE IF NOT EXISTS journey_notifications (
      id TEXT PRIMARY KEY,
      lead_id TEXT NOT NULL REFERENCES journey_leads(id) ON DELETE CASCADE,
      kind TEXT NOT NULL,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      dedupe_key TEXT NOT NULL UNIQUE,
      is_read INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS journey_notifications_created
      ON journey_notifications(is_read, created_at DESC);

    CREATE TABLE IF NOT EXISTS journey_notes (
      id TEXT PRIMARY KEY,
      lead_id TEXT NOT NULL REFERENCES journey_leads(id) ON DELETE CASCADE,
      author TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS journey_notes_lead_created
      ON journey_notes(lead_id, created_at DESC);
  `)
}

function createNotification(db, { leadId, kind, title, message, dedupeKey, now }) {
  db.prepare(`INSERT OR IGNORE INTO journey_notifications
    (id, lead_id, kind, title, message, dedupe_key, is_read, created_at)
    VALUES (?, ?, ?, ?, ?, ?, 0, ?)`)
    .run(randomUUID(), leadId, kind, title, message, dedupeKey, now)
}

export function createLeadOperations(db) {
  function ingest(body = {}) {
    const visitorId = clean(body.visitorId, 120)
    const sessionId = clean(body.sessionId, 120)
    if (!visitorId || !sessionId) throw Object.assign(new Error('visitorId and sessionId are required'), { status: 400, code: 'INVALID_JOURNEY_EVENT' })
    const path = safePath(body.path)
    const eventName = inferEventName(body.eventName, path)
    const rule = EVENT_RULES[eventName]
    const identity = body.identity && typeof body.identity === 'object' ? body.identity : {}
    const customerId = clean(identity.customerId || identity.id, 120)
    const email = clean(identity.email, 180)
    const company = clean(identity.company, 160)
    const manager = clean(identity.manager, 120)
    const now = new Date().toISOString()
    let lead = db.prepare('SELECT * FROM journey_leads WHERE visitor_id = ?').get(visitorId)
    const firstVisit = !lead
    const returnVisit = Boolean(lead && lead.last_session_id && lead.last_session_id !== sessionId)
    const displayName = leadName(body, visitorId)

    db.exec('BEGIN IMMEDIATE')
    try {
      if (!lead) {
        const id = randomUUID()
        db.prepare(`INSERT INTO journey_leads
          (id, visitor_id, customer_id, display_name, email, company, owner_name, status, score, visit_count, event_count,
           first_seen_at, last_seen_at, last_session_id, latest_event, latest_reason, latest_path, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, 'new', 0, 1, 0, ?, ?, ?, ?, ?, ?, ?, ?)`)
          .run(id, visitorId, customerId || null, displayName, email || null, company || null, manager || '待分配', now, now, sessionId, eventName, '首次访问官网', path || null, now, now)
        lead = db.prepare('SELECT * FROM journey_leads WHERE id = ?').get(id)
      }

      const nextScore = Math.min(100, Number(lead.score || 0) + rule.score + (returnVisit ? 12 : 0))
      const reason = returnVisit ? `再次回来，当前正在${rule.label}` : rule.intent ? rule.label : firstVisit ? '首次访问官网' : rule.label
      const nextStatus = lead.status === 'new' && nextScore >= 35 ? 'engaged' : lead.status
      db.prepare(`UPDATE journey_leads SET
        customer_id = COALESCE(NULLIF(?, ''), customer_id),
        display_name = CASE WHEN ? != '' THEN ? ELSE display_name END,
        email = COALESCE(NULLIF(?, ''), email),
        company = COALESCE(NULLIF(?, ''), company),
        owner_name = CASE WHEN owner_name = '待分配' AND ? != '' THEN ? ELSE owner_name END,
        status = ?, score = ?, visit_count = visit_count + ?, event_count = event_count + 1,
        last_seen_at = ?, last_session_id = ?, latest_event = ?, latest_reason = ?, latest_path = ?, updated_at = ?
        WHERE id = ?`)
        .run(customerId, displayName === `访客 ${visitorId.slice(-6).toUpperCase()}` ? '' : displayName, displayName, email, company, manager, manager,
          nextStatus, nextScore, returnVisit ? 1 : 0, now, sessionId, eventName, reason, path || null, now, lead.id)

      const metadata = body.metadata && typeof body.metadata === 'object' ? body.metadata : {}
      const safeMetadata = {
        productId: clean(metadata.productId, 120),
        source: clean(metadata.source, 80),
        language: clean(metadata.language, 24),
        channel: clean(metadata.channel, 80),
      }
      db.prepare(`INSERT INTO journey_events
        (id, lead_id, visitor_id, session_id, event_name, event_label, path, page_title, referrer, metadata, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
        .run(randomUUID(), lead.id, visitorId, sessionId, eventName, rule.label, path || null, clean(body.pageTitle, 200) || null,
          safeReferrer(body.referrer) || null, JSON.stringify(safeMetadata), now)

      if (firstVisit) createNotification(db, {
        leadId: lead.id, kind: 'first_visit', title: '新客户来到网站', message: `${displayName} 刚刚首次访问，建议尽快确认需求。`, dedupeKey: `first:${lead.id}`, now,
      })
      if (returnVisit) createNotification(db, {
        leadId: lead.id, kind: 'return_visit', title: '客户再次回来', message: `${displayName} 再次访问，当前正在${rule.label}。`, dedupeKey: `return:${lead.id}:${sessionId}`, now,
      })
      if (rule.intent) createNotification(db, {
        leadId: lead.id, kind: 'high_intent', title: '出现高意向动作', message: `${displayName} ${rule.label}，建议现在跟进。`, dedupeKey: `intent:${lead.id}:${sessionId}:${eventName}`, now,
      })
      db.exec('COMMIT')
    } catch (error) {
      db.exec('ROLLBACK')
      throw error
    }
    return normalizeLead(db.prepare(`SELECT l.*, (SELECT COUNT(*) FROM journey_notifications n WHERE n.lead_id = l.id AND n.is_read = 0) unread_count
      FROM journey_leads l WHERE l.id = ?`).get(lead.id))
  }

  function summary() {
    const row = db.prepare(`SELECT
      COUNT(*) total,
      SUM(CASE WHEN score >= 70 AND status NOT IN ('won','lost') THEN 1 ELSE 0 END) hot,
      SUM(CASE WHEN status IN ('new','engaged','qualified') THEN 1 ELSE 0 END) needs_action,
      SUM(CASE WHEN follow_up_at IS NOT NULL AND datetime(follow_up_at) <= datetime('now', '+1 day') AND status NOT IN ('won','lost') THEN 1 ELSE 0 END) follow_ups
      FROM journey_leads`).get()
    const notifications = db.prepare('SELECT COUNT(*) count FROM journey_notifications WHERE is_read = 0').get()
    return {
      total: Number(row.total || 0), hot: Number(row.hot || 0), needsAction: Number(row.needs_action || 0),
      followUps: Number(row.follow_ups || 0), unread: Number(notifications.count || 0),
    }
  }

  function list({ status = '', query = '', temperature = '' } = {}) {
    const where = []
    const params = []
    if (status && ALLOWED_STATUSES.has(status)) { where.push('l.status = ?'); params.push(status) }
    if (temperature === 'hot') where.push('l.score >= 70')
    if (temperature === 'warm') where.push('l.score >= 35 AND l.score < 70')
    if (temperature === 'new') where.push('l.score < 35')
    if (query) {
      where.push('(l.display_name LIKE ? OR l.email LIKE ? OR l.company LIKE ?)')
      const like = `%${clean(query, 120)}%`
      params.push(like, like, like)
    }
    const rows = db.prepare(`SELECT l.*, (SELECT COUNT(*) FROM journey_notifications n WHERE n.lead_id = l.id AND n.is_read = 0) unread_count
      FROM journey_leads l ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
      ORDER BY CASE WHEN l.status IN ('won','lost') THEN 1 ELSE 0 END, l.score DESC, l.last_seen_at DESC LIMIT 200`).all(...params)
    return rows.map(normalizeLead)
  }

  function detail(id) {
    const lead = db.prepare(`SELECT l.*, (SELECT COUNT(*) FROM journey_notifications n WHERE n.lead_id = l.id AND n.is_read = 0) unread_count
      FROM journey_leads l WHERE l.id = ?`).get(id)
    if (!lead) throw Object.assign(new Error('Lead not found'), { status: 404, code: 'LEAD_NOT_FOUND' })
    const events = db.prepare('SELECT * FROM journey_events WHERE lead_id = ? ORDER BY created_at DESC LIMIT 120').all(id).map((row) => ({
      id: row.id, type: 'event', eventName: row.event_name, label: row.event_label, path: row.path || '', pageTitle: row.page_title || '',
      referrer: row.referrer || '', metadata: safeJson(row.metadata), createdAt: row.created_at,
    }))
    const notes = db.prepare('SELECT * FROM journey_notes WHERE lead_id = ? ORDER BY created_at DESC LIMIT 60').all(id).map((row) => ({
      id: row.id, type: 'note', author: row.author, content: row.content, createdAt: row.created_at,
    }))
    const timeline = [...events, ...notes].sort((a, b) => {
      const timeOrder = b.createdAt.localeCompare(a.createdAt)
      if (timeOrder) return timeOrder
      if (a.type !== b.type) return a.type === 'note' ? -1 : 1
      return b.id.localeCompare(a.id)
    })
    return { ...normalizeLead(lead), timeline }
  }

  function update(id, body = {}) {
    detail(id)
    const status = clean(body.status, 40)
    const owner = clean(body.owner, 120)
    const followUpAt = body.followUpAt === null ? null : clean(body.followUpAt, 40)
    if (status && !ALLOWED_STATUSES.has(status)) throw Object.assign(new Error('Unsupported lead status'), { status: 400, code: 'INVALID_LEAD_STATUS' })
    db.prepare(`UPDATE journey_leads SET status = CASE WHEN ? = '' THEN status ELSE ? END,
      owner_name = CASE WHEN ? = '' THEN owner_name ELSE ? END,
      follow_up_at = CASE WHEN ? = '__unchanged__' THEN follow_up_at ELSE NULLIF(?, '') END,
      updated_at = ? WHERE id = ?`)
      .run(status, status, owner, owner, body.followUpAt === undefined ? '__unchanged__' : followUpAt || '', followUpAt || '', new Date().toISOString(), id)
    return detail(id)
  }

  function addNote(id, body = {}) {
    detail(id)
    const content = clean(body.content, 2000)
    const author = clean(body.author, 120) || '销售团队'
    if (!content) throw Object.assign(new Error('Note content is required'), { status: 400, code: 'INVALID_NOTE' })
    db.prepare('INSERT INTO journey_notes (id, lead_id, author, content, created_at) VALUES (?, ?, ?, ?, ?)')
      .run(randomUUID(), id, author, content, new Date().toISOString())
    return detail(id)
  }

  function notifications() {
    return db.prepare(`SELECT n.*, l.display_name FROM journey_notifications n
      JOIN journey_leads l ON l.id = n.lead_id ORDER BY n.created_at DESC LIMIT 100`).all().map((row) => ({
      id: row.id, leadId: row.lead_id, kind: row.kind, title: row.title, message: row.message,
      customerName: row.display_name, isRead: Boolean(row.is_read), createdAt: row.created_at,
    }))
  }

  function markNotification(id) {
    db.prepare('UPDATE journey_notifications SET is_read = 1 WHERE id = ?').run(id)
    return { id, isRead: true }
  }

  function markLeadNotifications(id) {
    detail(id)
    const result = db.prepare('UPDATE journey_notifications SET is_read = 1 WHERE lead_id = ? AND is_read = 0').run(id)
    return { leadId: id, markedRead: Number(result.changes || 0) }
  }

  return { ingest, summary, list, detail, update, addNote, notifications, markNotification, markLeadNotifications }
}
