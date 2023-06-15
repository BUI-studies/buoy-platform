import { REQUEST_STATUS } from "@/types"

export type Homework = {
  timestamp: number
  sender: string
  amount: number
  comment: string
}

export type HomeworksState = {
  data: Homework[] | null
  status: REQUEST_STATUS
}

export interface HomeworksContextType {
  homeworks: HomeworksState
  setHomeworks: (value: HomeworksState) => void
}
