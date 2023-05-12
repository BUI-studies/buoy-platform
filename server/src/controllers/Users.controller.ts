import bcrypt from "bcrypt"
import { Request, Response } from "express"

import { User, UsersModel } from "../model"
import { decode, getToken } from "../utils/authHelpers"

const getAll = async (req: Request, res: Response) => res.send([])

const saveUser = async (req: Request, res: Response) => {
  res.send({})
}

const updateUser = async (req: Request, res: Response) => {
  res.send({})
}

const deleteUser = async (req: Request, res: Response) => {
  res.send({})
}

const login = async (req: Request, res: Response) => {
  if (!req.body || !req.body.email || !req.body.password) {
    res.status(403)
    res.send({ message: "invalid data" })
    return
  }

  const userFromDB: User | null = await UsersModel.findOne({
    email: req.body.email,
  })

  if (!userFromDB || !userFromDB.password || !userFromDB.email) {
    res.status(404)
    res.send({ message: "no such user" })
    return
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    userFromDB.password
  )

  if (!isValidPassword) {
    res.status(203)
    res.send({ message: "invalid password" })
    return
  }

  res.send({
    token: getToken(userFromDB),
    data: userFromDB,
  })
}

export const UsersController = {
  getAll,
  save: saveUser,
  update: updateUser,
  delete: deleteUser,
  login,
}
