import { useNavigate } from 'react-router-dom'
import { SubmitHandler } from 'react-hook-form'

import { Input } from '@/components'
import { AuthContextType, useAuth } from '@/context'
import { REQUEST_STATUS } from '@/types'
import * as API from '@/api'

import { LoginInputs, useLoginForm } from './Login.helper'
import classes from './Login.module.scss'

const Login = () => {
	const { setUser }: AuthContextType = useAuth()
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		// watch,
		formState: { errors },
	} = useLoginForm()

	const onSubmit: SubmitHandler<LoginInputs> = formData => {
		API.login(formData).then(({ data, token }) => {
			setUser({ data: { data, token }, status: REQUEST_STATUS.SUCCESS })
			navigate('/')
		})
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={classes.form}
		>
			<Input
				label="Email"
				error={errors.email}
				register={() => register('email', { required: true })}
			/>
			<Input
				type="password"
				label="Password"
				error={errors.password}
				register={() => register('password', { required: true })}
			/>
			<button className={classes.btn}>log in</button>
		</form>
	)
}

export default Login
