import React, { useEffect } from "react"

import { DataTable, DataTableRowProps, IFrame } from "@/components"
import { useAuth, useModal, usePayments } from "@/context"
import { REQUEST_STATUS } from "@/types"
import { API } from "@/api"
import { dateParser } from "@/utils"

import classes from "./Payments.module.scss"

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
    { title: "date", grow: 2 },
    { title: "amount", grow: 2 },
    { title: "sender", grow: 5 },
    { title: "comment", grow: 3 },
  ]

  //TODO: make all calculations in a single loop and inside some sort of ustility function
  const totalMoney = payments?.data?.reduce(
    (acc, curr) => (acc += curr.amount),
    0
  )
  const thisMonthSpend = payments?.data?.reduce((acc, curr) => {
    const now = new Date()
    const paymentDate = new Date(curr.timestamp)
    if (
      paymentDate.getMonth() === now.getMonth() &&
      paymentDate.getFullYear() === now.getFullYear()
    ) {
      return (acc += curr.amount)
    } else {
      return acc
    }
  }, 0)

  const tableData: DataTableRowProps<PaymentsTableItem>[] = Array.isArray(
    payments?.data
  )
    ? payments.data?.map((payment) => ({
        ...payment,
        date: dateParser(payment.timestamp),
        comment: payment.comment || "-",
      }))
    : []

  const handleAddPayment = () => {
    setModal(
      <IFrame link="https://docs.google.com/forms/d/e/1FAIpQLSd-roigLkj_dzWF0cOLOKyNrPxlU9j30jXSH7KHC5vGiCwFbg/viewform?embedded=true" />
    )
  }

  useEffect(() => {
    setPayments({ ...payments, status: REQUEST_STATUS.LOADING })

    userInfo?.fullName &&
      userToken &&
      API.getPayments(userInfo.fullName.toString()).then((payments) => {
        setPayments({ data: payments, status: REQUEST_STATUS.SUCCESS })
      })
  }, [userToken, userInfo?.fullName])

  return !payments.data && payments.status === REQUEST_STATUS.LOADING ? (
    <p>Loading</p>
  ) : (
    <div>
      {payments.status === REQUEST_STATUS.FAILED && <p>Error</p>}

      <div className={classes.pannel}>
        <div className={classes.highlights}>
          <h2 className={classes.totalHeader}>Total spent: {totalMoney}</h2>
          <h2 className={classes.totalHeader}>This month: {thisMonthSpend}</h2>
        </div>
        <button className={classes.addPayment} onClick={handleAddPayment}>
          +
        </button>
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
