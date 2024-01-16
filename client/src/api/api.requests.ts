import { _URL, getHeaders, fetcher } from '@/api/'
import { LoginInputs } from '@/pages/Login/Login.helper'

export const login = async (formData: LoginInputs) => {
	return fetcher(_URL.login, {
		method: 'POST',
		headers: getHeaders(),
		body: JSON.stringify(formData),
	})
}

export const verify = async (token: string) => {
	return fetcher(_URL.verify(token))
}

export const getPayments = async (fullName: string) =>
	fetcher(`${_URL.payments}?fullname=${fullName}`)

export const getHomeworks = async (fullName: string, role: string) =>
	fetcher(`${_URL.homeworks}?fullname=${fullName}&role=${role}`)
