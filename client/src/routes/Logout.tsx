import React from "react"
import { Navigate } from "react-router-dom"

import { Storage, TOKEN_KEY } from "@/utils"
import { useAuth } from "@/context"

import { REQUEST_STATUS } from "@/types"

const Logout = () => {
  const { setUser } = useAuth()
  Storage.remove(TOKEN_KEY)

  setUser({ data: { data: null, token: null }, status: REQUEST_STATUS.IDLE })

  return <Navigate to="/" />
}

export default Logout
