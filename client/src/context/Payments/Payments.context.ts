import { createContext, useContext } from 'react'
import { PaymentsContextType, getInitialPaymentsContext } from '@/context'

export const PaymentsContext = createContext<PaymentsContextType>(getInitialPaymentsContext())
export const usePayments = () => useContext(PaymentsContext)
