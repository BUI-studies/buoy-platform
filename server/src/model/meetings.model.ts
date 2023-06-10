import mongoose from "mongoose"

import { parseTimeStamp } from "@/helprs"
import { Sheets, TableCell } from "@/utils/Sheets"

const Schema = mongoose.Schema

export interface Meeting extends mongoose.Document {
  date: Date
  id: string
  timestamp: number
  title: string
  type: string
  students: string[]
  mentor: string
  comment: string
  report: string
}

export const meetingsMapper = (cellsArray: TableCell[]) => ({
  id: Sheets.getCellValueFromRawData(cellsArray[0]),
  timestamp: parseTimeStamp(Sheets.getCellValueFromRawData(cellsArray[1])),
  title: Sheets.getCellValueFromRawData(cellsArray[2]),
  type: Sheets.getCellValueFromRawData(cellsArray[3]),
  students: Sheets.getCellValueFromRawData(cellsArray[4])
    ?.split(", ")
    ?.filter((v: string) => !!v),
  mentor: Sheets.getCellValueFromRawData(cellsArray[5]),
  comment: Sheets.getCellValueFromRawData(cellsArray[6]),
  report: Sheets.getCellValueFromRawData(cellsArray[9]),
})

export const MeetingsSchema = new Schema<Meeting>({
  date: {
    type: Date,
    required: true,
  },
})

export const MeetingsModel = mongoose.model<Meeting>("Meetings", MeetingsSchema)
