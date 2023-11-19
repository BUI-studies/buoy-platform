import { Populated } from '@/types'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

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
	label?: string
	input?: string
	error?: string
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
	classes?: FieldClasses
	error?: FieldError | undefined
	options?: SelectOption[] | undefined
	value?: string | number
}

export type FormProps = {
	formProps: { name: string } & Populated
	fields: Field[]
	onSubmit: (data: { [key: string]: string }) => void
	classes?: { form?: string } & FieldClasses
	watchers?: (watch: (name: string) => void) => void
}
