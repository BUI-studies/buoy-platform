import { RouteObject, useRoutes } from 'react-router-dom'

import { AuthContextType, useAuth } from '@/context'
import { getRoutesListMentor, routesListStudent, routesListDefault } from '@/routes'
import { ROLES, USER_STATUSES } from '@/types'

export const AppRoutes = () => {
	const { user }: AuthContextType = useAuth()

	let routesList: RouteObject[] = routesListDefault

	switch (user?.data?.data?.role) {
		case ROLES.STUDENT:
			routesList =
				user?.data?.data?.status === USER_STATUSES.ACTIVE ? routesListStudent : routesListDefault
			break
		case ROLES.MENTOR:
			routesList = getRoutesListMentor(user?.data?.data?.status as USER_STATUSES)
			break
	}
	return useRoutes(routesList)
}
