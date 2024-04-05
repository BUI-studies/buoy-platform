import { FeedbackByRole, useFeedbacks } from '@/api'

import { ROLES } from '@/types'
import { DataTableRowProps, DataTable, FeedbacksItem, Loader } from '@/components'
import { useAuth, useModal } from '@/context'

import { HEADERS, getMapper } from './FeedbacksTable.helper'

const FeedbackTable = () => {
	const auth = useAuth()
	const role = auth.user?.data?.data?.role as ROLES
	const feedbacks = useFeedbacks(role)
	const { setModal } = useModal()
	const headers = HEADERS[role]
	const mapper = getMapper(role, setModal)

	if (feedbacks.isLoading) return <Loader />

	const tableData: DataTableRowProps<FeedbackByRole<ROLES>>[] = feedbacks.data.map(mapper)

	return (
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
	)
}

export default FeedbackTable
