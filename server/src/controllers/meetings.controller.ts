import { Request, Response } from "express"

import { MeetingsModel, meetingsMapper } from "@/model"

import { SHEETS_TITLES } from "@/types"
import { Sheets } from "@/utils/Sheets"

const getAllMeetings = async () => {
  await Sheets.doc?.loadInfo()
  return Sheets.parseRows(
    Sheets.tables?.[SHEETS_TITLES.MEETINGS]._cells,
    meetingsMapper
  ).filter(({ students }) => !!students)
}

const getAll = async (req: Request, res: Response) => {
  const { fullname } = req.query
  if (!fullname) {
    const respData = await getAllMeetings()
    return res.send(respData)
  }

  const [name, surname] = (fullname as string)?.split(" ")

  await Sheets.doc?.loadInfo()

  const allMeetings = Sheets.parseRows(
    Sheets.tables?.[SHEETS_TITLES.MEETINGS]._cells,
    meetingsMapper
  ).filter(({ students }) => students?.includes(`${name}_${surname}`))

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
  get: getAll,
  save: saveMeeting,
  update: updateMeeting,
  delete: deleteMeeting,
}
