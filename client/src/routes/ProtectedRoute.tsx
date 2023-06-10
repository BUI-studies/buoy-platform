import React, { FC, PropsWithChildren, ReactNode } from "react"
import { Navigate, useNavigate } from "react-router-dom"

import { REQUEST_STATUS } from "@/types"
import { AuthContextType, useAuth } from "@/context/"

type ProtectedRouteProps = PropsWithChildren<{
  children?: ReactNode
}>

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { user }: AuthContextType = useAuth()

  switch (user.status) {
    case REQUEST_STATUS.LOADING:
      return (
        <main className="py-8 prose dark:prose-invert flex items-center justify-center flex-col">
          <h2>Loading...</h2>
        </main>
      )
    case REQUEST_STATUS.SUCCESS:
      return user ? <>{children}</> : <Navigate to={"/login"} />
    case REQUEST_STATUS.FAILED:
      console.error("Login failed")
      return <Navigate to={"/login"} />
    case REQUEST_STATUS.IDLE:
      return <Navigate to={"/login"} />
    default:
      return <Navigate to={"/login"} />
  }
}

export default ProtectedRoute
