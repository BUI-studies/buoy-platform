import React, { ReactNode, useEffect } from "react"

import { useAuth, useMeetings, Meeting } from "@/context"
import { API } from "@/api"
import { REQUEST_STATUS } from "@/types"
import { DataTable, DataTableRowProps } from "@/components"
import { dateParser } from "@/utils"
import { Link } from "react-router-dom"

type MeetingTableItem = {
  id: string
  date: string
  title: string
  type: string
  mentor: string
  report: ReactNode
}

const Meetings = () => {
  const { meetings, setMeetings } = useMeetings()
  const { user } = useAuth()
  const meetingsData = meetings.data || []
  const userInfo = user?.data?.data

  const tableData: DataTableRowProps<MeetingTableItem>[] = meetingsData
    .map((meeting) => ({
      id: meeting.id,
      date: dateParser(meeting.timestamp),
      title: meeting.title,
      type: meeting.type,
      mentor: meeting.mentor,
      report: (
        <Link to={meeting.report} target="_blank">
          report
        </Link>
      ),
    }))
    .reverse()

  const headers: string[] = tableData.length
    ? Object.keys(tableData[0]).filter((k) => k.toLowerCase() !== "id")
    : []

  useEffect(() => {
    setMeetings({ ...meetings, status: REQUEST_STATUS.LOADING })

    userInfo?.fullName &&
      API.getMeetings(userInfo.fullName.toString()).then((meetings) => {
        setMeetings({ data: meetings, status: REQUEST_STATUS.SUCCESS })
      })
  }, [])

  return (
    <section>
      {!meetings.data?.length && meetings.status === REQUEST_STATUS.LOADING && (
        <p>Loading</p>
      )}
      {meetings.status === REQUEST_STATUS.FAILED && <p>Error</p>}

      <DataTable header={headers} data={tableData} />
    </section>
  )
}

export default Meetings
