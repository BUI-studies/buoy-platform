import { TOKEN_KEY } from "@/utils"
import { Storage } from "@/utils"

const getToken = () => Storage.get(TOKEN_KEY)

export const headers = {
  "Content-Type": "application/json",
  Authorization: getToken(),
}

export const _URL = {
  login: "/api/auth/login",
  verify: (token: string) => `/api/auth?token=${token.trim()}`,
  meetings: "/api/meetings",
}

const requestOptions = {
  method: "GET",
  headers,
}

export const request = async (
  url: string,
  options: RequestInit = requestOptions
) => {
  const resp = await fetch(url, options)
  const data = await resp.json()

  return data
}
