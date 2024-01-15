import { _URL, getHeaders, request } from '@/api/'
import { Meeting } from '@/context'
import { LoginInputs } from '@/pages/Login/Login.helper'

export const login = async (formData: LoginInputs) => {
	return request(_URL.login, {
		method: 'POST',
		headers: getHeaders(),
		body: JSON.stringify(formData),
	})
}

export const verify = async (token: string) => {
	return request(_URL.verify(token))
}

export const getMeetings = async (fullName: string, role: string) =>
	request(`${_URL.meetings}?fullname=${fullName}&role=${role}`)

export const getPayments = async (fullName: string) =>
	request(`${_URL.payments}?fullname=${fullName}`)

export const getHomeworks = async (fullName: string, role: string) =>
	request(`${_URL.homeworks}?fullname=${fullName}&role=${role}`)

export const saveMeeting = async (data: Meeting) => {
	return request(_URL.meetings, {
		method: 'POST',
		headers: getHeaders(),
		body: JSON.stringify(data),
	})
}
