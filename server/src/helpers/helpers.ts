export const parseTimeStamp = (value: number): Date => {
	const unixTimestamp = (value - 25569) * 86400

	return new Date(unixTimestamp * 1000)
}
