export type DataTableHeader = string[]

export type DataTableItem = {
  title: string
  value: string
}

export type DataTableRowProps<T> = {
  [K in keyof T]: T[K]
}

export interface DataTableProps<T> {
  header: DataTableHeader
  data: DataTableRowProps<T>[]
}
