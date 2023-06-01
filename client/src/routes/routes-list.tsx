import React from "react"
import { RouteObject } from "react-router-dom"

import { Layout } from "@/template"
import { Home, Login } from "@/pages"
import { ProtectedRoute, _URL } from "@/routes"
import Logout from "./Logout"

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
    ],
  },
]

export default routesList
