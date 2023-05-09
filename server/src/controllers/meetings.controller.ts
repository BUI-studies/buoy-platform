import { Request, Response } from "express"

// import MeetingsModel from "../model/meetings.model.ts"

const getAll = async (req: Request, res: Response) => []

const saveMeeting = async (req: Request, res: Response) => ({})

const updateMeeting = async (req: Request, res: Response) => ({})

const deleteMeeting = async (req: Request, res: Response) => ({})

const MeetingsController = {
  getAll,
  save: saveMeeting,
  update: updateMeeting,
  delete: deleteMeeting,
}
export default MeetingsController
