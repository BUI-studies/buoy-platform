import { FC } from 'react'
import { FormBuilderTypes } from '@/utils'

import InputsByType from './InputsByType'

const Input: FC<FormBuilderTypes.InputProps> = ({
	defaultValue,
	label,
	description,
	type,
	classes,
	error,
	options,
	value,
	control,
	disabled,
	doRegister,
}) => {
	const errorMessage = error?.message
	const InputComponent = InputsByType[type] || InputsByType.text
	const registeredProps = type !== FormBuilderTypes.FIELD_TYPES.SUBMIT ? doRegister() : {}
	const inputRenderable = (
		<InputComponent
			defaultValue={defaultValue}
			options={options}
			value={value}
			classes={classes}
			control={control}
			disabled={disabled}
			{...registeredProps}
		/>
	)
	const WrapperCompnent =
		type === FormBuilderTypes.FIELD_TYPES.MULTI_SELECT ||
		type === FormBuilderTypes.FIELD_TYPES.MULTI_RADIO
			? 'div'
			: 'label'

	if (
		!label ||
		type === FormBuilderTypes.FIELD_TYPES.BUTTON ||
		type === FormBuilderTypes.FIELD_TYPES.SUBMIT
	)
		return inputRenderable

	return (
		<WrapperCompnent className={classes.label}>
			{label}
			{description && <span className={classes.text}>{description}</span>}
			{inputRenderable}
			{error && <span className={classes.error}>{errorMessage}</span>}
		</WrapperCompnent>
	)
}

export default Input
