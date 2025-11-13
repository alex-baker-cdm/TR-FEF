import React, { useState, useCallback, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table'
import { DataGridProps, EditableRowState } from './types'
import styles from './DataGrid.module.css'

export function DataGrid<T extends Record<string, any>>({
  data,
  columns,
  isRowEditable = false,
  onRowClick,
  onRowDoubleClick,
  onHeaderClick,
  onDataChange,
}: DataGridProps<T>) {
  const [editableRow, setEditableRow] = useState<EditableRowState>({
    rowIndex: null,
    editedData: {},
  })

  const tableColumns = useMemo<ColumnDef<T>[]>(() => {
    return columns
      .filter((col) => col.visible !== false)
      .map((col) => ({
        id: col.id,
        header: col.header,
        accessorKey: col.field as string,
        cell: (info) => {
          const rowIndex = info.row.index
          const isEditing = isRowEditable && editableRow.rowIndex === rowIndex

          if (isEditing && col.field) {
            const fieldKey = col.field as string
            const value =
              editableRow.editedData[fieldKey] ?? info.getValue<any>()

            return (
              <input
                type="text"
                value={value ?? ''}
                onChange={(e) => handleCellEdit(fieldKey, e.target.value)}
                className={styles.editInput}
              />
            )
          }

          if (col.render) {
            return col.render(info.getValue<any>(), info.row.original)
          }

          return info.getValue<any>()
        },
        size: col.width ? parseInt(col.width) : undefined,
        enableSorting: col.sortable !== false,
      }))
  }, [columns, isRowEditable, editableRow])

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleCellEdit = useCallback((field: string, value: any) => {
    setEditableRow((prev) => ({
      ...prev,
      editedData: {
        ...prev.editedData,
        [field]: value,
      },
    }))
  }, [])

  const handleRowClick = useCallback(
    (row: T, index: number, event: React.MouseEvent) => {
      if (isRowEditable && editableRow.rowIndex !== index) {
        if (editableRow.rowIndex !== null) {
          commitRowChanges()
        }
        setEditableRow({
          rowIndex: index,
          editedData: { ...row },
        })
      }

      if (onRowClick) {
        onRowClick(row, index)
      }
    },
    [isRowEditable, editableRow.rowIndex, onRowClick]
  )

  const handleRowDoubleClick = useCallback(
    (row: T, index: number, event: React.MouseEvent) => {
      if (onRowDoubleClick) {
        onRowDoubleClick(row, index)
      }
    },
    [onRowDoubleClick]
  )

  const handleHeaderClick = useCallback(
    (columnDef: typeof columns[0]) => {
      if (onHeaderClick) {
        onHeaderClick(columnDef)
      }
    },
    [onHeaderClick]
  )

  const commitRowChanges = useCallback(() => {
    if (editableRow.rowIndex !== null && onDataChange) {
      const newData = [...data]
      newData[editableRow.rowIndex] = {
        ...newData[editableRow.rowIndex],
        ...editableRow.editedData,
      }
      onDataChange(newData)
    }
    setEditableRow({ rowIndex: null, editedData: {} })
  }, [editableRow, data, onDataChange])

  return (
    <div className={styles.dataGridContainer}>
      <table className={styles.dataGrid}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                const columnDef = columns[index]
                return (
                  <th
                    key={header.id}
                    style={{ width: columnDef?.width }}
                    onClick={() =>
                      columnDef && handleHeaderClick(columnDef)
                    }
                    className={styles.headerCell}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={(e) => handleRowClick(row.original, row.index, e)}
              onDoubleClick={(e) =>
                handleRowDoubleClick(row.original, row.index, e)
              }
              className={`${styles.dataRow} ${
                editableRow.rowIndex === row.index ? styles.editingRow : ''
              }`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles.dataCell}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className={styles.emptyState}>No data available</div>
      )}
    </div>
  )
}
