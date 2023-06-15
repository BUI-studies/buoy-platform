import React from "react"
import { Link } from "react-router-dom"

import logoPath from "@/assets/logo__bright.png"

import { useAuth } from "@/context"
import { _URL } from "@/routes"

import classes from "./Header.module.scss"

const Header = () => {
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
      <div className={classes.controls}>
        {userInfo && <p className="text-blue-600">{userInfo.fullName}</p>}
        <Link to={buttonData.link}>{buttonData.text}</Link>
      </div>
    </header>
  )
}

export default Header
