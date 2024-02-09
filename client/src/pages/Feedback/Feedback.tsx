import { Feedback as FeedbackModel, Meeting, useFeedbackMutation, useMeetings } from '@/api'

import { FormBuilder, FormBuilderTypes } from '@/utils'

import { getFeedbackFormFields, getFeedbackSchema } from './Feedback.helper'
import { useAuth } from '@/context'

const Feedback = () => {
	const auth = useAuth()
	const lastMeetings = useMeetings(10)
	const feedbackMutation = useFeedbackMutation()

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
				onSubmit={(values: FeedbackModel) => {
					if (!auth.user?.data?.data?._id)
						throw new Error(
							'Something really nasty happened. There is no authorised user, but you are trying to create a feedback.',
						)

					feedbackMutation.mutate({
						...values,
						student: auth.user?.data?.data?._id,
						date: new Date(),
					})
				}}
			/>
		</>
	)
}

export default Feedback
