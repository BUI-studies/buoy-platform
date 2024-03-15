import { forwardRef } from 'react'
import { Controller, Control, FieldValues } from 'react-hook-form'

import { Populated } from '@/types'
import { FormBuilderTypes } from '@/utils'

type WithClassesProp = Populated & {
	classes: FormBuilderTypes.FieldClasses
}

type WithTextProp = Populated & {
	text: string
}

type WithValueProp = Populated & {
	value: string
}

type MultiSelectComponentProps = Populated & {
	name: string
	options: FormBuilderTypes.SelectOption[]
	classes: FormBuilderTypes.FieldClasses
	control: Control<FieldValues>
}

const InputsByType = Object.freeze({
	[FormBuilderTypes.FIELD_TYPES.SELECT]: forwardRef<HTMLSelectElement, WithClassesProp>(
		({ options, classes, control: _, ...props }, ref) => (
			<select
				{...props}
				ref={ref}
				defaultValue={'null'}
				className={classes?.select}
			>
				<option
					key={'nullableValue' + props.name}
					value="null"
					disabled
					className={classes?.option}
				>
					--none--
				</option>
				{(options as FormBuilderTypes.SelectOption[])?.map(({ label, value }) => (
					<option
						key={label + value}
						value={value}
						className={classes?.option}
					>
						{label}
					</option>
				))}
			</select>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.MULTI_SELECT]: forwardRef<
		HTMLFieldSetElement & Populated,
		MultiSelectComponentProps
	>(({ options, name, classes, control, onChange: _, onBlur, ...props }) => {
		return (
			<Controller
				name={name}
				control={control}
				render={({ field: { value = [], onChange } }) => (
					<fieldset
						name={name}
						className={classes.select}
						{...props}
					>
						{options.map(({ label, value: optionValue }: FormBuilderTypes.SelectOption) => (
							<label
								key={label + optionValue}
								className={[
									classes.label,
									value?.includes(optionValue) ? classes.labelSelected : '',
								].join(' ')}
							>
								<input
									name={name}
									type="checkbox"
									value={optionValue}
									className={classes.option}
									checked={value?.includes(optionValue)}
									onChange={e => {
										const updatedValues = e.target.checked
											? [...value, optionValue]
											: (value as string[]).filter(val => val !== optionValue)
										onChange(updatedValues)
									}}
								/>
								{label}
							</label>
						))}
					</fieldset>
				)}
			/>
		)
	}),
	[FormBuilderTypes.FIELD_TYPES.BUTTON]: forwardRef<HTMLInputElement, WithClassesProp>(
		({ classes, control: _, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.BUTTON}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.CHECKBOX]: forwardRef<
		HTMLInputElement,
		WithClassesProp & WithTextProp
	>(({ classes, control: _, text, ...props }, ref) => (
		<label className={classes.checkbox}>
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.CHECKBOX}
				className={classes.input}
				{...props}
			/>
			{text}
		</label>
	)),
	[FormBuilderTypes.FIELD_TYPES.COLOR]: forwardRef<HTMLInputElement, WithClassesProp>(
		({ classes, control: _, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.COLOR}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.DATE]: forwardRef<HTMLInputElement, WithClassesProp>(
		({ classes, control: _, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.DATE}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.DATETIME]: forwardRef<HTMLInputElement, WithClassesProp>(
		({ classes, control: _, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.DATETIME}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.EMAIL]: forwardRef<HTMLInputElement, WithClassesProp>(
		({ classes, control: _, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.EMAIL}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.FILE]: forwardRef<HTMLInputElement, WithClassesProp>(
		({ classes, control: _, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.FILE}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.HIDDEN]: forwardRef<HTMLInputElement, WithClassesProp>(
		({ classes, control: _, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.HIDDEN}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.IMAGE]: forwardRef<HTMLInputElement, WithClassesProp>(
		({ classes, control: _, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.IMAGE}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.MONTH]: forwardRef<HTMLInputElement, WithClassesProp>(
		({ classes, control: _, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.MONTH}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.NUMBER]: forwardRef<HTMLInputElement, WithClassesProp>(
		({ classes, control: _, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.NUMBER}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.PASSWORD]: forwardRef<HTMLInputElement, WithClassesProp>(
		({ classes, control: _, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.PASSWORD}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.RADIO]: forwardRef<
		HTMLInputElement,
		WithClassesProp & WithTextProp
	>(({ classes, control: _, text, ...props }, ref) => (
		<label className={classes.label}>
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.RADIO}
				className={classes.input}
				{...props}
			/>
			{text}
		</label>
	)),
	[FormBuilderTypes.FIELD_TYPES.MULTI_RADIO]: forwardRef<
		HTMLInputElement,
		MultiSelectComponentProps
	>(({ classes, name, options, control }) => {
		return (
			<Controller
				name={name}
				control={control}
				render={({ field: { value, onChange } }) => (
					<fieldset className={classes.radio}>
						{options.map(({ label, value: optionValue }: FormBuilderTypes.SelectOption) => (
							<label
								key={label + optionValue}
								className={[classes.label, value === optionValue ? classes.labelSelected : ''].join(
									' ',
								)}
							>
								<input
									name={name}
									type="radio"
									value={optionValue}
									className={classes.option}
									checked={value === optionValue}
									onChange={() => onChange(optionValue)}
								/>
								{label}
							</label>
						))}
					</fieldset>
				)}
			/>
		)
	}),
	[FormBuilderTypes.FIELD_TYPES.RANGE]: forwardRef<HTMLInputElement, WithClassesProp>(
		({ classes, control: _, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.RANGE}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.RESET]: forwardRef<HTMLInputElement, WithClassesProp>(
		({ classes, control: _, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.RESET}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.SEARCH]: forwardRef<HTMLInputElement, WithClassesProp>(
		({ classes, control: _, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.SEARCH}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.SUBMIT]: forwardRef<
		HTMLButtonElement,
		WithClassesProp & WithValueProp
	>(({ classes, value, control: _, type, name, ...props }, ref) => (
		<button
			ref={ref}
			type={FormBuilderTypes.FIELD_TYPES.SUBMIT}
			className={classes.button}
			{...props}
		>
			{value}
		</button>
	)),
	[FormBuilderTypes.FIELD_TYPES.TEL]: forwardRef<HTMLInputElement, WithClassesProp>(
		({ classes, control: _, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.TEL}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.TEXT]: forwardRef<HTMLInputElement, WithClassesProp>(
		({ classes, control: _, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.TEXT}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.TEXTAREA]: forwardRef<HTMLTextAreaElement, WithClassesProp>(
		({ classes, control: _, ...props }, ref) => (
			<textarea
				ref={ref}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.TIME]: forwardRef<HTMLInputElement, WithClassesProp>(
		({ classes, control: _, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.TIME}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.URL]: forwardRef<HTMLInputElement, WithClassesProp>(
		({ classes, control: _, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.URL}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.WEEK]: forwardRef<HTMLInputElement, WithClassesProp>(
		({ classes, control: _, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.WEEK}
				className={classes.input}
				{...props}
			/>
		),
	),
})

export default InputsByType
