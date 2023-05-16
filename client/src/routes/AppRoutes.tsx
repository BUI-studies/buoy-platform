import React from "react"
import { useRoutes } from "react-router-dom"
import routesList from "./routes-list"

export const AppRoutes = () => {
  return useRoutes(routesList)
}
