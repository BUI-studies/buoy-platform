import { _URL, fetcher, getHeaders } from '@/api'
import { useAuth } from '@/context'
import { Meeting } from '@/types'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useMeetings = (limit: number) => {
	const auth = useAuth()

	const params = new URLSearchParams([
		['id', auth.user?.data?.data?._id || ''],
		['role', auth.user?.data?.data?.role || ''],
	])

	if (limit) params.append('limit', limit.toString())

	return useQuery({
		queryKey: [_URL.meetings, params],
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
