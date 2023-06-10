import React, { FC } from "react"
import { NavLink, Link, NavLinkProps } from "react-router-dom"

import logoPath from "@/assets/logo__bright.png"

import classes from "./SideBar.module.scss"
import { ActiveClassCallbackProps } from "@/types"
import { _URL } from "@/routes"

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
  const handleActiveClass = ({ isActive }: ActiveClassCallbackProps) =>
    isActive ? "bg-blue-900" : ""

  return (
    <aside className={[className, classes.pannel].join(" ")}>
      <Link to={_URL.HOME} className={classes.companyWrapper}>
        <picture className={classes.company}>
          <img src={logoPath} alt="БУЙ platform" />
        </picture>
      </Link>

      <nav className={classes.nav}>
        <NavLink to={_URL.FORM_FEEDBACK} className={handleActiveClass}>
          відгук по зустрічі
        </NavLink>
        <NavLink to={_URL.FORM_SENKAN} className={handleActiveClass}>
          сєнкан
        </NavLink>
      </nav>
    </aside>
  )
}

export default SideBar
