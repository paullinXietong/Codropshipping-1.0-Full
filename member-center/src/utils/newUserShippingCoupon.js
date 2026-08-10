export const NEW_USER_SHIPPING_CAMPAIGN = 'new_user_shipping_2026'

export const NEW_USER_COUPON_THRESHOLDS = Object.freeze({
  5: 99,
  8: 149,
  10: 199,
  18: 399,
  20: 499,
  30: 799,
  50: 1499,
  100: 2999,
})

const PENDING_AMOUNT_KEY = 'coddrop_pending_coupon_amount'
const PENDING_CAMPAIGN_KEY = 'coddrop_pending_coupon_campaign'
const PENDING_MINIMUM_KEY = 'coddrop_pending_coupon_minimum'

export function readPendingNewUserCoupon() {
  const campaignCode = localStorage.getItem(PENDING_CAMPAIGN_KEY)
  const amount = Number(localStorage.getItem(PENDING_AMOUNT_KEY))
  const minimum = Number(localStorage.getItem(PENDING_MINIMUM_KEY))

  if (
    campaignCode !== NEW_USER_SHIPPING_CAMPAIGN ||
    !Object.prototype.hasOwnProperty.call(NEW_USER_COUPON_THRESHOLDS, amount)
  ) {
    return null
  }

  return {
    campaign_code: NEW_USER_SHIPPING_CAMPAIGN,
    preview_amount: amount,
    min_price: minimum || NEW_USER_COUPON_THRESHOLDS[amount],
    valid_days: 14,
    claim_source: 'homepage_popup',
  }
}

export function clearPendingNewUserCoupon() {
  localStorage.removeItem(PENDING_AMOUNT_KEY)
  localStorage.removeItem(PENDING_CAMPAIGN_KEY)
  localStorage.removeItem(PENDING_MINIMUM_KEY)
}

export function hasSubmittedCampaignClaim(userId) {
  return Boolean(userId && localStorage.getItem(`${NEW_USER_SHIPPING_CAMPAIGN}_claimed_${userId}`))
}

export function markCampaignClaimSubmitted(userId, coupon) {
  if (!userId) return
  localStorage.setItem(
    `${NEW_USER_SHIPPING_CAMPAIGN}_claimed_${userId}`,
    JSON.stringify({ coupon_id: coupon && coupon.id ? coupon.id : null, claimed_at: Date.now() })
  )
}

export function isNewUserShippingCoupon(coupon) {
  if (!coupon || typeof coupon !== 'object') return false

  const marker = coupon.campaign_code || coupon.campaign || coupon.activity_code || coupon.source_code
  return marker === NEW_USER_SHIPPING_CAMPAIGN ||
    Number(coupon.is_new_user) === 1 ||
    Number(coupon.new_user_only) === 1
}

export function isVoidedCoupon(coupon) {
  const status = String(coupon && (coupon.status_text || coupon.status || coupon.state) || '').toLowerCase()
  return status === 'void' || status === 'voided' || status === 'cancelled' || status === 'canceled' ||
    Number(coupon && coupon.is_void) === 1
}

export function isNewUserCouponUnavailable(coupon, hasPlacedOrder) {
  if (!isNewUserShippingCoupon(coupon)) return false
  return Boolean(
    hasPlacedOrder ||
    isVoidedCoupon(coupon) ||
    coupon.is_eligible === false ||
    Number(coupon.is_eligible) === 0
  )
}

export function newUserCouponUnavailableReason(coupon, hasPlacedOrder) {
  if (!isNewUserShippingCoupon(coupon)) return ''
  if (isVoidedCoupon(coupon)) return 'Coupon voided'
  if (hasPlacedOrder) return 'New users only'
  if (coupon.is_eligible === false || Number(coupon.is_eligible) === 0) {
    return coupon.eligibility_reason || 'New users only'
  }
  return ''
}

export function responseHasOrders(response) {
  const data = response && response.data ? response.data : response
  if (!data) return false

  const possibleLists = [data.list, data.data, data.orders, data.order_info]
  if (possibleLists.some((list) => Array.isArray(list) && list.length > 0)) return true

  return Number(data.total || data.total_count || data.count_total || 0) > 0
}
