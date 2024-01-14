import * as FormBuilderTypes from './types'

export enum CLASSES {
	form = 'form-builder',
	label = 'form-builder__label',
	input = 'form-builder__input',
	error = 'form-builder__error',
	select = 'form-builder__select',
	multiSelect = 'form-builder__select--multi',
	option = 'form-builder__option',
	checkbox = 'form-builder__checkbox',
	button = 'form-builder__button',
}

export function getInputClassesByType(
	type: string,
	classes: { [key: string]: string },
): FormBuilderTypes.FieldClasses {
	const defaultClasses = { label: classes.label, error: classes.error }

	switch (type) {
		case 'multi-select':
			return {
				...defaultClasses,
				select: [classes.select, classes.multiSelect].join(' '),
				option: classes.option,
			}
		case 'select':
			return { ...defaultClasses, select: classes.select, option: classes.option }
		case 'checkbox':
			return { ...defaultClasses, checkbox: classes.checkbox }
		case 'radio':
			return { ...defaultClasses, radio: classes.radio }
		case 'submit':
			return { ...defaultClasses, button: classes.button }
		default:
			return { ...defaultClasses, input: classes.input }
	}
}
