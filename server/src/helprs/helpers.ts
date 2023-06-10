export const parseTimeStamp = (value: number) => {
  const unixTimestamp = (value - 25569) * 86400

  return Math.round(unixTimestamp * 1000)
}
