import React, { useState, useEffect, FC, PropsWithChildren } from "react"

import { Storage } from "@/utils"

import {
  verifyToken,
  AuthContext,
  UserState,
  getInitialUserState,
} from "@/context"

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const initialState = getInitialUserState()

  const [user, setUserState] = useState<UserState>(initialState)
  const {
    data: { token },
  } = user

  useEffect(() => {
    if (!token) return

    verifyToken(token, setUserState)
  }, [token])

  const setUser = (newUser: UserState): void => {
    setUserState(newUser)
    Storage.set("user", newUser.data.token)
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
