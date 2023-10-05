import { _URL } from '@/routes'
import { ActiveClassCallbackProps, USER_STATUSES } from '@/types'

export type SideBarProps = {
	className: string
}

export const handleActiveClass =
	(status: USER_STATUSES) =>
	({ isActive }: ActiveClassCallbackProps) => {
		const isActiveClass = isActive ? 'bg-blue-900' : ''
		const isUnpaidClass = status === USER_STATUSES.INACTIVE ? 'opacity-50 pointer-events-none' : ''
		return isActiveClass + ' ' + isUnpaidClass
	}
