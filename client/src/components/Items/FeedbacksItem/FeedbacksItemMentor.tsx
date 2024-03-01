import { FC, PropsWithChildren } from 'react'
import { dateParser } from '@/utils'

import { feedbacksReactionsMap } from '@/helpers'
import { ROLES } from '@/types'

import { typeToColorMap } from '../Items.helper'
import classes from '../Items.module.scss'

import { FeedbackItemBaseProps } from './FeedbacksItem.types'
import FeedbackItemRow from './FeedbacksItemRow'

const FeedbacksItemMentor: FC<PropsWithChildren & FeedbackItemBaseProps<ROLES.MENTOR>> = ({
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
	} = data
	const date = dateParser(dateSrc)

	return (
		<div className={classes.wrapper}>
			<h2 className={classes.titleWrapper}>
				Коментар по зустрічі - <span className="text-teal-500 underline">"{meeting.title}"</span>
			</h2>

			<div className={classes.badges}>
				<p className={[classes.badgesItem, typeToColorMap[meeting.type]].join(' ')}>
					{meeting.type}
				</p>
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

export default FeedbacksItemMentor
