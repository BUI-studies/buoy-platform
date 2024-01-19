import { useQuery } from '@tanstack/react-query'
import { fetcher, _URL } from '@/api'

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

export const useActiveUsersByMentor = (mentorId: string | undefined) => {
	if (!mentorId) throw new Error('mentorId is required')

	const URL = `${_URL.users}`
	const params = new URLSearchParams([
		['mentor', mentorId],
		['role', 'student'],
		['status', 'active'],
	])

	return useQuery({
		queryKey: [URL, params],
		queryFn: () => fetcher(`${URL}?${params}`),
	})
}
