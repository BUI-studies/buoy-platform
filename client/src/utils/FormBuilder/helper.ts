import * as FormBuilderTypes from './types'

export enum CLASSES {
	form = 'form',
	label = 'form__label',
	input = 'form__input',
	error = 'form__error',
	select = 'form__select',
	option = 'form__option',
	checkbox = 'form__checkbox',
	button = 'form__button',
}

export function getInputClassesByType(
	type: string,
	classes: { [key: string]: string },
): FormBuilderTypes.FieldClasses {
	const defaultClasses = { label: classes.label, error: classes.error }

	switch (type) {
		case 'select':
			return { ...defaultClasses, select: classes.select, option: classes.option }
		case 'checkbox':
			return { ...defaultClasses, checkbox: classes.checkbox }
		case 'radio':
			return { ...defaultClasses, radio: classes.radio }
		default:
			return { ...defaultClasses, input: classes.input }
	}
}
