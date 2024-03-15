import mongoose from 'mongoose'

import { ObjectId } from 'mongodb'

const Schema = mongoose.Schema

export interface Homework extends mongoose.Document {
	timestamp: number
	sender: string
	homeworkName: number
	github: string
	isReviewed: string
	mentorsComment: string
	studentsComment: string
}

export const HomeworksSchema = new Schema<Homework>({
	id: {
		type: ObjectId,
	},
	timestamp: {
		type: Number,
	},
	sender: { type: String },
	homeworkName: { type: Number, required: true },
	github: { type: String, required: true },
	isReviewed: { type: String },
	mentorsComment: { type: String },
	studentsComment: { type: String },
})

export const HomeworksModel = mongoose.model<Homework>('Homeworks', HomeworksSchema)
