import axios from 'axios'

const listing = axios.create({ baseURL: '/listing-api', timeout: 125000 })
listing.interceptors.request.use((config) => {
  const token = process.client ? window.localStorage.getItem('TOKEN') : ''
  if (token) config.headers.token = token
  return config
})
listing.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const payload = error?.response?.data?.error || error?.response?.data || {}
    return Promise.reject(Object.assign(new Error(payload.message || error?.message || 'Listing service unavailable'), { code: payload.code, details: payload.details }))
  },
)

export const createListingDraft = (data: any) => listing.post('/v1/listings', data)
export const getListingDraft = (id: string) => listing.get(`/v1/listings/${id}`)
export const getListingDrafts = () => listing.get('/v1/listings')
export const updateListingDraft = (id: string, data: any) => listing.patch(`/v1/listings/${id}`, data)
export const requestAiProposal = (id: string) => listing.post(`/v1/listings/${id}/ai-proposals`)
export const getAiProposal = (id: string, proposalId: string) => listing.get(`/v1/listings/${id}/ai-proposals`, { params: { proposalId } })
export const requestAiImageProposal = (id: string, data: any) => listing.post(`/v1/listings/${id}/ai-images`, data)
export const publishListingDraft = (id: string, data: any) => listing.post(`/v1/listings/${id}/publish`, data)
export const getListingChannels = () => listing.get('/v1/channels')
