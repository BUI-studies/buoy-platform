import { ObjectId, Types } from 'mongoose'
import { Request, Response } from 'express'

import { MeetingsModel } from '@/model'

import { USER_ROLES } from '@/types'

export const get = async (req: Request, res: Response) => {
	const { id, role, limit } = req.query
	const mentorPopulation = { path: 'mentor', select: '_id fullName' }
	const studentsPopulation = { path: 'students', select: '_id fullName' }

	if (role === USER_ROLES.MENTOR) {
		return res.send(
			await MeetingsModel.find({ mentor: id })
				.sort({ date: -1 })
				.populate([studentsPopulation, mentorPopulation]),
		)
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

export const getByTitle = async (title: string, mentor: ObjectId) => {
	return MeetingsModel.find({ title, mentor })
}

export const save = async (req: Request, res: Response) => {
	const { date, title, type, students, mentor, report, comment } = req.body

	const meeting = await getByTitle(title, mentor)
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

export const update = async (req: Request, res: Response) => {
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

export const remove = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		await MeetingsModel.findByIdAndDelete(id)
		res.status(200).send({ message: 'Meeting deleted' })
	} catch (error) {
		res.status(500).send({ message: 'Server error' })
	}
}
