import { FC } from 'react'
import { NavLink, Link } from 'react-router-dom'

import logoPath from '@/assets/logo__bright.png'

import { _URL } from '@/routes'
import { Discord, GitHub, MDN, Youtube } from '@/components'
import { ActiveClassCallbackProps, ROLES } from '@/types'

import { AuthContextType, useAuth } from '@/context'
import { navLinkList } from '@/template'

import classes from './SideBar.module.scss'

type SodeBarProps = {
	className: string
}

const SideBar: FC<SodeBarProps> = ({ className }) => {
	const handleActiveClass = ({ isActive }: ActiveClassCallbackProps) =>
		isActive ? 'bg-blue-900' : ''

	const disableLink = (e: any, params: boolean | undefined) => {
		if (params) e.preventDefault()
	}

	const { user }: AuthContextType = useAuth()
	const role: ROLES = user?.data?.data?.role as ROLES
	const mappedNavLinks =
		navLinkList[role]?.map(
			({ url, name, statusDisabled }: { url: string; name: string; statusDisabled?: boolean }) => (
				<NavLink
					to={url}
					className={handleActiveClass}
					key={name}
					onClick={e => disableLink(e, statusDisabled)}
				>
					{name}
				</NavLink>
			),
		) || []

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
					{user.data?.data?.role === 'student' && (
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
