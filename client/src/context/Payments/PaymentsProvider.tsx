import { FC, PropsWithChildren, useState } from 'react'

import { getInitialPaymentsState, PaymentsContext, PaymentsState } from '@/context'

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
