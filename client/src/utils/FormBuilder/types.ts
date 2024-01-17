import { ObjectSchema, AnyObject } from 'yup'

import { Populated } from '@/types'
import { Control, FieldError, UseFormRegisterReturn } from 'react-hook-form'

export const enum FIELD_TYPES {
	SELECT = 'select',
	MULTI_SELECT = 'multi-select',
	BUTTON = 'button',
	CHECKBOX = 'checkbox',
	COLOR = 'color',
	DATE = 'date',
	DATETIME = 'datetime',
	EMAIL = 'email',
	FILE = 'file',
	HIDDEN = 'hidden',
	IMAGE = 'image',
	MONTH = 'month',
	NUMBER = 'number',
	PASSWORD = 'password',
	RADIO = 'radio',
	MULTI_RADIO = 'multi-radio',
	RANGE = 'range',
	RESET = 'reset',
	SEARCH = 'search',
	SUBMIT = 'submit',
	TEL = 'tel',
	TEXT = 'text',
	TEXTAREA = 'textarea',
	TIME = 'time',
	URL = 'url',
	WEEK = 'week',
}

export type FieldClasses = {
	label: string
	error: string
	checkbox?: string
	radio?: string
	input?: string
	select?: string
	option?: string
	textarea?: string
	button?: string
}

export type Field = {
	type: FIELD_TYPES
	name: string
	label?: string
	value?: string | number
	defaultValue?: string
	placeholder?: string
	required?: boolean
	options?: SelectOption[]
}

export type SelectOption = {
	label: string
	value: string
}

export type InputProps = {
	defaultValue?: string
	type: FIELD_TYPES
	label?: string
	doRegister: () => UseFormRegisterReturn
	classes: FieldClasses
	error?: FieldError
	options?: SelectOption[]
	value?: string | number
	control?: Control
	disabled?: boolean
}

export type FormProps<T> = {
	formProps: { name: string } & Populated
	fields: Field[]
	schema: ObjectSchema<AnyObject>
	onSubmit: (data: T) => void
	classes?: { form: string } & FieldClasses
	watchers?: (watch: (name: string) => void) => void
}
