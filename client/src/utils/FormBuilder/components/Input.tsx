import { FC, forwardRef } from 'react'
import { FIELD_TYPES, InputProps, SelectOption } from '@/utils'
import { Populated } from '@/types'

const InputsByType = Object.freeze({
	[FIELD_TYPES.SELECT]: forwardRef<HTMLSelectElement, Populated>(({ options, ...props }, ref) => (
		<select
			{...props}
			ref={ref}
			defaultValue={'null'}
		>
			<option
				value="null"
				selected
				disabled
			>
				--none--
			</option>
			{(options as SelectOption[])?.map(({ label, value }) => (
				<option value={value}>{label}</option>
			))}
		</select>
	)),
	[FIELD_TYPES.MULTI_SELECT]: forwardRef<HTMLSelectElement, Populated>(
		({ options, name, ...props }, ref) => (
			<fieldset
				{...props}
				ref={ref}
				defaultValue={'null'}
			>
				{(options as SelectOption[])?.map(({ label, value }) => (
					<label>
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
	[FIELD_TYPES.BUTTON]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FIELD_TYPES.BUTTON}
			{...props}
		/>
	)),
	[FIELD_TYPES.CHECKBOX]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FIELD_TYPES.CHECKBOX}
			{...props}
		/>
	)),
	[FIELD_TYPES.COLOR]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FIELD_TYPES.COLOR}
			{...props}
		/>
	)),
	[FIELD_TYPES.DATE]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FIELD_TYPES.DATE}
			{...props}
		/>
	)),
	[FIELD_TYPES.DATETIME]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FIELD_TYPES.DATETIME}
			{...props}
		/>
	)),
	[FIELD_TYPES.EMAIL]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FIELD_TYPES.EMAIL}
			{...props}
		/>
	)),
	[FIELD_TYPES.FILE]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FIELD_TYPES.FILE}
			{...props}
		/>
	)),
	[FIELD_TYPES.HIDDEN]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FIELD_TYPES.HIDDEN}
			{...props}
		/>
	)),
	[FIELD_TYPES.IMAGE]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FIELD_TYPES.IMAGE}
			{...props}
		/>
	)),
	[FIELD_TYPES.MONTH]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FIELD_TYPES.MONTH}
			{...props}
		/>
	)),
	[FIELD_TYPES.NUMBER]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FIELD_TYPES.NUMBER}
			{...props}
		/>
	)),
	[FIELD_TYPES.PASSWORD]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FIELD_TYPES.PASSWORD}
			{...props}
		/>
	)),
	[FIELD_TYPES.RADIO]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FIELD_TYPES.RADIO}
			{...props}
		/>
	)),
	[FIELD_TYPES.RANGE]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FIELD_TYPES.RANGE}
			{...props}
		/>
	)),
	[FIELD_TYPES.RESET]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FIELD_TYPES.RESET}
			{...props}
		/>
	)),
	[FIELD_TYPES.SEARCH]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FIELD_TYPES.SEARCH}
			{...props}
		/>
	)),
	[FIELD_TYPES.SUBMIT]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FIELD_TYPES.SUBMIT}
			{...props}
		/>
	)),
	[FIELD_TYPES.TEL]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FIELD_TYPES.TEL}
			{...props}
		/>
	)),
	[FIELD_TYPES.TEXT]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FIELD_TYPES.TEXT}
			{...props}
		/>
	)),
	[FIELD_TYPES.TEXTAREA]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<textarea
			ref={ref}
			type={FIELD_TYPES.TEXT}
			{...props}
		/>
	)),
	[FIELD_TYPES.TIME]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FIELD_TYPES.TIME}
			{...props}
		/>
	)),
	[FIELD_TYPES.URL]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FIELD_TYPES.URL}
			{...props}
		/>
	)),
	[FIELD_TYPES.WEEK]: forwardRef<HTMLInputElement, Populated>((props, ref) => (
		<input
			ref={ref}
			type={FIELD_TYPES.WEEK}
			{...props}
		/>
	)),
})

const Input: FC<InputProps> = ({
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
	return (
		<label className={classes?.label}>
			{label}
			<InputComponent
				defaultValue={defaultValue}
				options={options}
				{...doRegister()}
			/>
			{error && <span className={classes?.error}>{errorMessage}</span>}
		</label>
	)
}

export default Input
