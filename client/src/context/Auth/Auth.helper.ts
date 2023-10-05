import { Dispatch, SetStateAction } from 'react'

import { REQUEST_STATUS } from '@/types'
import { API } from '@/api'
import { UserState } from '@/context'
import { Storage, TOKEN_KEY } from '@/utils'

export const getInitialUserState = (): UserState => {
	const token = Storage.get(TOKEN_KEY)

	return {
		data: { token: token, data: null },
		status: token ? REQUEST_STATUS.LOADING : REQUEST_STATUS.IDLE,
	}
}

export const verifyToken = async (
	token: string,
	setUserState: Dispatch<SetStateAction<UserState>>,
) => {
	const { data, error } = await API.verify(token)
	if (error) {
		console.error(error)
		Storage.set(TOKEN_KEY, null)

		setUserState({
			data: { token: null, data: null },
			status: REQUEST_STATUS.IDLE,
		})
		return
	}

	setUserState({ data: { data, token }, status: REQUEST_STATUS.SUCCESS })
}
