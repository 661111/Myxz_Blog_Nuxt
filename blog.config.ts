import type { FeedEntry } from './app/types/feed'

const basicConfig = {
	title: '歆鸢阁',
    subtitle: '柒上月日，无铭之阁',
	// 长 description 利好于 SEO
	description: '柒渊阁的博客网站，分享技术和魔改。网站界面简洁美观，涵盖了魔改、教程等多个领域，为读者提供了卓越的阅读体验。',
	author: {
		name: '歆天之鸢',
        avatar: 'https://sourceimage.s3.bitiful.net/myxz.avif',
        email: '3227988255@qq.com',
        homepage: 'https://www.myxz.top/',
	},
	copyright: {
		abbr: 'CC BY-NC-SA 4.0',
		name: '署名-非商业性使用-相同方式共享 4.0 国际',
		url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans',
	},
	favicon: 'https://sourceimage.s3.bitiful.net/myxz.avif',
	language: 'zh-CN',
	timeEstablished: '2020-07-19',
	timeStart: '2020',
    timezone: 'Asia/Shanghai',
    url: 'https://www.myxz.top',
	defaultCategory: '未分类',
}

// 存储 nuxt.config 和 app.config 共用的配置
// 此处为启动时需要的配置，启动后可变配置位于 app/app.config.ts
// @keep-sorted
const blogConfig = {
	...basicConfig,

	article: {
		categories: {
			[basicConfig.defaultCategory]: { icon: 'ph:folder-dotted-bold' },
			搭建: { icon: 'ph:computer-tower-bold', color: '#3af' },
			生活: { icon: 'ph:shooting-star-bold', color: '#3ba' },
			博客魔改: { icon: 'ph:code-bold', color: '#77f' },
			分享: { icon:'ph:desktop-tower-bold', color: '#3ab' },
		},
		defaultCategoryIcon: 'ph:folder-bold',
		/** 文章版式，首个为默认版式 */
		types: {
			tech: {},
			story: {},
		},
		/** 分类排序方式，键为排序字段，值为显示名称 */
		order: {
			date: '创建日期',
			updated: '更新日期',
			// title: '标题',
		},
		/** 使用 pnpm new 新建文章时自动生成自定义链接（permalink/abbrlink） */
		useRandomPremalink: false,
		/** 隐藏基于文件路由（不是自定义链接）的 URL /post 路径前缀 */
		hidePostPrefix: true,
		/** 禁止搜索引擎收录的路径 */
		robotsNotIndex: ['/preview', '/previews/*'],
	},

	/** 博客 Atom 订阅源 */
	feed: {
		/** 订阅源最大文章数量 */
		limit: 50,
		/** 订阅源是否启用XSLT样式 */
		enableStyle: true,
	},

	/** 向 <head> 中添加脚本 */
	scripts: [
		// 自己部署的 Umami 统计服务
		// { 'src': 'https://zhi.zhilu.cyou/zhi.js', 'data-website-id': 'a1997c81-a42b-46f6-8d1d-8fbd67a8ef41', 'defer': true },
		// 自己网站的 Cloudflare Insights 统计服务
		// { 'src': 'https://static.cloudflareinsights.com/beacon.min.js', 'data-cf-beacon': '{"token": "97a4fe32ed8240ac8284e9bffaf03962"}', 'defer': true },
		// Twikoo 评论系统
		{ src: 'https://lib.baomitu.com/twikoo/1.6.44/twikoo.min.js', defer: true },
	],

	/** 自己部署的 Twikoo 服务 */
	twikoo: {
		envId: 'https://twikoo.zhilu.cyou/',
		preload: 'https://twikoo.zhilu.cyou/',
	},
}

/** 用于生成 OPML 和友链页面配置 */
export const myFeed: FeedEntry = {
	author: blogConfig.author.name,
	sitenick: '摸鱼处',
	title: blogConfig.title,
	desc: blogConfig.subtitle || blogConfig.description,
	link: blogConfig.url,
	feed: new URL('/atom.xml', blogConfig.url).toString(),
	icon: blogConfig.favicon,
	avatar: blogConfig.author.avatar,
	archs: ['Nuxt', 'Vercel'],
	date: blogConfig.timeEstablished,
	comment: '这是我自己',
}

export default blogConfig
