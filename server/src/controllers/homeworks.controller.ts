import { Request, Response } from 'express'
import { ObjectId, Types } from 'mongoose'
import { HomeworksModel } from '@/model'

import { USER_ROLES } from '@/types'
// import { Sheets } from '@/utils'

export const getAllHomeworks = async (req: Request, res: Response) => {
	const { id, role, limit } = req.query
	const mentorPopulation = { path: 'mentor', select: '_id fullName' }
	const studentsPopulation = { path: 'students', select: '_id fullName' }

	if (role === USER_ROLES.MENTOR) {
		return await HomeworksModel.find({ mentor: id }).populate(studentsPopulation)
	} else if (role === USER_ROLES.STUDENT) {
		const studentId = new Types.ObjectId(id as string)

		return await HomeworksModel.find({ students: { $in: [studentId] } })
			.sort({ date: -1 })
			.limit(Number(limit))
			.populate(mentorPopulation)
	} else {
		return res.status(400).send({ message: 'Bad request: no role specified' })
	}
}

export const get = async (req: Request, res: Response) => {
	const { fullname, role } = req.query
	const allHomeworks = await getAllHomeworks(req, res)

	if (!fullname) {
		return res.send(allHomeworks)
	}
	const [name, surname] = (fullname as string)?.split(' ')

	const allHomeworksNamed = allHomeworks.filter(({ sender, mentor }) =>
		role === 'mentor' ? mentor === fullname : sender === `${name}_${surname}`,
	)

	res.send(allHomeworksNamed)
}

export const save = async (req: Request, res: Response) => {
	res.send({})
}

export const update = async (req: Request, res: Response) => {
	res.send({})
}

export const remove = async (req: Request, res: Response) => {
	res.send({})
}
