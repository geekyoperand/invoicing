/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { CButton } from '@coreui/react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'

const Table = ({ value, field, filter, editItem, deleteItem }) => {
  const [filters, setFilters] = useState(filter)
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  console.log(filters)

  const onGlobalFilterChange = (e) => {
    const value = e.target.value
    let _filters = { ...filters }
    _filters['global'].value = value
    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    )
  }

  const header = renderHeader()

  return (
    <DataTable
      paginator
      responsiveLayout="scroll"
      reorderableColumns
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      rows={10}
      rowsPerPageOptions={[10, 20, 50]}
      removableSort
      dataKey="id"
      filterDisplay="row"
      filters={filters}
      header={header}
      emptyMessage="No items found."
      globalFilterFields={Object.keys(filter)}
      value={value}
    >
      {field.map((ele, idx) => {
        return (
          <Column
            key={idx}
            filter
            filterField={ele?.fieldName}
            filterPlaceholder={ele?.fieldPlaceholder}
            field={ele?.fieldName}
            header={ele?.fieldHeader}
            sortable
          />
        )
      })}
      <Column
        field="id"
        body={(ele) => (
          <div style={{ display: 'flex' }}>
            <CButton
              color="primary"
              role="button"
              style={{ marginRight: 20 }}
              onClick={() => editItem(ele)}
            >
              Edit
            </CButton>
            <CButton color="primary" role="button" onClick={() => deleteItem(ele)}>
              Delete
            </CButton>
          </div>
        )}
        header="Actions"
        sortable
      ></Column>
    </DataTable>
  )
}

export default Table
