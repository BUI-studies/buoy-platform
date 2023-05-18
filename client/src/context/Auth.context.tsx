import React, { useState, createContext, useContext, useEffect } from "react"

import { REQUEST_STATUS } from "@/types"
import { API } from "@/api"
import { Storage } from "@/utils"

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
  const token = Storage.get("user")
  const [user, setUserState] = useState<UserState>({
    data: {
      token,
      data: null,
    },
    status: token ? REQUEST_STATUS.LOADING : REQUEST_STATUS.IDLE,
  })

  useEffect(() => {
    if (!token) return

    API.verify(token).then(({ data }) => {
      setUserState({ data, status: REQUEST_STATUS.SUCCESS })
    })
  }, [])

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
