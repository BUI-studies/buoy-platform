import { ReactNode } from 'react'

export type MeetingTableItem = {
	id: string
	date: string
	title: string | ReactNode
	type: string
	mentor?: string
	students?: string
	report: ReactNode
}
