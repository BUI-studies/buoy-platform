import { FC } from 'react'
import { useSearchParams } from 'react-router-dom'

import { PAGINATION_DEFAULTS } from '@/types'

import Icons from './Icons'
import PaginationItem from './PaginationItem'

import classes from './Pagination.module.scss'

const mapPaginationItems = (page: number, isActive: boolean, action?: () => void) => (
	<PaginationItem
		key={page}
		page={page}
		active={isActive}
		action={action}
	/>
)

type PaginationProps = {
	totalPages: number
}

const makeChangePage =
	(setParams: (params: URLSearchParams) => void, page: number, limit: number) => () => {
		setParams(
			new URLSearchParams([
				['page', page.toString()],
				['limit', limit.toString()],
			]),
		)
	}

const Pagination: FC<PaginationProps> = ({ totalPages }) => {
	const [params, setParams] = useSearchParams()

	const pageFromParams = Number(params.get('page'))
	const limitFromParams = Number(params.get('limit'))
	const page: number =
		(pageFromParams < 1 ? 0 : pageFromParams > totalPages ? totalPages : pageFromParams) ||
		PAGINATION_DEFAULTS.PAGE
	const limit = limitFromParams || PAGINATION_DEFAULTS.LIMIT

	return (
		<nav
			className="isolate inline-flex -space-x-px rounded-md shadow-sm"
			aria-label="Pagination"
		>
			<button
				disabled={page === PAGINATION_DEFAULTS.PAGE}
				className={[classes.arrowBtn, classes.arrowBtnPrev].join(' ')}
				onClick={page !== 1 ? makeChangePage(setParams, page - 1, limit) : undefined}
			>
				<span className="sr-only">Previous</span>
				<Icons.Prev />
			</button>

			<div className={classes.pagesWrapper}>
				{Array.from({ length: totalPages }, (_, i) => {
					const num = i + 1
					return mapPaginationItems(
						num as number,
						num === page,
						page !== num ? makeChangePage(setParams, num, limit) : undefined,
					)
				})}
			</div>

			<button
				disabled={page === totalPages}
				className={[classes.arrowBtn, classes.arrowBtnNext].join(' ')}
				onClick={page !== totalPages ? makeChangePage(setParams, page + 1, limit) : undefined}
			>
				<span className="sr-only">Next</span>
				<Icons.Next />
			</button>
		</nav>
	)
}

export default Pagination
