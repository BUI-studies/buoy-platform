import bcrypt from 'bcrypt'
import { Request, Response } from 'express'

import { UsersModel } from '@/model'

import { getToken } from '@/utils'

export const get = async (req: Request, res: Response) => {
	const { fullname, mentor, role, status } = req.query

	const query: any = {}

	if (fullname) query.fullName = fullname
	if (mentor) query.mentor = mentor
	if (role) query.role = role
	if (status) query.status = status

	const allUsersDB = await UsersModel.find(query)

	res.status(200).send(allUsersDB)
}

export const save = async (req: Request, res: Response) => {
	if (!req.body) res.status(400).send({ message: 'Content can not be empty!' })

	const { fullName, tel, email, password } = req.body

	if (!fullName || !tel || !email || !password) {
		res.status(422)
		return res.send({
			message:
				'Invalid data. One of the required properties is missing: fullName, tel, email, password.',
		})
	}

	const hashedPassword = await bcrypt.hash(password, 10)
	const userFromDB = await UsersModel.findOne({
		email,
		password: hashedPassword,
	})

	if (!userFromDB) {
		const savedUser = await UsersModel.create({
			fullName,
			tel,
			email,
			password: hashedPassword,
		})

		res.send({
			token: getToken(savedUser),
			user: savedUser,
		})
	} else {
		res.status(409)
		res.send({
			message: 'User already exists',
		})
	}
}

export const update = async (req: Request, res: Response) => {
	res.send({})
}

export const remove = async (req: Request, res: Response) => {
	res.send({})
}
