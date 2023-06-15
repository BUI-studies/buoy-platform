import React, { useEffect } from "react"

import { useAuth, usePayments } from "@/context"
import { REQUEST_STATUS } from "@/types"
import { API } from "@/api"
import { DataTable } from "@/components"
import { dateParser } from "@/utils"

const Payments = () => {
  const { user } = useAuth()
  const { payments, setPayments } = usePayments()
  const userInfo = user?.data?.data
  const userToken = user?.data?.token

  const headers = [
    { title: "date", grow: 2 },
    { title: "amount", grow: 2 },
    { title: "sender", grow: 5 },
    { title: "comment", grow: 3 },
  ]

  const tableData = Array.isArray(payments?.data)
    ? payments.data?.map((payment) => ({
        ...payment,
        date: dateParser(payment.timestamp),
        comment: payment.comment || "-",
      }))
    : []

  useEffect(() => {
    setPayments({ ...payments, status: REQUEST_STATUS.LOADING })

    userInfo?.fullName &&
      userToken &&
      API.getPayments(userInfo.fullName.toString()).then((payments) => {
        setPayments({ data: payments, status: REQUEST_STATUS.SUCCESS })
      })
  }, [userToken, userInfo?.fullName])

  return (
    <div>
      {!payments.data?.length && payments.status === REQUEST_STATUS.LOADING && (
        <p>Loading</p>
      )}
      {payments.status === REQUEST_STATUS.FAILED && <p>Error</p>}

      {tableData?.length > 0 && <DataTable header={headers} data={tableData} />}
    </div>
  )
}

export default Payments
