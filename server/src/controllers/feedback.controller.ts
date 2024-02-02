import { Request, Response } from 'express'

import { FeedbackModel } from '@/model'
import { MongooseQueryOptions } from 'mongoose'

const getFeedbackByMeetingId = async (meeting: string, studentId: string) => {
	return FeedbackModel.find({ _id: meeting, students: { $in: [studentId] } })
}

export const get = async (req: Request, res: Response) => {
	const { id, role, limit } = req.query
	//if role is mentor get all feedbacks that has the id in meeting.mentor
	//if role is student get all feedbacks that has the id in students
	const query = []
	if (role === 'mentor') {
		query.push(['meeting.mentor', id])
		throw new Error('Not implemented yet')
	} else {
		query.push(['student', id])
	}

	if (limit) {
		query.push(['limit', limit])
	}

	res.send(
		await FeedbackModel.find(Object.fromEntries(query) as MongooseQueryOptions).populate({
			path: 'meeting',
			select: 'title',
		}),
	)
}

export const save = async (req: Request, res: Response) => {
	const {
		meeting,
		impression,
		understanding,
		mentoring,
		selfFeeling,
		teamwork,
		student,
		isMentorVisible = false,
	} = req.body

	const feedback = await getFeedbackByMeetingId(meeting, student)
	if (feedback.length) {
		return res.status(409).send({ message: 'Feedback already exists' })
	}

	try {
		const newFeedback = new FeedbackModel({
			meeting,
			impression,
			understanding,
			mentoring,
			selfFeeling,
			teamwork,
			student,
			isMentorVisible,
		})
		await newFeedback.save()
		res.status(200).send(newFeedback)
	} catch (error) {
		res.status(500).send(error)
	}
}
