import { Dispatch, SetStateAction } from 'react'

export enum REQUEST_STATUS {
	IDLE = 'IDLE',
	LOADING = 'LOADING',
	SUCCESS = 'SUCCESS',
	FAILED = 'FAILED',
}

export type PrevStateCallback<T> = (prevState: T) => T
export type SetStateFunction<T> = Dispatch<SetStateAction<T>>

export type ActiveClassCallbackProps = {
	isActive: boolean
	isPending: boolean
}

export type Populated = {
	/**
	 * @description
	 * This represents the properties that get loaded using the header row
	 */
	[k: string]: any
}

export type SVGProps = {
	className?: string
	onClick?: () => void
	size?: number | string
	width?: number | string
	height?: number | string
}

export enum ROLES {
	DEFAULT = 'student',
	STUDENT = 'student',
	MENTOR = 'mentor',
}

export enum USER_STATUSES {
	ACTIVE = 'active',
	INACTIVE = 'inactive',
}
