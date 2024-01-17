import { FieldError, FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { FormBuilder, FormBuilderTypes } from '@/utils'

import '../FormBuilder.scss'
import { getInputClassesByType } from '../helper'

const Form = <T extends FieldValues>({
	formProps,
	fields = [],
	schema,
	classes,
	onSubmit,
	watchers,
}: FormBuilderTypes.FormProps<T>): JSX.Element => {
	if (!classes) classes = FormBuilder.defaultClasses
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
		control,
		reset,
	} = useForm({
		mode: 'onTouched',
		resolver: yupResolver(schema),
	})

	watchers && watchers(watch)

	return (
		<form
			{...formProps}
			onSubmit={handleSubmit(data => {
				onSubmit(data as T)
				reset()
			})}
			className={classes.form}
		>
			{fields.map(
				({ defaultValue, type, name: fieldName, label, options, value, ...restProps }) => (
					<FormBuilder.Input
						key={fieldName + type}
						type={type}
						label={label}
						defaultValue={defaultValue}
						options={options}
						value={value}
						control={control}
						doRegister={() =>
							register(fieldName, {
								...restProps,
							})
						}
						classes={getInputClassesByType(type, classes as FormBuilderTypes.FieldClasses)}
						error={errors?.[fieldName] as FieldError}
						disabled={type === FormBuilderTypes.FIELD_TYPES.SUBMIT && !isValid}
					/>
				),
			)}
		</form>
	)
}

export default Form
