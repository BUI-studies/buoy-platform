import { useState, FC, PropsWithChildren } from 'react'

import { getInitialHomeworksState, HomeworksState, HomeworksContext } from '@/context'

const HomeworksProvider: FC<PropsWithChildren> = ({ children }) => {
	const initialState = getInitialHomeworksState()

	const [homeworksState, setHomeworksState] = useState<HomeworksState>(initialState)

	const setHomeworks = (newHomeworks: HomeworksState): void => {
		setHomeworksState(newHomeworks)
	}

	return (
		<HomeworksContext.Provider value={{ homeworks: homeworksState, setHomeworks }}>
			{children}
		</HomeworksContext.Provider>
	)
}

export default HomeworksProvider
