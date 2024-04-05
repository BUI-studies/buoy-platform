export * from './storage.util'
export * from './dateParser.util'
export * as FormBuilderTypes from './FormBuilder/types'
export { default as FormBuilder } from './FormBuilder'

export const cutString = (str: string, maxLength: number) => {
	if (!str || !str.length) return ''

	const words = str.split(' ')

	if (words.length > 1) {
		let result = ''
		let i = 0

		while (result.length < maxLength - 3 && i < words.length) {
			result += words[i] + ' '
			i++
		}

		return result.length < maxLength ? result : result.slice(0, maxLength) + '...'
	} else {
		if (str.length > maxLength) {
			return str.slice(0, maxLength) + '...'
		}

		return str
	}
}
