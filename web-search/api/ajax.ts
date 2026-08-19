import axios, { type AxiosRequestConfig } from 'axios'

const client = axios.create({ baseURL: '/api', timeout: 18000 })

client.interceptors.request.use((config) => {
  if (process.client) {
    const token = window.localStorage.getItem('TOKEN')
    const tourist = window.localStorage.getItem('Touriststoken')
    if (token) config.headers.token = token
    if (tourist) config.headers.Touriststoken = tourist
  }
  return config
})

client.interceptors.response.use(
  (response) => {
    const body = response.data
    const message = String(body?.msg || body?.message || '')
    if (message === 'token失效' || message === '账号异常') {
      window.localStorage.removeItem('TOKEN')
      window.location.assign(`/admin/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`)
      throw new Error(message)
    }
    return body
  },
  (error) => {
    const message = error?.response?.data?.msg || error?.response?.data?.message || error?.message || 'The service is temporarily unavailable.'
    return Promise.reject(Object.assign(new Error(message), { status: error?.response?.status, code: error?.response?.data?.code }))
  },
)

export function formBody(data: Record<string, any> = {}) {
  const params = new URLSearchParams()
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return
    params.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value))
  })
  return params
}

export const requests = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) => client.get<any, T>(url, config),
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => client.post<any, T>(url, data, config),
}

export default requests
