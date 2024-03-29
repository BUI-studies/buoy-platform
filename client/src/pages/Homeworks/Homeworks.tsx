import { ReactNode, useEffect } from 'react'

import * as API from '@/api'
import { REQUEST_STATUS } from '@/types'
import { dateParser } from '@/utils'
import { useAuth, useHomeworks, useModal } from '@/context'
import { DataTable, DataTableRowProps, HomewoksItem, IFrame } from '@/components'

import classes from './Homeworks.module.scss'
import { Link } from 'react-router-dom'

type HomeworkTabeItem = {
	isReviewed: string | ReactNode
	date: string
	sender: string
	homeworkName: ReactNode
	github: string | ReactNode
	mentorsComment: string
	studentsComment: string
}

const Homeworks = () => {
	const { homeworks, setHomeworks } = useHomeworks()
	const { user } = useAuth()
	const { setModal } = useModal()
	const homeworksData = homeworks.data || []
	const userInfo = user?.data?.data
	const userToken = user?.data?.token

	const headers = [
		{ title: 'isReviewed', grow: 1 },
		{ title: 'date', grow: 2 },
		{ title: 'homeworkName', grow: 8 },
		{ title: 'reviewLink', grow: 1 },
	]

	const handleAddHomework = () => {
		setModal(
			<IFrame link="https://docs.google.com/forms/d/e/1FAIpQLSdr0Qm7h8PqQ-vUSr7HQlo3JTv3_PFj30pd7-CMTmbHqhXBWg/viewform?embedded=true" />,
		)
	}

	const tableData: DataTableRowProps<HomeworkTabeItem>[] = Array.isArray(homeworksData)
		? homeworksData
				.map(homework => ({
					...homework,
					isReviewed: homework.isReviewed ? '🟢' : '⚪️',
					date: dateParser(homework.timestamp),
					reviewLink: homework.reviewLink ? (
						<Link
							to={homework.reviewLink}
							target="_blank"
						>
							review
						</Link>
					) : (
						''
					),
					homeworkName: (
						<span
							className={classes.title}
							onClick={() => setModal(<HomewoksItem data={homework} />)}
						>
							{homework.homeworkName}
						</span>
					),
				}))
				.reverse()
		: []

	useEffect(() => {
		setHomeworks({ ...homeworks, status: REQUEST_STATUS.LOADING })

		userInfo?.fullName &&
			userToken &&
			API.getHomeworks(userInfo.fullName.toString(), userInfo.role.toString()).then(Homeworks => {
				setHomeworks({ data: Homeworks, status: REQUEST_STATUS.SUCCESS })
			})
	}, [userToken, userInfo?.fullName, userInfo?.role])

	return !homeworks.data && homeworks.status === REQUEST_STATUS.LOADING ? (
		<p>Loading</p>
	) : (
		<section>
			{homeworks.status === REQUEST_STATUS.FAILED && <p>Error</p>}

			<div className={classes.highlights}>
				<button
					className={classes.addBtn}
					onClick={handleAddHomework}
				>
					assign homework
				</button>
			</div>

			<DataTable
				header={headers}
				data={tableData}
				noDataMessage={
					<>
						<span className="text-3xl">🙄</span>
						<br />
						You haven't assigned any homework at this moment...
						<br />
						Try to text to your mentor and ask if you need to to something with your life...
					</>
				}
			/>
		</section>
	)
}

export default Homeworks
