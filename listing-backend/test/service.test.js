import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('the listing service never enables a local fake identity or AI fallback', () => {
  const source = readFileSync(new URL('../src/server.js', import.meta.url), 'utf8')
  assert.equal(source.includes('ALLOW_LOCAL_IDENTITY'), false)
  assert.match(source, /AI listing service is not configured/)
  assert.match(source, /AI image service is not configured/)
  assert.match(source, /Return suggestions only/)
  assert.match(source, /Preserve the exact product/)
  assert.match(source, /idempotent|payload_hash/i)
})
