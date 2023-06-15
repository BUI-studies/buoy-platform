import mongoose from "mongoose"

import { Sheets, TableCell } from "@/utils"
import { parseTimeStamp } from "@/helpers"

const Schema = mongoose.Schema

export interface Homerwok extends mongoose.Document {
  timestamp: number
  sender: string
  homeworkName: number
  github: string
  isReviewed: string
  mentorsComment: string
  studentsComment: string
}

export const homeworksMapper = (cellsArray: TableCell[]) => ({
  timestamp: parseTimeStamp(Sheets.getCellValueFromRawData(cellsArray[0])),
  sender: Sheets.getCellValueFromRawData(cellsArray[1]),
  homeworkName: Sheets.getCellValueFromRawData(cellsArray[2]),
  github: Sheets.getCellValueFromRawData(cellsArray[3]),
  isReviewed: cellsArray[4]
    ? Sheets.getCellValueFromRawData(cellsArray[4])
    : null,
  mentorsComment: cellsArray[5]
    ? Sheets.getCellValueFromRawData(cellsArray[5])
    : null,
  studentsComment: cellsArray[6]
    ? Sheets.getCellValueFromRawData(cellsArray[6])
    : null,
})

export const HomerwoksSchema = new Schema<Homerwok>({})

export const HomeworksModel = mongoose.model<Homerwok>(
  "Homerwoks",
  HomerwoksSchema
)
