import { useMutation } from '@tanstack/react-query'

import { _URL, fetcher, getHeaders } from '@/api'

export type Homework = {
	_id: string
	homeworkName: string
	linkCode: string
	comment: string
}

export const useHomeworkStudentMutation = () =>
	useMutation({
		mutationFn: (data: Homework & { student: string }) =>
			fetcher(_URL.homeworks, {
				method: 'POST',
				headers: getHeaders(),
				body: JSON.stringify(data),
			}),
	})
