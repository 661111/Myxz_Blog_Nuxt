<script setup lang="ts">
import appConfig from '~/app.config'
import ArtalkManager from '~/utils/artalk-manager'

interface Comment {
    id: number;
    content: string;
    content_marked: string;
    user_id: number;
    nick: string;
    email_encrypted: string;
    link: string;
    ua: string;
    date: string; // ISO 8601 格式日期字符串
    is_collapsed: boolean;
    is_pending: boolean;
    is_pinned: boolean;
    is_allow_reply: boolean;
    is_verified: boolean;
    rid: number;
    badge_name: string;
    badge_color: string;
    visible: boolean;
    vote_up: number;
    vote_down: number;
    page_key: string;
    page_url: string;
    site_name: string;
}

// Twikoo API 返回数据接口
interface ArtalkResponse {
	data: Array<{
    id: number;
    content: string;
    content_marked: string;
    user_id: number;
    nick: string;
    email_encrypted: string;
    link: string;
    ua: string;
    date: string; // ISO 8601 格式日期字符串
    is_collapsed: boolean;
    is_pending: boolean;
    is_pinned: boolean;
    is_allow_reply: boolean;
    is_verified: boolean;
    rid: number;
    badge_name: string;
    badge_color: string;
    visible: boolean;
    vote_up: number;
    vote_down: number;
    page_key: string;
    page_url: string;
    site_name: string;
	}>
}

// API 配置常量
const API_URL = `${appConfig.artalk.server}api/v2/comments?limit=20&offset=0&flat_mode=false&page_key=/2025/12/equipmentpageadd&site_name=歆鸢阁`
const ADMIN_EMAIL_MD5 = '79e00ebe159fd9b12742d9dfd7342bc4ec769d932734b555d91d0c4fc285b9ef'

// 状态管理
const commentsState = useState('latestComments', () => ({
	comments: [] as Comment[],
	loading: true,
	error: false,
	lastFetchTime: 0,
}))

const comments = computed(() => commentsState.value.comments)
const loading = computed(() => commentsState.value.loading)
const error = computed(() => commentsState.value.error)

function formatTimeAgo(timestamp: number): string {
	const units = [
		{ max: 60, text: '刚刚' },
		{ max: 3600, div: 60, unit: '分钟前' },
		{ max: 86400, div: 3600, unit: '小时前' },
		{ max: 604800, div: 86400, unit: '天前' },
	]

	const diff = Math.floor((Date.now() - timestamp) / 1000)
	const match = units.find(unit => diff < unit.max)
	if (match) {
		return match.div !== undefined
			? `${Math.floor(diff / match.div)}${match.unit}`
			: match.text
	}

	return `${new Intl.DateTimeFormat('zh-CN', {
		month: 'numeric',
		day: 'numeric',
	}).format(timestamp)}日`
}

function formatContent(content: string): string {
	if (!content) {
		return ''
	}

	const replacements = {
		'<pre><code>[\\s\\S]*?</code></pre>': '[代码块]',
		'<code>([^<]{4,})</code>': '[代码]',
		'<code>([^<]{1,3})</code>': '$1',
		'<img(?![^>]*class="tk-owo-emotion")[^>]*>': '[图片]',
		'<a[^>]*?>[\\s\\S]*?</a>': '[链接]',
		'<(?!img[^>]*class="tk-owo-emotion")[^>]+>': '',
	}

	return Object.entries(replacements).reduce(
		(text, [pattern, replacement]) =>
			text.replace(new RegExp(pattern, 'g'), replacement),
		content,
	).trim()
}

async function fetchComments() {
	// 如果距离上次获取时间小于10分钟，则使用缓存
	const now = Date.now()
	if (now - commentsState.value.lastFetchTime < 10 * 60 * 1000) {
		return
	}

	try {
		commentsState.value.loading = true
		commentsState.value.error = false

		const response = await $fetch<ArtalkResponse>(API_URL, {
			method: 'POST',
			body: {
				event: 'GET_RECENT_COMMENTS',
				includeReply: true,
				pageSize: 10,
			},
			timeout: 5000,
		})

		if (!response?.data) {
			throw new Error('No data')
		}

		commentsState.value.comments = response.data
			.filter(item => item.page_url !== '/')
			.slice(0, 5)
			.map(item => ({
				content: formatContent(item.content_marked),
				author: item.nick,
				date: formatTimeAgo(item.date ? new Date(item.date).getTime() : Date.now()),
				avatar: `https://weavatar.com/avatar/${item.email_encrypted}sha256=1&d=mp&s=240`,
				url: item.link,
				id: item.id,
			}))
		commentsState.value.lastFetchTime = now
	}
	catch {
		commentsState.value.error = true
	}
	finally {
		commentsState.value.loading = false
	}
}

let timer: number | undefined

onMounted(() => {
	fetchComments()
	timer = window.setInterval(fetchComments, 10 * 60 * 1000)
})

onUnmounted(() => {
	if (timer)
		clearInterval(timer)
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
					@click="navigateTo(`${c.link}#${c.id}`)"
				>
					<div class="meta">
						<div class="left">
							<img :src="`https://weavatar.com/avatar/${c.email_encrypted}sha256=1&d=mp&s=240`" :alt="c.nick" class="avatar">
							<span class="nick">{{ c.nick }}</span>
							<Icon
								v-if="c.email_encrypted === ADMIN_EMAIL_MD5"
								name="ph:seal-check-fill"
								class="badge"
							/>
						</div>
						<time class="date">{{ c.date }}</time>
					</div>
					<p class="content" v-html="c.content" />
				</li>
			</ul>
		</Transition>
	</div>
</ZWidget>
</template>

<style lang="scss" scoped>
/* 统一用你已有的变量，无需额外定义 */
.comment-wrap {
	min-height: 280px;          /* 与目录保持一致 */
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
		white-space: nowrap;
		text-overflow: ellipsis;
		color: var(--c-text-2);

		/* 表情大小统一 */
		:deep(img.tk-owo-emotion) {
			width: 16px;
			height: 16px;
			margin: 0 2px;
			vertical-align: text-bottom;
		}
	}
}

@keyframes spin {
	to { transform: rotate(360deg); }
}

/* 复用目录的过渡 */
.fade-enter-active,
.fade-leave-active { transition: opacity 0.25s; }

.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>