import { FeedbackByRole, Meeting, useFeedbackMutation, useMeetings } from '@/api'

import { FormBuilder, FormBuilderTypes } from '@/utils'

import { useAuth } from '@/context'
import { ROLES } from '@/types'
import { Loader } from '@/components'

import { getFeedbackFormFields, getFeedbackSchema } from './Feedback.helper'

const Feedback = () => {
	const auth = useAuth()
	const lastMeetings = useMeetings(10)
	const feedbackMutation = useFeedbackMutation()

	if (lastMeetings.isLoading) return <Loader />

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
				onSubmit={(values: FeedbackByRole<ROLES>) => {
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
				mutation={feedbackMutation}
			/>
		</>
	)
}

export default Feedback
