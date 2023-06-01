import React from "react"
import { RouteObject } from "react-router-dom"

import { Layout } from "@/template"
import { Home, Login } from "@/pages"
import { ProtectedRoute, _URL } from "@/routes"

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
    ],
  },
]

export default routesList
