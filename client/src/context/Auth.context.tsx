import React, { useState, createContext, useContext } from "react"

import { REQUEST_STATUS } from "@/types"

export const AuthContext = createContext({})
export const useAuth = () => useContext(AuthContext)

type User = {
  _id: string
  fullName: string
  email: string
  tel: string
}

type UserState = {
  data: {
    token: string | null
    data: User | null
  }
  status: REQUEST_STATUS
}

export const AuthProvider = ({ children }: any) => {
  const token = localStorage.getItem("user") || null
  const [user, setUserState] = useState<UserState>({
    data: {
      token: localStorage.getItem("user") || null,
      data: null,
    },
    status: token ? REQUEST_STATUS.SUCCESS : REQUEST_STATUS.IDLE,
  })
  const setUser = (newUser: UserState) => {
    setUserState(newUser)
    localStorage.setItem("user", JSON.stringify(newUser.data.token))
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
