import jwt from "jsonwebtoken"

import { UserDTO } from "../model/user.model.js"

export const getToken = (userFromDB: UserDTO) => {
  if (!process.env.SECRET_KEY) return null
  const payload = {
    _id: userFromDB._id,
    email: userFromDB.email,
  }
  let token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  })
  return token
}

export const decode = (auth: string) => {
  if (!process.env.SECRET_KEY) return null
  try {
    return jwt.verify(auth, process.env.SECRET_KEY)
  } catch (error) {
    console.error(error)
    return null
  }
}

const authHelpers = {
  decode,
  getToken,
}

export default authHelpers
