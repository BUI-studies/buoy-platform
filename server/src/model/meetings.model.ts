import mongoose from 'mongoose'

import { parseTimeStamp } from '@/helpers'
import { Sheets, TableCell } from '@/utils'
import { ObjectId } from 'mongodb'

const Schema = mongoose.Schema

export interface Meeting extends mongoose.Document {
	id: ObjectId
	date: Date
	title: string
	type: string
	students: ObjectId[]
	mentor: ObjectId
	report: string
	comment: string
}

export const meetingsMapper = (cellsArray: TableCell[]) => ({
	id: Sheets.getCellValueFromRawData(cellsArray[0]),
	timestamp: parseTimeStamp(Sheets.getCellValueFromRawData(cellsArray[1])),
	title: Sheets.getCellValueFromRawData(cellsArray[2]),
	type: Sheets.getCellValueFromRawData(cellsArray[3]),
	students: Sheets.getCellValueFromRawData(cellsArray[4])
		?.split(', ')
		?.filter((v: string) => !!v),
	mentor: Sheets.getCellValueFromRawData(cellsArray[5]),
	comment: Sheets.getCellValueFromRawData(cellsArray[6]),
	report: Sheets.getCellValueFromRawData(cellsArray[10]),
})

export const MeetingsSchema = new Schema<Meeting>({
	id: {
		type: ObjectId,
	},
	date: {
		type: Date,
		required: true,
	},
	title: {
		type: String,
	},
	type: {
		type: String,
	},
	students: {
		type: [ObjectId],
	},
	mentor: {
		type: ObjectId,
	},
	report: {
		type: String,
	},
	comment: {
		type: String,
	},
})

export const MeetingsModel = mongoose.model<Meeting>('Meetings', MeetingsSchema)
