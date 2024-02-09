import { Feedback, MentorDTO, useFeedbacks } from '@/api'

import { DataTableRowProps, DataTable } from '@/components'

import { FeedbacksTableItem } from './FeedbacksTable.helper'
import classes from './FeedbacksTable.module.scss'
import { useModal } from '@/context'
import { dateParser } from '@/utils'
import FeedbacksItem from '@/components/Items/FeedbacksItem'

const FeedbackTable = () => {
	const feedbacks = useFeedbacks()
	const { setModal } = useModal()

	if (feedbacks.isLoading) return <span className="">Loading...</span>

	const headers = [
		{ title: 'date', grow: 2 },
		{ title: 'type', grow: 1 },
		{ title: 'title', grow: 2 },
		{ title: 'comment', grow: 5 },
		{ title: 'mentor', grow: 2 },
	]
	const tableData: DataTableRowProps<FeedbacksTableItem>[] = feedbacks.data.map(
		(feedback: Feedback) => ({
			date: dateParser(feedback.date),
			mentor: (feedback.meeting.mentor as MentorDTO).fullName,
			title: (
				<span
					className={classes.rowTitle}
					onClick={() => setModal(<FeedbacksItem data={feedback} />)}
				>
					{feedback.meeting.title}
				</span>
			),
			type: feedback.meeting.type,
			comment: feedback.comment,
		}),
	)

	return (
		<>
			<DataTable
				header={headers}
				data={tableData}
			/>
		</>
	)
}

export default FeedbackTable
