import jwt, {
  VerifyCallback,
  JsonWebTokenError,
  JwtPayload,
} from "jsonwebtoken"
import { Request, Response } from "express"

import { User, UserModel } from "../model/"

const freeOfAuth: string[] = ["/api/users/login", "/api/users", "/public"]

const theKey: string = process.env.SECRET_KEY || "secret"

export default async (req: Request, res: Response, next: Function) => {
  if (!freeOfAuth.some((url) => url === req.baseUrl)) {
    if (!req.headers["authorization"]) {
      res.status(403)
      res.send({ message: "permission denied" })
      return
    }

    const token: string = req.headers["authorization"]
    const decoded = await jwt.verify(token, theKey)

    if (!decoded) {
      res.status(550)
      res.send({ message: "no such user" })
      return
    }

    const { email } = decoded as User
    const userFromDB = await UserModel.findOne({
      email,
    })

    if (!userFromDB) {
      res.status(403)
      res.send({ message: "permission denied" })
    }

    next()
  } else {
    next()
  }
}
