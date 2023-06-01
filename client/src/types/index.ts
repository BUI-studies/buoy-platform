import { Dispatch, SetStateAction } from "react"

export enum REQUEST_STATUS {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export type PrevStateCallback<T> = (prevState: T) => T
export type SetStateFunction<T> = Dispatch<SetStateAction<T>>
