import test from 'node:test'
import assert from 'node:assert/strict'
import { DEFAULT_STOREHOUSE, getStorehouseOptions, resolveStorehouse } from '../src/storehouse.js'

test('ordinary CoD products automatically use the legacy China warehouse value', () => {
  assert.equal(resolveStorehouse({}, '1'), DEFAULT_STOREHOUSE)
  assert.equal(DEFAULT_STOREHOUSE, '中国仓')
})

test('overseas warehouse products use the selected delivery region', () => {
  const source = {
    delivery_regions: [
      { delivery_region_id: 'cn-1', name_en: 'China warehouse' },
      { delivery_region_id: 'us-1', name_en: 'US West warehouse' },
    ],
  }
  assert.equal(resolveStorehouse(source, '4', '', 'us-1'), 'US West warehouse')
  assert.deepEqual(getStorehouseOptions(source, '4').map((item) => item.value), ['China warehouse', 'US West warehouse'])
})

test('an explicitly reviewed storehouse is never overwritten', () => {
  assert.equal(resolveStorehouse({}, '1', 'Reviewed warehouse'), 'Reviewed warehouse')
})
