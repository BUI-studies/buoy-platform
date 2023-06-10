import React, { FC } from "react"
import { Outlet } from "react-router-dom"

import classes from "./Layout.module.scss"

import { ErrorBoundary, Header, Footer } from ".."
import SideBar from "../SideBar/SideBar"

type LayoutProps = {
  children?: React.ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={classes.pageWrapper}>
      <SideBar className={classes.sideBar} />
      <main className={classes.contentWrapper}>
        <Header />
        <div className={classes.pageContent}>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </div>
        <Footer />
      </main>
    </div>
  )
}
