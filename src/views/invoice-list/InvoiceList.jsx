import React, { useState } from 'react'
import { customerData, customerFields, customerFilter } from './mockData'
import { CButton, CCardText } from '@coreui/react'
import { useHistory } from 'react-router-dom'
import Table from '../components/Table'
import './index.css'

const InvoiceList = () => {
  const history = useHistory()
  const [customerDetails, setCustomerDetails] = useState(customerData)

  const editCustomerDetails = (ele) => {
    history.push(`/invoices/items/${ele?.itemNo}`)
  }

  const deleteCustomerDetails = (ele) => {
    let customerData = customerDetails
    let index = customerData.findIndex((x) => x?.itemNo === ele?.itemNo)
    customerData.splice(index, 1)
    customerData = customerData.map((ele, idx) => {
      return {
        ...ele,
        itemNo: idx + 1,
      }
    })
    console.log(customerData)
    setCustomerDetails(customerData)
  }

  return (
    <div style={styles.invoiceConatiner}>
      <div style={{ height: '100%', width: '100%' }}>
        <div style={styles.invoiceHeaderContainer}>
          <CCardText style={styles.invoiceHeader}>Invoice List</CCardText>
          <div>
            <CButton color="primary" role="button" onClick={() => history.push('/invoices/items')}>
              Add Invoice
            </CButton>
          </div>
        </div>
        <div style={styles.invoiceTableConatiner}>
          <Table
            field={customerFields}
            filter={customerFilter}
            value={customerDetails}
            editItem={editCustomerDetails}
            deleteItem={deleteCustomerDetails}
          />
        </div>
      </div>
    </div>
  )
}

const styles = {
  invoiceConatiner: {
    minHeight: '80vh',
    background: 'white',
    border: '1px solid #00000020',
    padding: 30,
    boxShadow: '5px 5px 20px 0px #00000020',
    borderRadius: 10,
  },
  invoiceHeaderContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
  },
  invoiceHeader: {
    fontSize: 24,
    fontWeight: 'bolder',
    marginBottom: 30,
  },
  invoiceTableConatiner: {
    padding: 10,
    border: '1px solid #00000020',
    width: '100%',
    height: 'calc(100% - 100px)',
  },
}

export default InvoiceList
