import { Populated } from '@/types'
import { GoogleSpreadsheetWorksheet } from 'google-spreadsheet'

export type Tables = {
	[title: string]: GoogleSpreadsheetWorksheet & Populated
}

export type TableCell = {
	_column: number
	_row: number
	_rawData: Populated & {
		userEnteredValue?: Populated
		effectiveValue: Populated
		formattedValue?: Populated
	}
}

export type Range = {
	offset: number
	limit: number
}

export type SheetNode = {
	name: string
	value: any
	units: string
	children?: SheetNode[]
}
