import { FC } from "react"
import { FieldError } from "react-hook-form"

import classes from "./Form.module.scss"

interface InputProps {
  type?: string
  label: string
  error: FieldError | undefined
  register: () => object
  placeholder?: string
}

export const Input: FC<InputProps> = ({
  type = "text",
  label,
  error,
  placeholder,
  register,
}) => {
  return (
    <label className={`${classes.label} ${error ? classes.error : ""}`}>
      {label}
      <input
        type={type}
        className={`${classes.input} ${error ? "border-rose-400" : ""}`}
        placeholder={placeholder}
        {...register()}
      />
      {error && <p>{error.message}</p>}
    </label>
  )
}
