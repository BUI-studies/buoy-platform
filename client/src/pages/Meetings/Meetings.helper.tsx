import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { DataTableRowProps, MeetingsItem } from '@/components'
import { Meeting, Mentor, Student } from '@/api'
import { ROLES } from '@/types'
import { dateParser } from '@/utils'

import { MeetingTableItem } from './Meetings.types'

import classes from './Meetings.module.scss'

const createTitleElement = (action: (modal: ReactNode) => void, meeting: Meeting) => (
	<span
		className={classes.rowTitle}
		onClick={() => action(<MeetingsItem data={meeting} />)}
	>
		{meeting.title}
	</span>
)

const createReportLink = (report: string) => (
	<Link
		to={report}
		target="_blank"
		className={classes.reportLink}
	>
		report
	</Link>
)

const mapCommonProps = (
	meeting: Meeting,
	action: (modal: ReactNode) => void,
): DataTableRowProps<MeetingTableItem> => ({
	id: meeting._id,
	date: dateParser(meeting.date),
	title: createTitleElement(action, meeting),
	type: meeting.type,
	report: createReportLink(meeting.report),
})

const mapFlickeringProps = (meeting: Meeting, role: ROLES) => {
	switch (role) {
		case ROLES.MENTOR:
			return {
				students: (meeting.students as Student[]).map(student => student.fullName).join(', '),
			}
		case ROLES.STUDENT:
			return {
				mentor: (meeting.mentor as Mentor).fullName,
			}
		default:
			return {}
	}
}

type MakeTableItemProps = {
	role: ROLES
	meetings: Meeting[]
	titleAction: (modal: ReactNode) => void
}

export const makeTableData = ({
	role,
	meetings,
	titleAction,
}: MakeTableItemProps): DataTableRowProps<MeetingTableItem>[] =>
	meetings.map(meeting => ({
		...mapCommonProps(meeting, titleAction),
		...mapFlickeringProps(meeting, role),
	}))
