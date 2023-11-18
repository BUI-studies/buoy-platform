import { useEffect, useState } from 'react'

import { useAuth } from '@/context'
import { REPORT_TYPES } from '@/types'
import { FormBuilderTypes, FormBuilder } from '@/utils'

const Report = () => {
	const auth = useAuth()
	const [showForm, setShowForm] = useState(false)
	const formURL =
		'https://docs.google.com/forms/d/e/1FAIpQLSeBwCg7E1-awS8q04SyE2PCv4IfUD6HvqglhudG3qyna06o3Q/viewform?embedded=true'
	const handleIframeLoad = () => {
		setShowForm(true)
	}

	const [students, setStudents] = useState<FormBuilderTypes.SelectOption[]>([])

	useEffect(() => {
		fetch(`/api/users?mentor=${auth.user?.data?.data?._id}&role=student`)
			.then(res => res.json())
			.then(data => {
				const studentsOptions: FormBuilderTypes.SelectOption[] = data.map(
					(student: { fullName: string; _id: string }) => ({
						label: student.fullName,
						value: student._id,
					}),
				)

				setStudents(studentsOptions)
			})
	}, [auth])

	const reportFormFields = [
		{ type: FormBuilderTypes.FIELD_TYPES.URL, name: 'title', label: 'title of the meeting' },
		{
			type: FormBuilderTypes.FIELD_TYPES.SELECT,
			name: 'type',
			label: 'Meeting type',
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
			options: students as FormBuilderTypes.SelectOption[],
		},
		{
			type: FormBuilderTypes.FIELD_TYPES.URL,
			name: 'report',
			label: 'Link to the report file?',
		},
		{
			type: FormBuilderTypes.FIELD_TYPES.TEXTAREA,
			name: 'comment',
			label: 'Comment',
		},
		{
			type: FormBuilderTypes.FIELD_TYPES.SUBMIT,
			name: 'reportSubmit',
			value: 'Save Report',
		},
	]

	return (
		<>
			<FormBuilder.Form
				formProps={{ name: 'reportForm' }}
				fields={reportFormFields}
				onSubmit={console.log}
			/>

			{!showForm && <span className="">Loading...</span>}

			<iframe
				src={formURL}
				width="100%"
				height="100%"
				onLoad={handleIframeLoad}
				className={`${showForm ? 'block' : 'hidden'}`}
			>
				<span className="">Loading...</span>
			</iframe>
		</>
	)
}

export default Report
