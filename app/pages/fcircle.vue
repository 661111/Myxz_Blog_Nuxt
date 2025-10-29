<template lang="pug">
//- 预加载关键CSS资源
link(rel="preload" href="/assets/css/moments.css" as="style" onload="this.onload=null;this.rel='stylesheet'")
noscript
  link(rel="stylesheet" href="/assets/css/moments.css")

.page-banner(style="background-image: url(/assets/img/page_backgroud/moment.webp)")
  .banner-content
    h1 博友圈
    p 发现更多有趣的博主
  .banner-extra
    .friend-stats
      .update-time Updated at {{ stats.last_updated_time ? formatDate(stats.last_updated_time) : '2025-07-17' }}
      .powered-by Powered by FriendCircleLite

.page-fcircle
  .article-list
    //- 随机文章区域
    .random-article(v-if="randomArticle")
      .random-container-title 随机钓鱼
      a.article-item(href="#" @click.prevent="openRandomArticle")
        .article-container.gradient-card
          .article-author {{ randomArticle.author }}
          .article-title {{ randomArticle.title }}
          .article-date {{ formatDate(randomArticle.created) }}
      button.refresh-btn.gradient-card(@click="displayRandomArticle")
        span(class="iconify i-ph:link-bold" aria-hidden="true")

    //- 文章列表区域
    .articles-list
      .article-item(
        v-for="(article, index) in displayedArticles"
        :key="`article-${index}`"
        :class="{'new-item': index >= displayedArticles.length - UserConfig.page_turning_number}"
      )
        .article-image(@click="showAuthorArticles(article.author, article.avatar, article.link)")
          img(
            :src="avatarOrDefault(article.avatar)"
            :alt="`${article.author}的头像`"
            loading="lazy"
            @error="handleAvatarError"
          )
        .article-container.gradient-card
          .article-author {{ article.author }}
          .article-title(@click="openArticle(article.link)") {{ article.title }}
          .article-date {{ formatDate(article.created) }}

    //- 加载更多按钮
    .load-more-container
      button.load-more.gradient-card(
        v-show="hasMoreArticles"
        @click="loadMoreArticles"
      ) 再来亿点

    //- 作者模态框
    modal-component(
      v-if="showModal"
      :author="currentAuthor"
      :avatar="currentAuthorAvatar"
      :origin="authorOrigin"
      :articles="authorArticles"
      @close="hideModal"
    )
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'

const appConfig = useAppConfig()
const layoutStore = useLayoutStore()

layoutStore.setAside(['blog-stats', 'blog-site', 'blog-tech', 'blog-site-info', 'blog-log'])

useSeoMeta({
  title: '友链朋友圈',
  ogType: 'profile',
  description: `${appConfig.title}的友链朋友圈页面。`,
})

// 配置选项
const UserConfig = reactive({
  private_api_url: 'https://moments.myxz.top/', 
  page_turning_number: 20,
  error_img: "https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite@latest/static/favicon.ico"
})

// 状态管理
const allArticles = ref([])
const displayedArticles = ref([])
const stats = reactive({
  friends_num: 0,
  active_num: 0,
  article_num: 0,
  last_updated_time: ''
})
const start = ref(0)
const hasMoreArticles = ref(true)
const randomArticle = ref(null)
const showModal = ref(false)
const currentAuthor = ref('')
const currentAuthorAvatar = ref('')
const authorOrigin = ref('')
const authorArticles = ref([])

// 缓存键
const CACHE_KEYS = {
  DATA: 'friend-circle-lite-cache',
  TIME: 'friend-circle-lite-cache-time',
  STATS: 'friend-circle-lite-stats'
}

// 页面挂载时初始化
onMounted(() => {
  initializeFC()
  // 预加载关键资源
  preloadCriticalResources()
})

// 清理事件监听
onUnmounted(() => {
  window.removeEventListener('click', globalClickHandler)
})

// 预加载关键资源
const preloadCriticalResources = () => {
  if (process.client) {
    // 预加载错误图片
    const errorImg = new Image()
    errorImg.src = UserConfig.error_img
    
    // 预加载模态框可能用到的头像
    const preloadImages = displayedArticles.value
      .slice(0, 5) // 只预加载前5个
      .map(article => {
        const img = new Image()
        img.src = avatarOrDefault(article.avatar)
        return img
      })
  }
}

// 友链圈初始化
const initializeFC = async () => {
  await loadMoreArticles()
}

// 加载更多文章
const loadMoreArticles = async () => {
  const now = Date.now()
  
  try {
    // 检查缓存
    if (process.client) {
      const cacheTime = localStorage.getItem(CACHE_KEYS.TIME)
      if (cacheTime && (now - parseInt(cacheTime) < 10 * 60 * 1000)) {
        const cachedData = localStorage.getItem(CACHE_KEYS.DATA)
        const cachedStats = localStorage.getItem(CACHE_KEYS.STATS)
        
        if (cachedData && cachedStats) {
          processArticles(JSON.parse(cachedData), JSON.parse(cachedStats))
          return
        }
      }
    }
    
    // 从API获取数据
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10秒超时
    
    const response = await fetch(`${UserConfig.private_api_url}all.json`, {
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    const data = await response.json()
    
    // 更新缓存
    if (process.client) {
      localStorage.setItem(CACHE_KEYS.DATA, JSON.stringify(data.article_data))
      localStorage.setItem(CACHE_KEYS.STATS, JSON.stringify(data.statistical_data))
      localStorage.setItem(CACHE_KEYS.TIME, now.toString())
    }
    
    processArticles(data.article_data, data.statistical_data)
  } catch (error) {
    console.error('加载文章失败:', error)
    // 尝试使用缓存数据
    if (process.client) {
      const cachedData = localStorage.getItem(CACHE_KEYS.DATA)
      const cachedStats = localStorage.getItem(CACHE_KEYS.STATS)
      if (cachedData && cachedStats) {
        processArticles(JSON.parse(cachedData), JSON.parse(cachedStats))
      }
    }
  }
}

// 处理文章数据
const processArticles = (articleData, statisticalData) => {
  // 更新统计数据
  if (statisticalData) {
    Object.assign(stats, statisticalData)
  }
  
  // 合并新旧文章（去重）
  const newArticles = articleData || []
  const existingIds = new Set(allArticles.value.map(a => a.link))
  const uniqueNewArticles = newArticles.filter(article => !existingIds.has(article.link))
  
  allArticles.value = [...allArticles.value, ...uniqueNewArticles]
  
  // 更新显示的列表
  const newDisplayed = allArticles.value.slice(
    start.value, 
    start.value + UserConfig.page_turning_number
  )
  
  displayedArticles.value = [...displayedArticles.value, ...newDisplayed]
  
  // 更新起始位置
  start.value += UserConfig.page_turning_number
  
  // 检查是否有更多文章
  hasMoreArticles.value = start.value < allArticles.value.length
  
  // 显示随机文章
  if (!randomArticle.value && allArticles.value.length > 0) {
    displayRandomArticle()
  }
}

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return ''
  try {
    return new Date(dateString).toISOString().substring(0, 10)
  } catch {
    return dateString.substring(0, 10)
  }
}

// 显示随机文章
const displayRandomArticle = () => {
  if (allArticles.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * allArticles.value.length)
    randomArticle.value = allArticles.value[randomIndex]
  }
}

// 头像加载处理
const avatarOrDefault = (avatar) => {
  return avatar || UserConfig.error_img
}

const handleAvatarError = (event) => {
  event.target.src = UserConfig.error_img
  event.target.onerror = null // 防止循环错误
}

// 打开文章链接
const openArticle = (link) => {
  window.open(link, '_blank', 'noopener,noreferrer')
}

// 打开随机文章
const openRandomArticle = () => {
  if (randomArticle.value) {
    openArticle(randomArticle.value.link)
  }
}

// 显示作者文章模态框
const showAuthorArticles = (author, avatar, link) => {
  currentAuthor.value = author
  currentAuthorAvatar.value = avatar
  try {
    authorOrigin.value = new URL(link).origin
  } catch {
    authorOrigin.value = link
  }
  
  authorArticles.value = allArticles.value
    .filter(article => article.author === author)
    .slice(0, 4)
  
  showModal.value = true
  document.body.classList.add('overflow-hidden')
  window.addEventListener('click', globalClickHandler)
}

// 全局点击事件处理
const globalClickHandler = (event) => {
  if (event.target.id === 'modal') {
    hideModal()
  }
}

// 隐藏模态框
const hideModal = () => {
  showModal.value = false
  document.body.classList.remove('overflow-hidden')
  window.removeEventListener('click', globalClickHandler)
}

// 模态框组件
const ModalComponent = {
  props: ['author', 'avatar', 'origin', 'articles'],
  emits: ['close'],
  setup(props, { emit }) {
    const handleAvatarError = (event) => {
      event.target.src = UserConfig.error_img
    }
    
    const formatDate = (dateString) => {
      return dateString ? dateString.substring(0, 10) : ''
    }
    
    return {
      handleAvatarError,
      formatDate,
      UserConfig
    }
  },
  template: `
    <div id="modal" class="modal modal-open" @click.self="$emit('close')">
      <div class="modal-content">
        <img 
          id="modal-author-avatar" 
          :src="avatar || UserConfig.error_img" 
          @error="handleAvatarError" 
        />
        <a id="modal-author-name-link" :href="origin" target="_blank" rel="noopener noreferrer">
          {{ author }}
        </a>
        
        <div id="modal-articles-container">
          <div 
            v-for="(article, index) in articles" 
            :key="index" 
            class="modal-article"
          >
            <a 
              class="modal-article-title" 
              :href="article.link" 
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ article.title }}
            </a>
            <div class="modal-article-date">📅{{ formatDate(article.created) }}</div>
          </div>
        </div>
        
        <img 
          id="modal-bg" 
          :src="avatar || UserConfig.error_img" 
          @error="handleAvatarError" 
        />
      </div>
    </div>
  `
}
</script>

<!-- SCSS 版本 -->
<style lang="scss" scoped>
// 变量定义
$banner-height: 320px;
$banner-min-height: 256px;
$avatar-size: 2rem;
$container-height: 2.5rem;
$modal-max-width: 500px;
$modal-max-height: 80vh;

// 混入
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin gradient-card {
  border-radius: 8px;
  box-shadow: 0 0 0 1px var(--c-bg-soft);
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 0 0 1px var(--c-bg-soft), 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

@mixin text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 动画定义
@keyframes float-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

// 顶部banner样式
.page-banner {
  background-position: 50%;
  background-size: cover;
  border-radius: 8px;
  margin: 1rem;
  max-height: $banner-height;
  min-height: $banner-min-height;
  overflow: hidden;
  position: relative;
  
  .banner-content {
    color: #eee;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    justify-content: space-between;
    padding: 1rem;
    text-shadow: 0 4px 5px rgba(0, 0, 0, 0.5);
    
    h1 {
      font-size: 2rem;
      margin: 0;
    }
    
    p {
      font-size: 1rem;
      opacity: 0.9;
      margin: 0;
    }
  }
  
  .banner-extra {
    @include flex-center;
    align-items: flex-end;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    justify-content: flex-end;
    margin: 1rem;
  }
}

// 友链朋友圈样式
.page-fcircle {
  animation: float-in 0.2s backwards;
  margin: 1rem;
}

.friend-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: #eee;
  font-family: var(--font-monospace);
  font-size: 0.7rem;
  gap: 0.1rem;
  opacity: 0.7;
  text-shadow: 0 4px 5px rgba(0, 0, 0, 0.5);
  
  .update-time {
    opacity: 1;
  }
  
  .powered-by {
    opacity: 0.8;
  }
}

.article-list {
  .random-article {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 10px;
    justify-content: space-between;
    margin: 1rem 0;
    
    .random-container-title {
      font-size: 1.2rem;
      white-space: nowrap;
    }
    
    .article-item {
      flex: 1;
      min-width: 0;
      
      .article-container {
        min-width: 0;
        
        .article-title {
          @include text-ellipsis;
        }
      }
    }
    
    .refresh-btn {
      @include flex-center;
      @include gradient-card;
      flex-shrink: 0;
      width: $container-height;
      height: $container-height;
      cursor: pointer;
      color: var(--c-text-2);
      
      &:hover {
        color: var(--c-text);
      }
    }
  }
  
  .articles-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}

.article-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  
  &.new-item {
    animation: float-in 0.2s var(--delay) backwards;
  }
  
  .article-image {
    flex-shrink: 0;
    width: $avatar-size;
    height: $avatar-size;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 0 0 1px var(--c-bg-soft);
    cursor: pointer;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.8;
      transition: all 0.2s;
      
      &:hover {
        opacity: 1;
        transform: scale(1.05);
      }
    }
  }
  
  .article-container {
    @include gradient-card;
    display: flex;
    align-items: center;
    gap: 5px;
    height: $container-height;
    padding: 10px;
    width: 100%;
    overflow: hidden;
    
    &:hover {
      .article-title {
        color: var(--c-text);
      }
    }
    
    .article-author {
      color: var(--c-text-3);
      font-size: 0.85rem;
      flex-shrink: 0;
    }
    
    .article-title {
      color: var(--c-text-2);
      flex: 1;
      font-size: 0.9375rem;
      @include text-ellipsis;
      transition: color 0.2s;
      cursor: pointer;
    }
    
    .article-date {
      color: var(--c-text-3);
      font-family: var(--font-monospace);
      font-size: 0.75rem;
      flex-shrink: 0;
    }
  }
}

.load-more-container {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  
  .load-more {
    @include gradient-card;
    background-color: var(--ld-bg-card);
    border-radius: 8px;
    box-shadow: 0.1em 0.2em 0.5rem var(--ld-shadow);
    font-size: 0.875rem;
    height: 42px;
    padding: 0.75rem;
    width: 200px;
    cursor: pointer;
    
    &:hover {
      color: var(--c-text);
    }
  }
}

// 模态框样式
.modal {
  @include flex-center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  backdrop-filter: blur(20px);
  z-index: 100;
  
  &.modal-open {
    display: flex;
  }
  
  .modal-content {
    background-color: var(--c-bg-a50);
    border-radius: 12px;
    box-shadow: 0 0 0 1px var(--c-bg-soft);
    max-height: $modal-max-height;
    max-width: $modal-max-width;
    overflow-y: auto;
    padding: 1.25rem;
    position: relative;
    width: 90%;
    
    #modal-author-avatar {
      border-radius: 50%;
      height: 50px;
      object-fit: cover;
      width: 50px;
      display: block;
      margin: 0 auto 1rem;
    }
    
    #modal-author-name-link {
      display: block;
      text-align: center;
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
      color: var(--c-text);
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
    
    #modal-articles-container {
      .modal-article {
        padding: 0.75rem 0;
        border-bottom: 1px solid var(--c-bg-soft);
        
        &:last-child {
          border-bottom: none;
        }
        
        .modal-article-title {
          color: var(--c-text-2);
          text-decoration: none;
          display: block;
          margin-bottom: 0.25rem;
          line-height: 1.4;
          
          &:hover {
            color: var(--c-text);
          }
        }
        
        .modal-article-date {
          color: var(--c-text-3);
          font-family: var(--font-monospace);
          font-size: 0.875rem;
        }
      }
    }
    
    #modal-bg {
      position: absolute;
      bottom: 1.25rem;
      right: 1.25rem;
      width: 128px;
      height: 128px;
      border-radius: 50%;
      filter: blur(5px);
      opacity: 0.6;
      pointer-events: none;
      z-index: 1;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .random-article .random-container-title {
    display: none;
  }
  
  .article-item .article-container {
    flex-wrap: wrap;
    height: auto;
    
    .article-author {
      flex-grow: 1;
    }
    
    .article-title {
      flex-basis: 100%;
      order: 3;
      white-space: normal;
    }
  }
  
  .modal .modal-content {
    width: 95%;
    padding: 1rem;
  }
}
</style>

<!-- 可选：LESS 版本 -->
<!--
<style lang="less" scoped>
// 变量定义
@banner-height: 320px;
@banner-min-height: 256px;
@avatar-size: 2rem;
@container-height: 2.5rem;
@modal-max-width: 500px;
@modal-max-height: 80vh;

// 混入
.flex-center() {
  display: flex;
  align-items: center;
  justify-content: center;
}

.gradient-card() {
  border-radius: 8px;
  box-shadow: 0 0 0 1px var(--c-bg-soft);
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 0 0 1px var(--c-bg-soft), 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.text-ellipsis() {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 其余样式与SCSS版本类似，只是语法不同
// 由于篇幅限制，这里只展示结构，实际使用时需要完整转换
</style>
-->