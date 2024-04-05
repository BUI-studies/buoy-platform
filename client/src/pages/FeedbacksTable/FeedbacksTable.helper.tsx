import { FeedbackByRole, MeetingDTO, MentorDTO } from '@/api'
import { ROLES } from '@/types'
import { dateParser } from '@/utils'
import { feedbacksReactionsMap } from '@/helpers'

import classes from './FeedbacksTable.module.scss'
import { FeedbacksItem } from '@/components'
import { ReactNode } from 'react'

export const HEADERS = Object.freeze({
	[ROLES.MENTOR]: [
		{ title: 'date', grow: 1 },
		{ title: 'type', grow: 1 },
		{ title: 'title', grow: 1 },
		{ title: 'impression', grow: 1 },
		{ title: 'understanding', grow: 1 },
		{ title: 'mentoring', grow: 1 },
		{ title: 'teamwork', grow: 1 },
		{ title: 'insides', grow: 1 },
		{ title: 'downsides', grow: 2 },
		{ title: 'comment', grow: 2 },
	],
	[ROLES.STUDENT]: [
		{ title: 'date', grow: 2 },
		{ title: 'type', grow: 1 },
		{ title: 'title', grow: 2 },
		{ title: 'comment', grow: 5 },
		{ title: 'mentor', grow: 2 },
	],
})

const mapMeetingRelatedProps = (
	role: ROLES,
	feedback: FeedbackByRole<ROLES.STUDENT>,
	setModal: (node: ReactNode) => void,
) =>
	!feedback.meeting
		? {
				mentor: 'No mentor',
				title: 'No title',
				type: 'No type',
		  }
		: {
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
		  }

export const getMapper = (role: ROLES, setModal: (node: ReactNode) => void) =>
	Object.freeze({
		[ROLES.STUDENT]: (feedback: FeedbackByRole<ROLES.STUDENT>) => ({
			id: feedback._id,
			date: dateParser(feedback.date),
			comment: feedback.comment,
			...mapMeetingRelatedProps(role, feedback, setModal),
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
	})[role]
