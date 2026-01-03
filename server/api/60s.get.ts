export default defineEventHandler(async (event) => {
  const API_URL = 'https://60s.viki.moe/v2/60s'
  
  try {
    const response = await fetch(API_URL, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; NuxtApp)',
      },
    })
    
    if (!response.ok) {
      throw new Error(`API 请求失败: ${response.status}`)
    }
    
    const data = await response.json()
    
    // 设置缓存头，客户端缓存5分钟
    setHeader(event, 'Cache-Control', 'public, max-age=300, s-maxage=300')
    setHeader(event, 'CDN-Cache-Control', 'max-age=300')
    
    return {
      success: true,
      timestamp: new Date().toISOString(),
      ...data
    }
  } catch (error: any) {
    console.error('获取每日60秒新闻失败:', error)
    
    return {
      success: false,
      error: error.message,
      message: '获取数据失败，请稍后重试',
      timestamp: new Date().toISOString()
    }
  }
})