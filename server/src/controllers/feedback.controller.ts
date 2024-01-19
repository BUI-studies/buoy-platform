import { Request, Response } from 'express'

import { FeedbackModel } from '@/model'

const getFeedbackByMeetingId = async (meeting: string, studentId: string) => {
	return FeedbackModel.find({ _id: meeting, students: { $in: [studentId] } })
}

export const save = async (req: Request, res: Response) => {
	const { meeting, impression, understanding, mentoring, selfFeeling, teamwork, student } = req.body

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
		})
		await newFeedback.save()
		res.status(200).send(newFeedback)
	} catch (error) {
		res.status(500).send(error)
	}
}
