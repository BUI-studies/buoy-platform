export const dateParser = (milliseconds: number) => {
	const date = new Date(milliseconds)
	return date
		.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		})
		.replace(/\//g, '-')
}
