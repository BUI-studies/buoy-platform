import { Navigate, RouteObject } from 'react-router-dom'

import { Layout } from '@/template'
import {
	Login,
	Meetings,
	Resources,
	Feedback,
	Payments,
	Homeworks,
	Report,
	UnPaid,
} from '@/pages'
import { ProtectedRoute, _URL, Logout } from '@/routes'
import { MeetingsProvider, PaymentsProvider, HomeworksProvider } from '@/context'

export const routesListStudent: RouteObject[] = [
	{
		element: <Layout />,
		children: [
			{
				path: _URL.HOME,
				element: (
					<ProtectedRoute>
						<Navigate to="/meetings" />
					</ProtectedRoute>
				),
			},
			{
				path: _URL.LOGIN,
				element: <Login />,
			},
			{
				path: _URL.LOGOUT,
				element: <Logout />,
			},
			{
				path: _URL.MEETINGS,
				element: (
					<ProtectedRoute>
						<MeetingsProvider>
							<Meetings />
						</MeetingsProvider>
					</ProtectedRoute>
				),
			},
			{
				path: _URL.PAYMENTS,
				element: (
					<ProtectedRoute>
						<PaymentsProvider>
							<Payments />
						</PaymentsProvider>
					</ProtectedRoute>
				),
			},
			{
				path: _URL.HOMEWORKS,
				element: (
					<ProtectedRoute>
						<HomeworksProvider>
							<Homeworks />
						</HomeworksProvider>
					</ProtectedRoute>
				),
			},
			{
				path: _URL.FEEDBACK,
				element: (
					<ProtectedRoute>
						<Feedback />
					</ProtectedRoute>
				),
			},
			{
				path: _URL.RESOURCES,
				element: (
					<ProtectedRoute>
						<Resources />
					</ProtectedRoute>
				),
			},
			{
				path: '*',
				element: <h1 className="text-center py-8">404 no such page</h1>,
			},
		],
	},
]

export const routesListMentor: RouteObject[] = [
	{
		element: <Layout />,
		children: [
			{
				path: _URL.HOME,
				element: (
					<ProtectedRoute>
						<Navigate to="/meetings" />
					</ProtectedRoute>
				),
			},
			{
				path: _URL.LOGIN,
				element: <Login />,
			},
			{
				path: _URL.LOGOUT,
				element: <Logout />,
			},
			{
				path: _URL.MEETINGS,
				element: (
					<ProtectedRoute>
						<MeetingsProvider>
							<Meetings />
						</MeetingsProvider>
					</ProtectedRoute>
				),
			},
			{
				path: _URL.HOMEWORKS,
				element: (
					<ProtectedRoute>
						<HomeworksProvider>
							<Homeworks />
						</HomeworksProvider>
					</ProtectedRoute>
				),
			},
			{
				path: _URL.REPORT,
				element: (
					<ProtectedRoute>
						<Report />
					</ProtectedRoute>
				),
			},
			{
				path: '*',
				element: <h1 className="text-center py-8">404 no such page</h1>,
			},
		],
	},
]

export const routesListDefault = [
	{
		element: <Layout />,
		children: [
			{
				path: _URL.HOME,
				element: (
					<ProtectedRoute>
						<Navigate to="/unpaid" />
					</ProtectedRoute>
				),
			},
			{
				path: _URL.LOGIN,
				element: <Login />,
			},
			{
				path: _URL.LOGOUT,
				element: <Logout />,
			},
			{
				path: _URL.PAYMENTS,
				element: (
					<ProtectedRoute>
						<PaymentsProvider>
							<Payments />
						</PaymentsProvider>
					</ProtectedRoute>
				),
			},
			{
				path: _URL.UNPAID,
				element: (
					<ProtectedRoute>
						<PaymentsProvider>
							<UnPaid />
						</PaymentsProvider>
					</ProtectedRoute>
				),
			},
			{
				path: '*',
				element: (
					<ProtectedRoute>
						<PaymentsProvider>
							<UnPaid />
						</PaymentsProvider>
					</ProtectedRoute>
				),
			},
		],
	},
]
