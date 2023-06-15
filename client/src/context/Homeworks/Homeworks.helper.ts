import { REQUEST_STATUS } from "@/types"

export const getInitialHomeworksState = () => ({
  data: null,
  status: REQUEST_STATUS.IDLE,
})

export const getInitialHomeworksContext = () => ({
  homeworks: getInitialHomeworksState(),
  setHomeworks: () => null,
})
