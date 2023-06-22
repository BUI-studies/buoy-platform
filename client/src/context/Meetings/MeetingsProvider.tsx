import { useState, FC, PropsWithChildren } from "react"

import {
  getInitialMeetingsState,
  MeetingsState,
  MeetingsContext,
} from "@/context"

const MeetingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const initialState = getInitialMeetingsState()

  const [meetingsState, setMeetingsState] =
    useState<MeetingsState>(initialState)

  const setMeetings = (newMeetings: MeetingsState): void => {
    setMeetingsState(newMeetings)
  }

  return (
    <MeetingsContext.Provider value={{ meetings: meetingsState, setMeetings }}>
      {children}
    </MeetingsContext.Provider>
  )
}

export default MeetingsProvider
