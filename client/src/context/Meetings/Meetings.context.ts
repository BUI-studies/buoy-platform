import { createContext, useContext } from 'react'
import { getInitialMeetingsContext, MeetingsContextType } from '@/context'

export const MeetingsContext = createContext<MeetingsContextType>(getInitialMeetingsContext())
export const useMeetings = () => useContext(MeetingsContext)
