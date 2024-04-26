import PaginationItem from './PaginationItem'
import Icons from './Icons'
import classes from './Pagination.module.scss'
import { Link } from 'react-router-dom'
import { FC } from 'react'

type PaginationProps = {
	goNext: () => void
	goPrev: () => void
}

const Pagination: FC<PaginationProps> = ({ goNext, goPrev }) => {
	return (
		<nav
			className="isolate inline-flex -space-x-px rounded-md shadow-sm"
			aria-label="Pagination"
		>
			<button
				className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
				onClick={goPrev}
			>
				<span className="sr-only">Previous</span>
				<Icons.Prev />
			</button>
			<PaginationItem
				active
				page={1}
			/>

			<span className="relative inline-flex items-center px-4 py-2 text-sm ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
				...
			</span>
			<PaginationItem page={10} />
			<button
				className={classes.prevBtn}
				onClick={goNext}
			>
				<span className="sr-only">Next</span>
				<Icons.Next />
			</button>
		</nav>
	)
}

export default Pagination
