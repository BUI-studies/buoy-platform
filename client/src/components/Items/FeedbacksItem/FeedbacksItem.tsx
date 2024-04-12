import { FC, PropsWithChildren } from 'react'

import { FeedbackByRole } from '@/api'
import { ROLES } from '@/types'

import { FeedbacksItemProp } from './FeedbacksItem.types'
import FeedbacksItemStudent from './FeedbacksItemStudent'
import FeedbacksItemMentor from './FeedbacksItemMentor'

const FeedbacksItem: FC<PropsWithChildren & FeedbacksItemProp> = ({ role, data }) => {
	switch (role) {
		case ROLES.STUDENT:
			return <FeedbacksItemStudent data={data as FeedbackByRole<ROLES.STUDENT>} />
		case ROLES.MENTOR:
			return <FeedbacksItemMentor data={data as FeedbackByRole<ROLES.MENTOR>} />
		default:
			const _exhaustiveRole: never = role
			return _exhaustiveRole
	}
}

export default FeedbacksItem
