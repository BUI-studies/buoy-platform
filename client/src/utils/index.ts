export * from './storage.util'
export * from './dateParser.util'
export * as FormBuilderTypes from './FormBuilder/types'
export { default as FormBuilder } from './FormBuilder'

export const cutString = (str: string, maxLength: number) => {
	if (str.length > maxLength) {
		return str.slice(0, maxLength) + '...'
	}
	return str
}
