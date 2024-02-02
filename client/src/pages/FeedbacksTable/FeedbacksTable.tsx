import { Feedback, useFeedbacks } from '@/api'

import { DataTableRowProps, DataTable } from '@/components'

import { FeedbacksTableItem } from './FeedbacksTable.helper'

const FeedbackTable = () => {
	const feedbacks = useFeedbacks()

	if (feedbacks.isLoading) return <span className="">Loading...</span>

	const tableData: DataTableRowProps<FeedbacksTableItem>[] = feedbacks.data.map(
		(feedback: Feedback) => ({
			date: feedback.date,
			mentor: feedback.mentor.fullName,
			type: feedback.type,
			text: feedback.text,
		}),
	)

	return <p>Under constructino</p>
}

export default FeedbackTable
