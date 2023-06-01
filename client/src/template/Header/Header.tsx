import React from "react"

import logoPath from "@/assets/logo__bright.png"

import { useAuth } from "@/context"

import classes from "./Header.module.scss"
import { _URL } from "@/routes"
import { Link } from "react-router-dom"

export const Header = () => {
  const { user } = useAuth()
  const userInfo = user?.data?.data

  const buttonData = user?.data?.data
    ? {
        text: "Logout",
        link: _URL.LOGOUT,
      }
    : {
        text: "Login",
        link: _URL.LOGIN,
      }

  return (
    <header className={classes.topPannel}>
      <a href="/">
        <picture className={classes.company}>
          <img src={logoPath} alt="БУЙ platform" />
        </picture>
      </a>

      <div className="flex items-center gap-4">
        {userInfo && <p className="text-blue-600">{userInfo.fullName}</p>}
        <Link to={buttonData.link}>{buttonData.text}</Link>
      </div>
    </header>
  )
}
