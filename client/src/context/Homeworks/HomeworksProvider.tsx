import { FC, PropsWithChildren, useState } from 'react'

import { getInitialHomeworksState, HomeworksContext, HomeworksState } from '@/context'

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
