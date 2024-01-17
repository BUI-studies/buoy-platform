import { useMeetings } from '@/api'
import { Meeting } from '@/types'
import { FormBuilder, FormBuilderTypes } from '@/utils'

import { getFeedbackFormFields, getFeedbackSchema } from './Feedback.helper'

const Feedback = () => {
	const lastMeetings = useMeetings(10)
	if (lastMeetings.isLoading) return <span>Loading...</span>

	const lastMeetingsOptions: FormBuilderTypes.SelectOption[] = lastMeetings.data?.map(
		(meeting: Meeting) => ({
			value: meeting._id,
			label: meeting.title,
		}),
	)

	return (
		<>
			<FormBuilder.Form
				mode="onBlur"
				formProps={{ name: 'feedbackForm' }}
				fields={getFeedbackFormFields(lastMeetingsOptions)}
				schema={getFeedbackSchema(lastMeetingsOptions.map(o => o.value))}
				onSubmit={console.log}
				watchers={watch => {
					console.log(watch('meeting'))
				}}
			/>
		</>
	)
}

export default Feedback
