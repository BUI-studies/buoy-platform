import { ROLES } from '@/types'

export type FeedbacksTableItem = {
	id: string
	meeting: string
	impression: number
	understanding: number
	mentoring: number
	selfFeeling: number
	teamwork: number
	student: string
	isMentorVisible: boolean
	insides: string
	downsides: string
	comment: string
}

export const HEADERS = Object.freeze({
	[ROLES.MENTOR]: [
		{ title: 'date', grow: 1 },
		{ title: 'type', grow: 1 },
		{ title: 'title', grow: 1 },
		{ title: 'impression', grow: 1 },
		{ title: 'understanding', grow: 1 },
		{ title: 'mentoring', grow: 1 },
		{ title: 'teamwork', grow: 1 },
		{ title: 'insides', grow: 1 },
		{ title: 'downsides', grow: 1 },
		{ title: 'comment', grow: 1 },
	],
	[ROLES.STUDENT]: [
		{ title: 'date', grow: 2 },
		{ title: 'type', grow: 1 },
		{ title: 'title', grow: 2 },
		{ title: 'comment', grow: 5 },
		{ title: 'mentor', grow: 2 },
	],
})
