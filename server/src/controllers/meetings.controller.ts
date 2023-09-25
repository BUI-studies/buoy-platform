import { Request, Response } from 'express'

import { MeetingsModel, meetingsMapper } from '@/model'

import { SHEETS_TITLES } from '@/types'
import { Sheets } from '@/utils'

const getAllMeetings = async () => {
	await Sheets.getDoc()
	Sheets.tables?.[SHEETS_TITLES.MEETINGS].loadCells()

	return Sheets.parseRows(Sheets.tables?.[SHEETS_TITLES.MEETINGS]._cells, meetingsMapper).filter(
		({ students }) => !!students,
	)
}

const getAll = async (req: Request, res: Response) => {
	const { fullname } = req.query
	const allMeetings = await getAllMeetings()

	if (!fullname) {
		return res.send(allMeetings)
	}

	const [name, surname] = (fullname as string)?.split(' ')

	const allMeetingsNamed = allMeetings.filter(
		({ students }) => students?.includes(`${name}_${surname}`),
	)

	res.send(allMeetingsNamed)
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
