import { Populated } from '@/types'
import { DataTableProps } from '@/components'

import classes from './DataTable.module.scss'

const DataTable = <T extends Populated>({
	header = [],
	data = [],
	noDataMessage = 'No data found',
}: DataTableProps<T>) => {
	const growSum = header.reduce((acc, item) => acc + item.grow, 0)

	if (growSum !== 12) {
		throw new Error('DataTable header grow values must add up to 12')
	}

	return data.length ? (
		<section className={classes.table}>
			<ul className={classes.tableHeader}>
				{header?.map((item, index) => (
					<li
						key={`${item.title}-${index}`}
						className={[classes.tableCell, classes['col' + item.grow]].join(' ')}
					>
						{item.title}
					</li>
				))}
			</ul>
			<ul className={classes.tableBody}>
				{data.map((row, index) => (
					<li key={row.id || index} className={classes.tableRow}>
						{header.map((item, index) => (
							<span
								key={`${item}-${index}`}
								className={[classes.tableCell, classes['col' + item.grow]].join(' ')}
							>
								{row[item.title as keyof T]}
							</span>
						))}
					</li>
				))}
			</ul>
		</section>
	) : (
		<p>{noDataMessage}</p>
	)
}

export default DataTable
