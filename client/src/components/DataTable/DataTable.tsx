import React, { FC } from "react"

import { Populated } from "@/types"
import { DataTableProps } from "@/components"

import classes from "./DataTable.module.scss"

const DataTable = <T extends Populated>({
  header = [],
  data = [],
}: DataTableProps<T>) => {
  return (
    <section className={classes.table}>
      <ul className={classes.tableHeader}>
        {header?.map((item, index) => (
          <li key={`${item}-${index}`} className={classes.tableTitle}>
            {item}
          </li>
        ))}
      </ul>
      <ul className={classes.tableBody}>
        {data.map((row, index) => (
          <li key={row.id || index} className={classes.tableRow}>
            {header.map((item, index) => (
              <span key={`${item}-${index}`} className={classes.tableCell}>
                {row[item.toLowerCase() as keyof T]}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default DataTable
