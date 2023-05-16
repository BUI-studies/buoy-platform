import React from "react"
import { RouteObject } from "react-router-dom"

import { Layout } from "@/components"
import { Home, Login } from "@/pages"
import ProtectedRoute from "./ProtectedRoute"

const routesList: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]

export default routesList
