import { REQUEST_STATUS } from '@/types'

export type Homework = {
	date: string
	timestamp: number
	sender: string
	homeworkName: number
	github: string
	isReviewed: string
	mentorsComment: string
	reviewLink: string
	studentsComment: string
}

export type HomeworksState = {
	data: Homework[] | null
	status: REQUEST_STATUS
}

export interface HomeworksContextType {
	homeworks: HomeworksState
	setHomeworks: (value: HomeworksState) => void
}
