import mongoose from "mongoose"
const Schema = mongoose.Schema

export interface User extends mongoose.Document {
  fullName: string
  tel: string
  email: string
  password: string
}

export const UserSchema = new Schema<User>({
  fullName: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

export const UserModel = mongoose.model<User>("User", UserSchema)
