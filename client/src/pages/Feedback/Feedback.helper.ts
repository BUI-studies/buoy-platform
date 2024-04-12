import * as yup from 'yup'

import { FormBuilderTypes } from '@/utils'
import { ERRORS } from '@/enums'
import { feedbacksReactionsMap } from '@/helpers'

export const getFeedbackSchema = (meetingOptions: string[]) =>
	yup.object().shape({
		meeting: yup.string().oneOf(meetingOptions, ERRORS.selectNoValue).required(ERRORS.required),
		impression: yup.string().required(ERRORS.required),
		understanding: yup.string().required(ERRORS.required),
		mentoring: yup.string().required(ERRORS.required),
		selfFeeling: yup.string().required(ERRORS.required),
		teamwork: yup.string().required(ERRORS.required),
		insides: yup.string().min(5, ERRORS.minLength).required(ERRORS.required),
		downsides: yup.string().min(5, ERRORS.minLength).required(ERRORS.required),
		comment: yup.string().min(5, ERRORS.minLength).required(ERRORS.required),
	})

export const getFeedbackFormFields = (
	lastMeetingsOptions: FormBuilderTypes.SelectOption[],
): FormBuilderTypes.Field[] => [
	{
		type: FormBuilderTypes.FIELD_TYPES.SELECT,
		name: 'meeting',
		label: 'Meeting',
		options: lastMeetingsOptions,
	},
	{
		type: FormBuilderTypes.FIELD_TYPES.MULTI_RADIO,
		name: 'impression',
		label: 'Твоє враження',
		description:
			"Як тобі взагалі? Чекаю твою суб'єктивну інтуїтивну емоційну відповідь. Це обов'язкове питання. Без суб'єктиву і оцінок в розвитку, нажаль, ніяк.",
		options: feedbacksReactionsMap.impressions,
	},
	{
		type: FormBuilderTypes.FIELD_TYPES.MULTI_RADIO,
		name: 'understanding',
		label: 'Оціни рівень зрозумілості теми.',
		options: feedbacksReactionsMap.understanding,
	},
	{
		type: FormBuilderTypes.FIELD_TYPES.MULTI_RADIO,
		name: 'mentoring',
		label: 'Що там ментор, звертався до тебе? Задавав запитання, давав завдання, питав твою думку?',
		options: feedbacksReactionsMap.mentoring,
	},
	{
		type: FormBuilderTypes.FIELD_TYPES.MULTI_RADIO,
		name: 'selfFeeling',
		label: 'А ти там шо? Що по ініціативі? Задавав/ла запитання, брав/ла участь у дискусіях?',
		options: feedbacksReactionsMap.selfFeeling,
	},
	{
		type: FormBuilderTypes.FIELD_TYPES.MULTI_RADIO,
		name: 'teamwork',
		label: 'А команда шо?',
		options: feedbacksReactionsMap.teamwork,
	},
	{
		type: FormBuilderTypes.FIELD_TYPES.TEXTAREA,
		name: 'insides',
		label: 'Якісь корисні інсайди?',
		description:
			'Шось, шо прийло тобі в голову протягом зустрічі, пофіг шо в цілому. Просто поділись, шоб нам обом стало трошки тепліше))',
	},
	{
		type: FormBuilderTypes.FIELD_TYPES.TEXTAREA,
		name: 'downsides',
		label: 'Де ми лохи? Що порадиш покращити/змінити?',
		description:
			'Не бійся, ніхто не побачить шо це написав саме ти. Нам дуже важливо знати про моменти які здавались фіговими, бо якшо ти не даси нам про це знати, ми нічо і не виправимо, бо як інакше ми дізнаємось.',
	},
	{
		type: FormBuilderTypes.FIELD_TYPES.TEXTAREA,
		name: 'comment',
		label: 'Коментар',
		description: 'Тут уже як твоя фантазія плясатиме, так і фігач.',
	},
	{
		type: FormBuilderTypes.FIELD_TYPES.CHECKBOX,
		name: 'isMentorVisible',
		label: 'Показати ментору?',
		description:
			'Відміть, якщо хочеш, щоб ментор побачив твої відповіді. Ми покажемо йому все окрім твого імені, тому можеш бути спокійним за анонімність😉👌🏻',
		text: 'Ай, чорт з ним, показуй!',
	},
	{
		type: FormBuilderTypes.FIELD_TYPES.SUBMIT,
		name: 'submit',
		value: 'Save Feedback',
	},
]
