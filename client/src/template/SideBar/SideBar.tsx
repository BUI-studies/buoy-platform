import { FC } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'

import logoPath from '@/assets/logo__bright.png'

import { _URL } from '@/routes'
import { Discord, GitHub, MDN, Youtube } from '@/components'
import { ROLES, USER_STATUSES } from '@/types'

import { AuthContextType, useAuth } from '@/context'
import { navLinkList } from '@/template'

import { SideBarLink } from './sidebar-list'
import { handleActiveClass, SideBarProps } from './SideBar.helper'

import classes from './SideBar.module.scss'

const SideBar: FC<SideBarProps> = ({ className }) => {
	const { user }: AuthContextType = useAuth()
	const navigate = useNavigate()

	const role: ROLES = user?.data?.data?.role as ROLES
	const userStatus = user?.data?.data?.status as USER_STATUSES

	const mappedNavLinks =
		navLinkList[role]?.map(({ url, name }: SideBarLink) => (
			<NavLink
				to={url}
				className={handleActiveClass(userStatus)}
				key={name}
				onClick={() => (userStatus === USER_STATUSES.INACTIVE ? navigate(_URL.UNPAID) : null)}
			>
				{name}
			</NavLink>
		)) || []

	return (
		<aside className={[className, classes.pannel].join(' ')}>
			<Link to={_URL.HOME} className={classes.companyWrapper}>
				<picture className={classes.company}>
					<img src={logoPath} alt="БУЙ platform" />
				</picture>
			</Link>

			<nav className={classes.nav}>
				{mappedNavLinks}

				<div className={classes.usefullLinks}>
					{role === 'student' && (
						<NavLink to={_URL.MONO} target="_blank" className="grow text-center border-rose-400">
							💸 скинуть баблішко 💸
						</NavLink>
					)}
					<NavLink to={_URL.DISCORD} target="_blank">
						<Discord />
					</NavLink>
					<NavLink to={_URL.YOUTUBE}>
						<Youtube />
					</NavLink>
					<NavLink to={_URL.GIT} target="_blank">
						<GitHub />
					</NavLink>
					<NavLink to={_URL.MOZILA} target="_blank">
						<MDN width="100%" height="100%" />
					</NavLink>
				</div>
			</nav>
		</aside>
	)
}

export default SideBar
