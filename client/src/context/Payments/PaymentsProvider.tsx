import { useState, FC, PropsWithChildren } from 'react'

import { getInitialPaymentsState, PaymentsState, PaymentsContext } from '@/context'

const PaymentsProvider: FC<PropsWithChildren> = ({ children }) => {
	const initialState = getInitialPaymentsState()

	const [paymentsState, setPaymentsState] = useState<PaymentsState>(initialState)

	const setPayments = (newPayments: PaymentsState): void => {
		setPaymentsState(newPayments)
	}

	return (
		<PaymentsContext.Provider value={{ payments: paymentsState, setPayments }}>
			{children}
		</PaymentsContext.Provider>
	)
}

export default PaymentsProvider
