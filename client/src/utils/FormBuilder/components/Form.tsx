import { FC } from 'react'
import { FieldError, useForm } from 'react-hook-form'

import { FormBuilder, FormBuilderTypes } from '@/utils'

import '../FormBuilder.scss'

const Form: FC<FormBuilderTypes.FormProps> = ({
	formProps,
	fields = [],
	classes,
	onSubmit,
	watchers,
}) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm()

	watchers && watchers(watch)

	return (
		<form
			{...formProps}
			onSubmit={handleSubmit(onSubmit)}
			className={classes?.form}
		>
			{fields.map(({ defaultValue, type, name: fieldName, label, options, ...restProps }) => (
				<FormBuilder.Input
					key={fieldName + type}
					type={type}
					label={label}
					defaultValue={defaultValue}
					options={options}
					doRegister={() => register(fieldName, { ...restProps })}
					classes={{
						label: classes?.label,
						input: classes?.input,
					}}
					error={errors?.[fieldName] as FieldError}
				/>
			))}
		</form>
	)
}

export default Form
