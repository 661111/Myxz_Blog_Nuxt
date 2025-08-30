import type { Nav, NavItem } from '~/types/nav'
import blogConfig from '~~/blog.config'

// 图标查询：https://yesicon.app/ph
// 图标插件：https://marketplace.visualstudio.com/items?itemName=antfu.iconify

// @keep-sorted
export default defineAppConfig({
	// 将 blog.config 中的配置项复制到 appConfig，方便调用
	...blogConfig,

	article: {
		categories: <{ [category: string]: { icon: string, color?: string } }>{
			搭建: { icon: 'ph:computer-tower-bold', color: '#3af' },
			生活: { icon: 'ph:shooting-star-bold', color: '#3ba' },
			博客魔改: { icon: 'ph:code-bold', color: '#77f' },
			分享: { icon:'ph:desktop-tower-bold', color: '#3ab' },
			未分类: { icon: 'ph:folder-dotted-bold' },
		},
		defaultCategoryIcon: 'ph:folder-bold',
		/** 分类排序方式，键为排序字段，值为显示名称 */
		order: {
			date: '创建日期',
			updated: '更新日期',
			// title: '标题',
		},
	},

	content: {
		/** 代码块自动折叠触发行数 */
		codeblockCollapsibleRows: 16,
		/** 文章开头摘要 */
		excerpt: {
			animation: true,
			caret: '_',
		},
	},

	// @keep-sorted
	footer: {
		/** 页脚版权信息，支持 <br> 换行等 HTML 标签 */
		copyright: `© ${new Date().getFullYear()} ${blogConfig.author.name}`,
		// /** 侧边栏底部图标导航 */
		// iconNav: [
        //     { icon: 'ph:house-bold', text: '个人主页', url: blogConfig.author.homepage },
        //     // { icon: 'ri:qq-line', text: '交流群: 169994096', url: 'https://jq.qq.com/?_wv=1027&k=lQfNSeEd' },
        //     { icon: 'ph:github-logo-bold', text: 'GitHub: 661111', url: 'https://github.com/661111' },
        //     { icon: 'ph:rss-simple-bold', text: 'Atom订阅', url: '/atom.xml' },
        //     { icon: 'ph:subway-bold', text: '开往', url: 'https://www.travellings.cn/go-by-clouds.html' },
		// ] satisfies NavItem[],
		/** 页脚站点地图 */
		nav: [
			{
				title: '探索',
				items: [
					{ icon: 'ph:rss-simple-bold', text: 'Atom订阅', url: '/atom.xml' },
					{ icon: 'ph:subway-bold', text: '开往', url: 'https://www.travellings.cn/' },
					// { icon: 'ph:flying-saucer-bold', text: '异次元旅行', url: 'https://travel.moe/go.html?travel=on' },
				],
			},
			{
				title: '社交',
				items: [
					{ icon: 'ph:github-logo-bold', text: 'Github', url: 'https://github.com/661111' },
					// { icon: 'ri:qq-line', text: '群: 169994096', url: 'https://jq.qq.com/?_wv=1027&k=lQfNSeEd' },
					{ icon: 'ph:envelope-simple-bold', text: '本站邮箱', url: `mailto:${blogConfig.author.email}` },
				],
			},
			{
				title: '信息',
				items: [
					{ icon: 'simple-icons:nuxtdotjs', text: '本站源主题', url: 'https://github.com/L33Z22L11/blog-v3' },
					// { icon: 'ph:swatches-bold', text: '主题和组件文档', url: '/theme' },
					{ icon: 'ph:certificate-bold', text: '萌备20251949号', url: 'https://icp.gov.moe/?keyword=20251949' },
				],
			},
		] satisfies Nav,
	},

	/** 左侧栏顶部 Logo */
	header: {
		logo: 'https://sourceimage.s3.bitiful.net/myxz.avif',
		/** 展示标题文本，否则展示纯 Logo */
		showTitle: true,
		subtitle: blogConfig.subtitle,
		emojiTail: ['📄', '🦌', '🙌', '🐟', '🏖️'],
		avatarFrame: 'https://sourceimage.s3.bitiful.net/avatarFrame/%20144.avif',
	},

	/** 左侧栏导航 */
	nav: [
		{
			title: '',
			items: [
                { icon: 'ph:files-bold', text: '丹青妙笔', url: '/' },
                { icon: 'ph:archive-bold', text: '经卷藏珍', url: '/archive' },
                { icon: 'ph:link-bold', text: '竹林旧友', url: '/link' },
                { icon: 'ph:fish-bold', text: '塘文集锦', url: '/fcircle' },
                { icon: 'ph:chats-bold', text:'​纸笺寄语', url:'/comments' },
                { icon: 'ph:lightning-bold', text:'闲言碎语', url:'/essays' },
				{ icon: 'ph:apple-podcasts-logo-bold', text:'关于自己', url:'/about' },
                { icon: 'ph:star-of-david-bold', text:'优良精装', url:'/equipment'},
				{ icon: 'ph:codesandbox-logo-bold', text:'站点展览', url:'/site'}
			],
		},
	] satisfies Nav,

	pagination: {
		perPage: 10,
		/** 默认排序方式，需要是 this.article.order 中的键名 */
		sortOrder: 'date' as const,
		/** 允许（普通/预览/归档）文章列表正序，开启后排序方式左侧图标可切换顺序 */
		allowAscending: false,
	},

	stats: {
		/** 归档页面每年标题对应的年龄 */
		birthYear: 2008,
		/** blog-stats widget 的预置文本 */
		wordCount: '约10万',
	},

	themes: {
		light: {
			icon: 'ph:sun-bold',
			tip: '浅色模式',
		},
		system: {
			icon: 'ph:monitor-bold',
			tip: '跟随系统',
		},
		dark: {
			icon: 'ph:moon-bold',
			tip: '深色模式',
		},
	},
})
