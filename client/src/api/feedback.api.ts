import { useQuery, useMutation } from '@tanstack/react-query'

import { MeetingDTO, _URL, fetcher, getHeaders } from '@/api'
import { useAuth } from '@/context'

export type Feedback = {
	_id: string
	date: Date
	meeting: MeetingDTO
	impression: string
	understanding: string
	mentoring: string
	selfFeeling: string
	teamwork: string
	insides: string
	downsides: string
	comment: string
}

export const useFeedbacks = (limit?: number) => {
	const auth = useAuth()

	const params = new URLSearchParams([
		['id', auth.user?.data?.data?._id || ''],
		['role', auth.user?.data?.data?.role || ''],
	])

	if (limit) params.append('limit', limit.toString())

	return useQuery({
		queryKey: [_URL.feedbacks, params],
		queryFn: () => fetcher(`${_URL.feedbacks}?${params}`),
	})
}

export const useFeedbackMutation = () =>
	useMutation({
		mutationFn: (data: Feedback & { student: string }) =>
			fetcher(_URL.feedbacks, {
				method: 'POST',
				headers: getHeaders(),
				body: JSON.stringify(data),
			}),
	})
