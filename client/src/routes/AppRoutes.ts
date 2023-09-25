import { useRoutes } from 'react-router-dom'

import { routesList } from '@/routes'

export const AppRoutes = () => {
	return useRoutes(routesList)
}
