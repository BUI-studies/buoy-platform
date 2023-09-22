import { _URL } from '@/routes'
import { ROLES } from '@/types'

type NavLink = {
	mentor: { url: string; name: string }[]
	student: { url: string; name: string }[]
}

export const navLinkList: NavLink = {
	[ROLES.MENTOR]: [
		{ url: _URL.MEETINGS, name: 'зустрічі' },
		{ url: _URL.FEEDBACK, name: 'відгуки' },
		{ url: _URL.HOMEWORKS, name: 'домашки' },
		{ url: _URL.REPORT, name: 'репорт' },
	],
	[ROLES.STUDENT]: [
		{ url: _URL.MEETINGS, name: 'зустрічі' },
		{ url: _URL.FORM_FEEDBACK, name: 'відгук по зустрічі' },
		{ url: _URL.FORM_SENKAN, name: 'сєнкан' },
		{ url: _URL.HOMEWORKS, name: 'домашки' },
		{ url: _URL.PAYMENTS, name: 'оплати' },
	],
}
