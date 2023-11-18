import { FC } from 'react'
import { FormBuilderTypes } from '@/utils'

import InputsByType from './InputsByType'

const Input: FC<FormBuilderTypes.InputProps> = ({
	defaultValue,
	label,
	type,
	classes,
	error,
	options,
	doRegister,
}) => {
	const errorMessage = error?.message
	const InputComponent = InputsByType[type] || InputsByType.text
	const inputRenderable = (
		<InputComponent
			defaultValue={defaultValue}
			options={options}
			{...doRegister()}
		/>
	)

	if (
		!label ||
		type === FormBuilderTypes.FIELD_TYPES.BUTTON ||
		type === FormBuilderTypes.FIELD_TYPES.SUBMIT
	)
		return inputRenderable

	return (
		<label className={classes?.label}>
			{label}
			{inputRenderable}
			{error && <span className={classes?.error}>{errorMessage}</span>}
		</label>
	)
}

export default Input
