<script setup lang="ts">
import appConfig from '~/app.config'
import md5 from 'blueimp-md5'; // 依赖 blueimp-md5 包

interface Comment {
  id: number;
  content: string;
  html: string; // Artalk使用html字段
  user_id: number;
  nick: string;
  email: string; // Artalk使用明文email
  link: string;
  ua: string;
  date: string; // ISO 8601格式日期字符串
  is_pending: boolean;
  is_pinned: boolean;
  rid: number;
  badge_name: string;
  badge_color: string;
  vote_up: number;
  vote_down: number;
  page_key: string;
  page_url: string;
  site_name: string;
  user: {
    id: number;
    name: string;
    email: string;
    avatar: string;
    badge_name: string;
    badge_color: string;
  };
}

// API配置常量
const limit = 5 // 只显示5条最新评论
const siteName = '歆鸢阁'
const API_URL = `${appConfig.artalk.server}api/v2/comments?limit=${limit}&offset=0&flat_mode=true&site_name=${siteName}&scope=site&type=all`

// 管理员邮箱MD5（用于识别管理员）
const ADMIN_EMAIL = 'admin@example.com' // 替换为实际管理员邮箱
const ADMIN_EMAIL_MD5 = md5(ADMIN_EMAIL.toLowerCase())

// 状态管理
const commentsState = useState('latestComments', () => ({
  comments: [] as Comment[],
  loading: true,
  error: false,
  lastFetchTime: 0,
  retryCount: 0
}))

const comments = computed(() => commentsState.value.comments)
const loading = computed(() => commentsState.value.loading)
const error = computed(() => commentsState.value.error)

// 格式化时间显示
function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  const units = [
    { max: 60, text: '刚刚' },
    { max: 3600, div: 60, unit: '分钟前' },
    { max: 86400, div: 3600, unit: '小时前' },
    { max: 604800, div: 86400, unit: '天前' },
  ]

  for (const unit of units) {
    if (diff < unit.max) {
      return unit.div 
        ? `${Math.floor(diff / unit.div)}${unit.unit}` 
        : unit.text
    }
  }

  return date.toLocaleDateString('zh-CN', {
    month: 'numeric',
    day: 'numeric'
  })
}

// 格式化评论内容
function formatContent(html: string): string {
  if (!html) return ''
  
  // 简化处理：移除所有HTML标签，保留换行
  return html
    .replace(/<[^>]*>/g, '') // 移除所有HTML标签
    .substring(0, 100) + (html.length > 100 ? '...' : '')
}

// 获取评论数据
async function fetchComments() {
  const now = Date.now()
  if (now - commentsState.value.lastFetchTime < 10 * 60 * 1000) return

  try {
    commentsState.value.loading = true
    commentsState.value.error = false
    commentsState.value.retryCount = 0

    const response = await $fetch<{ data: { comments: Comment[] } }>(API_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000
    })

    if (!response.data?.comments?.length) {
      throw new Error('No comments data received')
    }

    // 数据处理
    const processedData = response.data.comments
      .filter(item => item.page_url && item.page_url)
      .map(item => ({
        id: item.id,
        content: formatContent(item.html),
        html: item.html,
        user_id: item.user.id,
        nick: item.user.name,
        email: item.user.email,
        link: item.page_url,
        ua: item.ua,
        date: item.date,
        is_pending: item.is_pending,
        is_pinned: item.is_pinned,
        rid: item.rid,
        badge_name: item.user.badge_name || '',
        badge_color: item.user.badge_color || '',
        vote_up: item.vote_up,
        vote_down: item.vote_down,
        page_key: item.page_key,
        page_url: item.page_url,
        site_name: item.site_name,
        avatar: item.user.avatar || `https://gravatar.loli.net/avatar/${md5(item.user.email.toLowerCase())}?d=mp`
      }))
      .slice(0, limit)

    commentsState.value.comments = processedData
    commentsState.value.lastFetchTime = now
  } catch (err) {
    console.error('[Artalk Comments Fetch Error]:', err)
    commentsState.value.error = true
    commentsState.value.retryCount++
    
    if (commentsState.value.retryCount < 3) {
      setTimeout(fetchComments, 5000)
    }
  } finally {
    commentsState.value.loading = false
  }
}

// 生命周期钩子
let timer: number | undefined

onMounted(() => {
  fetchComments()
  timer = window.setInterval(fetchComments, 10 * 60 * 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
<ZWidget>
  <template #title>
    <span class="title">最新评论</span>
    <Icon name="ph:chat-circle-text-bold" />
  </template>

  <div class="comment-wrap">
    <Transition name="fade" mode="out-in">
      <!-- 加载中 -->
      <div v-if="loading" class="state-box">
        <div class="spinner" />
        <p>加载中…</p>
      </div>

      <!-- 出错 -->
      <div v-else-if="error" class="state-box">
        <Icon name="line-md:alert" class="error-icon" />
        <span>评论加载失败</span>
      </div>

      <!-- 列表 -->
      <ul v-else class="comment-list">
        <li
          v-for="c in comments"
          :key="c.id"
          class="comment-item"
          @click="navigateTo(c.link)"
        >
          <div class="meta">
            <div class="left">
              <img :src="c.avatar" :alt="c.nick" class="avatar">
              <span class="nick">{{ c.nick }}</span>
              <Icon
                v-if="md5(c.email.toLowerCase()) === ADMIN_EMAIL_MD5"
                name="ph:seal-check-fill"
                class="badge"
              />
            </div>
            <time class="date">{{ formatTimeAgo(c.date) }}</time>
          </div>
          <p class="content">{{ c.content }}</p>
        </li>
      </ul>
    </Transition>
  </div>
</ZWidget>
</template>

<style lang="scss" scoped>
/* 样式保持不变 */
.comment-wrap {
  min-height: 280px;
  padding: 0.6rem 0;
}

.state-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 220px;
  font-size: 0.9em;
  color: var(--c-text-2);

  .spinner {
    width: 32px;
    height: 32px;
    border: 3px solid var(--c-bg-3);
    border-top-color: var(--c-primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  .error-icon {
    font-size: 2rem;
    color: var(--c-red);
  }
}

.comment-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.comment-item {
  padding: 0.75rem 0.6rem;
  border-radius: 8px;
  transition: background 0.2s;
  cursor: pointer;

  & + .comment-item {
    margin-top: 4px;
  }

  &:hover {
    background: var(--c-bg-soft);
  }

  .meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
    font-size: 0.82em;
  }

  .left {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .avatar {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
  }

  .nick {
    font-weight: 500;
    color: var(--c-text-1);
  }

  .badge {
    font-size: 1em;
    color: var(--c-primary);
  }

  .date {
    white-space: nowrap;
    color: var(--c-text-3);
  }

  .content {
    overflow: hidden;
    margin: 0;
    font-size: 0.9em;
    line-height: 1.4;
    color: var(--c-text-2);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.fade-enter-active,
.fade-leave-active { transition: opacity 0.25s; }

.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>