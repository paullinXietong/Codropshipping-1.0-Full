import test from 'node:test'
import assert from 'node:assert/strict'
import { DatabaseSync } from 'node:sqlite'
import { createLeadOperations, installLeadSchema } from '../src/leads.js'

function setup() {
  const db = new DatabaseSync(':memory:')
  db.exec('PRAGMA foreign_keys = ON')
  installLeadSchema(db)
  return { db, leads: createLeadOperations(db) }
}

test('creates one lead and actionable first-visit notification', () => {
  const { db, leads } = setup()
  const lead = leads.ingest({ visitorId: 'visitor-1', sessionId: 'session-1', path: '/', pageTitle: 'Home' })
  assert.equal(lead.visitCount, 1)
  assert.equal(lead.eventCount, 1)
  assert.equal(leads.summary().unread, 1)
  assert.equal(leads.notifications()[0].kind, 'first_visit')
  db.close()
})

test('removes credentials and personal query values from the journey timeline', () => {
  const { db, leads } = setup()
  const lead = leads.ingest({
    visitorId: 'visitor-private', sessionId: 'session-private',
    path: '/admin/login?redirect=%2Fworkspace&token=secret&id=42&email=buyer%40example.com',
    referrer: 'https://partner.example.com/invite?code=secret-code',
  })
  const event = leads.detail(lead.id).timeline[0]
  assert.equal(event.path, '/admin/login?id=42')
  assert.equal(event.referrer, 'https://partner.example.com/invite')
  db.close()
})

test('recognizes a new session as a return visit without duplicating its alert', () => {
  const { db, leads } = setup()
  leads.ingest({ visitorId: 'visitor-1', sessionId: 'session-1', path: '/' })
  leads.ingest({ visitorId: 'visitor-1', sessionId: 'session-2', path: '/productDetail?id=42' })
  const lead = leads.ingest({ visitorId: 'visitor-1', sessionId: 'session-2', path: '/productDetail?id=43' })
  assert.equal(lead.visitCount, 2)
  assert.equal(leads.notifications().filter((item) => item.kind === 'return_visit').length, 1)
  db.close()
})

test('scores high-intent action and preserves sales follow-up context', () => {
  const { db, leads } = setup()
  const created = leads.ingest({
    visitorId: 'visitor-2', sessionId: 'session-1', eventName: 'ai_listing_start', path: '/productDetail?id=55',
    identity: { customerId: '88', name: 'Alex Morgan', email: 'alex@example.com', manager: 'Winnie Wei' },
  })
  assert.equal(created.name, 'Alex Morgan')
  assert.equal(created.owner, 'Winnie Wei')
  assert.ok(created.score >= 28)
  assert.equal(leads.notifications().some((item) => item.kind === 'high_intent'), true)

  leads.update(created.id, { status: 'follow_up', owner: 'Winnie Wei', followUpAt: '2026-08-13T10:00' })
  const detail = leads.addNote(created.id, { author: 'Winnie Wei', content: 'Confirm the Shopify launch plan tomorrow.' })
  assert.equal(detail.status, 'follow_up')
  assert.equal(detail.timeline[0].type, 'note')
  assert.match(detail.timeline[0].content, /Shopify/)
  assert.ok(leads.markLeadNotifications(created.id).markedRead >= 1)
  assert.equal(leads.summary().unread, 0)
  db.close()
})
