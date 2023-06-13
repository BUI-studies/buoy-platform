import React, { FC, PropsWithChildren } from "react"

import { Meeting } from "@/context"
import { Link } from "react-router-dom"

type MeetingsItemProps = {
  data: Meeting
}

const MeetingsItem: FC<PropsWithChildren & MeetingsItemProps> = ({ data }) => {
  const { title, type, mentor, report, comment } = data
  return (
    <div>
      <h1>{title}</h1>
      <h2>{type}</h2>
      <h3>{mentor}</h3>
      <Link to={report} target="_blank" className="underline">
        report
      </Link>
      <p>{comment}</p>
    </div>
  )
}

export default MeetingsItem
