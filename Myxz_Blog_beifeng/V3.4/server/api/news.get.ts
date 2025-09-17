interface MorningNewsItem {
    code: string
    message: string
    data: MorningNewsData[]
}

interface MorningNewsData {
    date: string,
    news: [],
    image: string
    tip: string
    cover: {
      music: string
      news: string
    }
    link: string
    created: string
    created_at: string
    updated: string
    updated_at: string
    day_of_week: string
    lunar_date: string
    api_updated: string
    api_updated_at: string
}