import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { ErrorBoundary, Header, Footer } from '..'
import { SideBar } from '@/template'
import { useAuth } from '@/context'
import { REQUEST_STATUS } from '@/types'

import classes from './Layout.module.scss'

const Layout: FC = () => {
	const { user } = useAuth()
	const isLoggenIn = user.status === REQUEST_STATUS.SUCCESS && user.data.data && user.data.token
	const contentWrapperClass = isLoggenIn ? classes.contentWrapper : classes.contentWrapperNoSideBar

	return (
		<div className={classes.pageWrapper}>
			{isLoggenIn && <SideBar className={classes.sideBar} />}
			<main className={contentWrapperClass}>
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

export default Layout
