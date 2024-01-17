import { ObjectId, Types } from 'mongoose'
import { Request, Response } from 'express'

import { MeetingsModel, meetingsMapper } from '@/model'

import { SHEETS_TITLES, USER_ROLES } from '@/types'
import { Sheets } from '@/utils'

const getAllMeetings = async () => {
	await Sheets.getDoc()
	Sheets.tables?.[SHEETS_TITLES.MEETINGS].loadCells()

	return Sheets.parseRows(Sheets.tables?.[SHEETS_TITLES.MEETINGS]._cells, meetingsMapper).filter(
		({ students }) => !!students,
	)
}

// const getAll = async (req: Request, res: Response) => {
// 	const { fullname, role } = req.query
// 	const allMeetings = await getAllMeetings()
// 	if (!fullname) {
// 		return res.send(allMeetings)
// 	}

// 	const [name, surname] = (fullname as string)?.split(' ')

// 	const allMeetingsNamed = allMeetings.filter(({ students, mentor }) =>
// 		role === 'mentor' ? mentor === fullname : students?.includes(`${name}_${surname}`),
// 	)

// 	res.send(allMeetingsNamed)
// }

const getAll = async (req: Request, res: Response) => {
	const { id, role, limit } = req.query
	const mentorPopulation = { path: 'mentor', select: '_id fullName' }
	const studentsPopulation = { path: 'students', select: '_id fullName' }

	if (role === USER_ROLES.MENTOR) {
		return res.send(await MeetingsModel.find({ mentor: id }).populate(studentsPopulation))
	} else if (role === USER_ROLES.STUDENT) {
		const studentId = new Types.ObjectId(id as string)

		return res.send(
			await MeetingsModel.find({ students: { $in: [studentId] } })
				.sort({ date: -1 })
				.limit(Number(limit))
				.populate(mentorPopulation),
		)
	} else {
		return res.status(400).send({ message: 'Bad request: no role specified' })
	}
}

const getMeetingByTitle = async (title: string, mentor: ObjectId) => {
	return MeetingsModel.find({ title, mentor })
}

const saveMeeting = async (req: Request, res: Response) => {
	const { date, title, type, students, mentor, report, comment } = req.body

	const meeting = await getMeetingByTitle(title, mentor)
	if (meeting.length) {
		return res.status(409).send({ message: 'Meeting already exists' })
	}

	try {
		const newMeeting = new MeetingsModel({
			date,
			title,
			type,
			students,
			mentor,
			report,
			comment,
		})
		await newMeeting.save()
		res.status(200).send(newMeeting)
	} catch (error) {
		res.status(500).send({ message: 'Server error' })
	}
}

const updateMeeting = async (req: Request, res: Response) => {
	const { id } = req.params
	const { date, title, type, students, mentor, report, comment } = req.body

	try {
		const updatedMeeting = await MeetingsModel.findByIdAndUpdate(
			id,
			{ date, title, type, students, mentor, report, comment },
			{ new: true },
		)
		res.status(200).send(updatedMeeting)
	} catch (error) {
		res.status(500).send({ message: 'Server error' })
	}
}

const deleteMeeting = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		await MeetingsModel.findByIdAndDelete(id)
		res.status(200).send({ message: 'Meeting deleted' })
	} catch (error) {
		res.status(500).send({ message: 'Server error' })
	}
}

export const MeetingsController = {
	get: getAll,
	save: saveMeeting,
	update: updateMeeting,
	delete: deleteMeeting,
}
