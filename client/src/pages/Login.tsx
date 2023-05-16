import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "@/context"
import { REQUEST_STATUS } from "@/types"

export const Login = () => {
  const { setUser }: any = useAuth()
  const navigate = useNavigate()

  const [formState, setFormState] = useState({ email: "", password: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({ data, status: REQUEST_STATUS.SUCCESS })
        navigate("/")
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={handleChange}
      />
      <button type="submit">log in</button>
    </form>
  )
}
