import mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface Payment extends mongoose.Document {
	timestamp: number
	sender: string
	amount: number
	comment: string
}

export const PaymentsSchema = new Schema<Payment>({})

export const PaymentsModel = mongoose.model<Payment>('Payments', PaymentsSchema)
