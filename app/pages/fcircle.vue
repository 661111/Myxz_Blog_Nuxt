<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const appConfig = useAppConfig()
const layoutStore = useLayoutStore()

layoutStore.setAside(['blog-stats',  'blog-site', 'blog-tech', 'blog-log', 'latest-comments'])

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
          <img 
            id="modal-author-avatar" 
            :src="avatarOrDefault(currentAuthorAvatar)" 
            @error="handleAvatarError" 
          />
          <a id="modal-author-name-link" :href="authorOrigin" target="_blank">
            {{ currentAuthor }}
          </a>
          
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

<style lang="css" scoped>
/* 顶部banner样式 */
.page-banner {
    background-position: 50%;
    background-size: cover;
    border-radius: 8px;
    margin: 1rem;
    max-height: 320px;
    min-height: 256px;
    overflow: hidden;
    position: relative
}

.page-banner .banner-content {
    color: #eee;
    display: flex;
    flex-direction: column;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    justify-content: space-between;
    padding: 1rem;
    position: absolute;
    text-shadow: 0 4px 5px rgba(0,0,0,.5)
}

.page-banner .banner-content h1 {
    font-size: 2rem
}

.page-banner .banner-content p {
    font-size: 1rem;
    opacity: .9
}

.page-banner .banner-extra {
    align-items: flex-end;
    display: flex;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    justify-content: flex-end;
    margin: 1rem;
    position: absolute
}

.page-banner .banner-btn {
    align-items: center;
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    background: #ffffff1a;
    border-radius: 20px;
    color: #eee;
    display: flex;
    font-size: .9rem;
    gap: .1rem;
    opacity: .8;
    padding: .5rem .8rem;
    transition: all .3s
}

.page-banner .banner-btn:hover {
    background: #0003
}

.page-banner .banner-btn .icon {
    font-size: 1.2rem
}

/* 友链朋友圈样式 */
.page-fcircle {
    animation: float-in .2s backwards;
    margin: 1rem
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
    text-shadow: 0 4px 5px rgba(0,0,0,.5)
}

.friend-stats .update-time {
    opacity: 1
}

.friend-stats .powered-by {
    opacity: .8
}

.article-list .random-article {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-between;
    margin: 1rem 0
}

.article-list .random-article .random-title {
    font-size: 1.2rem;
    white-space: nowrap
}

.article-list .random-article .article-item {
    flex: 1;
    min-width: 0
}

.article-list .random-article .article-item .article-container {
    min-width: 0
}

.article-list .random-article .article-item .article-container .article-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
}

.article-list .random-article .article-item .article-container .article-author,.article-list .random-article .article-item .article-container .article-date {
    flex-shrink: 0
}

.article-list .random-article .refresh-btn {
    align-items: center;
    border-radius: 8px;
    box-shadow: 0 0 0 1px var(--c-bg-soft);
    color: var(--c-text-2);
    cursor: pointer;
    display: flex;
    flex-shrink: 0;
    height: 2.5rem;
    justify-content: center;
    transition: all .2s ease;
    width: 2.5rem
}

.article-list .articles-list {
    display: flex;
    flex-direction: column;
    gap: .5rem
}

.article-item {
    align-items: center;
    display: flex;
    gap: 10px;
    width: 100%
}

.article-item.new-item {
    animation: float-in .2s var(--delay) backwards
}

.article-item .article-image {
    border-radius: 50%;
    box-shadow: 0 0 0 1px var(--c-bg-soft);
    display: flex;
    flex-shrink: 0;
    height: 2rem;
    overflow: hidden;
    width: 2rem
}

.article-item .article-image img {
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    opacity: .8;
    transition: all .2s;
    width: 100%
}

.article-item .article-container {
    align-items: center;
    border-radius: 8px;
    box-shadow: 0 0 0 1px var(--c-bg-soft);
    display: flex;
    gap: 5px;
    height: 2.5rem;
    overflow: hidden;
    padding: 10px;
    width: 100%
}

.article-item .article-container:hover .article-title {
    color: var(--c-text)
}

.article-item .article-container .article-author {
    color: var(--c-text-3);
    font-size: .85rem
}

.article-item .article-container .article-title {
    color: var(--c-text-2);
    flex: 1;
    font-size: .9375rem;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color .2s;
    white-space: nowrap
}

.article-item .article-container .article-date {
    color: var(--c-text-3);
    font-family: var(--font-monospace);
    font-size: .75rem
}

.load-more {
    background-color: var(--ld-bg-card);
    border-radius: 8px;
    box-shadow: .1em .2em .5rem var(--ld-shadow);
    display: block;
    font-size: .875rem;
    height: 42px;
    margin: 1rem auto;
    padding: .75rem;
    width: 200px
}

.load-more:hover {
    color: var(--c-text)
}

.skeleton-avatar {
    outline: 1px solid var(--c-border)
}

.skeleton-avatar,.skeleton-text {
    animation: pulse-552a4b19 1.5s infinite;
    background: var(--c-bg-soft)
}

.skeleton-text {
    border-radius: 4px;
    height: .875rem
}

.skeleton .article-author {
    width: 60px
}

.skeleton .article-title {
    flex: 1;
    margin: 0 10px
}

.skeleton .article-date {
    width: 80px
}

.skeleton-load-more {
    animation: pulse-552a4b19 1.5s infinite;
    background: var(--c-bg-soft);
    box-shadow: none
}

.modal {
    align-items: center;
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    display: flex;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    justify-content: center;
    position: fixed;
    z-index: 100
}

.modal .modal-content {
    background-color: var(--c-bg-a50);
    border-radius: 12px;
    box-shadow: 0 0 0 1px var(--c-bg-soft);
    max-height: 80vh;
    max-width: 500px;
    overflow-y: auto;
    padding: 1.25rem;
    position: relative;
    width: 90%
}

.modal .modal-content .modal-header {
    align-items: center;
    border-bottom: 1px solid var(--c-bg-soft);
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
    padding-bottom: 15px
}

.modal .modal-content .modal-header img {
    border-radius: 50%;
    height: 50px;
    -o-object-fit: cover;
    object-fit: cover;
    width: 50px
}

.modal .modal-content .modal-header h3 {
    flex: 1;
    font-size: 1.2rem;
    margin: 0
}

.modal .modal-content .modal-header .author-link {
    border-radius: 8px;
    color: var(--c-text-2);
    padding: 8px;
    transition: all .3s
}

.modal .modal-content .modal-header .author-link:hover {
    background: var(--c-bg-soft);
    color: var(--c-text)
}

.modal .modal-content .modal-body .timeline {
    position: relative
}

.modal .modal-content .modal-body .timeline:after {
    background-color: var(--c-bg-soft);
    bottom: 0;
    content: "";
    left: .25rem;
    position: absolute;
    top: .5rem;
    transform: translate(-50%);
    width: 2px
}

.modal .modal-content .modal-body .timeline .timeline-item {
    animation: slideIn-552a4b19 .3s ease-out both;
    color: var(--c-text-2);
    padding: 0 0 1rem 1.25rem;
    position: relative
}

.modal .modal-content .modal-body .timeline .timeline-item:before {
    background-color: var(--c-text-2);
    border-radius: 50%;
    content: "";
    height: .5rem;
    left: .25rem;
    position: absolute;
    top: .5rem;
    transform: translateY(-50%) translate(-50%);
    transition: transform .3s ease,box-shadow .3s ease;
    width: .5rem;
    z-index: 1
}

.modal .modal-content .modal-body .timeline .timeline-item:hover:before {
    box-shadow: 0 0 8px var(--c-text-2);
    transform: translateY(-50%) translate(-50%) scale(1.5)
}

.modal .modal-content .modal-body .timeline .timeline-item .date {
    color: var(--c-text-3);
    display: block;
    font-family: var(--font-monospace);
    font-size: .875rem;
    margin-bottom: .3rem
}

.modal .modal-content .modal-body .timeline .timeline-item .article-title {
    color: var(--c-text-2);
    line-height: 1.4;
    transition: color .3s
}

.modal .modal-content .modal-body .timeline .timeline-item .article-title:hover {
    color: var(--c-text)
}

.modal .modal-content .modal-avatar {
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
    z-index: 1
}

.modal .modal-content .modal-avatar img {
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    width: 100%
}

@keyframes pulse-552a4b19 {
    0% {
        opacity: 1
    }

    50% {
        opacity: .5
    }

    to {
        opacity: 1
    }
}

@keyframes slideIn-552a4b19 {
    0% {
        opacity: 0;
        transform: translateY(20px)
    }

    to {
        opacity: 1;
        transform: translateY(0)
    }
}

.modal-enter-active,.modal-enter-active .modal-content,.modal-leave-active,.modal-leave-active .modal-content {
    transition: all .3s ease
}

.modal-enter-from,.modal-leave-to {
    opacity: 0
}

.modal-enter-from .modal-content,.modal-leave-to .modal-content {
    transform: translateY(-20px)
}

.modal-enter-to,.modal-leave-from {
    opacity: 1
}

.modal-enter-to .modal-content,.modal-leave-from .modal-content {
    transform: translateY(0)
}

@media (max-width: 768px) {
    .random-article .random-title {
        display:none
    }

    .page-fcircle .article-item .article-container {
        flex-wrap: wrap;
        height: auto
    }

    .page-fcircle .article-item .article-container .article-author {
        flex-grow: 1
    }

    .page-fcircle .article-item .article-container .article-title {
        flex-basis: 100%;
        order: 3;
        white-space: normal
    }

    .page-fcircle .skeleton .article-title {
        height: 1.75rem;
        margin: -1px 0
    }
}

.error-container {
    align-items: center;
    color: var(--c-text-2);
    display: flex;
    flex-direction: column;
    gap: 12px;
    height: 400px;
    justify-content: center
}

.error-container .error-icon {
    color: var(--c-danger);
    font-size: 4rem
}
</style>