export const parseDate = (date: string): string => {
  return new Date(date).toLocaleDateString()
}

export const remplaceBackSlashInDate = (date: string): string => {
  return date.replace(/-/g, '/')
}

export function formatDate(date: string): string {
  const [year, month, day] = date.split('/')

  return `${day}/${month}/${year}`
}
