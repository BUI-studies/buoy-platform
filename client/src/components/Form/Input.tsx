import React, { FC } from "react"
import { FieldError, UseFormRegister } from "react-hook-form"

import classes from "./Form.module.scss"

type InputProps = {
  name: string
  type?: string
  label: string
  register: UseFormRegister<any>
  error: FieldError | undefined
  required?: boolean
  placeholder?: string
}

export const Input: FC<InputProps> = ({
  name,
  type = "text",
  label,
  register,
  error,
  required,
  placeholder,
}) => {
  return (
    <label className={`${classes.label} ${error ? "text-red-400" : ""}`}>
      {label}
      <input
        type={type}
        className={`${classes.input} ${
          error ? "text-red-300 border-red-400" : ""
        }`}
        placeholder={placeholder}
        {...register(name, { required })}
      />
      {error && <p className="mt-2">{error.message}</p>}
    </label>
  )
}
