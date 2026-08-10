function normalizeIdentity(value) {
  const normalized = String(value || '').trim()
  if (!normalized) return ''
  return normalized.includes('@') ? normalized.toLowerCase() : normalized
}

function identityFromObject(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return ''
  const id = normalizeIdentity(value.user_id || value.userId || value.customer_id || value.customerId || value.account_id || value.accountId || value.id)
  if (id) return `cod:${id}`
  const email = normalizeIdentity(value.email || value.user_email || value.account_email)
  return email ? `cod:${email}` : ''
}

export function stableIdentityFromPayload(payload = {}) {
  const candidates = [
    payload?.data?.user,
    payload?.data?.userInfo,
    payload?.data?.customer,
    payload?.data?.profile,
    payload?.data?.account,
    payload?.data?.member,
    payload?.user,
    payload?.userInfo,
    payload?.customer,
    payload?.profile,
  ]
  for (const candidate of candidates) {
    const identity = identityFromObject(candidate)
    if (identity) return identity
  }
  return identityFromObject(payload?.data)
}

export function tokenClaims(token) {
  const parts = String(token || '').split('.')
  if (parts.length !== 3) return {}
  try {
    return JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'))
  } catch {
    return {}
  }
}

export function stableIdentityFromToken(token) {
  const claims = tokenClaims(token)
  const direct = normalizeIdentity(claims.sub || claims.user_id || claims.userId || claims.customer_id || claims.customerId || claims.account_id || claims.accountId)
  if (direct) return `cod:${direct}`
  const nested = identityFromObject(claims.user || claims.customer || claims.account)
  if (nested) return nested
  const email = normalizeIdentity(claims.email)
  return email ? `cod:${email}` : ''
}
