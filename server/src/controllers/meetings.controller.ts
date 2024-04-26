import { Request, Response, NextFunction } from 'express'
import { ObjectId, Types } from 'mongoose'

import { MeetingsModel } from '@/model'

import { USER_ROLES } from '@/types'
import { count } from 'console'

export const get = async (req: Request, res: Response) => {
	try {
		const { id, role, limit, page } = req.query
		const mentorPopulation = { path: 'mentor', select: '_id fullName' }
		const studentsPopulation = { path: 'students', select: '_id fullName' }

		if (role === USER_ROLES.MENTOR) {
			const count = await MeetingsModel.countDocuments({ mentor: id })
			const data = await MeetingsModel.find({ mentor: id })
				.limit(Number(limit))
				.skip(Number(limit) * (Number(page) - 1))
				.sort({ date: -1 })
				.populate([studentsPopulation, mentorPopulation])
			return res.send({
				count,
				limit,
				totalPages: Math.ceil(count / Number(limit)),
				page,
				data,
			})
		} else if (role === USER_ROLES.STUDENT) {
			const studentId = new Types.ObjectId(id as string)
			const count = await MeetingsModel.countDocuments({ students: { $in: [studentId] } })
			const data = await MeetingsModel.find({ students: { $in: [studentId] } })
				.limit(Number(limit))
				.skip(Number(limit) * (Number(page) - 1))
				.sort({ date: -1 })
				.populate(mentorPopulation)

			return res.send({
				count,
				limit,
				totalPages: Math.ceil(count / Number(limit)),
				page,
				data,
			})
		} else {
			return res.status(400).send({ message: 'Bad request: unknown role specified ' + role })
		}
	} catch (error) {
		res.status(500).send({
			message: 'Server error',
			error,
		})
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
