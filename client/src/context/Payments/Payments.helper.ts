import { REQUEST_STATUS } from "@/types"

export const getInitialPaymentsState = () => ({
  data: null,
  status: REQUEST_STATUS.IDLE,
})

export const getInitialPaymentsContext = () => ({
  payments: getInitialPaymentsState(),
  setPayments: () => null,
})
