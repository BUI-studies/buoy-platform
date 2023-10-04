import bcrypt from 'bcrypt'
import { verify } from 'jsonwebtoken'
import { Request, Response } from 'express'

import { User, UserJWTPayload, UsersModel } from '../model'
import { getToken } from '../utils'

const login = async (req: Request, res: Response) => {
	if (!req.body || !req.body.email || !req.body.password) {
		res.status(403)
		res.send({ message: 'invalid data' })
		return
	}

	const userFromDB: User | null = await UsersModel.findOne({
		email: req.body.email,
	})

	if (!userFromDB || !userFromDB.password || !userFromDB.email) {
		res.status(404)
		res.send({ message: 'no such user' })
		return
	}

	const isValidPassword = await bcrypt.compare(req.body.password, userFromDB.password)

	if (!isValidPassword) {
		res.status(203)
		res.send({ message: 'invalid password' })
		return
	}

	const userDTO = {
		_id: userFromDB._id,
		email: userFromDB.email,
		fullName: userFromDB.fullName,
		tel: userFromDB.tel,
		role: userFromDB.role,
		status: userFromDB.status,
	}

	res.send({
		token: getToken(userDTO),
		data: userDTO,
	})
}

const verifyToken = async (req: Request, res: Response) => {
	if (!req.query.token) {
		res.status(403)
		res.send({ message: 'no token' })
	}

	const token = req.query.token as string

	try {
		const verified = verify(token, process.env.SECRET_KEY || '') as UserJWTPayload

		const userFromDB: User | null = await UsersModel.findOne({
			_id: verified?._id,
			email: verified?.email,
		})

		if (!userFromDB) {
			res.status(404)
			res.send({ message: 'no such user' })
			return
		}

		res.send({
			message: 'token verified',
			data: {
				_id: userFromDB._id,
				email: userFromDB.email,
				fullName: userFromDB.fullName,
				tel: userFromDB.tel,
				role: userFromDB.role,
				status: userFromDB.status,
			},
		})
	} catch (error) {
		res.status(403)
		res.send({ message: 'invalid token', error })
	}
}

export const AuthController = {
	login,
	verifyToken,
}
