import { Request, Response } from "express"

import { MeetingsModel, meetingsMapper } from "@/model"

import { SHEETS_TITLES } from "@/types"
import { Sheets } from "@/utils/Sheets"

const getAll = async (req: Request, res: Response) => {
  await Sheets.doc?.loadInfo()
  const allMeetings = Sheets.parseRows(
    Sheets.tables?.[SHEETS_TITLES.MEETINGS]._cells,
    meetingsMapper
  )

  res.send(allMeetings)
}

const getAllByStudent = async (req: Request, res: Response) => {
  const { fullname } = req.query
  const [name, surname] = (fullname as string)?.split(" ")
  await Sheets.doc?.loadInfo()

  console.log(`${name}_${surname}`)

  const allMeetings = Sheets.parseRows(
    Sheets.tables?.[SHEETS_TITLES.MEETINGS]._cells,
    meetingsMapper
  ).filter(({ students }) => students.includes(`${name}_${surname}`))

  res.send(allMeetings)
}

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
  getAllByStudent,
  save: saveMeeting,
  update: updateMeeting,
  delete: deleteMeeting,
}
