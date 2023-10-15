import { useState } from 'react'

const Report = () => {
	const [showForm, setShowForm] = useState(false)
	const formURL =
		'https://docs.google.com/forms/d/e/1FAIpQLSeBwCg7E1-awS8q04SyE2PCv4IfUD6HvqglhudG3qyna06o3Q/viewform?embedded=true'
	const handleIframeLoad = () => {
		setShowForm(true)
	}
	return (
		<>
			{!showForm && <span className="">Loading...</span>}

			<iframe
				src={formURL}
				width="100%"
				height="100%"
				onLoad={handleIframeLoad}
				className={`${showForm ? 'block' : 'hidden'}`}
			>
				<span className="">Loading...</span>
			</iframe>
		</>
	)
}

export default Report
