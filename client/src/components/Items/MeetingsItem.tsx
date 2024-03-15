import { FC, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

import { GitHub } from '@/components'
import { Meeting, MentorDTO } from '@/api'
import { dateParser } from '@/utils'

import { typeToColorMap } from './Items.helper'
import classes from './Items.module.scss'

type MeetingsItemProps = {
	data: Meeting
}

const MeetingsItem: FC<PropsWithChildren & MeetingsItemProps> = ({ data }) => {
	const { title, date: dateSrc, type, mentor, report, comment } = data
	const date = dateParser(dateSrc)

	return (
		<div className={classes.wrapper}>
			<h2>
				{date}: {title}
			</h2>

			<div className={classes.badges}>
				<p className={[classes.badgesItem, typeToColorMap[type]].join(' ')}>{type}</p>
				<p className={classes.badgesItem}>{(mentor as MentorDTO).fullName}</p>
			</div>

			<Link
				to={report}
				target="_blank"
				className={classes.link}
			>
				повний report на <GitHub size={24} />
			</Link>

			<div>
				<p className={classes.commentTitle}>Коментар ментора:</p>
				<p className={classes.comment}>{comment}</p>
			</div>
		</div>
	)
}

export default MeetingsItem
