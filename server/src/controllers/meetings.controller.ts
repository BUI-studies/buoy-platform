import { Request, Response } from "express"

import { MeetingsModel } from "../model"

const getAll = async (req: Request, res: Response) => res.send([])

const saveMeeting = async (req: Request, res: Response) => {
  res.send({})
}

const updateMeeting = async (req: Request, res: Response) => {
  res.send({})
}

const deleteMeeting = async (req: Request, res: Response) => {
  res.send({})
}

export const MeetingsController = {
  getAll,
  save: saveMeeting,
  update: updateMeeting,
  delete: deleteMeeting,
}
