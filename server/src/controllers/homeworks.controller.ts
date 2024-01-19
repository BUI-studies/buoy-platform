import { Request, Response } from 'express'

import { homeworksMapper } from '@/model'

import { SHEETS_TITLES } from '@/types'
import { Sheets } from '@/utils'

const getAllHomeworks = async () => {
	await Sheets.getDoc()
	Sheets.tables?.[SHEETS_TITLES.HOMEWORKS].loadCells()

	return Sheets.parseRows(
		Sheets.tables?.[SHEETS_TITLES.HOMEWORKS]._cells?.filter((r: any) => {
			return r[0]._row > 0
		}),
		homeworksMapper,
	)
}

export const get = async (req: Request, res: Response) => {
	const { fullname, role } = req.query
	const allHomeworks = await getAllHomeworks()

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
