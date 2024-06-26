import * as yup from 'yup'

import { ERRORS } from '@/enums'
import { REPORT_TYPES } from '@/types'
import { FormBuilderTypes } from '@/utils'

export const getReportFormFields = (
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
		.of(yup.string())
		.when('type', {
			is: REPORT_TYPES.INDIVIDUAL,
			then: schema => schema.min(1, ERRORS.selectNoValue).max(1, ERRORS.indStudentsLength),
			otherwise: schema => schema.min(1, ERRORS.selectNoValue),
		})
		.required(ERRORS.required),
	report: yup.string().url().required(ERRORS.required),
	comment: yup.string().required(ERRORS.required),
})
