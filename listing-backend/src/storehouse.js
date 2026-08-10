export const DEFAULT_STOREHOUSE = '中国仓'

function clean(value) {
  return String(value || '').trim()
}

function regionId(region = {}) {
  return clean(
    region.delivery_region_id
      || region.warehouse_id
      || region.country_code
      || region.id
      || region.code
  )
}

function regionName(region = {}, sourceType = '') {
  if (String(sourceType) === '5') {
    return clean(region.country || region.country_name || region.city || region.name_en || region.name)
  }
  return clean(region.name_en || region.name || region.country || region.city || region.name_zh)
}

export function getStorehouseOptions(sourceSnapshot = {}, sourceType = '') {
  const regions = Array.isArray(sourceSnapshot.delivery_regions) ? sourceSnapshot.delivery_regions : []
  const options = regions
    .map((region) => ({
      id: regionId(region),
      value: regionName(region, sourceType),
      label: regionName(region, sourceType),
    }))
    .filter((option) => option.value)
    .filter((option, index, list) => list.findIndex((item) => item.value === option.value) === index)

  return options.length ? options : [{ id: '', value: DEFAULT_STOREHOUSE, label: DEFAULT_STOREHOUSE }]
}

export function resolveStorehouse(sourceSnapshot = {}, sourceType = '', selectedStorehouse = '', preferredRegion = '') {
  const selected = clean(selectedStorehouse)
  if (selected) return selected

  const options = getStorehouseOptions(sourceSnapshot, sourceType)
  const preferred = clean(preferredRegion)
  if (preferred) {
    const matching = options.find((option) => option.id === preferred || option.value === preferred)
    if (matching) return matching.value
  }
  return options[0]?.value || DEFAULT_STOREHOUSE
}
