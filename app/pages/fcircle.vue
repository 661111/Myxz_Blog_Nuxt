<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const appConfig = useAppConfig()
const layoutStore = useLayoutStore()

layoutStore.setAside(['blog-stats', 'blog-site', 'blog-tech', 'blog-site-info', 'blog-log'])

useSeoMeta({
  title: '友链朋友圈',
  ogType: 'profile',
  description: `${appConfig.title}的友链朋友圈页面。`,
})

// 配置选项 - 使用常量避免响应式开销
const UserConfig = {
  private_api_url: 'https://moments.myxz.top/',
  page_turning_number: 20,
  error_img: "https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite@latest/static/favicon.ico"
}

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

// 防抖加载
let isLoading = false

// 页面挂载时初始化
onMounted(() => {
  initializeFC()
  // 预加载关键图片
  preloadCriticalImages()
})

// 清理事件监听
onUnmounted(() => {
  window.removeEventListener('click', globalClickHandler)
})

// 预加载关键图片
const preloadCriticalImages = () => {
  if (process.client) {
    const preloadImage = new Image()
    preloadImage.src = UserConfig.error_img
  }
}

// 友链圈初始化
const initializeFC = () => {
  loadMoreArticles()
}

// 加载更多文章
const loadMoreArticles = async () => {
  if (isLoading) return
  isLoading = true
  
  const cacheKey = 'friend-circle-lite-cache'
  const cacheTimeKey = 'friend-circle-lite-cache-time'
  const now = Date.now()
  
  try {
    // 检查缓存
    if (process.client && localStorage) {
      const cacheTime = localStorage.getItem(cacheTimeKey)
      if (cacheTime && (now - parseInt(cacheTime) < 10 * 60 * 1000)) {
        const cachedData = JSON.parse(localStorage.getItem(cacheKey))
        if (cachedData) {
          processArticles(cachedData)
          isLoading = false
          return
        }
      }
    }
    
    // 从API获取数据
    const response = await fetch(`${UserConfig.private_api_url}all.json`)
    const data = await response.json()
    
    // 更新缓存
    if (process.client && localStorage) {
      localStorage.setItem(cacheKey, JSON.stringify(data))
      localStorage.setItem(cacheTimeKey, now.toString())
    }
    
    processArticles(data)
  } catch (error) {
    console.error('加载文章失败:', error)
  } finally {
    isLoading = false
  }
}

// 处理文章数据
const processArticles = (data) => {
  // 使用Object.assign避免重复的响应式更新
  Object.assign(stats, data.statistical_data)
  
  // 合并新旧文章
  const newArticles = data.article_data
  const mergedArticles = [...allArticles.value, ...newArticles]
  allArticles.value = mergedArticles
  
  // 计算要显示的新文章
  const endIndex = start.value + UserConfig.page_turning_number
  const newDisplayed = mergedArticles.slice(start.value, endIndex)
  displayedArticles.value = [...displayedArticles.value, ...newDisplayed]
  
  start.value = endIndex
  hasMoreArticles.value = start.value < mergedArticles.length
  
  // 延迟显示随机文章，避免阻塞主线程
  if (!randomArticle.value) {
    requestAnimationFrame(() => {
      displayRandomArticle()
    })
  }
}

// 格式化日期 - 使用记忆化优化重复计算
const formatDate = (() => {
  const cache = new Map()
  return (dateString) => {
    if (!dateString) return ''
    if (cache.has(dateString)) {
      return cache.get(dateString)
    }
    const result = dateString.substring(0, 10)
    cache.set(dateString, result)
    return result
  }
})()

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
  authorOrigin.value = new URL(link).origin
  authorArticles.value = allArticles.value
    .filter(article => article.author === author)
    .slice(0, 4)
  
  showModal.value = true
  document.body.classList.add('overflow-hidden')
  // 使用setTimeout确保事件监听在下一轮事件循环中添加
  setTimeout(() => {
    window.addEventListener('click', globalClickHandler)
  }, 0)
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
</script>

<template>
  <div class="page-banner" :style="{ backgroundImage: 'url(/assets/img/page_backgroud/moment.webp)' }">
    <div class="banner-content">
      <h1>博友圈</h1>
      <p>发现更多有趣的博主</p>
    </div>
    <div class="banner-extra">
      <div class="friend-stats">
        <div class="update-time">Updated at {{ stats.last_updated_time ? formatDate(stats.last_updated_time) : '2025-07-17' }}</div>
        <div class="powered-by">Powered by FriendCircleLite</div>
      </div>
    </div>
  </div>
  
  <div class="page-fcircle">
    <div class="article-list">
      <!-- 随机文章区域 -->
      <div v-if="randomArticle" class="random-article">
        <div class="random-container-title">随机钓鱼</div>
        <a href="#" @click.prevent="openRandomArticle" class="article-item" :aria-label="`阅读${randomArticle.author}的文章：${randomArticle.title}`">
          <div class="article-container gradient-card">
            <div class="article-author">{{ randomArticle.author }}</div>
            <div class="article-title">{{ randomArticle.title }}</div>
            <div class="article-date">{{ randomArticle.created }}</div>
          </div>
        </a>
        <button class="refresh-btn gradient-card" @click="displayRandomArticle" aria-label="刷新随机文章">
          <span class="iconify i-ph:link-bold" aria-hidden="true"></span>
        </button>
      </div>

      <!-- 文章列表区域 -->
      <div class="articles-list">
        <article v-for="(article, index) in displayedArticles" :key="`${article.author}-${article.title}-${index}`" class="article-item">
          <div class="article-image" @click="showAuthorArticles(article.author, article.avatar, article.link)" role="button" tabindex="0" @keypress.enter="showAuthorArticles(article.author, article.avatar, article.link)" :aria-label="`查看${article.author}的更多文章`">
            <img 
              :src="avatarOrDefault(article.avatar)" 
              :alt="`${article.author}的头像`"
              loading="lazy"
              @error="handleAvatarError" 
            />
          </div>
          <div class="article-container gradient-card">
            <div class="article-author">{{ article.author }}</div>
            <div class="article-title" @click="openArticle(article.link)" role="button" tabindex="0" @keypress.enter="openArticle(article.link)">
              {{ article.title }}
            </div>
            <div class="article-date">{{ formatDate(article.created) }}</div>
          </div>
        </article>
      </div>

      <div class="load-more-container">
        <button 
          v-show="hasMoreArticles" 
          class="load-more gradient-card" 
          @click="loadMoreArticles"
          :disabled="isLoading"
        >
          {{ isLoading ? '加载中...' : '再来亿点' }}
        </button>
      </div>

      <!-- 作者模态框 -->
      <Teleport to="body">
        <div 
          v-if="showModal" 
          id="modal" 
          class="modal" 
          :class="{'modal-open': showModal}"
          @click.self="hideModal"
          role="dialog"
          aria-labelledby="modal-author-name"
        >
          <div class="modal-content">
            <img 
              id="modal-author-avatar" 
              :src="avatarOrDefault(currentAuthorAvatar)" 
              :alt="`${currentAuthor}的头像`"
              loading="lazy"
              @error="handleAvatarError" 
            />
            <a id="modal-author-name-link" :href="authorOrigin" target="_blank" rel="noopener noreferrer" :aria-label="`访问${currentAuthor}的网站`">
              <span id="modal-author-name">{{ currentAuthor }}</span>
            </a>
            
            <div id="modal-articles-container">
              <article 
                v-for="(article, index) in authorArticles" 
                :key="index" 
                class="modal-article"
              >
                <a 
                  class="modal-article-title" 
                  :href="article.link" 
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="`阅读文章：${article.title}`"
                >
                  {{ article.title }}
                </a>
                <div class="modal-article-date">📅{{ formatDate(article.created) }}</div>
              </article>
            </div>
            
            <img 
              id="modal-bg" 
              :src="avatarOrDefault(currentAuthorAvatar)" 
              alt="" 
              role="presentation"
              loading="lazy"
              @error="handleAvatarError" 
            />
          </div>
        </div>
      </Teleport>
    </div>
  </div>
</template>

<style>
/* 关键CSS内联，其余异步加载 */
.page-fcircle-critical {
  /* 关键渲染路径样式 */
  .page-banner {
    background-position: 50%;
    background-size: cover;
    border-radius: 8px;
    margin: 1rem;
    max-height: 320px;
    min-height: 256px;
    overflow: hidden;
    position: relative;
  }
  
  .article-list {
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }
  
  .gradient-card {
    border-radius: 8px;
    box-shadow: 0 0 0 1px var(--c-bg-soft);
    transition: all .2s ease;
  }
}

/* 使用CSS变量提高性能 */
:root {
  --card-radius: 8px;
  --card-shadow: 0 0 0 1px var(--c-bg-soft);
  --transition-fast: 0.2s ease;
}
</style>

<style lang="scss" scoped>
/* 使用will-change提示浏览器优化 */
.page-banner {
  background-position: 50%;
  background-size: cover;
  border-radius: var(--card-radius);
  margin: 1rem;
  max-height: 320px;
  min-height: 256px;
  overflow: hidden;
  position: relative;
  will-change: transform;
  
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
    text-shadow: 0 4px 5px rgba(0,0,0,.5);
    
    h1 {
      font-size: 2rem;
      margin: 0;
    }
    
    p {
      font-size: 1rem;
      opacity: .9;
      margin: 0;
    }
  }
  
  .banner-extra {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 1rem;
  }
}

.page-fcircle {
  animation: float-in .2s backwards;
  margin: 1rem;
  contain: layout style paint;
}

.friend-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: .1rem;
  color: #eee;
  font-family: var(--font-monospace);
  font-size: .7rem;
  opacity: .7;
  text-shadow: 0 4px 5px rgba(0,0,0,.5);
}

.article-list {
  .random-article {
    display: flex;
    align-items: center;
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
      text-decoration: none;
      
      .article-container {
        min-width: 0;
        
        .article-title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    
    .refresh-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      flex-shrink: 0;
      border-radius: var(--card-radius);
      box-shadow: var(--card-shadow);
      color: var(--c-text-2);
      cursor: pointer;
      transition: all var(--transition-fast);
      border: none;
      background: transparent;
      
      &:hover {
        transform: scale(1.05);
      }
    }
  }
  
  .articles-list {
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }
}

.article-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  
  .article-image {
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    box-shadow: var(--card-shadow);
    overflow: hidden;
    cursor: pointer;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: .8;
      transition: all var(--transition-fast);
    }
    
    &:hover img {
      opacity: 1;
      transform: scale(1.1);
    }
  }
  
  .article-container {
    display: flex;
    align-items: center;
    gap: 5px;
    height: 2.5rem;
    padding: 10px;
    width: 100%;
    overflow: hidden;
    border-radius: var(--card-radius);
    box-shadow: var(--card-shadow);
    
    &:hover {
      .article-title {
        color: var(--c-text);
      }
    }
    
    .article-author {
      color: var(--c-text-3);
      font-size: .85rem;
      flex-shrink: 0;
    }
    
    .article-title {
      flex: 1;
      color: var(--c-text-2);
      font-size: .9375rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: color var(--transition-fast);
      cursor: pointer;
    }
    
    .article-date {
      color: var(--c-text-3);
      font-family: var(--font-monospace);
      font-size: .75rem;
      flex-shrink: 0;
    }
  }
}

.load-more-container {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.load-more {
  background-color: var(--ld-bg-card);
  border-radius: var(--card-radius);
  box-shadow: .1em .2em .5rem var(--ld-shadow);
  display: block;
  font-size: .875rem;
  height: 42px;
  padding: .75rem;
  width: 200px;
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover:not(:disabled) {
    color: var(--c-text);
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(20px);
  
  .modal-content {
    position: relative;
    width: 90%;
    max-width: 500px;
    max-height: 80vh;
    overflow-y: auto;
    padding: 1.25rem;
    border-radius: 12px;
    background-color: var(--c-bg-a50);
    box-shadow: 0 0 0 1px var(--c-bg-soft);
    
    #modal-author-avatar {
      border-radius: 50%;
      width: 50px;
      height: 50px;
      object-fit: cover;
      display: block;
      margin: 0 auto 1rem;
    }
    
    #modal-author-name-link {
      display: block;
      text-align: center;
      font-size: 1.2rem;
      margin-bottom: 1rem;
      text-decoration: none;
      color: inherit;
    }
    
    .modal-article {
      margin-bottom: 1rem;
      
      .modal-article-title {
        display: block;
        text-decoration: none;
        color: inherit;
        margin-bottom: 0.3rem;
        line-height: 1.4;
        
        &:hover {
          color: var(--c-text);
        }
      }
      
      .modal-article-date {
        font-family: var(--font-monospace);
        font-size: .875rem;
        color: var(--c-text-3);
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
      opacity: .6;
      pointer-events: none;
      z-index: -1;
    }
  }
}

/* 动画优化 */
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

/* 媒体查询优化 */
@media (max-width: 768px) {
  .random-article .random-container-title {
    display: none;
  }
  
  .article-item .article-container {
    flex-wrap: wrap;
    height: auto;
    min-height: 2.5rem;
    
    .article-author {
      flex-grow: 1;
    }
    
    .article-title {
      flex-basis: 100%;
      order: 3;
      white-space: normal;
      line-height: 1.4;
    }
  }
  
  .page-banner {
    margin: 0.5rem;
    min-height: 200px;
    
    .banner-content {
      padding: 0.5rem;
      
      h1 {
        font-size: 1.5rem;
      }
    }
  }
}

/* 减少重绘和回流 */
.gradient-card {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
}

/* 打印样式优化 */
@media print {
  .modal,
  .random-article,
  .load-more-container {
    display: none !important;
  }
}
</style>