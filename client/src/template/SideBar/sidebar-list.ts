import { _URL } from '@/routes'
import { ROLES } from '@/types'

export type SideBarLink = { url: string; name: string }

type LinksMap = {
	mentor: SideBarLink[]
	student: SideBarLink[]
}

export const navLinkList: LinksMap = {
	[ROLES.MENTOR]: [
		{ url: _URL.REPORT, name: 'репорт' },
		{ url: _URL.MEETINGS, name: 'зустрічі' },
		{ url: _URL.HOMEWORKS, name: 'домашки' },
	],
	[ROLES.STUDENT]: [
		{ url: _URL.MEETINGS, name: 'зустрічі' },
		{ url: _URL.FORM_FEEDBACK, name: 'відгук по зустрічі' },
		{ url: _URL.HOMEWORKS, name: 'домашки' },
	],
}
