import type { Daily60sResponse, Daily60sNewsItem } from '~/types/60s'

export const useDaily60s = () => {
  const API_URL = 'https://60s.viki.moe/v2/60s'
  
  const newsData = ref<Daily60sNewsItem | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const fetchDailyNews = async () => {
    loading.value = true
    error.value = null
    
    try {
      const { data, error: fetchError } = await useFetch<Daily60sResponse>(API_URL, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        // 缓存策略
        key: 'daily-60s-news',
        // 客户端缓存 5 分钟
        getCachedData: (key) => {
          if (process.client) {
            const cached = localStorage.getItem(key)
            if (cached) {
              const parsed = JSON.parse(cached)
              // 检查缓存是否过期（5分钟）
              if (Date.now() - parsed.timestamp < 5 * 60 * 1000) {
                return parsed.data
              }
            }
          }
          return undefined
        },
        onResponse({ response }) {
          if (process.client && response._data) {
            localStorage.setItem('daily-60s-news', JSON.stringify({
              data: response._data,
              timestamp: Date.now()
            }))
          }
        }
      })
      
      if (fetchError.value) {
        throw new Error(fetchError.value.message || '获取数据失败')
      }
      
      if (data.value?.code === 200 && data.value.data) {
        newsData.value = data.value.data
        return data.value.data
      } else {
        throw new Error(data.value?.message || '数据格式错误')
      }
    } catch (err: any) {
      error.value = err.message
      
      // 尝试从缓存恢复
      if (process.client) {
        const cached = localStorage.getItem('daily-60s-news')
        if (cached) {
          const parsed = JSON.parse(cached)
          if (parsed.data?.data) {
            newsData.value = parsed.data.data
          }
        }
      }
      
      return null
    } finally {
      loading.value = false
    }
  }
  
  // 获取今天的日期字符串
  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }
  
  // 检查是否需要刷新数据
  const shouldRefresh = () => {
    if (!newsData.value) return true
    return newsData.value.date !== getTodayDate()
  }
  
  // 初始化时自动获取（如果数据不是今天的）
  onMounted(async () => {
    if (process.client) {
      const cached = localStorage.getItem('daily-60s-news')
      if (cached) {
        const parsed = JSON.parse(cached)
        if (parsed.data?.data) {
          newsData.value = parsed.data.data
        }
      }
      
      if (shouldRefresh()) {
        await fetchDailyNews()
      }
    }
  })
  
  return {
    // 数据
    newsData,
    loading,
    error,
    
    // 方法
    fetchDailyNews,
    getTodayDate,
    shouldRefresh,
    
    // 计算属性
    hasData: computed(() => !!newsData.value),
    todayNews: computed(() => newsData.value?.news || []),
    newsDate: computed(() => newsData.value?.date || ''),
    newsCover: computed(() => newsData.value?.cover || ''),
    newsImage: computed(() => newsData.value?.image || ''),
    tip: computed(() => newsData.value?.tip || ''),
    lunarDate: computed(() => newsData.value?.lunar_date || ''),
    dayOfWeek: computed(() => newsData.value?.day_of_week || ''),
  }
}