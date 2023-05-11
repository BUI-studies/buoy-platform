import mongoose from "mongoose"
const Schema = mongoose.Schema

export interface Meetings extends mongoose.Document {
  date: Date
}

export const MeetingsSchema = new Schema<Meetings>({
  date: {
    type: Date,
    required: true,
  },
})

export const MeetingsModel = mongoose.model<Meetings>(
  "Meetings",
  MeetingsSchema
)
