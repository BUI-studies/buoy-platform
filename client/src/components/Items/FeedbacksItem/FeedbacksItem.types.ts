import { FeedbackByRole } from '@/api'
import { ROLES } from '@/types'

export type FeedbackItemBaseProps<T extends ROLES> = {
	data: FeedbackByRole<T>
}

export type FeedbacksItemProp = FeedbackItemBaseProps<ROLES> & {
	role: ROLES
}
