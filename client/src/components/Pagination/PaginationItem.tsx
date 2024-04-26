import { FC } from 'react'
import classes from './Pagination.module.scss'

type PaginationItemProps = {
	active?: boolean
	page: number
}

const PaginationItem: FC<PaginationItemProps> = ({ page, active }) => {
	return (
		<a
			href="#"
			aria-current="page"
			className={[classes.item, active ? classes.item__active : ''].join(' ')}
		>
			{page}
		</a>
	)
}

export default PaginationItem
