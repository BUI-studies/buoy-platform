import { getHeaders, _URL, request } from "@/api/"
import { LoginInputs } from "@/pages/Login/Login.helper"

const login = async (formData: LoginInputs) => {
  return request(_URL.login, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(formData),
  })
}

const verify = async (token: string) => {
  return request(_URL.verify(token))
}

const getMeetings = async (fullName: string) =>
  request(`${_URL.meetings}?fullname=${fullName}`)

export const API = {
  login,
  verify,
  getMeetings,
}
