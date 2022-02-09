/* eslint-disable react/prop-types */
import {
  CButton,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import React, { useRef } from 'react'

const ItemModal = ({
  isOpen,
  onClose,
  editItem,
  setItemNameError,
  setItemName,
  itemName,
  itemNameError,
  qty,
  qtyError,
  rate,
  rateError,
  setQtyError,
  setRate,
  setQty,
  setRateError,
  items,
  reset,
  setItems,
  setTotalAmount,
}) => {
  const toast = useRef(null)

  const isItemValid = () => {
    if (itemName?.length < 3 || !qty || !rate) {
      !rate && setRateError(true)
      !qty && setQtyError(true)
      itemName?.length < 3 && setItemNameError(true)
      return false
    }
    return true
  }

  const handleAddBtn = () => {
    if (!isItemValid()) return
    let customerItems = items
    if (!editItem?.itemNo)
      customerItems = [
        ...items,
        {
          itemName,
          qty,
          rate,
          totalAmount: `${Number(qty * rate).toFixed(2)}`,
          itemNo: customerItems?.length + 1,
        },
      ]
    else {
      let index = customerItems.findIndex((x) => x?.itemNo === editItem?.itemNo)
      customerItems.splice(index, 1, {
        itemName,
        qty,
        rate,
        totalAmount: `${Number(qty * rate).toFixed(2)}`,
        itemNo: editItem?.itemNo,
      })
    }
    let totalAmount = 0
    customerItems.forEach((ele, idx) => {
      totalAmount = `${(Number(idx === 0 ? 0 : totalAmount) + Number(ele?.totalAmount)).toFixed(2)}`
    })
    setTotalAmount(totalAmount)
    setItems(customerItems)
    toast.current.show({
      severity: 'success',
      summary: `Item ${editItem?.itemNo ? 'update' : 'cereated'} successfully`,
      life: 3000,
    })
    reset()
  }

  const handleCloseBtn = () => {
    if (!editItem?.itemNo) return reset()
    else {
      let customerItems = items
      let index = customerItems.findIndex((x) => x?.itemNo === editItem?.itemNo)
      customerItems.splice(index, 1)
      customerItems.forEach((ele, idx) => {
        let totalAmount = 0
        customerItems.forEach((ele, idx) => {
          totalAmount = `${(Number(idx === 0 ? 0 : totalAmount) + Number(ele?.totalAmount)).toFixed(
            2,
          )}`
        })
        setTotalAmount(totalAmount)
        return {
          ...ele,
          itemNo: idx + 1,
        }
      })
      setItems(customerItems)
      if (customerItems?.length < 1) setTotalAmount(0)
      reset()
    }
  }

  return (
    <CModal backdrop="static" alignment="center" visible={isOpen} onClose={onClose}>
      <Toast ref={toast} />
      <CModalHeader>
        <CModalTitle style={styles.dialogFormBody}>
          <span style={styles.formHeader}>{!editItem?.itemNo ? 'Add' : 'Edit'} item</span>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div style={styles.dialogFormBody}>
          <div style={styles.formInputBody}>
            <CFormLabel style={styles.formLabel}>Item Name</CFormLabel>
            <div className="field mb-3" style={styles.formInput}>
              <InputText
                required
                className="p-inputtext-sm block"
                size={60}
                placeholder="Enter customer name"
                value={itemName}
                onChange={(e) => {
                  let itemName = e.target.value.replace(/\d+|^\s+$/g, '')
                  if (itemName?.length < 3) setItemNameError(true)
                  else setItemNameError(false)
                  setItemName(itemName)
                }}
              />
              {itemNameError && (
                <small className="p-error block">
                  Item name should not be less than 3 letters.
                </small>
              )}
            </div>
          </div>
          <div style={styles.formInputBody}>
            <CFormLabel style={styles.formLabel}>Quantity</CFormLabel>
            <div className="field mb-3" style={styles.formInput}>
              <InputText
                mode="decimal"
                value={qty}
                className="p-inputtext-sm block"
                size={60}
                required
                placeholder="Enter quantity"
                onChange={(e) => {
                  let quantity = e.target.value.replace(/[^0-9]/g, '')
                  if (quantity <= 0) setQtyError(true)
                  else setQtyError(false)
                  setQty(quantity)
                }}
              />
              {qtyError && <small className="p-error block">Enter quantity of item.</small>}
            </div>
          </div>
          <div style={styles.formInputBody}>
            <CFormLabel style={styles.formLabel}>Rate</CFormLabel>
            <div className="field mb-3" style={styles.formInput}>
              <InputText
                value={rate}
                className="p-inputtext-sm block"
                size={60}
                required
                placeholder="Enter rate"
                onChange={(e) => {
                  let rate = e.target.value.replace(/[^0-9.]/g, '')
                  if (rate <= 0) setRateError(true)
                  else setRateError(false)
                  setRate(`${rate}`)
                }}
              />
              {rateError && <small className="p-error block">Enter rate of item.</small>}
            </div>
          </div>
        </div>
      </CModalBody>
      <CModalFooter style={styles.formFooter}>
        <CButton color="secondary" style={{ marginRight: 20 }} onClick={handleCloseBtn}>
          {!editItem?.itemNo ? 'Close' : 'Delete'}
        </CButton>
        <CButton color="primary" onClick={handleAddBtn}>
          {editItem?.itemNo ? 'Update Item' : 'Save Item'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

const styles = {
  dialogContainer: {
    width: '50%',
    height: '100%',
    position: 'relative',
  },
  dialogFormContainer: {
    height: 70,
    position: 'absolute',
    width: '50%',
    top: 0,
    alignItems: 'center',
    display: 'flex',
  },
  dialogFormBody: {
    display: 'flex',
    flexDirection: 'column',
  },
  formInputBody: {},
  formLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  formFooter: {
    width: '100%',
    justifyContent: 'end',
    display: 'flex',
    borderTop: '1px solid #00000020',
    paddingTop: 15,
  },
  formInput: {
    display: 'flex',
    flexDirection: 'column',
  },
  formHeader: {
    fontSize: 24,
    fontWeight: 'bolder',
  },
}
export default ItemModal
