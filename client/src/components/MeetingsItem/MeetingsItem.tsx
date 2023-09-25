import { FC, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

import { GitHub } from '@/components'
import { Meeting, MeetingTypes } from '@/context'
import { dateParser } from '@/utils'

import classes from './MeetingsItem.module.scss'

type MeetingsItemProps = {
	data: Meeting
}

const MeetingsItem: FC<PropsWithChildren & MeetingsItemProps> = ({ data }) => {
	const { title, timestamp, type, mentor, report, comment } = data
	const date = dateParser(timestamp)

	const mapTypeToColor = {
		[MeetingTypes.INDIVIDUAL]: 'bg-pink-800',
		[MeetingTypes.PLANING]: 'bg-green-800',
		[MeetingTypes.SYNC]: 'bg-cyan-700',
	}

	return (
		<div className={classes.wrapper}>
			<h2>
				{date}: {title}
			</h2>

			<div className={classes.badges}>
				<p className={[classes.badgesItem, mapTypeToColor[type]].join(' ')}>{type}</p>
				<p className={classes.badgesItem}>{mentor}</p>
			</div>

			<Link to={report} target="_blank" className={classes.link}>
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
