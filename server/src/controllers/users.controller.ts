import bcrypt from "bcrypt"
import { Request, Response } from "express"

import { UsersModel, payemntsMapper } from "@/model"

import { SHEETS_TITLES } from "@/types"
import { Sheets, getToken } from "@/utils"

const getAll = async (req: Request, res: Response) => {
  const { fullname } = req.query
  await Sheets.getDoc()
  Sheets.tables?.[SHEETS_TITLES.USERS].loadCells()

  const allPayments = Sheets.parseRows(
    Sheets.tables?.[SHEETS_TITLES.USERS]._cells,
    payemntsMapper
  )

  if (!fullname) {
    return res.send(allPayments)
  }

  const [name, surname] = (fullname as string)?.split(" ")

  const allPaymentsNamed = allPayments.filter(
    ({ sender }) => sender === `${name}_${surname}`
  )

  res.send(allPaymentsNamed)
}

const save = async (req: Request, res: Response) => {
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" })

  const { fullName, tel, email, password } = req.body

  if (!fullName || !tel || !email || !password) {
    res.status(422)
    return res.send({
      message:
        "Invalid data. One of the required properties is missing: fullName, tel, email, password.",
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const userFromDB = await UsersModel.findOne({
    email,
    password: hashedPassword,
  })

  if (!userFromDB) {
    const savedUser = await UsersModel.create({
      fullName,
      tel,
      email,
      password: hashedPassword,
    })

    res.send({
      token: getToken(savedUser),
      user: savedUser,
    })
  } else {
    res.status(409)
    res.send({
      message: "User already exists",
    })
  }
}

const update = async (req: Request, res: Response) => {
  res.send({})
}

const remove = async (req: Request, res: Response) => {
  res.send({})
}

export const UsersController = {
  get: getAll,
  save,
  update,
  delete: remove,
}
