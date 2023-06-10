import { REQUEST_STATUS } from "@/types"

export type Meeting = {
  id: string
  timestamp: number
  date: Date
  title: string
  type: string
  students: string[]
  mentor: string
  comment: string
  report: string
}

export type MeetingsState = {
  data: Meeting[] | null
  status: REQUEST_STATUS
}

export interface MeetingsContextType {
  meetings: MeetingsState
  setMeetings: (value: MeetingsState) => void
}
