import { useMutation, useQuery } from '@tanstack/react-query'

import { _URL, fetcher, getHeaders, MentorDTO, Student } from '@/api'
import { useAuth } from '@/context'
import { PAGINATION_DEFAULTS } from '@/types'

export enum MeetingTypes {
	INDIVIDUAL = 'individual',
	PLANING = 'planning',
	SYNC = 'sync',
}

export type MeetingDTO = {
	date: Date | string
	type: MeetingTypes
	title: string
	mentor: MentorDTO
}

export type Meeting = {
	_id: string
	timestamp: number
	date: Date
	title: string
	type: MeetingTypes
	students: string[] | Student[]
	mentor: MentorDTO | string
	comment: string
	report: string
}

export const useMeetings = (
	limit: string | null = PAGINATION_DEFAULTS.PAGE.toString(),
	page: string | null = PAGINATION_DEFAULTS.LIMIT.toString(),
) => {
	const auth = useAuth()

	const params = new URLSearchParams([
		['id', auth.user?.data?.data?._id || ''],
		['role', auth.user?.data?.data?.role || ''],
		['page', page || PAGINATION_DEFAULTS.PAGE.toString()],
		['limit', limit || PAGINATION_DEFAULTS.LIMIT.toString()],
	])

	return useQuery({
		queryKey: [_URL.meetings, auth.user?.data?.data?._id, auth.user?.data?.data?.role, page, limit],
		queryFn: () => fetcher(`${_URL.meetings}?${params}`),
	})
}

export const getMeetings = async (fullName: string, role: string) =>
	fetcher(`${_URL.meetings}?fullname=${fullName}&role=${role}`)

export const useMeetingMutation = () =>
	useMutation({
		mutationFn: (data: Meeting) =>
			fetcher(_URL.meetings, {
				method: 'POST',
				headers: getHeaders(),
				body: JSON.stringify(data),
			}),
	})
