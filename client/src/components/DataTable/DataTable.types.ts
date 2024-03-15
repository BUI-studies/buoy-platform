import { ReactNode } from 'react'

export type DataTableHeader = Array<{ title: string; grow: number }>

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
	noDataMessage?: string | ReactNode
	rowClick?: (id: string, e: React.MouseEvent) => void
}
