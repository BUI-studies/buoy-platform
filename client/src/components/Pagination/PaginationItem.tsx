import { FC } from 'react'
import classes from './Pagination.module.scss'

type PaginationItemProps = {
	active?: boolean
	page: number
	action?: () => void
}

const PaginationItem: FC<PaginationItemProps> = ({ page, active, action }) => {
	return (
		<a
			href="#"
			aria-current="page"
			onClick={action}
			className={[classes.item, active ? classes.item__active : ''].join(' ')}
		>
			{page}
		</a>
	)
}

export default PaginationItem
