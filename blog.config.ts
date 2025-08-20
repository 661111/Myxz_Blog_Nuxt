import type { NitroConfig } from 'nitropack'
import type { FeedEntry } from './app/types/feed'
import redirectList from './redirects.json'

export { zhCN as dateLocale } from 'date-fns/locale/zh-CN'

// 存储 nuxt.config 和 app.config 共用的配置
// 此处为启动时需要的配置，启动后可变配置位于 app/app.config.ts
const blogConfig = {
	title: '莫言小栈',
    subtitle: '生生不息，永无止息。',
    // 长 description 利好于 SEO
    description: '莫言的博客网站，分享技术和魔改。网站界面简洁美观，涵盖了魔改、教程等多个领域，为读者提供了卓越的阅读体验。',
	author: {
        name: '莫言',
        avatar: 'https://blog.myxz.top/img/avatar.avif',
        email: '3227988255@qq.com',
        homepage: 'https://www.myxz.top/',
    },
	copyright: {
		abbr: 'CC BY-NC-SA 4.0',
		name: '署名-非商业性使用-相同方式共享 4.0 国际',
		url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans',
	},
	favicon: 'https://blog.myxz.top/img/avatar.avif',
	language: 'zh-CN',
	timeEstablished: '2020-07-19',
    timezone: 'Asia/Shanghai',
    url: 'https://www.myxz.top/',   

	defaultCategory: ['未分类'],

	feed: {
		limit: 50,
	},

	// 在 URL 中隐藏的路径前缀
	hideContentPrefixes: ['/posts'],

	imageDomains: [
		// 自动启用本域名的 Nuxt Image
		// 'www.zhilu.site',
		// '7.isyangs.cn',
	],

	// 禁止搜索引擎收录的路径
	robotsNotIndex: ['/preview', '/previews/*'],

	scripts: [
		// 自己部署的 Umami 统计服务
		// { 'src': 'https://zhi.zhilu.cyou/zhi.js', 'data-website-id': 'a1997c81-a42b-46f6-8d1d-8fbd67a8ef41', 'defer': true },
		// 自己网站的 Cloudflare Insights 统计服务
		// { 'src': 'https://static.cloudflareinsights.com/beacon.min.js', 'data-cf-beacon': '{"token": "97a4fe32ed8240ac8284e9bffaf03962"}', 'defer': true },
		// Twikoo 评论系统
		{ src: 'https://lib.baomitu.com/twikoo/1.6.39/twikoo.all.min.js', defer: true },
		{ src: 'https://cdn.cbd.int/hexo-anzhiyu-music@1.0.1/assets/js/Meting2.min.js', defer: true},
	],

	// 自己部署的 Twikoo 服务
    twikoo: {
        envId: 'https://twikoo.sxiaohe.top/',
        preload: 'https://twikoo.sxiaohe.top/',
    },
}

// 用于生成 OPML 和友链页面配置
export const myFeed = <FeedEntry>{
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

// 将旧页面永久重定向到新页面
const redirectRouteRules = Object.entries(redirectList)
	.reduce<NitroConfig['routeRules']>((acc, [from, to]) => {
		acc![from] = { redirect: { to, statusCode: 301 } }
		return acc
	}, {})

// https://nitro.build/config#routerules
// @keep-sorted
export const routeRules = <NitroConfig['routeRules']>{
	...redirectRouteRules,
	'/api/stats': { prerender: true, headers: { 'Content-Type': 'application/json' } },
	'/atom.xml': { prerender: true, headers: { 'Content-Type': 'application/xml' } },
	'/favicon.ico': { redirect: { to: blogConfig.favicon } },
	'/zhilu.opml': { prerender: true, headers: { 'Content-Type': 'application/xml' } },
}

export default blogConfig
