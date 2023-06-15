import { REQUEST_STATUS } from "@/types"

export type Payment = {
  timestamp: number
  sender: string
  amount: number
  comment: string
}

export type PaymentsState = {
  data: Payment[] | null
  status: REQUEST_STATUS
}

export interface PaymentsContextType {
  payments: PaymentsState
  setPayments: (value: PaymentsState) => void
}
