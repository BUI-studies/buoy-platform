import { ReactNode } from 'react'

import { Populated } from '@/types'
import { DataTableProps } from '@/components'
import { cutString } from '@/utils'

import classes from './DataTable.module.scss'

const DataTable = <T extends Populated>({
	header = [],
	data = [],
	noDataMessage = 'No data found',
	rowClick,
}: DataTableProps<T>) => {
	const rowClickHandler = (row: T) =>
		rowClick
			? (e: React.MouseEvent<HTMLLIElement>) => {
					if (!row.id) throw new Error('Row must have an id')

					rowClick(row.id as string, e)
			  }
			: undefined
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
					<li
						key={(row.id || index) as KeyType}
						className={classes.tableRow}
						onClick={rowClickHandler(row)}
					>
						{header.map((item, index) => (
							<span
								key={`${item}-${index}`}
								className={[classes.tableCell, classes['col' + item.grow]].join(' ')}
								title={row[item.title as keyof T] as string}
							>
								{typeof row[item.title as keyof T] === 'string'
									? cutString(row[item.title as keyof T] as string, 50)
									: (row[item.title as keyof T] as ReactNode)}
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
