import { REQUEST_STATUS } from "@/types"

export const getInitialMeetingsState = () => ({
  data: null,
  status: REQUEST_STATUS.IDLE,
})

export const getInitialMeetingsContext = () => ({
  meetings: getInitialMeetingsState(),
  setMeetings: () => null,
})
