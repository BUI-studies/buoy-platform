import { useForm, FieldValues } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

export interface LoginInputs extends FieldValues {
  email: string
  password: string
}

export const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
})

export function useLoginForm() {
  const { register, handleSubmit, watch, formState } = useForm<LoginInputs>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  })

  return {
    register,
    handleSubmit,
    watch,
    formState,
  }
}
