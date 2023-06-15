import React, { FC } from "react"
import { Link } from "react-router-dom"

import { Homework } from "@/context"
import { dateParser } from "@/utils"

import classes from "./HomewoksItem.module.scss"

type HomeworksItemProps = {
  data: Homework
}

const HomewoksItem: FC<HomeworksItemProps> = ({ data }) => {
  const hwdate = ` | ${dateParser(data.timestamp)} | `
  return (
    <div className={classes.wrapper}>
      <Link to={data.github} target="_blank" className={classes.title}>
        {data.isReviewed ? "🟢" : "⚪️"}
        {hwdate}
        {data.homeworkName}
      </Link>

      {data.studentsComment && <p>{data.studentsComment}</p>}

      {data.reviewLink && (
        <Link to={data.reviewLink} target="_blank" className={classes.link}>
          Mentors Review Link
        </Link>
      )}
      {data.mentorsComment && (
        <p className={classes.commentText}>{data.mentorsComment}</p>
      )}
    </div>
  )
}

export default HomewoksItem
