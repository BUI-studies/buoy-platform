import * as yup from 'yup'

import { FormBuilderTypes } from '@/utils'
import { ERRORS } from '@/enums'

export const getFeedbackSchema = (meetingOptions: string[]) =>
	yup.object().shape({
		meeting: yup.string().oneOf(meetingOptions, ERRORS.selectNoValue).required(ERRORS.required),
		impression: yup.string().required(ERRORS.required),
		understanding: yup.string().required(ERRORS.required),
		mentoring: yup.string().required(ERRORS.required),
		selfFeeling: yup.string().required(ERRORS.required),
		teamwork: yup.string().required(ERRORS.required),
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
		options: [
			{
				label: '🤩🥳🔥🥰',
				value: '5',
			},
			{
				label: '😍🥰😘',
				value: '4',
			},
			{
				label: '😊🙂😀',
				value: '3',
			},
			{
				label: '😐😑😶',
				value: '2',
			},
			{
				label: '😒😕😐',
				value: '1',
			},
			{
				label: '💩🤢🤮🤡',
				value: '0',
			},
		],
	},
	{
		type: FormBuilderTypes.FIELD_TYPES.MULTI_RADIO,
		name: 'understanding',
		label: 'Оціни рівень зрозумілості теми.',
		options: [
			{
				label: '😎 Ізі катка, я можу вчити інших',
				value: '4',
			},
			{
				label: '🤗 Цілком зрозуміло',
				value: '3',
			},
			{
				label: '🤔 Трохи заплутано, але розібрались',
				value: '2',
			},
			{
				label: '🫤 Погано зрозуміло, треба повторити',
				value: '1',
			},
			{
				label: '😭 Зовсім не зрозуміло',
				value: '0',
			},
		],
	},
	{
		type: FormBuilderTypes.FIELD_TYPES.MULTI_RADIO,
		name: 'mentoring',
		label: 'Що там ментор, звертався до тебе? Задавав запитання, давав завдання, питав твою думку?',
		options: [
			{
				label: '😢 Про мене сьогодні забули',
				value: '0',
			},
			{
				label: '😂 Так, ментор відволікав мене від навчання своїми тупими задачами і запитаннями',
				value: '1',
			},
		],
	},
	{
		type: FormBuilderTypes.FIELD_TYPES.MULTI_RADIO,
		name: 'selfFeeling',
		label: 'А ти там шо? Що по ініціативі? Задавав/ла запитання, брав/ла участь у дискусіях?',
		options: [
			{
				label: "🤪 моє перше ім'я – гіпер, а друге – активність, а третє в паспорті",
				value: '2',
			},
			{
				label: '🙂 шось було',
				value: '1',
			},
			{
				label: '😵 я труп, мене нема',
				value: '0',
			},
		],
	},
	{
		type: FormBuilderTypes.FIELD_TYPES.MULTI_RADIO,
		name: 'teamwork',
		label: 'А команда шо?',
		options: [
			{
				label: '🐺 Я працюю наодинці',
				value: '0',
			},
			{
				label: '🐸🐍 *були конфлікти*',
				value: '1',
			},
			{
				label: '🦞 Вони раки, але смачні',
				value: '2',
			},
			{
				label: '🐈 Всі котики, мяу',
				value: '3',
			},
		],
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
