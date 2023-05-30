import { Dispatch, SetStateAction } from "react"

import { REQUEST_STATUS } from "@/types"
import { API } from "@/api"
import { UserState } from "@/context"
import { Storage } from "@/utils"

export const getInitialUserState = (): UserState => {
  const token = Storage.get("user")

  return {
    data: { token: token, data: null },
    status: token ? REQUEST_STATUS.LOADING : REQUEST_STATUS.IDLE,
  }
}

export const verifyToken = async (
  token: string,
  setUserState: Dispatch<SetStateAction<UserState>>
) => {
  const { data, error } = await API.verify(token)

  if (error) {
    console.error(error)
    Storage.set("token", null)

    setUserState({
      data: { token: null, data: null },
      status: REQUEST_STATUS.IDLE,
    })
    return
  }

  setUserState({ data, status: REQUEST_STATUS.SUCCESS })
}
