import { useQuery, useMutation } from '@tanstack/react-query'

import { MeetingTypes, _URL, fetcher, getHeaders } from '@/api'
import { useAuth } from '@/context'
import { ROLES } from '@/types'

export interface FeedbackBase {
	_id: string
	date: Date
	impression: string
	understanding: string
	mentoring: string
	selfFeeling: string
	teamwork: string
	student: string
	insides: string
	downsides: string
	comment: string
}

export interface FeedbackStudent extends FeedbackBase {
	meeting: {
		_id: string
		title: string
		type: MeetingTypes
		date: string
		mentor: {
			fullName: string
		}
	}
	isMentorVisible: boolean
}

export interface FeedbackMentor extends FeedbackBase {
	meeting: {
		_id: string
		title: string
		type: MeetingTypes
		date: string
	}
}

export type FeedbackByRole<Role extends ROLES> = Role extends ROLES.STUDENT
	? FeedbackStudent
	: Role extends ROLES.MENTOR
	? FeedbackMentor
	: FeedbackBase

export const useFeedbacks = (role: ROLES, limit?: number) => {
	const auth = useAuth()

	const params = new URLSearchParams([
		['id', auth.user?.data?.data?._id || ''],
		['role', auth.user?.data?.data?.role || ''],
	])

	if (limit) params.append('limit', limit.toString())

	return useQuery({
		queryKey: [_URL.feedbacks, params, role],
		queryFn: () => fetcher(`${_URL.feedbacks}?${params}`),
	})
}

export const useFeedbackMutation = () =>
	useMutation({
		mutationFn: (data: FeedbackByRole<ROLES>) =>
			fetcher(_URL.feedbacks, {
				method: 'POST',
				headers: getHeaders(),
				body: JSON.stringify(data),
			}),
	})
