import React from "react"
import { RouteObject } from "react-router-dom"

import { Layout } from "@/template"
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
