import { FC } from 'react'

import classes from '../Items.module.scss'

type FeedbackItemRowProps = {
	collection?: { label: string; value: string }[]
	title: string
	value: string
}

const FeedbackItemRow: FC<FeedbackItemRowProps> = ({ title, value, collection }) => {
	if (collection && !value) throw new Error('value must be provided if collection is provided')
	if (!collection && !value) throw new Error('value or collection must be provided')

	return (
		<div>
			<p className={classes.commentTitle}>{title}</p>
			<p className={classes.comment}>
				{collection
					? collection.find(imp => imp.value === value)?.label || '...а шось нема нічо...'
					: value}
			</p>
		</div>
	)
}

export default FeedbackItemRow
