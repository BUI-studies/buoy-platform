import React, { FC } from "react"
import { Link } from "react-router-dom"

import logoPath from "@/assets/logo__bright.png"

import classes from "./SideBar.module.scss"

type SodeBarProps = {
  className: string
}

// відгук по зустрічі
// написати senkan
// здати домашку
// youtube
// git
// discord
// mozilla.org

const SideBar: FC<SodeBarProps> = ({ className }) => {
  return (
    <aside className={[className, classes.pannel].join(" ")}>
      <Link to="/" className={classes.companyWrapper}>
        <picture className={classes.company}>
          <img src={logoPath} alt="БУЙ platform" />
        </picture>
      </Link>

      <nav className={classes.nav}>
        <Link to={{ pathname: "/feedback", search: "?type=lesson" }}>
          відгук по зустрічі
        </Link>
        <Link to={{ pathname: "/feedback", search: "?type=senkan" }}>
          сєнкан
        </Link>
      </nav>
    </aside>
  )
}

export default SideBar
