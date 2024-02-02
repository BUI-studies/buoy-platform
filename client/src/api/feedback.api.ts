import { useQuery, useMutation } from '@tanstack/react-query'

import { _URL, fetcher, getHeaders } from '@/api'
import { useAuth } from '@/context'

export type Feedback = {
	_id: string
	meeting: string
	impression: string
	understanding: string
	mentoring: string
	selfFeeling: string
	teamwork: string
}

export const useFeedbacks = (limit?: number) => {
	const auth = useAuth()

	const params = new URLSearchParams([
		['id', auth.user?.data?.data?._id || ''],
		['role', auth.user?.data?.data?.role || ''],
	])

	if (limit) params.append('limit', limit.toString())

	return useQuery({
		queryKey: [_URL.meetings, params],
		queryFn: () => fetcher(`${_URL.feedback}?${params}`),
	})
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
