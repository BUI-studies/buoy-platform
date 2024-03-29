import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { Storage, TOKEN_KEY } from '@/utils'

import { AuthContext, getInitialUserState, UserState, verifyToken } from '@/context'

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const initialState = getInitialUserState()

	const [user, setUserState] = useState<UserState>(initialState)
	const {
		data: { token },
	} = user

	useEffect(() => {
		if (!token) return

		verifyToken(token, setUserState)
	}, [token])

	const setUser = (newUser: UserState): void => {
		setUserState(newUser)
		Storage.set(TOKEN_KEY, newUser.data.token)
	}

	return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

export default AuthProvider
