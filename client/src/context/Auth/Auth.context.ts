import { createContext, useContext } from 'react'
import { AuthContextType, getInitialUserState } from '@/context'

export const AuthContext = createContext<AuthContextType>({
	user: getInitialUserState(),
	setUser: () => {
		throw new Error('setUserState function must be overridden')
	},
})
export const useAuth = () => useContext(AuthContext)
