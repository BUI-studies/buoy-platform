import { LoginInputs } from "@/pages/Login/Login.helper"

const _URL = {
  login: "/api/auth/login",
  verify: (token: string) => `/api/auth?token=${token.trim()}`,
}

const login = (formData: LoginInputs) =>
  fetch(_URL.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((r) => r.json())

const verify = (token: string) =>
  fetch(_URL.verify(token)).then((r) => r.json())

export const API = {
  login,
  verify,
}
