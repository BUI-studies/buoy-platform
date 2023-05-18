import { Request, Response } from "express"

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

export const UsersController = {
  getAll,
  save: saveUser,
  update: updateUser,
  delete: deleteUser,
}
