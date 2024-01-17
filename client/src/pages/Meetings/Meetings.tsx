import { Meeting, ROLES } from '@/types'
import { useMeetings } from '@/api'
import { useAuth, useModal } from '@/context'

import { DataTable, DataTableRowProps } from '@/components'

import { MeetingTableItem } from './Meetings.types'
import { makeTableData } from './Meetings.helper'

const Meetings = () => {
	const auth = useAuth()
	const meetings = useMeetings()
	const { setModal } = useModal()

	if (meetings.isLoading) return <span className="">Loading...</span>

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
