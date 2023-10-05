import { FC } from 'react'
import { useAuth } from '@/context'

import classes from './UnPaid.module.scss'

const UnPaid: FC = () => {
	const { user } = useAuth()
	const userInfo = user?.data?.data

	return (
		<>
			<h2 className={classes.title}>
				Дорогий {userInfo?.fullName} нажаль підписка най цей БУЙок закінчилася. Якщо ти розгубився
				напиши нам, позвони нам, відправ голуба, бо я знаю, що тебе ще чекає дуже цікавий заплив з
				БУЙом
			</h2>
		</>
	)
}

export default UnPaid
