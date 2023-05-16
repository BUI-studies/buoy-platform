import React, { useState, createContext, useContext } from "react"

import { REQUEST_STATUS } from "@/types"

export const AuthContext = createContext({})
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: any) => {
  const token = localStorage.getItem("user") || null
  const [user, setUserState] = useState({
    data: {
      token,
      data: null,
    },
    status: token ? REQUEST_STATUS.SUCCESS : REQUEST_STATUS.IDLE,
  })
  const setUser = (newUser) => {
    setUserState(newUser)
    localStorage.setItem("user", JSON.stringify(newUser.data.token))
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
