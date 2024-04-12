import { Loader } from '@/components'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

enum RESOURCE_TYPE {
	YOUTUBE = 'youtube',
}

const linksMap = {
	[RESOURCE_TYPE.YOUTUBE]:
		'https://www.youtube.com/embed/videoseries?list=PLeX0VTr3t-vGoRD25PX8KQZkacrjmRFEZ',
	none: '',
}

const Resources = () => {
	const { type } = useParams()
	const [showFrame, setShowFrame] = useState(false)
	const resourceURL: string = linksMap[type as RESOURCE_TYPE] || linksMap.none

	const handleIframeLoad = () => {
		setShowFrame(true)
	}

	useEffect(() => {
		setShowFrame(false)
	}, [type])

	return (
		<>
			{!showFrame && <Loader />}

			<iframe
				src={resourceURL}
				width="100%"
				height="100%"
				onLoad={handleIframeLoad}
				sandbox="allow-same-origin allow-scripts"
				allow="allow-same-origin allow-presentation allow-scripts allow-popups allow-formsaccelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				className={`${showFrame ? 'block' : 'hidden'}`}
			>
				<Loader />
			</iframe>
		</>
	)
}

export default Resources
