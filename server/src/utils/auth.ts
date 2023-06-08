import jwt from "jsonwebtoken"
import { Request, Response } from "express"

import { User, UsersModel } from "../model/"
import { decode } from "./authHelpers"

const freeOfAuth: string[] = ["/api/users/login", "/api/users", "/public"]

export default async (req: Request, res: Response, next: Function) => {
  if (!freeOfAuth.some((url) => url === req.baseUrl)) {
    console.log(new Date().toTimeString(), "RERQUEST", req.method, req.baseUrl)
    if (!req.headers["authorization"]) {
      res.status(403)
      res.send({ message: "permission denied" })
      return
    }

    const token: string = req.headers["authorization"]
    const decoded = await decode(token)

    if (!decoded) {
      res.status(550)
      res.send({ message: "no such user" })
      return
    }

    const { email } = decoded as User
    const userFromDB = await UsersModel.findOne({
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
