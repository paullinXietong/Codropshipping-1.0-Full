import test from 'node:test'
import assert from 'node:assert/strict'
import { createFixedWindowRateLimiter, requestClientKey } from '../src/rate-limit.js'

test('limits public translation calls and resets after the fixed window', () => {
  let timestamp = 1000
  const limiter = createFixedWindowRateLimiter({ limit: 2, windowMs: 60_000, now: () => timestamp })
  assert.equal(limiter.take('customer-a').allowed, true)
  assert.equal(limiter.take('customer-a').allowed, true)
  assert.equal(limiter.take('customer-a').allowed, false)
  assert.equal(limiter.take('customer-b').allowed, true)
  timestamp += 60_001
  assert.equal(limiter.take('customer-a').allowed, true)
})

test('uses the first Caddy forwarded address as the client key', () => {
  const request = { headers: { 'x-forwarded-for': '203.0.113.10, 10.0.0.2' }, socket: { remoteAddress: '10.0.0.3' } }
  assert.equal(requestClientKey(request), '203.0.113.10')
})
