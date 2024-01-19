import { useMutation } from '@tanstack/react-query'

import { _URL, fetcher, getHeaders } from '@/api'

export type Feedback = {
	_id: string
	meeting: string
	impression: string
	understanding: string
	mentoring: string
	selfFeeling: string
	teamwork: string
}

export const useFeedbackMutation = () =>
	useMutation({
		mutationFn: (data: Feedback & { student: string }) =>
			fetcher(_URL.feedback, {
				method: 'POST',
				headers: getHeaders(),
				body: JSON.stringify(data),
			}),
	})
