import React from "react"
import { useNavigate } from "react-router-dom"
import { SubmitHandler } from "react-hook-form"

import { Input } from "@/components"
import { useAuth } from "@/context"
import { REQUEST_STATUS } from "@/types"
import { API } from "@/api"

import { LoginInputs, useLoginForm } from "./Login.helper"
import classes from "./Login.module.scss"

export const Login = () => {
  const { setUser }: any = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useLoginForm()

  const onSubmit: SubmitHandler<LoginInputs> = (formData) => {
    API.login(formData).then((data) => {
      setUser({ data, status: REQUEST_STATUS.SUCCESS })
      navigate("/")
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Input
        name="email"
        label="Email"
        register={register}
        error={errors.email}
        required
      />
      <Input
        name="password"
        type="password"
        label="Password"
        register={register}
        error={errors.password}
        required
      />
      <button className={classes.btn}>log in</button>
    </form>
  )
}
