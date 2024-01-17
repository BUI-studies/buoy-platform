import { useEffect } from 'react'

import { _URL } from '@/routes'
import { DataTable, DataTableRowProps, Plus } from '@/components'
import { useAuth, useModal, usePayments } from '@/context'
import { REQUEST_STATUS } from '@/types'
import * as API from '@/api'
import { dateParser } from '@/utils'

import monoQR from '@/assets/mono-QR-code.png'

import classes from './Payments.module.scss'

type PaymentsTableItem = {
	date: string
	amount: number
	sender: string
	comment: string
}

const Payments = () => {
	const { user } = useAuth()
	const { payments, setPayments } = usePayments()
	const { setModal } = useModal()
	const userInfo = user?.data?.data
	const userToken = user?.data?.token

	const headers = [
		{ title: 'date', grow: 2 },
		{ title: 'amount', grow: 2 },
		{ title: 'sender', grow: 5 },
		{ title: 'comment', grow: 3 },
	]

	//TODO: make all calculations in a single loop and inside some sort of ustility function
	const totalMoney = payments?.data?.reduce((acc, curr) => (acc += curr.amount), 0)
	const thisMonthSpend = payments?.data?.reduce((acc, curr) => {
		const now = new Date()
		const paymentDate = new Date(curr.timestamp)
		if (
			paymentDate.getMonth() === now.getMonth() &&
			paymentDate.getFullYear() === now.getFullYear()
		) {
			acc += curr.amount
		}

		return acc
	}, 0)

	const tableData: DataTableRowProps<PaymentsTableItem>[] = Array.isArray(payments?.data)
		? payments.data?.map(payment => ({
				...payment,
				date: dateParser(payment.timestamp),
				comment: payment.comment || '-',
		  }))
		: []

	const handleQR = () => {
		setModal(
			<>
				<h2 className={classes.modalTitle}>Відскануй QR-код щоб заплатити з аппки банку</h2>
				<picture className={classes.qrBigger}>
					<img
						src={monoQR}
						alt="QO-code mono jar"
					/>
				</picture>
			</>,
		)
	}

	useEffect(() => {
		setPayments({ ...payments, status: REQUEST_STATUS.LOADING })

		userInfo?.fullName &&
			userToken &&
			API.getPayments(userInfo.fullName.toString()).then(payments => {
				setPayments({ data: payments, status: REQUEST_STATUS.SUCCESS })
			})
	}, [userToken, userInfo?.fullName])

	return !payments.data && payments.status === REQUEST_STATUS.LOADING ? (
		<p>Loading</p>
	) : (
		<div>
			{payments.status === REQUEST_STATUS.FAILED && <p>Error</p>}

			<div className={classes.pannel}>
				<a
					href={_URL.MONO}
					target="_blank"
					className={classes.addPayment}
				>
					<Plus />
				</a>
				<div className={classes.highlights}>
					<h2 className={classes.totalHeader}>Total spent: {totalMoney}</h2>
					<h2 className={classes.totalHeader}>This month: {thisMonthSpend}</h2>
				</div>
				<picture
					className={classes.qr}
					onClick={handleQR}
				>
					<img
						src={monoQR}
						alt="QO-code mono jar"
					/>
				</picture>
			</div>

			<DataTable
				header={headers}
				data={tableData}
				noDataMessage={
					<>
						<span className="text-3xl">🤷🏼‍♂️</span>
						<br />
						You simply did not assigned any payment so far
					</>
				}
			/>
		</div>
	)
}

export default Payments
