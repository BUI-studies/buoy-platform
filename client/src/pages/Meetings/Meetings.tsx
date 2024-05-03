import { useSearchParams } from 'react-router-dom'

import { PAGINATION_DEFAULTS, ROLES } from '@/types'
import { useMeetings, Meeting } from '@/api'
import { useAuth, useModal } from '@/context'

import { DataTable, DataTableRowProps, Loader, Pagination } from '@/components'

import { MeetingTableItem } from './Meetings.types'
import { makeTableData } from './Meetings.helper'

const Meetings = () => {
	const [params] = useSearchParams()
	const meetingsResponse = useMeetings(params.get('limit'), params.get('page'))
	const auth = useAuth()
	const { setModal } = useModal()

	const meetings = meetingsResponse.data

	if (meetingsResponse.isLoading) return <Loader />

	const tableData: DataTableRowProps<MeetingTableItem>[] =
		makeTableData({
			role: auth.user?.data?.data?.role as ROLES,
			meetings: meetings.data as Meeting[],
			titleAction: setModal,
		}) || []

	const flickeringHeader =
		auth.user?.data?.data?.role === ROLES.MENTOR
			? { title: 'students', grow: 4 }
			: { title: 'mentor', grow: 2 }

	const headers = [
		{ title: 'date', grow: 2 },
		{ title: 'title', grow: auth.user?.data?.data?.role === ROLES.MENTOR ? 4 : 6 },
		{ title: 'type', grow: 1 },
		flickeringHeader,
		{ title: 'report', grow: 1 },
	]

	return (
		<section>
			{meetings.isError && <p>Error</p>}
			<Pagination totalPages={meetings.totalPages} />
			<DataTable
				header={headers}
				data={tableData}
				noDataMessage={
					<>
						<span className="text-3xl">⚠️</span>
						<br />
						No meetings with you yet.
						<br />
						Info will be updated, after each call you have.
						<br />
						<br />
						So now, just wait a bit 😊
					</>
				}
			/>
		</section>
	)
}

export default Meetings
