import { Request, Response } from 'express'

import { payemntsMapper } from '@/model'

import { SHEETS_TITLES } from '@/types'
import { Sheets } from '@/utils'

const getAllPayments = async () => {
	await Sheets.getDoc()
	Sheets.tables?.[SHEETS_TITLES.PAYMENTS].loadCells()

	return Sheets.parseRows(Sheets.tables?.[SHEETS_TITLES.PAYMENTS]._cells, payemntsMapper)
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
