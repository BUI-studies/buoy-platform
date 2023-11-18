import { forwardRef } from 'react'

import { Populated } from '@/types'
import { FormBuilderTypes } from '@/utils'

const InputsByType = Object.freeze({
	[FormBuilderTypes.FIELD_TYPES.SELECT]: forwardRef<HTMLSelectElement, Populated>(
		({ options, ...props }, ref) => (
			<select
				{...props}
				ref={ref}
				defaultValue={'null'}
			>
				<option
					key={'nullableValue' + props.name}
					value="null"
					disabled
				>
					--none--
				</option>
				{(options as FormBuilderTypes.SelectOption[])?.map(({ label, value }) => (
					<option
						key={label + value}
						value={value}
					>
						{label}
					</option>
				))}
			</select>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.MULTI_SELECT]: forwardRef<HTMLSelectElement, Populated>(
		({ options, name, ...props }, ref) => (
			<fieldset
				{...props}
				ref={ref}
				defaultValue={'null'}
			>
				{(options as FormBuilderTypes.SelectOption[])?.map(({ label, value }) => (
					<label key={label + value}>
						<input
							type="checkbox"
							name={name}
							value={value}
						/>
						{label}
					</label>
				))}
			</fieldset>
		),
	),
	[FormBuilderTypes.FIELD_TYPES.BUTTON]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FormBuilderTypes.FIELD_TYPES.BUTTON}
			{...props}
		/>
	)),
	[FormBuilderTypes.FIELD_TYPES.CHECKBOX]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FormBuilderTypes.FIELD_TYPES.CHECKBOX}
			{...props}
		/>
	)),
	[FormBuilderTypes.FIELD_TYPES.COLOR]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FormBuilderTypes.FIELD_TYPES.COLOR}
			{...props}
		/>
	)),
	[FormBuilderTypes.FIELD_TYPES.DATE]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FormBuilderTypes.FIELD_TYPES.DATE}
			{...props}
		/>
	)),
	[FormBuilderTypes.FIELD_TYPES.DATETIME]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FormBuilderTypes.FIELD_TYPES.DATETIME}
			{...props}
		/>
	)),
	[FormBuilderTypes.FIELD_TYPES.EMAIL]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FormBuilderTypes.FIELD_TYPES.EMAIL}
			{...props}
		/>
	)),
	[FormBuilderTypes.FIELD_TYPES.FILE]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FormBuilderTypes.FIELD_TYPES.FILE}
			{...props}
		/>
	)),
	[FormBuilderTypes.FIELD_TYPES.HIDDEN]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FormBuilderTypes.FIELD_TYPES.HIDDEN}
			{...props}
		/>
	)),
	[FormBuilderTypes.FIELD_TYPES.IMAGE]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FormBuilderTypes.FIELD_TYPES.IMAGE}
			{...props}
		/>
	)),
	[FormBuilderTypes.FIELD_TYPES.MONTH]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FormBuilderTypes.FIELD_TYPES.MONTH}
			{...props}
		/>
	)),
	[FormBuilderTypes.FIELD_TYPES.NUMBER]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FormBuilderTypes.FIELD_TYPES.NUMBER}
			{...props}
		/>
	)),
	[FormBuilderTypes.FIELD_TYPES.PASSWORD]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FormBuilderTypes.FIELD_TYPES.PASSWORD}
			{...props}
		/>
	)),
	[FormBuilderTypes.FIELD_TYPES.RADIO]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FormBuilderTypes.FIELD_TYPES.RADIO}
			{...props}
		/>
	)),
	[FormBuilderTypes.FIELD_TYPES.RANGE]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FormBuilderTypes.FIELD_TYPES.RANGE}
			{...props}
		/>
	)),
	[FormBuilderTypes.FIELD_TYPES.RESET]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FormBuilderTypes.FIELD_TYPES.RESET}
			{...props}
		/>
	)),
	[FormBuilderTypes.FIELD_TYPES.SEARCH]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FormBuilderTypes.FIELD_TYPES.SEARCH}
			{...props}
		/>
	)),
	[FormBuilderTypes.FIELD_TYPES.SUBMIT]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FormBuilderTypes.FIELD_TYPES.SUBMIT}
			{...props}
		/>
	)),
	[FormBuilderTypes.FIELD_TYPES.TEL]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FormBuilderTypes.FIELD_TYPES.TEL}
			{...props}
		/>
	)),
	[FormBuilderTypes.FIELD_TYPES.TEXT]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FormBuilderTypes.FIELD_TYPES.TEXT}
			{...props}
		/>
	)),
	[FormBuilderTypes.FIELD_TYPES.TEXTAREA]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<textarea
			ref={ref}
			type={FormBuilderTypes.FIELD_TYPES.TEXT}
			{...props}
		/>
	)),
	[FormBuilderTypes.FIELD_TYPES.TIME]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FormBuilderTypes.FIELD_TYPES.TIME}
			{...props}
		/>
	)),
	[FormBuilderTypes.FIELD_TYPES.URL]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FormBuilderTypes.FIELD_TYPES.URL}
			{...props}
		/>
	)),
	[FormBuilderTypes.FIELD_TYPES.WEEK]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FormBuilderTypes.FIELD_TYPES.WEEK}
			{...props}
		/>
	)),
})

export default InputsByType
