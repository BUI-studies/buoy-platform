import React from "react"

import logoPath from "@/assets/logo__bright.png"

import { useAuth } from "@/context"

import classes from "./Header.module.scss"
import { _URL } from "@/routes"

export const Header = () => {
  const { user } = useAuth()

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

      <div>
        <a href={buttonData.link}>{buttonData.text}</a>
      </div>
    </header>
  )
}
