export type Mentor = {
	_id: string
	fullName: string
}

export type Student = {
	_id: string
	fullName: string
	mentor: Mentor | Mentor[] | string
	status: string
}

export enum MeetingTypes {
	INDIVIDUAL = 'individual',
	PLANING = 'planing',
	SYNC = 'sync',
}

export type Meeting = {
	_id: string
	timestamp: number
	date: Date
	title: string
	type: MeetingTypes
	students: string[] | Student[]
	mentor: Mentor | string
	comment: string
	report: string
}
