import { FC, PropsWithChildren } from 'react'
import { dateParser } from '@/utils'

import { feedbacksReactionsMap } from '@/helpers'
import { ROLES } from '@/types'

import { typeToColorMap } from '../Items.helper'
import classes from '../Items.module.scss'

import { FeedbackItemBaseProps } from './FeedbacksItem.types'
import FeedbackItemRow from './FeedbacksItemRow'

const FeedbacksItemStudent: FC<PropsWithChildren & FeedbackItemBaseProps<ROLES.STUDENT>> = ({
	data,
}) => {
	const {
		date: dateSrc,
		meeting,
		comment,
		impression,
		understanding,
		mentoring,
		selfFeeling,
		teamwork,
		insides,
		downsides,
		isMentorVisible,
	} = data
	const date = dateParser(dateSrc)
	const mentorVisibilityClasses = [
		classes.isMentorVisible,
		classes[`isMentorVisible${isMentorVisible ? 'Show' : 'Hide'}`],
	].join(' ')

	return (
		<div className={classes.wrapper}>
			<h2 className={classes.titleWrapper}>
				<span
					className={mentorVisibilityClasses}
					title={isMentorVisible ? 'показувати ментору' : 'ментор цього не побачить'}
				>
					{isMentorVisible ? '👀' : '🙈'}
				</span>
				Коментар по зустрічі - <span className="text-teal-500 underline">"{meeting.title}"</span>
			</h2>

			<div className={classes.badges}>
				<p className={[classes.badgesItem, typeToColorMap[meeting.type]].join(' ')}>
					{meeting.type}
				</p>
				<p className={classes.badgesItem}>{meeting.mentor.fullName}</p>
			</div>

			<div>
				<p className={classes.commentTitle}>Дата:{date}</p>
				<FeedbackItemRow
					collection={feedbacksReactionsMap.impressions}
					title="Враження:"
					value={impression}
				/>
				<FeedbackItemRow
					collection={feedbacksReactionsMap.understanding}
					title="Розуміння:"
					value={understanding}
				/>
				<FeedbackItemRow
					collection={feedbacksReactionsMap.mentoring}
					title="Шо там ментор:"
					value={mentoring}
				/>
				<FeedbackItemRow
					collection={feedbacksReactionsMap.selfFeeling}
					title="А сам як:"
					value={selfFeeling}
				/>
				<FeedbackItemRow
					collection={feedbacksReactionsMap.teamwork}
					title="Тімворк:"
					value={teamwork}
				/>
				<FeedbackItemRow
					title="Інсайди:"
					value={insides}
				/>
				<FeedbackItemRow
					title="Де ми лохи:"
					value={downsides}
				/>
				<FeedbackItemRow
					title="Коментар:"
					value={comment}
				/>
			</div>
		</div>
	)
}

export default FeedbacksItemStudent
