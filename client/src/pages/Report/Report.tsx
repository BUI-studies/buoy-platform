import { useEffect, useState } from 'react'

import { Meeting, useAuth } from '@/context'
import { FormBuilderTypes, FormBuilder } from '@/utils'

import { reportFormFields, reportSchema } from './Report.helper'

const Report = () => {
	const auth = useAuth()
	const [showForm, setShowForm] = useState(false)
	const formURL =
		'https://docs.google.com/forms/d/e/1FAIpQLSeBwCg7E1-awS8q04SyE2PCv4IfUD6HvqglhudG3qyna06o3Q/viewform?embedded=true'
	const handleIframeLoad = () => {
		setShowForm(true)
	}

	const [students, setStudents] = useState<FormBuilderTypes.SelectOption[]>([])

	const handleSaveMeeting = (data: Meeting) => {
		console.log(data)
	}

	useEffect(() => {
		//TODO: make it pretty! move it somewhere else from useEffect
		fetch(`/api/users?mentor=${auth.user?.data?.data?._id}&role=student&status=active`)
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

	return (
		<>
			{!students.length ? (
				<span className="">Loading form...</span>
			) : (
				<FormBuilder.Form<Meeting>
					formProps={{ name: 'reportForm' }}
					fields={reportFormFields(students as FormBuilderTypes.SelectOption[])}
					schema={reportSchema}
					onSubmit={handleSaveMeeting}
				/>
			)}

			{!showForm && <span className="">Loading iframe...</span>}

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
