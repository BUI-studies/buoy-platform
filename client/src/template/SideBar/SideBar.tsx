import { FC } from 'react'
import { NavLink, Link } from 'react-router-dom'

import logoPath from '@/assets/logo__bright.png'

import { _URL } from '@/routes'
import { Discord, GitHub, MDN, Youtube } from '@/components'
import { ActiveClassCallbackProps } from '@/types'

import classes from './SideBar.module.scss'

type SodeBarProps = {
	className: string
}

const SideBar: FC<SodeBarProps> = ({ className }) => {
	const handleActiveClass = ({ isActive }: ActiveClassCallbackProps) =>
		isActive ? 'bg-blue-900' : ''

	return (
		<aside className={[className, classes.pannel].join(' ')}>
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

				<div className={classes.usefullLinks}>
					<NavLink to={_URL.MONO} target="_blank" className="grow text-center border-rose-400">
						💸 скинуть баблішко 💸
					</NavLink>
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
