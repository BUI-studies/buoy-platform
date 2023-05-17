import React from "react"
import { useNavigate } from "react-router-dom"
import { SubmitHandler } from "react-hook-form"

import { useAuth } from "@/context"
import { REQUEST_STATUS } from "@/types"
import { LoginInputs, useLoginForm } from "./Login.helper"
import { getInputClassName } from "@/components/Form/From.helper"
import { Input } from "@/components"

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
    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({ data, status: REQUEST_STATUS.SUCCESS })
        navigate("/")
      })
  }
  console.log(errors)

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-6 mb-6 md:grid-cols-1"
    >
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
      <button className="inline-block bg-yellow-500 text-yellow-800 rounded shadow py-2 px-5 text-sm">
        log in
      </button>
    </form>
  )
}
