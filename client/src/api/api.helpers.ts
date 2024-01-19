import { Storage, TOKEN_KEY } from '@/utils'

const getToken = () => Storage.get(TOKEN_KEY)

export const getHeaders = () => ({
	'Content-Type': 'application/json',
	Authorization: getToken(),
})

export const _URL = {
	login: '/api/auth/login',
	verify: (token: string) => `/api/auth?token=${token.trim()}`,
	meetings: '/api/meetings',
	payments: '/api/payments',
	homeworks: '/api/homeworks',
	users: '/api/users',
	feedback: '/api/feedback',
}

export const getRequestOptions = () => ({
	method: 'GET',
	headers: getHeaders(),
})

export const fetcher = async (url: string, options: RequestInit = getRequestOptions()) => {
	const response = await fetch(url, { headers: getHeaders(), ...options })
	return response.json()
}
