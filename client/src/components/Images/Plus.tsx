import { FC } from 'react'

import { Populated, SVGProps } from '@/types'

const Plus: FC<SVGProps & Populated> = ({ size = 24, width = 24, height = 24, thickness = 4 }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size || width || 24}
			height={size || height || 24}
			viewBox="0 0 24 24"
		>
			<line
				x1="12"
				y1="2"
				x2="12"
				y2="22"
				stroke="white"
				strokeWidth={thickness}
				strokeLinecap="round"
			/>
			<line
				x1="2"
				y1="12"
				x2="22"
				y2="12"
				stroke="white"
				strokeWidth={thickness}
				strokeLinecap="round"
			/>
		</svg>
	)
}

export default Plus
