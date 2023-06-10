import React from "react"
import { Navigate, RouteObject } from "react-router-dom"

import { Layout } from "@/template"
import { Home, Login, Meetings, Resources } from "@/pages"
import { ProtectedRoute, _URL, Logout } from "@/routes"
import { Feedback } from "@/pages"

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
            <Meetings />
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
