export const Storage = {
  get: (key: string) => {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  },
  set: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
}
