const VISITOR_KEY = 'cod_journey_visitor_id'
const SESSION_KEY = 'cod_journey_session_id'

function id(prefix) {
  const random = window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`
  return `${prefix}-${random}`
}

function storageId(storage, key, prefix) {
  const existing = storage.getItem(key)
  if (existing) return existing
  const created = id(prefix)
  storage.setItem(key, created)
  return created
}

function identity() {
  try {
    const user = JSON.parse(window.localStorage.getItem('userInfo') || '{}')
    return {
      customerId: String(user.id || user.customer_id || ''),
      name: [user.first_name, user.last_name].filter(Boolean).join(' ') || user.user_name || user.nickname || '',
      email: String(user.email || ''),
      company: String(user.company || user.company_name || ''),
      manager: String((user.manage && user.manage.englishname) || (user.manager && user.manager.name) || ''),
    }
  } catch { return {} }
}

export function trackJourney(detail = {}) {
  if (window.location.pathname.indexOf('/internal/sales-leads') !== -1) return Promise.resolve()
  const body = {
    visitorId: storageId(window.localStorage, VISITOR_KEY, 'visitor'),
    sessionId: storageId(window.sessionStorage, SESSION_KEY, 'session'),
    eventName: detail.eventName || '',
    path: detail.path || `${window.location.pathname}${window.location.search}`,
    pageTitle: document.title,
    referrer: document.referrer,
    identity: identity(),
    metadata: { language: window.localStorage.getItem('workspace-language') || 'en-US', ...(detail.metadata || {}) },
  }
  return fetch('/listing-api/v1/journey/events', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), keepalive: true,
  }).catch(() => null)
}

export function installJourneyTracking(router) {
  window.addEventListener('cod-journey-event', (event) => trackJourney(event.detail || {}))
  router.afterEach((to) => trackJourney({ path: to.fullPath }))
}

