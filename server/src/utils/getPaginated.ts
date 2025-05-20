import { Model, PopulateOption, PopulateOptions, SortOrder } from 'mongoose'

type GetPaginatedProps = {
	Model: Model<any>
	config: {
		query: object
		limit: number
		page: number
		populate: PopulateOptions | PopulateOptions[]
		sort:
			| string
			| { [key: string]: SortOrder | { $meta: 'textScore' } }
			| [string, SortOrder][]
			| undefined
			| null
	}
}

export const getPaginated = async ({
	Model,
	config: { query, limit, page, populate, sort },
}: GetPaginatedProps) => {
	const count = await Model.countDocuments(query)
	const data = await Model.find(query)
		.limit(limit)
		.skip(limit * (page - 1))
		.sort(sort)
		.populate(populate)

	if (!data || !data.length) throw new Error('No data found')

	return {
		count,
		limit,
		totalPages: Math.ceil(count / limit),
		page,
		data,
	}
}
