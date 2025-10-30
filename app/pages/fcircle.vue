<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const appConfig = useAppConfig()
const layoutStore = useLayoutStore()

layoutStore.setAside(['blog-stats',  'blog-site', 'blog-tech', 'blog-site-info', 'blog-log'])

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

// 页面挂载时初始化
onMounted(() => {
  initializeFC()
})

// 清理事件监听
onUnmounted(() => {
  window.removeEventListener('click', globalClickHandler)
})

// 友链圈初始化
const initializeFC = () => {
  loadMoreArticles()
}

// 加载更多文章
const loadMoreArticles = async () => {
  const cacheKey = 'friend-circle-lite-cache'
  const cacheTimeKey = 'friend-circle-lite-cache-time'
  const now = new Date().getTime()
  
  try {
    // 检查缓存
    if (process.client && localStorage) {
      const cacheTime = localStorage.getItem(cacheTimeKey)
      if (cacheTime && (now - cacheTime < 10 * 60 * 1000)) {
        const cachedData = JSON.parse(localStorage.getItem(cacheKey))
        if (cachedData) {
          processArticles(cachedData)
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
  }
}

// 处理文章数据
const processArticles = (data) => {
  // 更新统计数据
  stats.friends_num = data.statistical_data.friends_num
  stats.active_num = data.statistical_data.active_num
  stats.article_num = data.statistical_data.article_num
  stats.last_updated_time = data.statistical_data.last_updated_time
  
  // 合并新旧文章
  const newArticles = data.article_data
  const mergedArticles = [...allArticles.value, ...newArticles]
  allArticles.value = mergedArticles
  
  // 更新显示的列表
  const newDisplayed = mergedArticles.slice(
    start.value, 
    start.value + UserConfig.page_turning_number
  )
  displayedArticles.value = [...displayedArticles.value, ...newDisplayed]
  
  // 更新起始位置
  start.value += UserConfig.page_turning_number
  
  // 检查是否有更多文章
  hasMoreArticles.value = start.value < mergedArticles.length
  
  // 显示随机文章
  if (!randomArticle.value) {
    displayRandomArticle()
  }
}

// 格式化日期
const formatDate = (dateString) => {
  return dateString ? dateString.substring(0, 10) : ''
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
}

// 打开文章链接
const openArticle = (link) => {
  window.open(link, '_blank')
}

// 打开随机文章
const openRandomArticle = () => {
  if (randomArticle.value) {
    window.open(randomArticle.value.link, '_blank')
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
</script>

<template>
  <!-- <link rel="stylesheet" href="/assets/css/moments.css"> -->
  <div class="page-banner" style="background-image: url(/assets/img/page_backgroud/moment.webp)">
      <div class="banner-content">
          <h1>博友圈</h1>
          <p>发现更多有趣的博主</p>
      </div>
      <div class="banner-extra">
          <div class="friend-stats">
              <div class="update-time">Updated at 2025-07-17</div>
              <div class="powered-by">Powered by FriendCircleLite</div>
          </div>
      </div>
  </div>
  <div class="page-fcircle">
    <div class="article-list">
      <!-- 随机文章区域 -->
      <div v-if="randomArticle" class="random-article">
        <div class="random-container-title">随机钓鱼</div>
        <a href="#" @click.prevent="openRandomArticle" class="article-item">
          <div class="article-container gradient-card">
            <div class="article-author">{{ randomArticle.author }}</div>
            <div class="article-title">{{ randomArticle.title }}</div>
            <div class="article-date">{{ randomArticle.created }}</div>
          </div>
        </a>
        <button class="refresh-btn gradient-card" @click="displayRandomArticle">
          <span class="iconify i-ph:link-bold" aria-hidden="true"></span>
        </button>
      </div>

      <!-- 文章列表区域 -->
      <div class="articles-list">
        <div v-for="(article, index) in displayedArticles" :key="index" class="article-item">
          <div class="article-image" @click="showAuthorArticles(article.author, article.avatar, article.link)">
            <img 
              :src="avatarOrDefault(article.avatar)" 
              @error="handleAvatarError" 
            />
          </div>
          <div class="article-container gradient-card">
            <div class="article-author">{{ article.author }}</div>
            <div class="article-title" @click="openArticle(article.link)">
              {{ article.title }}
            </div>
            <div class="article-date">{{ formatDate(article.created) }}</div>
          </div>
        </div>
      </div>

      <div class="load-more-container">
        <!-- 加载更多按钮 -->
        <button 
          v-show="hasMoreArticles" 
          class="load-more gradient-card" 
          @click="loadMoreArticles"
        >
          再来亿点
        </button>
      </div>

      <!-- 作者模态框 -->
      <div 
        v-if="showModal" 
        id="modal" 
        class="modal" 
        :class="{'modal-open': showModal}"
        @click.self="hideModal"
      >
        <div class="modal-content">
          <div class="modal__header">
            <img 
              id="modal-author-avatar" 
              :src="avatarOrDefault(currentAuthorAvatar)" 
              @error="handleAvatarError" 
            />
            <a id="modal-author-name-link" :href="authorOrigin" target="_blank">
              {{ currentAuthor }}
            </a>
          </div>
          
          <div id="modal-articles-container">
            <div 
              v-for="(article, index) in authorArticles" 
              :key="index" 
              class="modal-article"
            >
              <a 
                class="modal-article-title" 
                :href="article.link" 
                target="_blank"
              >
                {{ article.title }}
              </a>
              <div class="modal-article-date">📅{{ formatDate(article.created) }}</div>
            </div>
          </div>
          
          <img 
            id="modal-bg" 
            :src="avatarOrDefault(currentAuthorAvatar)" 
            @error="handleAvatarError" 
          />
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
// 变量定义
$border-radius: 8px;
$transition-duration: 0.2s;
$modal-z-index: 100;
$banner-max-height: 320px;
$banner-min-height: 256px;

// 混合器
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin absolute-cover {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

@mixin gradient-card {
  border-radius: $border-radius;
  box-shadow: 0 0 0 1px var(--c-bg-soft);
  transition: all $transition-duration ease;
}

@mixin text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 关键动画 - 放在最前面
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
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

// 顶部banner样式 - 关键渲染路径优先
.page-banner {
  background-position: 50%;
  background-size: cover;
  border-radius: $border-radius;
  margin: 1rem;
  max-height: $banner-max-height;
  min-height: $banner-min-height;
  overflow: hidden;
  position: relative;
  
  .banner-content {
    color: #eee;
    display: flex;
    flex-direction: column;
    @include absolute-cover;
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
    align-items: flex-end;
    display: flex;
    @include absolute-cover;
    justify-content: flex-end;
    margin: 1rem;
  }
  
  .friend-stats {
    align-items: flex-end;
    color: #eee;
    display: flex;
    flex-direction: column;
    font-family: var(--font-monospace);
    font-size: .7rem;
    gap: .1rem;
    opacity: .7;
    text-shadow: 0 4px 5px rgba(0,0,0,.5);
    
    .update-time { opacity: 1; }
    .powered-by { opacity: .8; }
  }
}

// 主内容区域
.page-fcircle {
  animation: float-in .2s backwards;
  margin: 1rem;
}

.article-list {
  .random-article {
    align-items: center;
    display: flex;
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
      color: var(--c-text-2);
      cursor: pointer;
      flex-shrink: 0;
      height: 2.5rem;
      width: 2.5rem;
      border: none;
      background: transparent;
      
      &:hover:not(:disabled) {
        color: var(--c-text);
      }
      
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
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
  align-items: center;
  display: flex;
  gap: 10px;
  width: 100%;
  
  &.new-item {
    animation: float-in .2s var(--delay) backwards;
  }
  
  .article-image {
    border-radius: 50%;
    box-shadow: 0 0 0 1px var(--c-bg-soft);
    display: flex;
    flex-shrink: 0;
    height: 2rem;
    overflow: hidden;
    width: 2rem;
    cursor: pointer;
    
    img {
      height: 100%;
      object-fit: cover;
      opacity: .8;
      transition: all $transition-duration;
      width: 100%;
    }
    
    &:hover img {
      opacity: 1;
      transform: scale(1.05);
    }
  }
  
  .article-container {
    @include gradient-card;
    align-items: center;
    display: flex;
    gap: 5px;
    height: 2.5rem;
    overflow: hidden;
    padding: 10px;
    width: 100%;
    cursor: pointer;
    
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
      color: var(--c-text-2);
      flex: 1;
      font-size: .9375rem;
      @include text-ellipsis;
      transition: color $transition-duration;
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
  text-align: center;
  margin: 1rem 0;
  
  .load-more {
    @include gradient-card;
    background-color: var(--ld-bg-card);
    border: none;
    border-radius: $border-radius;
    box-shadow: .1em .2em .5rem var(--ld-shadow);
    display: inline-block;
    font-size: .875rem;
    height: 42px;
    padding: .75rem;
    width: 200px;
    cursor: pointer;
    
    &:hover:not(:disabled) {
      color: var(--c-text);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}

// 模态框样式
.modal {
  align-items: center;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  justify-content: center;
  inset: 0;
  position: fixed;
  z-index: 100;
  
  .modal-content {
    background-color: var(--c-bg-a50);
    border-radius: 12px;
    box-shadow: 0 0 0 1px var(--c-bg-soft);
    max-height: 80vh;
    max-width: 500px;
    overflow-y: auto;
    padding: 1.25rem;
    position: relative;
    width: 90%;
    
    .modal__header {
      align-items: center;
      border-bottom: 1px solid var(--c-bg-soft);
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
      padding-bottom: 15px;
      
      img {
        border-radius: 50%;
        height: 50px;
        object-fit: cover;
        width: 50px;
      }
      
      a {
        border-radius: $border-radius;
        color: var(--c-text-2);
        padding: 8px;
        text-decoration: none;
        transition: all .3s;
        
        &:hover {
          background: var(--c-bg-soft);
          color: var(--c-text);
        }
      }
    }
    
    #modal-articles-container {
      .modal-article {
        animation: float-in .3s var(--delay) backwards;
        color: var(--c-text-2);
        padding: 0 0 1rem 1.25rem;
        position: relative;
        
        &:not(:last-child) {
          border-bottom: 1px solid var(--c-bg-soft);
          padding-bottom: 1rem;
          margin-bottom: 1rem;
        }
        
        .modal-article-title {
          color: var(--c-text-2);
          display: block;
          line-height: 1.4;
          text-decoration: none;
          transition: color .3s;
          
          &:hover {
            color: var(--c-text);
          }
        }
        
        .modal-article-date {
          color: var(--c-text-3);
          font-family: var(--font-monospace);
          font-size: .875rem;
          margin-top: .3rem;
        }
      }
    }
    
    #modal-bg {
      border-radius: 50%;
      bottom: 1.25rem;
      filter: blur(5px);
      height: 128px;
      opacity: .6;
      overflow: hidden;
      pointer-events: none;
      position: absolute;
      right: 1.25rem;
      width: 128px;
      z-index: 1;
    }
  }
}

// 图标类
.icon-refresh {
  display: inline-block;
  width: 1em;
  height: 1em;
  background-color: currentColor;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cpath d='M232,128A104,104,0,0,1,78.77,224.94l-.23-.21a104,104,0,0,1,0-145.46l.23-.21A8,8,0,0,1,90.91,91.09a88,88,0,1,0,1.25,127.09,8,8,0,1,1,11.31,11.31A104,104,0,0,1,232,128Z'/%3E%3C/svg%3E");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
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
  
  .page-banner {
    margin: 0.5rem;
    min-height: 200px;
    
    .banner-content {
      padding: 0.5rem;
      
      h1 { font-size: 1.5rem; }
      p { font-size: 0.9rem; }
    }
    
    .banner-extra {
      margin: 0.5rem;
    }
  }
  
  .page-fcircle {
    margin: 0.5rem;
  }
}

// 无障碍支持
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

// 打印样式
@media print {
  .modal,
  .random-article,
  .load-more-container {
    display: none !important;
  }
}
</style>