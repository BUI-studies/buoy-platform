import { Request, Response } from "express"

import { homeworksMapper } from "@/model"

import { SHEETS_TITLES } from "@/types"
import { Sheets } from "@/utils"

const getAllHomeworks = async () => {
  await Sheets.doc?.loadInfo()

  return Sheets.parseRows(
    Sheets.tables?.[SHEETS_TITLES.HOMEWORKS]._cells?.filter((r: any) => {
      return r[0]._row > 0
    }),
    homeworksMapper
  )
}

const getAll = async (req: Request, res: Response) => {
  const { fullname } = req.query
  const allHomeworks = await getAllHomeworks()

  if (!fullname) {
    return res.send(allHomeworks)
  }

  const [name, surname] = (fullname as string)?.split(" ")

  await Sheets.doc?.loadInfo()

  const allHomeworksNamed = allHomeworks.filter(
    ({ sender }) => sender === `${name}_${surname}`
  )

  res.send(allHomeworksNamed)
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

export const HomeworksController = {
  get: getAll,
  save: saveMeeting,
  update: updateMeeting,
  delete: deleteMeeting,
}
