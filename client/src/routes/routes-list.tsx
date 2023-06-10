import React from "react"
import { RouteObject } from "react-router-dom"

import { Layout } from "@/template"
import { Home, Login } from "@/pages"
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
            <Home />
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
        path: _URL.FEEDBACK,
        element: (
          <ProtectedRoute>
            <Feedback />
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
