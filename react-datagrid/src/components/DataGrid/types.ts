import { ReactNode } from 'react'

export interface ColumnDefinition<T = any> {
  id: string
  header: string
  field?: keyof T
  width?: string
  visible?: boolean
  sortable?: boolean
  render?: (value: any, row: T) => ReactNode
}

export interface DataGridProps<T = any> {
  data: T[]
  columns: ColumnDefinition<T>[]
  isRowEditable?: boolean
  onRowClick?: (row: T, index: number) => void
  onRowDoubleClick?: (row: T, index: number) => void
  onHeaderClick?: (column: ColumnDefinition<T>) => void
  onDataChange?: (data: T[]) => void
}

export interface EditableRowState {
  rowIndex: number | null
  editedData: Record<string, any>
}
