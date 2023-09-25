import { createContext, useContext } from 'react'
import { getInitialHomeworksContext, HomeworksContextType } from '@/context'

export const HomeworksContext = createContext<HomeworksContextType>(getInitialHomeworksContext())
export const useHomeworks = () => useContext(HomeworksContext)
