import mongoose from 'mongoose'

import { ObjectId } from 'mongodb'

const Schema = mongoose.Schema

export interface MeetingBase {
	id: ObjectId
	date: Date
	title: string
	type: string
	students: ObjectId[]
	mentor: ObjectId
	report: string
	comment: string
}

export interface Meeting extends mongoose.Document<MeetingBase> {}

export const MeetingsSchema = new Schema<MeetingBase>({
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
	students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	mentor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	report: {
		type: String,
	},
	comment: {
		type: String,
	},
})

export const MeetingsModel = mongoose.model<Meeting>('Meetings', MeetingsSchema)
