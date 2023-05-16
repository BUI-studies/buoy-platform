import React, { FC } from "react"
import { Outlet } from "react-router-dom"

import { ErrorBoundary, Header, Footer } from "./"

type LayoutProps = {
  children?: React.ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  )
}
