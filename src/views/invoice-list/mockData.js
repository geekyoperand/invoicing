import { FilterMatchMode } from 'primereact/api'

export const customerData = [
  {
    customerName: 'Jatin Sood',
    mobileNo: '9876567890',
    sales: '400.00',
    data: [
      {
        itemName: 'Note Book',
        qty: 10,
        rate: '20',
        totalAmount: '200.00',
        itemNo: 1,
      },
      {
        itemName: 'Accessories',
        qty: 1,
        rate: '200',
        totalAmount: '200.00',
        itemNo: 2,
      },
    ],
    itemNo: 1,
  },
  {
    customerName: 'Nitin Kalia',
    mobileNo: '9876567890',
    sales: '200.00',
    data: [
      {
        itemName: 'Note Book',
        qty: 10,
        rate: '20',
        totalAmount: '200.00',
        itemNo: 1,
      },
    ],
    itemNo: 2,
  },
  {
    customerName: 'Ritika Sharma',
    mobileNo: '9876567890',
    sales: '600.00',
    data: [
      {
        itemName: 'Note Book',
        qty: 10,
        rate: '20',
        totalAmount: '200.00',
        itemNo: 1,
      },
      {
        itemName: 'Accessories',
        qty: 1,
        rate: '400',
        totalAmount: '400.00',
        itemNo: 2,
      },
    ],
    itemNo: 3,
  },
  {
    customerName: 'Avinash',
    mobileNo: '9876567890',
    sales: '500.00',
    data: [
      {
        itemName: 'Note Book',
        qty: 10,
        rate: '20',
        totalAmount: '200.00',
        itemNo: 1,
      },
      {
        itemName: 'Accessories',
        qty: 1,
        rate: '300',
        totalAmount: '300.00',
        itemNo: 2,
      },
    ],
    itemNo: 4,
  },
  {
    customerName: 'Komal Shah',
    mobileNo: '9876567890',
    sales: '400.00',
    data: [
      {
        itemName: 'Note Book',
        qty: 10,
        rate: '20',
        totalAmount: '200.00',
        itemNo: 1,
      },
      {
        itemName: 'Accessories',
        qty: 10,
        rate: '200',
        totalAmount: '200.00',
        itemNo: 2,
      },
    ],
    itemNo: 5,
  },
]

export const customerFields = [
  {
    fieldName: 'itemNo',
    fieldPlaceholder: 'Search by item Number',
    fieldHeader: 'S.No.',
  },
  {
    fieldName: 'customerName',
    fieldPlaceholder: 'Search by name',
    fieldHeader: 'Name',
  },
  {
    fieldName: 'mobileNo',
    fieldPlaceholder: 'Search by mobile no',
    fieldHeader: 'Mobile',
  },
  {
    fieldName: 'sales',
    fieldPlaceholder: 'Search by sales',
    fieldHeader: 'Sales',
  },
]

export const itemFields = [
  {
    fieldName: 'itemNo',
    fieldPlaceholder: 'Search by item Number',
    fieldHeader: 'S.No.',
  },
  {
    fieldName: 'itemName',
    fieldPlaceholder: 'Search by item name',
    fieldHeader: 'Item Name',
  },
  {
    fieldName: 'qty',
    fieldPlaceholder: 'Search by quantity',
    fieldHeader: 'Quantity',
  },
  {
    fieldName: 'rate',
    fieldPlaceholder: 'Search by rate',
    fieldHeader: 'Rate',
  },
  {
    fieldName: 'totalAmount',
    fieldPlaceholder: 'Search by amount',
    fieldHeader: 'Amount',
  },
]

export const customerFilter = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  itemNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
  customerName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  mobileNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
  sales: { value: null, matchMode: FilterMatchMode.CONTAINS },
}

export const itemsFilter = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  itemNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
  itemName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  qty: { value: null, matchMode: FilterMatchMode.CONTAINS },
  rate: {
    value: null,
    matchMode: FilterMatchMode.CONTAINS,
  },
  totalAmount: { value: null, matchMode: FilterMatchMode.CONTAINS },
}
