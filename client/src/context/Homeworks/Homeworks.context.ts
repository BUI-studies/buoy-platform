import { createContext, useContext } from 'react'
import { HomeworksContextType, getInitialHomeworksContext } from '@/context'

export const HomeworksContext = createContext<HomeworksContextType>(getInitialHomeworksContext())
export const useHomeworks = () => useContext(HomeworksContext)
