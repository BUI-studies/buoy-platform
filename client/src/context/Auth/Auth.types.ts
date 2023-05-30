import { Dispatch, SetStateAction } from "react"
import { REQUEST_STATUS } from "@/types"

export type User = {
  _id: string
  fullName: string
  email: string
  tel: string
}

export type UserState = {
  data: {
    token: string | null
    data: User | null
  }
  status: REQUEST_STATUS
}

export interface AuthContextType {
  user: UserState
  setUser: Dispatch<SetStateAction<UserState>>
}
