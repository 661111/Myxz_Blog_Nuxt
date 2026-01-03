export interface Daily60sNewsItem {
  date: string
  news: string[]
  cover: string
  tip: string
  image: string
  link: string
  created: string
  created_at: number
  updated: string
  updated_at: number
  day_of_week: string
  lunar_date: string
  api_updated: string
  api_updated_at: number
}

export interface Daily60sResponse {
  code: number
  message: string
  data: Daily60sNewsItem
}