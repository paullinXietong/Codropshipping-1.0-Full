export function createFixedWindowRateLimiter({ limit, windowMs, maxKeys = 10000, now = () => Date.now() }) {
  const buckets = new Map()

  function take(key) {
    const timestamp = now()
    const normalizedKey = String(key || 'unknown')
    let bucket = buckets.get(normalizedKey)
    if (!bucket || timestamp >= bucket.resetAt) {
      bucket = { count: 0, resetAt: timestamp + windowMs }
      buckets.set(normalizedKey, bucket)
    }
    bucket.count += 1

    if (buckets.size > maxKeys) {
      for (const [candidate, value] of buckets) {
        if (timestamp >= value.resetAt || candidate !== normalizedKey) buckets.delete(candidate)
        if (buckets.size <= maxKeys) break
      }
    }

    return {
      allowed: bucket.count <= limit,
      remaining: Math.max(0, limit - bucket.count),
      retryAfterMs: Math.max(0, bucket.resetAt - timestamp),
    }
  }

  return { take }
}

export function requestClientKey(request) {
  const forwarded = String(request.headers['x-forwarded-for'] || '').split(',')[0].trim()
  return forwarded || request.socket?.remoteAddress || 'unknown'
}
