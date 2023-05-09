import jwt from "jsonwebtoken"
import config from "../config.js"

export const getToken = (userFromDB) => {
  const payload = {
    _id: userFromDB._id,
    name: userFromDB.name,
    email: userFromDB.email,
  }
  let token = jwt.sign(payload, config.SECRET_KEY, {
    expiresIn: "2 days",
    // expiresIn: 60
  })
  return token
}

export const decode = (auth) => {
  return jwt.verify(auth, config.SECRET_KEY)
}

const authHelpers = {
  decode,
  getToken,
}

export default authHelpers
