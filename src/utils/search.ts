import { salaryKeywords } from '~/models/requests/salary.request'
interface Search {
  [key: string]: string | RegExp | undefined
}

export const searchUtils = (keywords: salaryKeywords): Search => {
  const objectSearch: Search = {}
  if (keywords) {
    Object.keys(keywords).forEach((key) => {
      const value = (keywords as any)[key]
      if (value) {
        objectSearch[key] = new RegExp(value, 'i')
      }
    })
  }

  return objectSearch
}
