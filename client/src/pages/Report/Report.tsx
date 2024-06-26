import { useActiveUsersByMentor, useMeetingMutation, Meeting } from '@/api'
import { useAuth } from '@/context'
import { FormBuilderTypes, FormBuilder } from '@/utils'

import { Loader } from '@/components'

import { getReportFormFields, reportSchema } from './Report.helper'

const Report = () => {
	const auth = useAuth()
	const mutation = useMeetingMutation()
	const students = useActiveUsersByMentor(auth.user?.data?.data?._id)

	if (students.isLoading) return <Loader />

	const studentsOptions: FormBuilderTypes.SelectOption[] = students.data.map(
		(student: { fullName: string; _id: string }) => ({
			label: student.fullName,
			value: student._id,
		}),
	)

	const handleSaveMeeting = async (data: Meeting) => {
		if (!auth.user?.data?.data?._id) return

		mutation.mutate({
			...data,
			mentor: auth.user?.data?.data?._id,
			date: new Date(),
		})
	}

	return (
		<FormBuilder.Form<Meeting>
			formProps={{ name: 'reportForm' }}
			fields={getReportFormFields(studentsOptions)}
			schema={reportSchema}
			onSubmit={handleSaveMeeting}
		/>
	)
}

export default Report
