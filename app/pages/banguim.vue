<template lang="pug">
meta(name="referrer" content="no-referrer")
div.banguimContainer
  //- 选项卡切换
  div.banguimNav
    button.NavItem.JiEun(
      :class="{ active: activeTab === 'bangumi' }"
      @click="activeTab = 'bangumi'"
    ) 追番
    button.NavItem.JiEun(
      :class="{ active: activeTab === 'cinema' }"
      @click="activeTab = 'cinema'"
    ) 追剧
  
  //- 加载/错误状态
  div(v-if="pending").loading
    div.loading-ripple
  div(v-else-if="hasError").error
    h3 加载失败
    p {{ error }}
    button.retry-btn(@click="refresh") 立即刷新
  
  //- 数据展示
  div(v-else).banguimCard
    //- 追番列表
    div(v-if="activeTab === 'bangumi'").banguimList
      div(
        v-for="item in bangumiList"
        :key="item.season_id"
      ).banguimItem
        img.banguimImage(
          :src="item.cover"
          :alt="item.title"
          loading="lazy"
        )
        div.title
          a(:href="item.url" target="_blank") {{ item.title }}
        span.dateSignpost {{ item.publish.release_date }}
        span.score(v-if="item.rating")
          svg(width="12" height="12" viewBox="0 0 24 24" fill="currentColor")
            path(d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z")
          | {{ item.rating.score }}
      div.empty(v-if="bangumiList.length === 0")
        span.iconify(class="i-ph:warning-circle-bold icon error-icon")
        p 暂无追番数据: bangumiList Not data
    
    //- 追剧列表
    div(v-if="activeTab === 'cinema'").banguimList
      div(
        v-for="item in cinemaList"
        :key="item.season_id"
      ).banguimItem
        img.banguimImage(
          :src="item.cover"
          :alt="item.title"
          loading="lazy"
        )
        div.title
          a(:href="item.url" target="_blank") {{ item.title }}
        span.dateSignpost {{ item.publish.release_date }}
        span.score(v-if="item.rating")
          svg(width="12" height="12" viewBox="0 0 24 24" fill="currentColor")
            path(d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z")
          | {{ item.rating.score }}
      div.empty(v-if="cinemaList.length === 0")
        span.iconify(class="i-ph:warning-circle-bold icon error-icon")
        p 暂无追番数据: cinemaList Not data
  
  //- 版权信息
  div.banguimCopyright
    div.copyright(v-for="crdata in copyRight" :key="crdata.name")
      | Rendered by 
      a(:href="crdata.href" target="_blank") {{ crdata.name }}
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { BangumiFollowResponse, CinemaFollowResponse} from '../types/bililbilil'
import { copyRight } from '~/info'

const layoutStore = useLayoutStore()
layoutStore.setAside(['blog-stats', 'blog-tech', 'blog-site-info', 'blog-log'])

// 状态管理
const activeTab = ref<'bangumi' | 'cinema'>('bangumi')
const pending = ref(false)
const error = ref<string | null>(null)
const hasError = ref(false)

// 数据存储
const bangumiList = ref<any[]>([])
const cinemaList = ref<any[]>([])

// 优化：预加载关键CSS
const preloadCriticalCSS = () => {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style')
    style.textContent = `
      .banguimContainer { margin-top: 2rem; margin-left: 1rem; margin-right: 1rem; }
      .loading { display: flex; justify-content: center; }
      .banguimNav { padding: 30px 0 20px; display: flex; align-items: center; flex-wrap: wrap; }
      .NavItem { font-size: 1em; cursor: pointer; border-bottom: 1px solid transparent; 
        transition: .5s border-color; display: flex; align-items: center; text-transform: capitalize; 
        margin-right: 20px; color: var(--db--text-color); }
    `
    document.head.appendChild(style)
  }
}

// 通用请求封装（带重试机制）
const fetchData = async <T>(
  url: string,
  type: 'bangumi' | 'cinema',
  retries = 3
): Promise<T> => {
  try {
    const { data } = await useFetch(url, {
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
      '/api/bililbilil/cinemaList.json',
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
  // preloadCriticalCSS() // 预加载关键CSS
  loadData()
})

// 刷新逻辑优化
const refresh = () => {
  if (hasError.value) {
    hasError.value = false
  }
  loadData()
}
</script>

<style lang="scss" scoped>
// 变量定义
$main-color: var(--db-main-color);
$hover-color: var(--db-hover-color);
$text-color: var(--db--text-color);
$text-color-light: var(--db--text-color-light);
$border-radius: var(--thyuu--size-radius);
$card-normal-size: var(--thyuu--size-card-normal);
$small-size: var(--thyuu--size-small);
$animation: opacity .5s var(--animation-in) backwards, transform 1s var(--animation-in) backwards, filter .7s var(--animation-in);

// 页面样式
.banguimContainer {
  margin-top: 20px;
  margin-left: 1rem;
  margin-right: 1rem;
  
  // 加载样式
  .loading {
    display: flex;
    justify-content: center;
    
    &-ripple {
      align-items: center;
      min-height: 50vh;
      display: inline-flex;
      position: relative;
      width: 80px;
      height: 80px;
      
      &:after, &:before {
        position: absolute;
        border: 4px solid $main-color;
        content: "";
        opacity: 1;
        border-radius: 50%;
        animation: lds-ripple 1s cubic-bezier(0,.2,.8,1) infinite;
      }
    }
  }
  
  // 错误样式
  .error {
    text-align: center;
    padding: 40px;
    color: #666;
    
    button {
      margin-top: 10px;
      padding: 8px 16px;
      background-color: #00a1d6;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  }
  
  // 无数据样式
  .empty {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 4rem 2rem;
    text-align: center;
    
    .error-icon {
      color: var(--c-text-secondary);
      font-size: 1.1rem;
      margin: 0 0 1rem;
    }
  }
  
  // 导航样式
  .banguimNav {
    padding: 0px 0 20px;
    justify-self: center;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    
    .NavItem {
      font-size: 1em;
      cursor: pointer;
      border-bottom: 1px solid transparent;
      transition: .5s border-color;
      display: flex;
      align-items: center;
      text-transform: capitalize;
      margin-right: 20px;
      color: $text-color;
      
      &.active {
        border-color: $main-color;
      }
    }
  }
  
  // 卡片容器
  .banguimCard {
    .banguimList {
      position: relative;
      display: grid;
      grid: auto-flow min(#{$card-normal-size} * 1.6, 70vw) / repeat(auto-fit, minmax(min(#{$card-normal-size} * .9, 50% - 1em), 1fr));
      gap: .5em;
      width: 100%;
      height: 100%;
      overflow: hidden;
      animation: $animation;
      transition: .1s;
      
      .banguimItem {
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
        margin: 0 20px 20px 0;
        border-radius: $border-radius;
        background: #000;
        overflow: hidden;
        position: relative;
        
        .banguimImage {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 0;
          -webkit-mask: linear-gradient(#0006, #000c, #0000);
          transition: ease-in-out .3s;
          object-fit: cover;
          inset: 0;
        }
        
        .title {
          order: -1;
          z-index: 1;
          flex: 100%;
          position: relative;
          padding: .5em 1em;
          margin: 0;
          border-radius: 1em;
          line-height: 1;
          font-weight: 400;
          color: white;
          width: auto;
          margin-top: 2px;
          font-size: 14px;
          line-height: 1.4;
          color: $text-color;
          
          &::before {
            content: "\e667";
            display: inline-block;
            text-indent: 0;
            margin: 0 .25em 0 0;
            rotate: 45deg;
            scale: .75;
            transition: rotate .5s;
          }
          
          a {
            color: hsl(var(--thyuu--main-color));
          }
        }
        
        .dateSignpost, .score {
          position: relative;
          padding: .5em 1em;
          margin: 0;
          border-radius: 1em;
          line-height: 1;
          font-weight: 400;
          color: white;
          width: auto;
          background: #f5c518;
          color: #000;
          border-radius: 4px;
          line-height: 1;
          padding: 3px 5px;
          font-size: 12px;
          display: flex;
          margin-bottom: 2px;
          font-weight: 900;
          color: #ffffffb3 !important;
          background: #ffffff1c !important;
          -webkit-backdrop-filter: saturate(1.8) blur(20px);
          backdrop-filter: saturate(1.8) blur(20px);
          font-size: $small-size !important;
        }
        
        .dateSignpost:after {
          all: unset;
          content: '标记';
          margin: 0 0 0 .5em;
        }
        
        .score {
          svg {
            fill: #f5c518;
            margin-right: 5px;
          }
        }
      }
    }
  }
  
  // 版权信息
  .banguimCopyright {
    font-size: 12px;
    text-align: right;
    margin-top: 20px;
    color: $text-color-light;
    
    .copyright a {
      color: hsl(var(--thyuu--main-color));
      
      &::before {
        content: "\e667";
        display: inline-block;
        text-indent: 0;
        margin: 0 .25em 0 0;
        rotate: 45deg;
        scale: .75;
        transition: rotate .5s;
      }
    }
  }
}

// 全局样式
:root {
  --banguim--edgelr: 3rem;
  --animation: opacity .5s var(--animation-in) backwards, transform 1s var(--animation-in) backwards, filter .7s var(--animation-in);
  --db--text-color: hsl(var(--thyuu--color-font) / var(--thyuu--alpha-font));
  --thyuu--color-font: 0deg 0% 20%;
  --thyuu--alpha-font: 100%;
  --db-main-color: hsl(var(--thyuu--main-color) / 70%);
  --db-hover-color: hsl(var(--thyuu--main-color) / 70%);
  --db--text-color: hsl(var(--thyuu--color-font) / var(--thyuu--alpha-font));
  --db--text-color-light: var(--thyuu--alpha-font);
  transition: .3s;
}

// 动画定义
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>