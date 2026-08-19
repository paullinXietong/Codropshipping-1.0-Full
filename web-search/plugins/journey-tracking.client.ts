import { defineNuxtPlugin } from '#app'

type JourneyEvent = {
  eventName?: string
  metadata?: Record<string, unknown>
  path?: string
}

const VISITOR_KEY = 'cod_journey_visitor_id'
const SESSION_KEY = 'cod_journey_session_id'

function id(prefix: string) {
  const random = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`
  return `${prefix}-${random}`
}

function storageId(storage: Storage, key: string, prefix: string) {
  const existing = storage.getItem(key)
  if (existing) return existing
  const created = id(prefix)
  storage.setItem(key, created)
  return created
}

function identity() {
  try {
    const user = JSON.parse(window.localStorage.getItem('userInfo') || '{}')
    const name = [user.first_name, user.last_name].filter(Boolean).join(' ') || user.user_name || user.nickname || ''
    return {
      customerId: String(user.id || user.customer_id || ''),
      name,
      email: String(user.email || ''),
      company: String(user.company || user.company_name || ''),
      manager: String(user.manage?.englishname || user.manager?.name || ''),
    }
  } catch { return {} }
}

export default defineNuxtPlugin((nuxtApp) => {
  const visitorId = storageId(window.localStorage, VISITOR_KEY, 'visitor')
  const sessionId = storageId(window.sessionStorage, SESSION_KEY, 'session')
  let lastSignature = ''

  async function track(detail: JourneyEvent = {}) {
    const path = detail.path || `${window.location.pathname}${window.location.search}`
    if (path.startsWith('/internal/')) return
    const eventName = detail.eventName || ''
    const signature = `${eventName || 'route'}:${path}`
    if (!eventName && signature === lastSignature) return
    if (!eventName) lastSignature = signature
    const body = {
      visitorId,
      sessionId,
      eventName,
      path,
      pageTitle: document.title,
      referrer: document.referrer,
      identity: identity(),
      metadata: { language: window.localStorage.getItem('cod-site-language') || 'en-US', ...(detail.metadata || {}) },
    }
    try {
      await fetch('/listing-api/v1/journey/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        keepalive: true,
      })
    } catch { /* Journey analytics must never block the customer. */ }
  }

  const customListener = (event: Event) => track((event as CustomEvent<JourneyEvent>).detail || {})
  window.addEventListener('cod-journey-event', customListener)
  nuxtApp.hook('app:mounted', () => track())
  nuxtApp.$router.afterEach((to) => track({ path: to.fullPath }))
})
