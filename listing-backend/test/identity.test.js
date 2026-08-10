import test from 'node:test'
import assert from 'node:assert/strict'
import { stableIdentityFromPayload, stableIdentityFromToken } from '../src/identity.js'

test('uses a stable account id from the verified identity payload', () => {
  assert.equal(stableIdentityFromPayload({ data: { userInfo: { id: 4821, email: 'MERCHANT@example.com' } } }), 'cod:4821')
  assert.equal(stableIdentityFromPayload({ data: { profile: { email: 'MERCHANT@example.com' } } }), 'cod:merchant@example.com')
})

test('uses stable JWT claims when the legacy dashboard payload has no profile', () => {
  const payload = Buffer.from(JSON.stringify({ sub: 'customer-82', email: 'merchant@example.com' })).toString('base64url')
  assert.equal(stableIdentityFromToken(`header.${payload}.signature`), 'cod:customer-82')
  assert.equal(stableIdentityFromToken('opaque-session-token'), '')
})
