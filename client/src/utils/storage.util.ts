export const TOKEN_KEY = "user"

export const Storage = {
  get: (key: string) => {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  },
  set: (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
  remove: (key: string) => {
    localStorage.removeItem(key)
  },
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY)
  },
}
