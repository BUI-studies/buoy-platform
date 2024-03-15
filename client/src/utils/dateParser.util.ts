export const dateParser = (date: Date | number) => {
	const dateObj = new Date(date)
	return dateObj
		.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		})
		.replace(/\//g, '-')
}
