import { Request, Response } from 'express'

const getAllPayments = async () => {
	return []
}

export const get = async (req: Request, res: Response) => {
	const { fullname } = req.query
	const allPayments = await getAllPayments()

	if (!fullname) {
		return res.send(allPayments)
	}

	const [name, surname] = (fullname as string)?.split(' ')

	const allPaymentsNamed = allPayments.filter(({ sender }) => sender === `${name}_${surname}`)

	res.send(allPaymentsNamed)
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
