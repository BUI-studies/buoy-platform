import * as yup from 'yup'

import { FormBuilderTypes } from '@/utils'
import { ERRORS } from '@/enums'

export const getHomeworkSchema = () =>
	yup.object().shape({
		homeworkName: yup.string().required(ERRORS.required),
		linkCode: yup.string().required(ERRORS.required),
		comment: yup.string().required(ERRORS.required),
	})

export const getHomeworkFormFields = (): FormBuilderTypes.Field[] => [
	{
		type: FormBuilderTypes.FIELD_TYPES.TEXT,
		name: 'homeworkName',
		label: 'Homework Name',
	},
	{
		type: FormBuilderTypes.FIELD_TYPES.TEXT,
		name: 'linkCode',
		label: 'Link Code',
	},
	{
		type: FormBuilderTypes.FIELD_TYPES.TEXTAREA,
		name: 'comment',
		label: 'Comment',
	},
	{
		type: FormBuilderTypes.FIELD_TYPES.SUBMIT,
		name: 'submit',
		value: 'Send Homework',
	},
]

