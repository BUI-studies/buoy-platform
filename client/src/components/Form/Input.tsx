import React, { FC } from "react"
import { FieldError, UseFormRegister, FieldValues } from "react-hook-form"

import classes from "./Form.module.scss"
import { LoginInputs } from "@/pages/Login/Login.helper"

interface InputProps {
  type?: string
  label: string
  error: FieldError | undefined
  placeholder?: string
}

export const Input: FC<InputProps> = ({
  type = "text",
  label,
  error,
  placeholder,
}) => {
  return (
    <label className={`${classes.label} ${error ? classes.error : ""}`}>
      {label}
      <input
        type={type}
        className={`${classes.input} ${error ? "border-rose-400" : ""}`}
        placeholder={placeholder}
      />
      {error && <p>{error.message}</p>}
    </label>
  )
}
