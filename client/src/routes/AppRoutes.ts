import { RouteObject, useRoutes } from 'react-router-dom'

import { AuthContextType, useAuth } from '@/context'
import { routesListMentor, routesListStudent, routesListDefault } from '@/routes'
import { ROLES } from '@/types'

export const AppRoutes = () => {
	const { user }: AuthContextType = useAuth()

	let routesList: RouteObject[] = routesListDefault

	switch (user?.data?.data?.role) {
		case ROLES.STUDENT:
			routesList = user?.data?.data?.status === 'active' ? routesListStudent : routesListDefault
			break
		case ROLES.MENTOR:
			routesList = routesListMentor
			break
	}
	return useRoutes(routesList)
}
