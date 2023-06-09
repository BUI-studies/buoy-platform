import { Navigate, RouteObject } from "react-router-dom"

import { Layout } from "@/template"
import {
  Login,
  Meetings,
  Resources,
  Feedback,
  Payments,
  Homeworks,
} from "@/pages"
import { ProtectedRoute, _URL, Logout } from "@/routes"
import {
  MeetingsProvider,
  PaymentsProvider,
  HomeworksProvider,
} from "@/context"

const routesList: RouteObject[] = [
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
        path: "*",
        element: <h1 className="text-center py-8">404 no such page</h1>,
      },
    ],
  },
]

export default routesList
