export const capitalizeStr = (str: string): string => {
  const string = str.toLowerCase()
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const slug = (str: string): string =>
  str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")

export const unslug = (str: string): string => {
  const slug = str.split("-")
  return slug.join(" ")
}

export const limitString = (str: string, limit: number): string => {
  const string = str
  const length = limit
  const result = string.length > length ? string.substring(0, limit) + "..." : string
  return result
}
