import { createContext, useContext } from "react"
import { MeetingsContextType, getInitialMeetingsContext } from "@/context"

export const MeetingsContext = createContext<MeetingsContextType>(
  getInitialMeetingsContext()
)
export const useMeetings = () => useContext(MeetingsContext)
