import React, { ReactNode, useEffect } from "react"
import { Link } from "react-router-dom"

import { API } from "@/api"
import { REQUEST_STATUS } from "@/types"
import { dateParser } from "@/utils"
import { useAuth, useMeetings, useModal } from "@/context"
import { DataTable, DataTableRowProps, MeetingsItem } from "@/components"

import classes from "./Meetings.module.scss"

type MeetingTableItem = {
  id: string
  date: string
  title: string | ReactNode
  type: string
  mentor: string
  report: ReactNode
}

const Meetings = () => {
  const { meetings, setMeetings } = useMeetings()
  const { user } = useAuth()
  const { setModal } = useModal()
  const meetingsData = meetings.data || []
  const userInfo = user?.data?.data

  const tableData: DataTableRowProps<MeetingTableItem>[] = meetingsData
    .map((meeting) => ({
      id: meeting.id,
      date: dateParser(meeting.timestamp),
      title: (
        <span
          className={classes.rowTitle}
          onClick={() => setModal(<MeetingsItem data={meeting} />)}
        >
          {meeting.title}
        </span>
      ),
      // title: meeting.title,
      type: meeting.type,
      mentor: meeting.mentor,
      report: (
        <Link
          to={meeting.report}
          target="_blank"
          className={classes.reportLink}
        >
          report
        </Link>
      ),
    }))
    .reverse()

  const headers = [
    { title: "date", grow: 2 },
    { title: "title", grow: 6 },
    { title: "type", grow: 1 },
    { title: "mentor", grow: 2 },
    { title: "report", grow: 1 },
  ]

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

      {tableData.length > 0 && <DataTable header={headers} data={tableData} />}
    </section>
  )
}

export default Meetings
