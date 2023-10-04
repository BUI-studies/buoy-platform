import mongoose from 'mongoose'

import { Sheets, TableCell } from '@/utils'
import { parseTimeStamp } from '@/helpers'

const Schema = mongoose.Schema

export interface Payment extends mongoose.Document {
	timestamp: number
	sender: string
	amount: number
	comment: string
}

export const payemntsMapper = (cellsArray: TableCell[]) => ({
	timestamp: parseTimeStamp(Sheets.getCellValueFromRawData(cellsArray[0])),
	amount: Sheets.getCellValueFromRawData(cellsArray[1]),
	sender: Sheets.getCellValueFromRawData(cellsArray[2]),
	comment: Sheets.getCellValueFromRawData(cellsArray[3]),
})

export const PaymentsSchema = new Schema<Payment>({})

export const PaymentsModel = mongoose.model<Payment>('Payments', PaymentsSchema)
