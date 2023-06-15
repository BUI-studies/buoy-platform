import React, { FC } from "react"
import { NavLink, Link } from "react-router-dom"

import logoPath from "@/assets/logo__bright.png"

import classes from "./SideBar.module.scss"
import { ActiveClassCallbackProps } from "@/types"
import { _URL } from "@/routes"

type SodeBarProps = {
  className: string
}

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
        <NavLink to={_URL.MEETINGS} className={handleActiveClass}>
          зустрічі
        </NavLink>
        <NavLink to={_URL.FORM_FEEDBACK} className={handleActiveClass}>
          відгук по зустрічі
        </NavLink>
        <NavLink to={_URL.FORM_SENKAN} className={handleActiveClass}>
          сєнкан
        </NavLink>
        <NavLink to={_URL.HOMEWORKS} className={handleActiveClass}>
          домашки
        </NavLink>
        <NavLink to={_URL.PAYMENTS} className={handleActiveClass}>
          оплати
        </NavLink>
        <NavLink
          to={_URL.DISCORD}
          target="_blank"
          className={handleActiveClass}
        >
          діскорд
        </NavLink>
        <NavLink to={_URL.YOUTUBE} className={handleActiveClass}>
          ютюб
        </NavLink>
        <NavLink to={_URL.GIT} target="_blank" className={handleActiveClass}>
          git
        </NavLink>
        <NavLink to={_URL.MOZILA} target="_blank" className={handleActiveClass}>
          твоя біблія
        </NavLink>
      </nav>
    </aside>
  )
}

export default SideBar
