import { createContext, useContext } from 'react'
import { getInitialPaymentsContext, PaymentsContextType } from '@/context'

export const PaymentsContext = createContext<PaymentsContextType>(getInitialPaymentsContext())
export const usePayments = () => useContext(PaymentsContext)
