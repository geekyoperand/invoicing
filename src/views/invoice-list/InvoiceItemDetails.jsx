import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { CButton, CCard, CCardBody, CFormLabel } from '@coreui/react'
import { customerData, itemFields, itemsFilter } from './mockData'
import Table from '../components/Table'
import ItemDialog from '../components/ItemDialog'
import ItemModal from '../components/ItemModal'

const InvoiceItemDetails = () => {
  const history = useHistory()

  const [customerDetails, setCustomerDetails] = useState(customerData)
  const [isUpdated, SetIsUpdated] = useState(false)
  const [editCustomerRecord, SetEditCustomerRecord] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerNameError, setCustomerNameError] = useState(false)
  const [mobileNo, setMobileNo] = useState('')
  const [mobileNoError, setMobileNoError] = useState(false)
  const [itemName, setItemName] = useState('')
  const [itemNameError, setItemNameError] = useState(false)
  const [qty, setQty] = useState('')
  const [qtyError, setQtyError] = useState(false)
  const [rate, setRate] = useState('')
  const [rateError, setRateError] = useState(false)
  const [visibleDialog, setVisibleDialog] = useState(false)
  const [visibleModal, setVisibleModal] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)
  const [items, setItems] = useState([])
  const [editItem, setEditItem] = useState({})

  let fieldValue = history.location.pathname.split('invoices/items/')?.[1]
  if (fieldValue && !isUpdated) {
    let customerItems = customerDetails.find((ele) => ele.itemNo === Number(fieldValue))
    SetEditCustomerRecord(customerItems)
    console.log(customerItems)
    SetIsUpdated(true)
    setCustomerName(customerItems?.customerName)
    setMobileNo(customerItems?.mobileNo)
    setTotalAmount(customerItems?.sales)
    setItems(customerItems?.data)
  }

  const isCustomerValid = () => {
    if (customerName.length < 3 || mobileNo?.toString().length !== 10) {
      mobileNo?.toString()?.length !== 10 && setMobileNoError(true)
      customerName.length < 3 && setCustomerNameError(true)
      return false
    }
    return true
  }

  const clearAllRecord = () => {
    setCustomerName('')
    setMobileNo('')
    setItemName('')
    setQty('')
    setRate('')
    setVisibleDialog(false)
    setVisibleModal(false)
    setTotalAmount(0)
    setItems([])
    setEditItem({})
  }

  const reset = () => {
    setItemName('')
    setQty('')
    setRate('')
    setEditItem({})
    setVisibleDialog(false)
    setVisibleModal(false)
  }

  const onEditItem = (ele) => {
    setEditItem(ele)
    setItemName(ele.itemName)
    setQty(ele.qty)
    setRate(ele.rate)
    setVisibleDialog(true)
    setVisibleModal(false)
  }

  const handleSaveBtn = () => {
    if (!isCustomerValid()) return
    let customerData = customerDetails
    if (!editCustomerRecord?.itemNo) {
      customerData = [
        ...customerDetails,
        {
          itemNo: customerDetails.length + 1,
          id: `eb4i8r34cn34fn394c${customerDetails.length + 1}`,
          customerName,
          mobileNo,
          sales: totalAmount,
          data: items,
        },
      ]
      console.log({
        itemNo: customerDetails.length + 1,
        id: `eb4i8r34cn34fn394c${customerDetails.length + 1}`,
        customerName,
        mobileNo,
        sales: totalAmount,
        data: items,
      })
    } else {
      let index = customerData.findIndex((x) => x?.itemNo === editCustomerRecord?.itemNo)
      console.log({
        customerName,
        mobileNo,
        sales: totalAmount,
        data: items,
        itemNo: editCustomerRecord?.itemNo,
      })
      customerData.splice(index, 1, {
        customerName,
        mobileNo,
        sales: totalAmount,
        data: items,
        itemNo: editCustomerRecord?.itemNo,
      })
    }
    clearAllRecord()
    setCustomerDetails(customerData)
    history.push('/invoices')
  }

  const handleCancelBtn = () => {
    if (!editCustomerRecord?.itemNo) {
      clearAllRecord()
      history.replace('/invoices')
    } else {
      let customerData = customerDetails
      let index = customerData.findIndex((x) => x?.itemNo === editCustomerRecord?.itemNo)
      customerData.splice(index, 1)
      console.log(customerData)
      history.replace('/invoices')
    }
  }

  const onDeleteItem = (ele) => {
    let customerItems = items
    let totalAmount = 0
    let index = customerItems.findIndex((x) => x?.itemNo === ele?.itemNo)
    customerItems.splice(index, 1)
    customerItems.forEach((ele, idx) => {
      totalAmount = `${(Number(idx === 0 ? 0 : totalAmount) + Number(ele?.totalAmount)).toFixed(2)}`
      return {
        ...ele,
        itemNo: idx + 1,
      }
    })
    setTotalAmount(totalAmount)
    setItems(customerItems)
  }

  const handleResetBtn = () => {
    setCustomerName('')
    setMobileNo('')
    setItemName('')
    setQty('')
    setRate('')
    setEditItem({})
    setItems([])
    setTotalAmount(0)
  }

  return (
    <CCard className="invoice-container">
      <CCardBody>
        <div style={styles.itemDetailsContainer}>
          <CFormLabel>Customer Name</CFormLabel>
          <div className="field mb-3" style={styles.formInput}>
            <InputText
              required
              className="p-inputtext-sm block"
              size={30}
              placeholder="Enter customer name"
              value={customerName}
              onChange={(e) => {
                let customerName = e.target.value.replace(/\d+|^\s+$/g, '')
                if (customerName.length < 3) setCustomerNameError(true)
                else setCustomerNameError(false)
                setCustomerName(customerName)
              }}
            />
            {customerNameError && (
              <small className="p-error block">
                Customer name should not be less than 3 letters.
              </small>
            )}
          </div>
        </div>
        <div style={styles.itemDetailsContainer}>
          <CFormLabel>Mobile No.</CFormLabel>
          <div className="field mb-3" style={styles.formInput}>
            <InputText
              value={mobileNo}
              className="p-inputtext-sm block"
              size={30}
              required
              placeholder="Enter your number"
              onChange={(e) => {
                let mobileNumber = e.target.value.replace(/[^0-9]/g, '')
                if (mobileNumber.length !== 10) setMobileNoError(true)
                else setMobileNoError(false)
                setMobileNo(mobileNumber)
              }}
            />
            {mobileNoError && (
              <small className="p-error block">mobile number must be of 10 digits.</small>
            )}
          </div>
        </div>
        <div style={styles.divider} />
        <div style={styles.tableHeaderBtn}>
          <CButton
            style={{ marginRight: 20 }}
            color="primary"
            role="button"
            onClick={() => setVisibleModal(true)}
          >
            Add Item (Modal)
          </CButton>
          <CButton color="primary" role="button" onClick={() => setVisibleDialog(true)}>
            Add Item
          </CButton>
        </div>
        <div style={styles.tableContainer}>
          <Table
            field={itemFields}
            value={items}
            filter={itemsFilter}
            editItem={onEditItem}
            deleteItem={onDeleteItem}
          />
          <div style={styles.tableFooterBtn}>
            <span style={{ fontSize: 22, fontWeight: 'bolder', marginRight: 50 }}>
              Total Amount:{' '}
            </span>
            <span style={{ fontSize: 20, fontWeight: 'bold', marginRight: 50 }}>
              $ {totalAmount}
            </span>
          </div>
        </div>
        <div style={styles.footerBtnGroupConatiner}>
          <div style={styles.footerBtnGroup}>
            <CButton color="primary" role="button" onClick={handleSaveBtn}>
              {!editCustomerRecord?.itemNo ? 'Save' : 'Update'}
            </CButton>
            <CButton
              style={{ margin: '0 20px' }}
              color="primary"
              role="button"
              onClick={handleCancelBtn}
            >
              {!editCustomerRecord?.itemNo ? 'Cancel' : 'Delete'}
            </CButton>
            <CButton color="primary" role="button" onClick={handleResetBtn}>
              Reset
            </CButton>
          </div>
        </div>
        <ItemDialog
          isOpen={visibleDialog}
          onClose={() => setVisibleDialog(false)}
          editItem={editItem}
          itemName={itemName}
          setItemName={(val) => setItemName(val)}
          itemNameError={itemNameError}
          setItemNameError={(val) => setItemNameError(val)}
          qty={qty}
          setQty={(val) => setQty(val)}
          qtyError={qtyError}
          setQtyError={(val) => setQtyError(val)}
          rate={rate}
          setRate={(val) => setRate(val)}
          rateError={rateError}
          setRateError={(val) => setRateError(val)}
          reset={() => reset()}
          items={items}
          setItems={(val) => setItems(val)}
          setTotalAmount={(val) => setTotalAmount(val)}
        />
        <ItemModal
          isOpen={visibleModal}
          onClose={() => setVisibleModal(false)}
          editItem={editItem}
          itemName={itemName}
          setItemName={(val) => setItemName(val)}
          itemNameError={itemNameError}
          setItemNameError={(val) => setItemNameError(val)}
          qty={qty}
          setQty={(val) => setQty(val)}
          qtyError={qtyError}
          setQtyError={(val) => setQtyError(val)}
          rate={rate}
          setRate={(val) => setRate(val)}
          rateError={rateError}
          setRateError={(val) => setRateError(val)}
          reset={() => reset()}
          items={items}
          setItems={(val) => setItems(val)}
          setTotalAmount={(val) => setTotalAmount(val)}
        />
      </CCardBody>
    </CCard>
  )
}

const styles = {
  itemDetailsContainer: {
    width: '35%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  formInput: {
    display: 'flex',
    flexDirection: 'column',
  },
  divider: {
    width: '100%',
    borderBottom: '2px solid #00000010',
    marginBottom: 20,
  },
  tableHeaderBtn: {
    marginTop: 20,
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  tableFooterBtn: {
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'end',
    margin: '20px',
  },
  tableContainer: {
    padding: 10,
    borderRadius: 10,
    height: '60%',
    border: '1px solid #00000015',
  },
  footerBtnGroupConatiner: {
    marginTop: 20,
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  footerBtnGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}

export default InvoiceItemDetails
