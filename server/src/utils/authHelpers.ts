import jwt from "jsonwebtoken"

import { User } from "../model/user.model.js"

export const getToken = (userFromDB: User) => {
  if (!process.env.SECRET_KEY) return null
  const payload = {
    _id: userFromDB._id,
    email: userFromDB.email,
  }
  let token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "2 days",
    // expiresIn: 60
  })
  return token
}

export const decode = (auth: string) => {
  if (!process.env.SECRET_KEY) return null
  return jwt.verify(auth, process.env.SECRET_KEY)
}

const authHelpers = {
  decode,
  getToken,
}

export default authHelpers
