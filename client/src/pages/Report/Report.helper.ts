import * as yup from 'yup'

import { REPORT_TYPES } from '@/types'
import { FormBuilderTypes } from '@/utils'

const ERRORS = {
	required: 'Required field',
	wrongType: 'Wrong type',
	indStudentsLength: 'Individual meeting should have only one student',
}

export const reportFormFields = (
	students: FormBuilderTypes.SelectOption[],
): FormBuilderTypes.Field[] => [
	{ type: FormBuilderTypes.FIELD_TYPES.TEXT, name: 'title', label: 'Title of the meeting' },
	{
		type: FormBuilderTypes.FIELD_TYPES.SELECT,
		name: 'type',
		label: 'Meeting type:',
		options: [
			{ label: 'Individual', value: REPORT_TYPES.INDIVIDUAL },
			{ label: 'Planning', value: REPORT_TYPES.PLANNING },
			{ label: 'Sync', value: REPORT_TYPES.SYNC },
		],
	},
	{
		type: FormBuilderTypes.FIELD_TYPES.MULTI_SELECT,
		name: 'students',
		label: 'Who was there?',
		options: students,
	},
	{
		type: FormBuilderTypes.FIELD_TYPES.URL,
		name: 'report',
		label: 'Link to the report file?',
	},
	{
		type: FormBuilderTypes.FIELD_TYPES.TEXTAREA,
		name: 'comment',
		label: 'Comment:',
	},
	{
		type: FormBuilderTypes.FIELD_TYPES.SUBMIT,
		name: 'reportSubmit',
		value: 'Save Report',
	},
]

export const reportSchema = yup.object().shape({
	title: yup.string().min(3).required(ERRORS.required),
	type: yup.mixed().oneOf(Object.values(REPORT_TYPES)).required(ERRORS.required),
	students: yup
		.array()
		.when('type', ([type], schema) => {
			return type === REPORT_TYPES.INDIVIDUAL
				? schema.length(1, ERRORS.indStudentsLength)
				: schema.required(ERRORS.required)
		})
		.min(1, ERRORS.required),
	report: yup.string().url().required(ERRORS.required),
	comment: yup.string().required(ERRORS.required),
})
