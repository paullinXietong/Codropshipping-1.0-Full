export default {
  Column: [
    {
      label: 'Storage number',
      prop: 'storage_number',
      width: '180'
    },
    {
      label: 'Invetory tracking number',
      prop: 'logistics_no',
      slot: 'logistics_no',
      width: '200'
    },
    {
      label: 'Photos',
      prop: 'photos',
      slot: 'photos',
      width: '180'
    },
    {
      label: 'Product name',
      prop: 'product_name',
      width: '180'
    },
    {
      label: 'Case size(cm)',
      prop: 'case_size',
      width: '180'
    },
    {
      label: 'Carton qty',
      prop: 'carton_qty',
      width: '180'
    },
    {
      label: 'Total Volume(CBM)',
      prop: 'total_volume',
      width: '180'
    },
    {
      label: 'PO/FBA(number)',
      prop: 'pf',
      width: '180'
    },
    {
      label: 'Available Quantity(ctn)',
      prop: 'available_quantity',
      width: '180'
    },
    {
      label: 'In transit(ctn)',
      prop: 'in_transit',
      width: '180'
    },
    {
      label: 'To be released(ctn)',
      prop: 'to_be_released',
      width: '180'
    },
    // {
    //   label: 'In production(ctn)',
    //   prop: 'storage_number',
    //   width: '180'
    // },
    {
      label: 'Inventory time',
      prop: 'inventory_time',
      width: '180'
    },
    {
      label: 'Fee($)',
      prop: 'free',
      width: '180'
    },
    {
      label: 'Warehouse Address',
      prop: 'warehouse_address',
      width: '180'
    },
    {
      label: 'action',
      prop: 'action',
      width: '120',
      fixed:  'right',
      slot: 'action'
    }
  ],
  skuTable:[
    {
      label: 'Customer SKU',
      prop: 'sku',
      width: '180'
    },
    {
      label: 'Product Name',
      prop: 'title_en',
      width: '180'
    },
    {
      label: 'Inventory Quantity',
      prop: 'warehouse_number',
      width: '180'
    },
    {
      label: 'Outbound Quantity',
      prop: 'outbound_number',
      width: '180'
    },
    {
      label: 'Remaining Quantity',
      prop: 'stock_number',
      width: '180'
    },
    {
      label: 'Size',
      prop: 'size',
      slot: 'size',
      width: '200'
    },
    // {
    //   label: 'Volumetric',
    //   prop: 'sku',
    //   width: '140'
    // },
    {
      label: 'Weight',
      prop: 'weight',
      width: '140'
    },
    // {
    //   label: 'Warehouse Rentals',
    //   prop: '',
    //   width: '180'
    // },
  ],
  boxTable: [
    {
      label: 'Box NO.',
      prop: 'box_number',
      width: '180'
    },
    {
      label: 'Box Name',
      prop: 'box_name',
      width: '180'
    },
    {
      label: 'Photos',
      prop: 'img',
      slot: 'img',
      width: '120'
    },
    {
      label: 'Product Name',
      prop: 'title_en',
      width: '180'
    },
    {
      label: 'Customer SKU',
      prop: 'sku',
      width: '180'
    },
    {
      label: 'Inventory Quantity',
      prop: 'warehouse_number',
      width: '180'
    },
    {
      label: 'Outbound Quantity',
      prop: 'outbound_number',
      width: '180'
    },
    {
      label: 'Remaining Quantity',
      prop: 'stock_number',
      width: '180'
    },
    {
      label: 'Size',
      prop: 'size',
      slot: 'size',
      width: '200'
    },
    // {
    //   label: 'Volumetric',
    //   prop: 'sku',
    //   width: '140'
    // },
    {
      label: 'Weight',
      prop: 'weight',
      width: '140'
    },
    // {
    //   label: 'Warehouse Rentals',
    //   prop: '',
    //   width: '180'
    // },
  ]
}