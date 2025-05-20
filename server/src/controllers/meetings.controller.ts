import { Request, Response, NextFunction, query } from 'express'
import { ObjectId, PopulateOptions, SortOrder, Types } from 'mongoose'

import { USER_ROLES } from '@/types'
import { MeetingsModel } from '@/model'
import { getPaginated } from '@/utils/getPaginated'

export const get = async (req: Request, res: Response) => {
	try {
		const { id, role, limit, page } = req.query
		const mentorPopulation = { path: 'mentor', select: '_id fullName' }
		const studentsPopulation = { path: 'students', select: '_id fullName' }
		const paginationProps = {
			Model: MeetingsModel,
			config: {
				limit: Number(limit),
				page: Number(page),
				sort: { date: -1 as SortOrder },
				query: {},
				populate: [] as PopulateOptions[],
			},
		}

		if (role === USER_ROLES.MENTOR) {
			paginationProps.config.query = { mentor: id }
			paginationProps.config.populate = [studentsPopulation, mentorPopulation]
		} else if (role === USER_ROLES.STUDENT) {
			paginationProps.config.query = { students: { $in: [id] } }
			paginationProps.config.populate = [mentorPopulation]
		} else {
			return res.status(400).send({ message: 'Bad request: unknown role specified ' + role })
		}

		const paginatedResult = await getPaginated(paginationProps)

		return paginatedResult
			? res.status(200).send(paginatedResult)
			: res.status(404).send({ message: 'Meetings not found' })
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
