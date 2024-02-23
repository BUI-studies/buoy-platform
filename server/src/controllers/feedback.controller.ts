import { Request, Response } from 'express'

import { FeedbackModel, MeetingsModel } from '@/model'
import { MongooseQueryOptions } from 'mongoose'
import { USER_ROLES } from '@/types'

const getFeedbackByMeetingId = async (meeting: string, studentId: string) => {
	return FeedbackModel.find({ _id: meeting, students: { $in: [studentId] } })
}

export const get = async (req: Request, res: Response) => {
	const { id, role } = req.query

	let result = null

	if (role === USER_ROLES.STUDENT) {
		result = await FeedbackModel.find({
			student: id,
		} as MongooseQueryOptions)
			.sort({ date: -1 })
			.populate({
				path: 'meeting',
				select: 'title date type',
				populate: { path: 'mentor', select: 'fullName' },
			})
	} else if (role === USER_ROLES.MENTOR) {
		result = await FeedbackModel.find({
			isMentorVisible: true,
			meeting: {
				$in: await MeetingsModel.find({ mentor: id }).distinct('_id'),
			},
		} as MongooseQueryOptions)
			.sort({ date: -1 })
			.populate({
				path: 'meeting',
				select: 'title date type',
			})
			.select('-student -isMentorVisible')
			.exec()
	} else {
		return res.status(400).send({ message: 'Invalid role' })
	}

	return res.send(result)
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
		insides,
		downsides,
		comment,
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
			insides,
			downsides,
			comment,
		})
		await newFeedback.save()
		res.status(200).send(newFeedback)
	} catch (error) {
		res.status(500).send(error)
	}
}
