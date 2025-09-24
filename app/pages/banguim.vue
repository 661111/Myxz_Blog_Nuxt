<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { BangumiFollowResponse, CinemaFollowResponse} from '../types/bililbilil'
import { copyRight } from '~/info'

const layoutStore = useLayoutStore()
layoutStore.setAside(['blog-stats', 'blog-tech', 'blog-log'])

// 状态管理
const activeTab = ref<'bangumi' | 'cinema'>('bangumi')
const pending = ref(false)
const error = ref<string | null>(null)
const hasError = ref(false) // 新增错误标记

// 数据存储
const bangumiList = ref<any[]>([])
const cinemaList = ref<any[]>([])

// 通用请求封装（带重试机制）
const fetchData = async <T>(
  url: string,
  type: 'bangumi' | 'cinema',
  retries = 3
): Promise<T> => {
  try {
    const { data } = await useFetch(url, {
      // headers: {
      //   'Cookie': `SESSDATA=${getCredentials().sessdata}; buvid3=${getCredentials().buvid3}`,
      //   'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
      // },
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
      '/api/bililbilil/bangumi.json',
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
      '/api/bililbilil/cinemaList.json', // 修复空URL问题
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
    </div>

    <div v-else-if="hasError" class="error">
      <h3>加载失败</h3>
      <p>{{ error }}</p>
      <button @click="refresh" class="retry-btn">立即刷新</button>
    </div>

    <!-- 数据展示 -->
    <div v-else class="banguimCard">
      <!-- 追番列表 -->
      <div v-if="activeTab === 'bangumi'" class="banguimList">
        <div v-for="item in bangumiList" :key="item.season_id" class="banguimItem">
          <img :src="item.cover" :alt="item.title" class="banguimImage" />
          <div class="title">
            <a :href="item.url" target="_blank">
              {{ item.title }}
            </a>
          </div>
          <span class="dateSignpost">{{ item.publish.release_date }}</span>
          <span class="score" v-if="item.rating">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>
            {{ item.rating.score }}
          </span>
        </div>
        <div v-if="bangumiList.length === 0" class="empty">
          <span class="iconify i-ph:warning-circle-bold icon error-icon"></span>
          <p>暂无追番数据: bangumiList Not data</p>
        </div>
      </div>

      <!-- 追剧列表 -->
      <div v-if="activeTab === 'cinema'" class="banguimList">
        <div v-for="item in cinemaList" :key="item.season_id" class="banguimItem">
          <img :src="item.cover" :alt="item.title" class="banguimImage" />
          <div class="title">
            <a :href="item.url" target="_blank">
              {{ item.title }}
            </a>
          </div>
          <span class="dateSignpost">{{ item.publish.release_date }}</span>
          <span class="score" v-if="item.rating">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>
            {{ item.rating.score }}
          </span>
        </div>
        <div v-if="cinemaList.length === 0" class="empty">
          <span class="iconify i-ph:warning-circle-bold icon error-icon"></span>
          <p>暂无追番数据: cinemaList Not data</p>
        </div>
      </div>
    </div>
    <div class="banguimCopyright">
      <div class="copyright" v-for="crdata in copyRight" :key="crdata.name">
        Rendered by 
        <a :href="crdata.href" target="_blank">
          {{ crdata.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="css"scoped>
/* 加载样式 */
.loading {
    display: flex;
    justify-content: center;
}
.loading-ripple {
    align-items: center;
    min-height: 50vh;
    display: inline-flex;
}
.loading-ripple {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}
.loading-ripple:after, .loading-ripple:before {
    position: absolute;
    border: 4px solid var(--db-main-color);
    content: "";
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0,.2,.8,1) infinite;
}
/* 错误样式 */
.error {
  text-align: center;
}
.error {
  text-align: center;
  padding: 40px;
  color: #666;
}
.error button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #00a1d6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
/* 无数据样式表 */
.empty {
    /* margin: 0 auto; */
    align-items: center;
    /* background: var(--c-bg); */
    /* border: 1px solid var(--c-border); */
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    padding: 4rem 2rem;
    text-align: center;
}
.empty .error-icon {
    color: var(--c-text-secondary);
    font-size: 1.1rem;
    margin: 0 0 1rem;
}
/* 全局样式表 */
:root {
    --banguim--edgelr: 3rem;
    --animation: opacity .5s var(--animation-in) backwards, transform 1s var(--animation-in) backwards, filter .7s var(--animation-in);
    --db--text-color: hsl(var(--thyuu--color-font) / var(--thyuu--alpha-font));
    --thyuu--color-font: 0deg 0% 20%;
    --thyuu--alpha-font: 100%;
}
:root {
	--db-main-color: hsl(var(--thyuu--main-color) / 70%);
	--db-hover-color: hsl(var(--thyuu--main-color) / 70%);
	--db--text-color: hsl(var(--thyuu--color-font) / var(--thyuu--alpha-font));
	--db--text-color-light: var(--thyuu--alpha-font);
	transition: .3s;
}
/* 顶部选项卡以及底部选项卡（未做）的样式表 */
.banguimNav {
    padding: 30px 0 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.banguimNav, .type {
    margin: 1em auto;
    padding: 0;
    width: fit-content;
}
.NavItem {
    font-size: 1em;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    transition: .5s border-color;
    display: flex;
    align-items: center;
    text-transform: capitalize;
    margin-right: 20px;
    color: var(--db--text-color);
}
.NavItem.JiEun.active, .NavItem:hover {
    border-color: inherit;
}
.type {
    position: fixed;
    inset: auto var(--banguim--edgelr) 0;
    z-index: 3;
    flex-flow: row-reverse;
    animation: var(--animation);
    animation-delay: .5s;
}
/* 卡片框架样式 */
.banguimItem  {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-end;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 100%;
    padding: 1em;
    gap: .5em;
    margin: 0;
    border-radius: var(--thyuu--size-radius);
    background: #000;
    overflow: hidden;
}
/* 卡片内容样式 */
.banguimContainer .banguimCard .banguimList, .db--dateList__card {
    position: relative;
    display: grid;
    grid: auto-flow min(var(--thyuu--size-card-normal)* 1.6, 70vw) / repeat(auto-fit, minmax(min(var(--thyuu--size-card-normal)* .9, 50% - 1em), 1fr));
    gap: .5em;
    width: 100%;
    height: 100%;
    overflow: hidden;
    animation: var(--animation);
    transition: .1s;
}
.banguimContainer .banguimCard .banguimItem {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
}
.banguimContainer .banguimCard .banguimItem {
    margin-right: 20px;
    margin-bottom: 20px;
    position: relative;
}
/* 卡片图片样式 */
.banguimContainer .banguimCard .banguimImage {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 0;
    -webkit-mask: linear-gradient(#0006, #000c, #0000);
    transition: ease-in-out .3s;
    object-fit: cover;
    inset: 0;
}
/* 日期以及评分信息样式 */
.banguimContainer .banguimCard .dateSignpost, .banguimContainer .banguimCard .score {
    color: #ffffffb3;
    background: #ffffff1c;
    -webkit-backdrop-filter: saturate(1.8) blur(20px);
    backdrop-filter: saturate(1.8) blur(20px);
    font-size: var(--thyuu--size-small);
}
.banguimContainer .banguimCard .dateSignpost, .banguimContainer .banguimCard .score {
    position: relative;
    padding: .5em 1em;
    margin: 0;
    border-radius: 1em;
    line-height: 1;
    font-weight: 400;
    color: white;
    width: auto;
}
.banguimContainer .banguimCard .dateSignpost, .banguimContainer .banguimCard .score {
    position: relative;
    background: #f5c518;
    color: #000;
    border-radius: 4px;
    line-height: 1;
    padding: 3px 5px;
    font-size: 12px;
    display: flex;
    margin-bottom: 2px;
    font-weight: 900;
}
.banguimContainer .banguimCard .dateSignpost:after {
    all: unset;
    content: '标记';
    margin: 0 0 0 .5em;
}
/* 标题信息样式 */
.banguimContainer .banguimCard .title {
    order: -1;
    z-index: 1;
    flex: 100%;
}
.banguimContainer .banguimCard .title {
    position: relative;
    padding: .5em 1em;
    margin: 0;
    border-radius: 1em;
    line-height: 1;
    font-weight: 400;
    color: white;
    width: auto;
}
.title {
    margin-top: 2px;
    font-size: 14px;
    line-height: 1.4;
    color: var(--db--text-color);
}
.banguimContainer .banguimCard .title::before {
    content: "\e667";
    display: inline-block;
    text-indent: 0;
    margin: 0 .25em 0 0;
    rotate: 45deg;
    scale: .75;
    transition: rotate .5s;
}
.title a {
    color: hsl(var(--thyuu--main-color));
}
/* 版权样式 */
.banguimCopyright {
    font-size: 12px;
    text-align: right;
    margin-top: 20px;
    color: var(--db--text-color-light);
}
.banguimCopyright.copyright a {
    color: hsl(var(--thyuu--main-color));
}
.banguimCopyright.copyright a::before {
    content: "\e667";
    display: inline-block;
    text-indent: 0;
    margin: 0 .25em 0 0;
    rotate: 45deg;
    scale: .75;
    transition: rotate .5s;
}
</style>