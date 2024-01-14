import { FC } from 'react'
import { FieldError, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { FormBuilder, FormBuilderTypes } from '@/utils'

import '../FormBuilder.scss'
import { getInputClassesByType } from '../helper'

const Form: FC<FormBuilderTypes.FormProps> = ({
	formProps,
	fields = [],
	schema,
	classes = FormBuilder.defaultClasses,
	onSubmit,
	watchers,
}) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		control,
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema),
	})

	watchers && watchers(watch)

	return (
		<form
			{...formProps}
			onSubmit={handleSubmit(onSubmit)}
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
						doRegister={() => register(fieldName, { ...restProps })}
						classes={getInputClassesByType(type, classes)}
						error={errors?.[fieldName] as FieldError}
					/>
				),
			)}
		</form>
	)
}

export default Form
