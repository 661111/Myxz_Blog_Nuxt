<!-- components/FlinkTop.vue -->
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import friendsInfo from '../../feeds' // 假设同步导入数据（或替换为异步）

// 定义类型接口
interface FriendEntry {
	author: string
	link: string
	avatar: string
	hundredSuffix?: string
	date?: string
}

interface LinkGroup {
	name: string
	entries: FriendEntry[]
	hundredSuffix?: string
}

// 获取路由实例
const router = useRouter()

// 从环境变量获取域名（需配置 .env 文件）
const domain = 'https://www.myxz.top'

// /​**
//  * 动态生成 URL（修复 your-domain.com 循环问题）
//  * @param path 原始路径
//  * @returns 完整 URL
//  */
function urlFor(path: string): string {
	if (path.startsWith('http://') || path.startsWith('https://'))
		return path
	if (path.startsWith(''))
		return `${domain}${path}`
	return path
}

// 主题配置
const theme = ref({
	error_img: {
		flink: 'https://img.314926.xyz/images/2025/08/19/404.gif',
	},
})

// 横幅信息
const bannerInfo = ref([
	{
		title: '友情链接',
		description: '与数百名博主无限进步',
		buttonTextOne: '随机访问',
		buttonTextTwo: '申请友链',
	},
])

// 友情链接数据加载状态
const friendsData = ref<LinkGroup[]>([])
const isLoading = ref(true)

// 异步加载数据（若 friendsInfo 是同步数据，直接赋值即可）
onMounted(() => {
	// 模拟异步加载（实际根据项目调整）
	setTimeout(() => {
		friendsData.value = friendsInfo as LinkGroup[] // 假设 friendsInfo 符合 LinkGroup 结构
		isLoading.value = false
	}, 500)

	// 动态加载外部 JS 脚本
	const loadScript = (url: string, callback?: () => void) => {
		return new Promise<void>((resolve, reject) => {
			// 检查是否已加载
			if (document.querySelector(`script[src="${url}"]`)) {
				console.log('JS脚本已加载')
				resolve()
				return
			}

			// 创建 script 标签
			const script = document.createElement('script')
			script.src = url
			script.type = 'text/javascript'
			script.async = true // 异步加载（不阻塞页面渲染）

			// 加载成功回调
			script.onload = () => {
				console.log('脚本加载完成')
				callback?.()
				resolve()
			}

			// 加载失败回调
			script.onerror = (err) => {
				console.error('脚本加载失败', err)
				reject(err)
			}

			// 添加到 DOM（推荐添加到 head 或 body 末尾）
			document.head.appendChild(script)
		})
	}

	// 使用示例：加载百度统计脚本
	loadScript('https://cdn.cbd.int/kemiaofxjun-cdn@1.0.1/js/blog_nuxt/FlinkTop.js')
		.then(() => {
			console.log('友链顶部重要JS加载完毕')
		})
		.catch((err) => {
			console.error('友链顶部重要JS加载完毕', err)
		})
})

// /​**
//  * 处理头像 URL（移除感叹号）
//  */
function getAvatarWithoutExclamationMark(url: string): string {
	const exclamationIndex = url.indexOf('!')
	return exclamationIndex !== -1 ? url.substring(0, exclamationIndex) : url
}

// /​**
//  * 图片加载错误处理
//  */
function handleImageError(event: Event): void {
	const target = event.target as HTMLImageElement
	target.onerror = null
	target.src = urlFor(theme.value.error_img.flink)
}

const allPairs = computed(() => {
	return friendsData.value.flatMap((group: LinkGroup) => {
		const linkList = [...group.entries]
		const evenNum = linkList.filter((_, index) => index % 2 === 0)
		const oddNum = linkList.filter((_, index) => index % 2 === 1)
		// 获取当前组的 hundredSuffix（关键！）
		const hundredSuffix = group.hundredSuffix || ''

		const validPairs: Array<{
			even: FriendEntry
			odd: FriendEntry
			evenAvatar: string
			oddAvatar: string
			// 新增：将 hundredSuffix 存储到 pair 对象中
			hundredSuffix: string
		}> = []

		const maxPairCount = Math.min(evenNum.length, oddNum.length)
		for (let i = 0; i < maxPairCount; i++) {
			const evenItem = evenNum[i]
			const oddItem = oddNum[i]
			if (evenItem && oddItem) {
				validPairs.push({
					even: evenItem,
					odd: oddItem,
					evenAvatar: getAvatarWithoutExclamationMark(evenItem.avatar),
					oddAvatar: getAvatarWithoutExclamationMark(oddItem.avatar),
					// 赋值当前组的 hundredSuffix
					hundredSuffix,
				})
			}
		}
		return validPairs
	})
})
</script>

<template>
<!-- <link rel="stylesheet" href="/assets/css/flinktop.css"> -->
<div id="flink_top">
	<!-- 横幅区域 -->
	<div id="flink-banners">
		<div v-for="(info, infoItem) in bannerInfo" :key="infoItem" class="banner-top-box">
			<div class="flink-banners-title">
				<div class="banners-title-small">
					{{ info.title }}
				</div>
				<div class="banners-title-big">
					{{ info.description }}
				</div>
			</div>
			<!-- <div class="banner-button-group">
          <a class="banner-button secondary no-text-decoration" onclick="friendChainRandomTransmission()">
            <i class="anzhiyufont anzhiyu-icon-paper-plane1" style="margin-right: 8px;"></i>
            <span class="banner-button-text">{{ info.buttonTextOne }}</span>
          </a>
          <a class="banner-button no-text-decoration" onclick="anzhiyu.addFriendLink()">
            <i class="anzhiyufont anzhiyu-icon-arrow-circle-right"></i>
            <span class="banner-button-text">{{ info.buttonTextTwo }}</span>
          </a>
        </div> -->
		</div>

		<!-- 技能标签组区域（修正后） -->
		<div id="skills-tags-group-all">
			<div class="tags-group-wrapper">
				<!-- 遍历当前组的图标对 -->
				<div v-for="(pair, pairIndex) in allPairs" :key="pairIndex" class="tags-group-icon-pair" style="margin-left: 1rem;">
					<!-- 渲染偶数项头像 -->
					<a class="tags-group-icon no-text-decoration" target="_blank" rel="noopener" :href="urlFor(pair.even.link)" :title="pair.even.author">
						<img class="no-lightbox" :title="pair.even.author" :src="urlFor(pair.evenAvatar + pair.hundredSuffix)" :alt="pair.even.author" @error="handleImageError">
					</a>

					<!-- 渲染奇数项头像 -->
					<a class="tags-group-icon no-text-decoration" target="_blank" rel="noopener" :href="urlFor(pair.odd.link)" :title="pair.odd.author">
						<img class="no-lightbox" :title="pair.odd.author" :src="urlFor(pair.oddAvatar + pair.hundredSuffix)" :alt="pair.odd.author" @error="handleImageError">
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- <div class="flink_random" v-for="(friendRandomPostInfo, friendRandomPostInfoIndex) in friendRandomPostInfo" :key="friendRandomPostInfoIndex">
    <div class="flink_random_head">
      <div class="flink_random_head_left" v-for="headLeftInfo in friendRandomPostInfo" :key="headLeftInfo">
        <h2>{{ headLeftInfo.headLeftTitle }}</h2>
        <a class="fetchRandomPost" :href="{{ headLeftInfo.href }}" data-pjax-state="external" style="opacity: 0.2; transition-duration: 0.3s; transform: rotate(0deg);">
          <i class="anzhiyufont anzhiyu-icon-arrow-rotate-right"></i>
        </a>
      </div>
      <div class="flink_random_head_right">
        <a class="random-post-all no-text-decoration" href="/link/" data-pjax-state=""> {{  }} </a>
      </div>
    </div>
    <div class="flink_random_connet">

    </div>
  </div> -->
</template>

<style lang="css" scoped>
/* 友链顶部轮播美化 */
.banners-title-small {
	margin-top: 8px;
	margin-bottom: 0.5rem;
	font-size: 12px;
	line-height: 1;
	color: var(--anzhiyu-secondtext);
}

.banners-title-big {
	margin-bottom: 8px;
	font-size: 36px;
	font-weight: 700;
	line-height: 1;
}

#flink-banners .banner-button-group .banner-button i {
	margin-right: 8px !important;
	font-size: 1rem;
}

#flink-banners {
	display: -webkit-box;
	display: -moz-box;
	display: flex;
	display: flexbox;
	display: flex;
	display: flex;
	flex-direction: column;
	flex-direction: column;
	flex-direction: column;
	position: relative;
	overflow: hidden;
	height: 76%;
	margin: 1rem;
	padding: 1.5rem;
	border: var(--style-border);
	border-radius: 12px;
	box-shadow: var(--anzhiyu-shadow-border);
	background: var(--anzhiyu-card-bg);
	transition: 0.3s;
	transition: 0.3s;
	transition: 0.3s;
	transition: 0.3s;
	animation: slide-in 0.6s 0.2s backwards;
	animation: slide-in 0.6s 0.2s backwards;
	animation: slide-in 0.6s 0.2s backwards;
	animation: slide-in 0.6s 0.2s backwards;
	animation: slide-in 0.6s 0.2s backwards;
	will-change: transform;
	-webkit-box-orient: vertical;
	-moz-box-orient: vertical;
	-o-box-orient: vertical;
}

#flink-banners .banner-top-box {
	display: -webkit-box;
	display: -moz-box;
	display: flex;
	display: flexbox;
	display: flex;
	display: flex;
	-webkit-box-align: center;
	-moz-box-align: center;
	-o-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	align-items: center;
	-webkit-box-pack: justify;
	-moz-box-pack: justify;
	-o-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;
	justify-content: space-between;
}

#flink-banners .banner-button-group {
	display: -webkit-box;
	display: -moz-box;
	display: flex;
	display: flexbox;
	display: flex;
	display: flex;
	position: absolute;
	top: 2.5rem;
	right: 2rem;
}

#flink-banners .banner-button-group .banner-button.secondary {
	color: var(--anzhiyu-fontcolor);
}

#flink-banners .banner-button-group .banner-button {
	color: var(--anzhiyu-card-bg);
}

#article-container a {
	color: var(--anzhiyu-fontcolor);
}

.banner-button.secondary {
	margin-right: 1rem;
	border: var(--style-border-always);
	box-shadow: var(--anzhiyu-shadow-border);
	box-shadow: var(--anzhiyu-shadow-border);
	background: var(--anzhiyu-secondbg);
	color: var(--anzhiyu-lighttext);
}

.banner-button {
	display: -webkit-box;
	display: -moz-box;
	display: flex;
	display: flexbox;
	display: flex;
	display: flex;
	align-items: center;
	align-items: center;
	padding: 8px 12px;
	border-radius: 12px;
	box-shadow: var(--anzhiyu-shadow-black);
	box-shadow: var(--anzhiyu-shadow-black);
	background: var(--anzhiyu-fontcolor);
	color: var(--anzhiyu-card-bg);
	transition: 0.3s;
	transition: 0.3s;
	transition: 0.3s;
	transition: 0.3s;
	transition: 0.3s;
	cursor: pointer;
	z-index: 1;
	-webkit-box-align: center;
	-moz-box-align: center;
	-o-box-align: center;
	-ms-flex-align: center;
}

#flink-banners .banner-button-group .banner-button i {
	margin-right: 8px;
	font-size: 1rem;
}

#skills-tags-group-all {
	display: flex;
	transform: rotate(0);
	transition: 0.3s;
}

#flink-banners #skills-tags-group-all .tags-group-wrapper {
	animation: rowup 120s linear infinite;
	animation: rowup 120s linear infinite;
	animation: rowup 120s linear infinite;
	animation: rowup 120s linear infinite;
	animation: rowup 120s linear infinite;
}

#skills-tags-group-all .tags-group-wrapper {
	display: flex;
	flex-wrap: nowrap;
	margin-top: 40px;
	animation: rowup 60s linear infinite;
}

#flink-banners #skills-tags-group-all .tags-group-wrapper {
	animation: rowup 120s linear infinite;
	animation: rowup 120s linear infinite;
	animation: rowup 120s linear infinite;
	animation: rowup 120s linear infinite;
	animation: rowup 120s linear infinite;
}

#skills-tags-group-all .tags-group-wrapper {
	display: flex;
	flex-wrap: nowrap;
	margin-top: 40px;
	animation: rowup 60s linear infinite;
}

#flink-banners #skills-tags-group-all .tags-group-icon {
	border-radius: 50%;
}

#skills-tags-group-all .tags-group-icon {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 120px;
	height: 120px;
	border-radius: 30px;
	box-shadow: var(--anzhiyu-shadow-blackdeep);
	font-size: 66px;
	font-weight: 700;
	color: #FFF;
}

#flink-banners #skills-tags-group-all .tags-group-icon img {
	min-width: 100%;
	min-height: 100%;
	border-radius: 50%;
	object-fit: cover;
}

[data-theme="dark"] #skills-tags-group-all .tags-group-icon img {
	filter: none;
}

#skills-tags-group-all .tags-group-icon img {
	min-width: 100%;
	min-height: 100%;
	border-radius: 50%;
	object-fit: cover;
}

#article-container img {
	display: block;
	max-width: 100%;
	margin: 0 auto 20px;
	border-radius: 8px;
	transition: 0.3s;
	transition: 0.3s;
	transition: 0.3s;
	transition: 0.3s;
	transition: 0.3s;
}

#flink-banners #skills-tags-group-all .img-alt {
	display: none;
}

.img-alt {
	margin: 0;
	margin-top: 8px;
	font-size: 12px;
	color: var(--anzhiyu-secondtext);
}

.is-center {
	text-align: center;
}

#flink-banners #skills-tags-group-all .tags-group-icon {
	border-radius: 50%;
}

#skills-tags-group-all .tags-group-icon-pair .tags-group-icon:nth-child(even) {
	margin-top: 1rem;
	transform: translate(-60px);
}

#skills-tags-group-all .tags-group-icon {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 120px;
	height: 120px;
	border-radius: 30px;
	box-shadow: var(--anzhiyu-shadow-blackdeep);
	font-size: 66px;
	font-weight: 700;
	color: #FFF;
}

/* 动画效果 */
@keyframes rowup {
	0% {
		transform: translateX(0);
	}

	100% {
		transform: translateX(-50%);
	}
}
</style>