import type {
  DoubanBookResponse,
  DoubanMovieResponse,
  DoubanMusicResponse,
  DoubanGameResponse,
  DoubanUser
} from '~/types/douban'

export const useDoubanApi = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.doubanApiBase
  const apiKey = config.public.doubanApiKey
  const userId = config.public.doubanUserId

  // 获取用户信息
  const getUserInfo = async (): Promise<DoubanUser> => {
    const url = `${apiBase}/user/${userId}?apikey=${apiKey}`
    const response = await $fetch(url)
    return response as DoubanUser
  }

  // 获取用户收藏的图书
  const getUserBooks = async (start = 0, count = 20): Promise<DoubanBookResponse> => {
    const url = `${apiBase}/book/user/${userId}/collections?status=read&apikey=${apiKey}&start=${start}&count=${count}`
    const response = await $fetch(url)
    return response as DoubanBookResponse
  }

  // 获取用户收藏的电影
  const getUserMovies = async (start = 0, count = 20): Promise<DoubanMovieResponse> => {
    const url = `${apiBase}/movie/user/${userId}/collections?apikey=${apiKey}&start=${start}&count=${count}`
    const response = await $fetch(url)
    return response as DoubanMovieResponse
  }

  // 获取用户收藏的音乐
  const getUserMusic = async (start = 0, count = 20): Promise<DoubanMusicResponse> => {
    const url = `${apiUnit}/music/user/${userId}/collections?apikey=${apiKey}&start=${start}&count=${count}`
    const response = await $fetch(url)
    return response as DoubanMusicResponse
  }

  // 搜索游戏（豆瓣没有专门的游戏API，使用通用搜索）
  const searchGames = async (query: string, start = 0, count = 20): Promise<any> => {
    const url = `${apiBase}/game/search?q=${encodeURIComponent(query)}&apikey=${apiKey}&start=${start}&count=${count}`
    const response = await $fetch(url)
    return response
  }

  return {
    getUserInfo,
    getUserBooks,
    getUserMovies,
    getUserMusic,
    searchGames
  }
}