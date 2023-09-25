import { Request, Response } from 'express'

import { User, UsersModel } from '@/model'
import { decode } from '@/utils'

const freeOfAuth: string[] = ['/api/users/login', '/api/users', '/public']

export const auth = async (req: Request, res: Response, next: Function) => {
	if (!freeOfAuth.some(url => url === req.baseUrl)) {
		if (!req.headers['authorization']) {
			res.status(403)
			res.send({ message: 'permission denied' })
			return
		}

		const token: string = req.headers['authorization']
		try {
			const decoded = await decode(token)

			if (!decoded) {
				res.status(550)
				res.send({ message: "couldn't decode token" })
				return
			}

			const { email } = decoded as User
			const userFromDB = await UsersModel.findOne({
				email,
			})

			if (!userFromDB) {
				res.status(403)
				res.send({ message: 'permission denied' })
			}
		} catch (error) {
			console.error(error)
			res.status(400)
			res.send({ message: 'invalid data' })
			return
		}

		next()
	} else {
		next()
	}
}
