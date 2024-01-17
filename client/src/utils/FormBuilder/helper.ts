import * as FormBuilderTypes from './types'

export enum CLASSES {
	form = 'form-builder',
	label = 'form-builder__label',
	input = 'form-builder__input',
	text = 'form-builder__text',
	error = 'form-builder__error',
	select = 'form-builder__select',
	multiSelect = 'form-builder__select--multi',
	option = 'form-builder__option',
	checkbox = 'form-builder__checkbox',
	radio = 'form-builder__radio',
	multiRadio = 'form-builder__radio--multi',
	button = 'form-builder__button',
}

export function getInputClassesByType(
	type: string,
	classes: { [key: string]: string },
): FormBuilderTypes.FieldClasses {
	const commonClasses = { label: classes.label, error: classes.error, text: classes.text }

	switch (type) {
		case 'multi-select':
			return {
				...commonClasses,
				select: [classes.select, classes.multiSelect].join(' '),
				option: classes.option,
			}
		case 'select':
			return { ...commonClasses, select: classes.select, option: classes.option }
		case 'checkbox':
			return { ...commonClasses, checkbox: classes.checkbox }
		case 'radio':
			return { ...commonClasses, radio: classes.radio }
		case 'multi-radio':
			return {
				...commonClasses,
				radio: [classes.radio, classes.multiRadio].join(' '),
				option: classes.option,
			}
		case 'submit':
			return { ...commonClasses, button: classes.button }
		default:
			return { ...commonClasses, input: classes.input }
	}
}
