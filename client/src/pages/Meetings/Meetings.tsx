import { useSearchParams } from 'react-router-dom'

import { ROLES } from '@/types'
import { useMeetings, Meeting } from '@/api'
import { useAuth, useModal } from '@/context'

import { DataTable, DataTableRowProps, Loader, Pagination } from '@/components'

import { MeetingTableItem } from './Meetings.types'
import { makeTableData } from './Meetings.helper'

const Meetings = () => {
	const [params, setParams] = useSearchParams()
	console.log('params', params.get('limit'), params.get('page'))
	const auth = useAuth()
	const meetingsResponse = useMeetings(params.get('limit') || '20', params.get('page') || '1')
	const meetings = meetingsResponse.data
	const { setModal } = useModal()

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
			<Pagination
				goNext={() => {
					setParams(
						new URLSearchParams([
							['limit', meetings.limit.toString()],
							['page', (Number(params.get('page')) + 1).toString()],
						]),
					)
				}}
				goPrev={() => {
					setParams(
						new URLSearchParams([
							['limit', meetings.limit.toString()],
							['page', (Number(params.get('page')) - 1).toString()],
						]),
					)
				}}
			/>
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
