<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { BangumiFollowResponse, CinemaFollowResponse, UserInfo } from '../types/bililbilil'
import { useCookie } from '@vueuse/core'

// 状态管理
const activeTab = ref<'bangumi' | 'cinema'>('bangumi')
const pending = ref(false)
const error = ref<string | null>(null)
const hasError = ref(false) // 新增错误标记

// 数据存储
const bangumiList = ref<any[]>([])
const cinemaList = ref<any[]>([])
const userInfo = ref<UserInfo | null>(null)

// 获取认证信息（增强校验）
const getCredentials = (): { [key: string]: string } => {
  const sessdata = useCookie('SESSDATA')?.value || ''
  const biliJct = useCookie('bili_jct')?.value || ''
  const buvid3 = useCookie('BUVID3')?.value || ''

  if (!sessdata || !biliJct || !buvid3) {
    throw new Error('请先登录B站')
  }
  return { sessdata, biliJct, buvid3 }
}

// 通用请求封装（带重试机制）
const fetchData = async <T>(
  url: string,
  type: 'bangumi' | 'cinema',
  retries = 3
): Promise<T> => {
  try {
    const { data } = await useFetch(url, {
      headers: {
        'Cookie': `SESSDATA=${getCredentials().sessdata}; buvid3=${getCredentials().buvid3}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
      },
      responseType: 'json',
      timeout: 10000
    })

    if (!data.value) throw new Error('API返回空数据')
    if (data.value.code !== 0) {
      throw new Error(data.value.message || `错误码：${data.value.code}`)
    }
    return data.value as T
  } catch (err) {
    if (retries > 0) {
      console.log(`[${type}] 请求失败，剩余重试次数: ${retries}`)
      await new Promise(r => setTimeout(r, 1000))
      return fetchData(url, type, retries - 1)
    }
    throw err
  }
}

// 获取追番列表
const fetchBangumiList = async () => {
  try {
    const data = await fetchData<BangumiFollowResponse>(
      'https://proxy.uzhix.top/blbl/bangumi',
      'bangumi'
    )
    bangumiList.value = data.data.list
  } catch (err) {
    console.error('[bangumi] 加载失败:', err)
    throw err
  }
}

// 获取追剧列表
const fetchCinemaList = async () => {
  try {
    const data = await fetchData<CinemaFollowResponse>(
      'https://proxy.uzhix.top/blbl/cinema', // 修复空URL问题
      'cinema'
    )
    cinemaList.value = data.data.list
  } catch (err) {
    console.error('[cinema] 加载失败:', err)
    throw err
  }
}

// 数据加载控制
const loadData = async () => {
  pending.value = true
  error.value = null
  hasError.value = false

  try {
    await Promise.all([fetchBangumiList(), fetchCinemaList()])
  } catch (err) {
    hasError.value = true
    error.value = `加载失败: ${err instanceof Error ? err.message : '未知错误'}`
  } finally {
    pending.value = false
  }
}

// 生命周期钩子
onMounted(() => {
  loadData()
})

// 刷新逻辑优化
const refresh = () => {
  if (hasError.value) {
    hasError.value = false // 重置错误状态
  }
  loadData()
}
</script>

<template>
  <meta name="referrer" content="no-referrer">
  <div class="banguimContainer">
    <!-- 选项卡切换 -->
    <div class="banguimNav">
      <button 
        :class="['NavItem JiEun', { active: activeTab === 'bangumi' }]" 
        @click="activeTab = 'bangumi'"
      >
        追番
      </button>
      <button 
        :class="['NavItem JiEun', { active: activeTab === 'cinema' }]" 
        @click="activeTab = 'cinema'"
      >
        追剧
      </button>
    </div>

    <!-- 加载/错误状态 -->
    <div v-if="pending" class="loading">
      <div class="loading-ripple"></div>
      <p>正在加载中...</p>
    </div>

    <div v-else-if="hasError" class="error">
      <h3>加载失败</h3>
      <p>{{ error }}</p>
      <button @click="refresh" class="retry-btn">立即刷新</button>
    </div>

    <!-- 数据展示 -->
    <div v-else class="banguimCard">
      <!-- 追番列表 -->
      <div v-if="activeTab === 'bangumi'">
        <div v-for="item in bangumiList" :key="item.season_id" class="banguimItem">
          <img :src="item.cover" :alt="item.title" class="banguimImage" />
          <div class="info">
            <h3><a :href="item.url" target="_blank">{{ item.title }}</a></h3>
            <div class="meta">
              <span class="date">{{ item.publish.release_date }}</span>
              <span class="rating" v-if="item.rating">
                <svg width="14" height="14"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>
                {{ item.rating.score }}
              </span>
            </div>
          </div>
        </div>
        <div v-if="bangumiList.length === 0" class="empty">
          <p>暂无追番数据</p>
        </div>
      </div>

      <!-- 追剧列表 -->
      <div v-if="activeTab === 'cinema'">
        <div v-for="item in cinemaList" :key="item.season_id" class="banguimItem">
          <img :src="item.cover" :alt="item.title" class="banguimImage" />
          <div class="info">
            <h3><a :href="item.url" target="_blank">{{ item.title }}</a></h3>
            <div class="meta">
              <span class="date">{{ item.publish.release_date }}</span>
              <span class="rating" v-if="item.rating">
                <svg width="14" height="14"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>
                {{ item.rating.score }}
              </span>
            </div>
          </div>
        </div>
        <div v-if="cinemaList.length === 0" class="empty">
          <p>暂无追剧数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 状态指示器优化 */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
}

.loading-ripple {
  position: relative;
  width: 60px;
  height: 60px;
  animation: rotate 1.5s linear infinite;
}

.loading-ripple::before,
.loading-ripple::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid transparent;
  border-top-color: var(--primary-color);
  animation: ripple 1s ease-out infinite;
}

.loading-ripple::after {
  animation-delay: 0.5s;
}

@keyframes rotate {
  to { transform: rotate(360deg); }
}

@keyframes ripple {
  0% { transform: translateY(0) translateX(0) scale(0.8); opacity: 1; }
  100% { transform: translateY(-80px) translateX(80px) scale(1.2); opacity: 0; }
}

/* 错误提示增强 */
.error {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 200, 200, 0.2);
  border-radius: 8px;
  margin: 1rem;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.retry-btn:hover {
  opacity: 0.9;
}

/* 数据卡片优化 */
.banguimItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  margin: 0.5rem;
  background: var(--card-bg);
  border-radius: 8px;
  transition: transform 0.3s;
}

.banguimItem:hover {
  transform: translateY(-5px);
}

.info {
  width: 100%;
  text-align: center;
  margin-top: 0.5rem;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.rating svg {
  margin-right: 0.5rem;
}

/* 空状态样式 */
.empty {
  padding: 2rem;
  text-align: center;
  color: var(--text-light);
}
</style>