<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const appConfig = useAppConfig()
const layoutStore = useLayoutStore()

layoutStore.setAside(['blog-stats', 'connectivity', 'blog-log'])

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
  <link rel="stylesheet" href="/assets/css/moments.css">
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
<style>
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

</style>