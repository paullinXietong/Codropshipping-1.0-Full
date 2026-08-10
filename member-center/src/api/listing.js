import axios from 'axios'
import store from '@/store'

const listing = axios.create({
  baseURL: '/listing-api',
  // Full product localization and studio image generation can take longer
  // than an ordinary API request. Keep the reviewed workflow responsive
  // without reporting a false failure while the proposal is still running.
  timeout: 180000,
})

listing.interceptors.request.use((config) => {
  const token = store.state.user.token || localStorage.getItem('TOKEN')
  if (token) config.headers.token = token
  return config
})

listing.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const payload = error.response?.data?.error
    if (!payload) return Promise.reject(error)
    const normalized = new Error(payload.message || 'Listing request failed')
    normalized.code = payload.code || 'LISTING_REQUEST_FAILED'
    normalized.status = error.response?.status
    return Promise.reject(normalized)
  },
)

export const createListingDraft = (data) => listing.post('/v1/listings', data)
export const getListingDraft = (id) => listing.get(`/v1/listings/${id}`)
export const getListingDrafts = () => listing.get('/v1/listings')
export const updateListingDraft = (id, data) => listing.patch(`/v1/listings/${id}`, data)
export const requestAiProposal = (id) => listing.post(`/v1/listings/${id}/ai-proposals`)
export const requestAiImageProposal = (id, data) => listing.post(`/v1/listings/${id}/ai-images`, data)
export const publishListingDraft = (id, data) => listing.post(`/v1/listings/${id}/publish`, data)
export const getListingChannels = () => listing.get('/v1/channels')
