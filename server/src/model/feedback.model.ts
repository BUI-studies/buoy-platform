import { save } from './../controllers/users.controller'
import mongoose, { ObjectId } from 'mongoose'

const Schema = mongoose.Schema

export interface Feedback extends mongoose.Document {
	meeting: ObjectId
	impression: string
	understanding: string
	mentoring: string
	selfFeeling: string
	teamwork: string
	student: ObjectId
	isMentorVisible?: boolean
}

export const FeedbackSchema = new Schema<Feedback>({
	meeting: { type: Schema.Types.ObjectId, ref: 'Meetings', required: true },
	impression: { type: String, required: true },
	understanding: { type: String, required: true },
	mentoring: { type: String, required: true },
	selfFeeling: { type: String, required: true },
	teamwork: { type: String, required: true },
	student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	isMentorVisible: { type: Boolean, default: false },
})

export const FeedbackModel = mongoose.model<Feedback>('Feedback', FeedbackSchema)
