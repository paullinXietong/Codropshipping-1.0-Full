function fileExtension(contentType) {
  if (/jpeg/i.test(contentType)) return 'jpg'
  if (/webp/i.test(contentType)) return 'webp'
  return 'png'
}
export async function persistGeneratedImage(imageUrl, token, options = {}) {
  const fetchImpl = options.fetchImpl || fetch
  const codApiBaseUrl = String(options.codApiBaseUrl || '').replace(/\/+$/, '')
  if (!codApiBaseUrl) throw new Error('CoD API base URL is not configured')
  if (!token) throw new Error('A verified customer session is required to save the generated image')

  const imageResponse = await fetchImpl(imageUrl)
  if (!imageResponse.ok) throw new Error(`Generated image download failed with status ${imageResponse.status}`)
  const contentType = imageResponse.headers?.get?.('content-type') || 'image/png'
  const bytes = await imageResponse.arrayBuffer()
  if (!bytes.byteLength || bytes.byteLength > 20 * 1024 * 1024) throw new Error('Generated image has an invalid file size')

  const form = new FormData()
  form.append('file', new Blob([bytes], { type: contentType }), `ai-listing.${fileExtension(contentType)}`)
  const uploadResponse = await fetchImpl(`${codApiBaseUrl}/customer/api/order/freight/upload`, {
    method: 'POST',
    headers: { token },
    body: form,
  })
  const payload = await uploadResponse.json().catch(() => ({}))
  if (!uploadResponse.ok || payload?.code && Number(payload.code) !== 0) {
    throw new Error(payload?.msg || payload?.message || `Generated image upload failed with status ${uploadResponse.status}`)
  }
  const persistentUrl = String(payload?.data?.path || payload?.data?.file || '').trim()
  if (!persistentUrl) throw new Error('CoD image upload returned no persistent URL')
  return persistentUrl
}
