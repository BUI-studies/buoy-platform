import { FC, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

import { GitHub } from '@/components'
import { Feedback, Meeting, MentorDTO } from '@/api'
import { dateParser } from '@/utils'

import { typeToColorMap } from './Items.helper'
import classes from './Items.module.scss'
import { feedbacksReactionsMap } from '@/helpers'

type FeedbackItemProps = {
	data: Feedback
}

const FeedbacksItem: FC<PropsWithChildren & FeedbackItemProps> = ({ data }) => {
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

	return (
		<div className={classes.wrapper}>
			<h2>
				Коментар по зустрічі - <span className="text-teal-500 underline">"{meeting.title}"</span>
			</h2>

			<div className={classes.badges}>
				<p className={[classes.badgesItem, typeToColorMap[meeting.type]].join(' ')}>
					{meeting.type}
				</p>
				<p className={classes.badgesItem}>{(meeting.mentor as MentorDTO).fullName}</p>
			</div>

			<div>
				<p className={classes.commentTitle}>Дата:{date}</p>
				<div>
					<p className={classes.commentTitle}>Враження:</p>
					<p className={classes.comment}>
						{feedbacksReactionsMap.impressions.find(imp => imp.value === impression)?.label ||
							'...а шось нема нічо...'}
					</p>
				</div>
				<div>
					<p className={classes.commentTitle}>Розуміння:</p>
					<p className={classes.comment}>
						{feedbacksReactionsMap.understanding.find(imp => imp.value === understanding)?.label ||
							'...а шось нема нічо...'}
					</p>
				</div>
				<div>
					<p className={classes.commentTitle}>Шо там ментор:</p>
					<p className={classes.comment}>
						{feedbacksReactionsMap.mentoring.find(imp => imp.value === mentoring)?.label ||
							'...а шось нема нічо...'}
					</p>
				</div>
				<div>
					<p className={classes.commentTitle}>А сам як:</p>
					<p className={classes.comment}>
						{feedbacksReactionsMap.selfFeeling.find(imp => imp.value === selfFeeling)?.label ||
							'...а шось нема нічо...'}
					</p>
				</div>
				<div>
					<p className={classes.commentTitle}>Тімворк:</p>
					<p className={classes.comment}>
						{feedbacksReactionsMap.teamwork.find(imp => imp.value === teamwork)?.label ||
							'...а шось нема нічо...'}
					</p>
				</div>
				<div>
					<p className={classes.commentTitle}>Інсайди:</p>
					<p className={classes.comment}>{insides}</p>
				</div>
				<div>
					<p className={classes.commentTitle}>Де ми лохи:</p>
					<p className={classes.comment}>{downsides}</p>
				</div>
				<div>
					<p className={classes.commentTitle}>Чи показувать ментору:</p>
					<p className={classes.comment}>
						{isMentorVisible
							? 'Хай подивицця і оце зробе шось!'
							: 'Ну нах, йому краще це не бачить'}
					</p>
				</div>
				<div>
					<p className={classes.commentTitle}>Коментар:</p>
					<p className={classes.comment}>{comment}</p>
				</div>
			</div>
		</div>
	)
}

export default FeedbacksItem
