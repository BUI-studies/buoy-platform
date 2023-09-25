import { Request, Response } from 'express'

import { payemntsMapper } from '@/model'

import { SHEETS_TITLES } from '@/types'
import { Sheets } from '@/utils'

const getAllPayments = async () => {
	await Sheets.getDoc()
	Sheets.tables?.[SHEETS_TITLES.PAYMENTS].loadCells()

	return Sheets.parseRows(Sheets.tables?.[SHEETS_TITLES.PAYMENTS]._cells, payemntsMapper)
}

const getAll = async (req: Request, res: Response) => {
	const { fullname } = req.query
	const allPayments = await getAllPayments()

	if (!fullname) {
		return res.send(allPayments)
	}

	const [name, surname] = (fullname as string)?.split(' ')

	const allPaymentsNamed = allPayments.filter(({ sender }) => sender === `${name}_${surname}`)

	res.send(allPaymentsNamed)
}

const saveMeeting = async (req: Request, res: Response) => {
	res.send({})
}

const updateMeeting = async (req: Request, res: Response) => {
	res.send({})
}

const deleteMeeting = async (req: Request, res: Response) => {
	res.send({})
}

export const PaymentsController = {
	get: getAll,
	save: saveMeeting,
	update: updateMeeting,
	delete: deleteMeeting,
}
