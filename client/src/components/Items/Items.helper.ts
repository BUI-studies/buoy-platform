import { MeetingTypes } from '@/api'

export const typeToColorMap = {
	[MeetingTypes.INDIVIDUAL]: 'bg-pink-800',
	[MeetingTypes.PLANING]: 'bg-green-800',
	[MeetingTypes.SYNC]: 'bg-cyan-700',
}
