import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "@/context/"
import { REQUEST_STATUS } from "@/types"

const ProtectedRoute = ({ children }: any) => {
  const { user }: any = useAuth()

  if (user.status === REQUEST_STATUS.IDLE) {
    return <Navigate to={"/login"} />
  }

  if (user.status === REQUEST_STATUS.LOADING)
    return (
      <main className="py-8 prose dark:prose-invert flex items-center justify-center flex-col">
        <h2>Loading...</h2>
      </main>
    )

  if (user.status === REQUEST_STATUS.SUCCESS) {
    return user ? children : <Navigate to={"/login"} />
  }

  if (user.status === REQUEST_STATUS.FAILED) {
    throw new Error("Login failed")
  }
}

export default ProtectedRoute
