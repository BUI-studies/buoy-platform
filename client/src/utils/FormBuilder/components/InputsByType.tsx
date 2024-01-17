import { useState, forwardRef } from 'react'
import { Controller } from 'react-hook-form'

import { Populated } from '@/types'
import { FormBuilderTypes } from '@/utils'

const InputsByType = Object.freeze({
	[FormBuilderTypes.FIELD_TYPES.SELECT]: forwardRef<HTMLSelectElement, Populated>(
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
	[FormBuilderTypes.FIELD_TYPES.MULTI_SELECT]: forwardRef<HTMLFieldSetElement, Populated>(
		({ options, name, classes, control, onChange: _, ...props }, ref) => {
			return (
				<Controller
					name={name}
					control={control}
					render={({ field: { value = [], onChange } }) => (
						<fieldset
							className={classes.select}
							{...props}
						>
							{options.map(({ label, value: optionValue }: FormBuilderTypes.SelectOption) => (
								<label
									key={label + optionValue}
									className={classes.label}
								>
									<input
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
		},
	),
	[FormBuilderTypes.FIELD_TYPES.BUTTON]: forwardRef<HTMLInputElement, Populated>(
		({ classes, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.BUTTON}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.CHECKBOX]: forwardRef<HTMLInputElement, Populated>(
		({ classes, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.CHECKBOX}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.COLOR]: forwardRef<HTMLInputElement, Populated>(
		({ classes, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.COLOR}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.DATE]: forwardRef<HTMLInputElement, Populated>(
		({ classes, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.DATE}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.DATETIME]: forwardRef<HTMLInputElement, Populated>(
		({ classes, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.DATETIME}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.EMAIL]: forwardRef<HTMLInputElement, Populated>(
		({ classes, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.EMAIL}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.FILE]: forwardRef<HTMLInputElement, Populated>(
		({ classes, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.FILE}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.HIDDEN]: forwardRef<HTMLInputElement, Populated>(
		({ classes, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.HIDDEN}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.IMAGE]: forwardRef<HTMLInputElement, Populated>(
		({ classes, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.IMAGE}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.MONTH]: forwardRef<HTMLInputElement, Populated>(
		({ classes, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.MONTH}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.NUMBER]: forwardRef<HTMLInputElement, Populated>(
		({ classes, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.NUMBER}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.PASSWORD]: forwardRef<HTMLInputElement, Populated>(
		({ classes, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.PASSWORD}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.RADIO]: forwardRef<HTMLInputElement, Populated>(
		({ classes, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.RADIO}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.RANGE]: forwardRef<HTMLInputElement, Populated>(
		({ classes, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.RANGE}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.RESET]: forwardRef<HTMLInputElement, Populated>(
		({ classes, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.RESET}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.SEARCH]: forwardRef<HTMLInputElement, Populated>(
		({ classes, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.SEARCH}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.SUBMIT]: forwardRef<HTMLButtonElement, Populated>(
		({ classes, value, control, type, name, ...props }, ref) => (
			<button
				ref={ref}
				className={classes.button}
				{...props}
			>
				{value}
			</button>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.TEL]: forwardRef<HTMLInputElement, Populated>(
		({ classes, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.TEL}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.TEXT]: forwardRef<HTMLInputElement, Populated>(
		({ classes, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.TEXT}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.TEXTAREA]: forwardRef<HTMLTextAreaElement, Populated>(
		({ classes, ...props }, ref) => (
			<textarea
				ref={ref}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.TIME]: forwardRef<HTMLInputElement, Populated>(
		({ classes, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.TIME}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.URL]: forwardRef<HTMLInputElement, Populated>(
		({ classes, ...props }, ref) => (
			<input
				ref={ref}
				type={FormBuilderTypes.FIELD_TYPES.URL}
				className={classes.input}
				{...props}
			/>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.WEEK]: forwardRef<HTMLInputElement, Populated>(
		({ classes, ...props }, ref) => (
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
