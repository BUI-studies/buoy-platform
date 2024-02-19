import { FeedbackByRole, MentorDTO, useFeedbacks } from '@/api'

import { ROLES } from '@/types'
import { DataTableRowProps, DataTable, FeedbacksItem } from '@/components'
import { useAuth, useModal } from '@/context'
import { dateParser } from '@/utils'

import { HEADERS } from './FeedbacksTable.helper'
import classes from './FeedbacksTable.module.scss'
import { feedbacksReactionsMap } from '@/helpers'
import { useMemo } from 'react'

const FeedbackTable = () => {
	const auth = useAuth()
	const role = auth.user?.data?.data?.role as ROLES
	const feedbacks = useFeedbacks()
	const { setModal } = useModal()
	const headers = useMemo(() => HEADERS[role] || [], [role])

	if (feedbacks.isLoading) return <span className="">Loading...</span>

	const mappers = Object.freeze({
		[ROLES.STUDENT]: (feedback: FeedbackByRole<ROLES.STUDENT>) => ({
			id: feedback._id,
			date: dateParser(feedback.date),
			mentor: (feedback.meeting.mentor as MentorDTO).fullName,
			title: (
				<span
					className={classes.rowTitle}
					onClick={() =>
						setModal(
							<FeedbacksItem
								role={role}
								data={feedback}
							/>,
						)
					}
				>
					{feedback.meeting.title}
				</span>
			),
			type: feedback.meeting.type,
			comment: feedback.comment,
		}),
		[ROLES.MENTOR]: (feedback: FeedbackByRole<ROLES.MENTOR>) => ({
			id: feedback._id,
			date: dateParser(feedback.date),
			type: feedback.meeting.type,
			title: <span className={classes.rowTitle}>{feedback.meeting.title}</span>,
			impression: feedback.impression,
			understanding: feedback.understanding,
			mentoring: feedback.mentoring,
			teamwork: feedbacksReactionsMap.teamwork.find(item => item.value === feedback.teamwork)
				?.label,
			insides: feedback.insides,
			downsides: feedback.downsides,
			comment: feedback.comment,
		}),
	})

	const tableData: DataTableRowProps<FeedbackByRole<typeof role>>[] = feedbacks.data.map(
		mappers[role],
	)

	return (
		<>
			<DataTable
				header={headers}
				data={tableData}
				rowClick={
					role === ROLES.MENTOR
						? (id: string) =>
								setModal(
									<FeedbacksItem
										role={role}
										data={feedbacks.data.find((f: FeedbackByRole<ROLES.MENTOR>) => f._id === id)}
									/>,
								)
						: undefined
				}
			/>
		</>
	)
}

export default FeedbackTable
