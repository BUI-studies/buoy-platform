import mongoose from "mongoose"
const Schema = mongoose.Schema

export interface UserDTO {
  _id: string
  fullName: string
  tel: string
  email: string
}

export interface UserJWTPayload {
  _id: string
  email: string
}

export interface User extends mongoose.Document {
  fullName: string
  tel: string
  email: string
  password: string
}

export const UsersSchema = new Schema<User>({
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

export const UsersModel = mongoose.model<User>("User", UsersSchema)
