import { useAuth } from '@/context'
import { FIELD_TYPES, FormBuilder, SelectOption } from '@/utils'
import { useEffect, useState } from 'react'
import { set } from 'react-hook-form'

const Report = () => {
	const auth = useAuth()
	console.log(auth)
	const [showForm, setShowForm] = useState(false)
	const formURL =
		'https://docs.google.com/forms/d/e/1FAIpQLSeBwCg7E1-awS8q04SyE2PCv4IfUD6HvqglhudG3qyna06o3Q/viewform?embedded=true'
	const handleIframeLoad = () => {
		setShowForm(true)
	}

	const [students, setStudents] = useState<SelectOption[] | never[]>([])

	useEffect(() => {
		fetch(`/api/users?mentor=${auth.user?.data?.data?._id}&role=student`)
			.then(res => res.json())
			.then(data => {
				const studentsOptions: SelectOption[] = data.map(
					(student: { fullName: string; _id: string }) => ({
						label: student.fullName,
						value: student._id,
					}),
				)

				setStudents(studentsOptions)
			})
	}, [])

	const reportFormFields = [
		{ type: FIELD_TYPES.URL, name: 'title', label: 'title of the meeting' },
		{
			type: FIELD_TYPES.SELECT,
			name: 'type',
			label: 'Meeting type',
			options: [
				{ label: 'individual', value: 'individual' },
				{ label: 'planning', value: 'planing' },
				{ label: 'sync', value: 'sync' },
			],
		},
		{
			type: FIELD_TYPES.MULTI_SELECT,
			name: 'students',
			label: 'Who was there?',
			options: students,
		},
		{
			type: FIELD_TYPES.URL,
			name: 'report',
			label: 'Link to the report file?',
		},
		{
			type: FIELD_TYPES.TEXTAREA,
			name: 'comment',
			label: 'Comment',
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
