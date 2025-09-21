import type { NitroConfig } from 'nitropack'
import process from 'node:process'
import ci from 'ci-info'
import blogConfig from './blog.config'
import packageJson from './package.json'
import redirectList from './redirects.json'

// 此处配置无需修改
export default defineNuxtConfig({
	nitro: {
		devProxy: {
			'/api/bililbilil': {
				target: 'https://api.bilibili.com', // B站API基础地址
				changeOrigin: true, // 改变Origin头
				prependPath: true,   // 在路径前添加代理前缀（如果需要）
				// 以下是一些针对403等问题的额外配置
				headers: {
				// 添加或覆盖请求头，防止403 Forbidden
				'Origin': 'https://www.bilibili.com',
				'Referer': 'https://www.bilibili.com',
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
				},
				// 如果需要，可以移除Origin头（某些服务器可能不接受来自白名单外的Origin）
				// onProxyReq: (proxyReq) => {
				//   proxyReq.removeHeader('origin');
				// }
			}
		},
	},
	// 如果需要在生产环境或服务端渲染时也进行代理，可以使用 routeRules（Nuxt 3.2+）
	routeRules: {
		'/api/bililbilil': { proxy: 'https://api.bilibili.com/' }
	},
	app: {
		head: {
			meta: [
				{ name: 'author', content: [blogConfig.author.name, blogConfig.author.email].filter(Boolean).join(', ') },
				// 此处为元数据的生成器标识，不建议修改
				{ 'name': 'generator', 'content': packageJson.name, 'data-github-repo': packageJson.homepage, 'data-version': packageJson.version },
				{ name: 'mobile-web-app-capable', content: 'yes' },
				{ name:'Origin', content:'https://www.bilibili.com' },
				{ name: 'Referer', content:'https://www.bilibili.com' },
				{ name:'User-Agent', content:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
			],
			link: [
				{ rel: 'icon', href: blogConfig.favicon },
				{ rel: 'alternate', type: 'application/atom+xml', href: '/atom.xml' },
				{ rel: 'preconnect', href: blogConfig.twikoo.preload },
				{ rel: 'stylesheet', href: 'https://lib.baomitu.com/KaTeX/0.16.9/katex.min.css', media: 'print', onload: 'this.media="all"' },
				// "InterVariable", "Inter", "InterDisplay"
				{ rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css', media: 'print', onload: 'this.media="all"' },
				// "JetBrains Mono", 思源黑体 "Noto Sans SC", 思源宋体 "Noto Serif SC"
				// { rel: 'preconnect', href: 'https://fonts.gstatic.cn', crossorigin: '' },
				// { rel: 'stylesheet', href: 'https://fonts.googleapis.cn/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Noto+Sans+SC:wght@100..900&family=Noto+Serif+SC:wght@200..900&display=swap', media: 'print', onload: 'this.media="all"' },
				// // 小米字体 "MiSans"
				// { rel: 'stylesheet', href: 'https://cdn-font.hyperos.mi.com/font/css?family=MiSans:100,200,300,400,450,500,600,650,700,900:Chinese_Simplify,Latin&display=swap', media: 'print', onload: 'this.media="all"' },
				{ rel: 'preconnect', href: 'https://sourceimage.s3.bitiful.net' },
                { rel: 'stylesheet', href: 'https://sourceimage.s3.bitiful.net/font/Yozai-Medium/result.css', media: 'none', onload: 'this.media="all"' },
                { rel: 'stylesheet', href: 'https://static.vercel.sxiaohe.top/fonts/anzhiyu/anzhiyufonts.css', media: 'none', onload: 'this.media="all"'  },
                { rel: 'stylesheet', href: '/assets/css/color.css', media: 'none', onload: 'this.media="all"'  },
				{ rel: 'stylesheet', href: '/assets/css/comment.css', media: 'none', onload: 'this.media="all"'  },
			],
			templateParams: {
				separator: '|',
			},
			titleTemplate: `%s %separator ${blogConfig.title}`,
			script: blogConfig.scripts,
		},
		rootAttrs: {
			id: 'z-root',
		},
	},

	compatibilityDate: '2024-08-03',

	components: [
		{ path: '~/components/partial', prefix: 'Z' },
		{ path: '~/components/zhilu', prefix: 'Zhilu', global: true },
		'~/components',
	],

	css: [
		'@/assets/css/animation.scss',
		'@/assets/css/article.scss',
		'@/assets/css/color.scss',
		'@/assets/css/font.scss',
		'@/assets/css/main.scss',
		'@/assets/css/reusable.scss',
	],

	features: {
		inlineStyles: false,
	},

	// @keep-sorted
	routeRules: {
		...Object.entries(redirectList)
			.reduce<NitroConfig['routeRules']>((acc, [from, to]) => {
				acc![from] = { redirect: { to, statusCode: 308 } }
				return acc
			}, {}),
		'/api/stats': { prerender: true, headers: { 'Content-Type': 'application/json' } },
		'/atom.xml': { prerender: true, headers: { 'Content-Type': 'application/xml' } },
		'/favicon.ico': { redirect: { to: blogConfig.favicon } },
		'/zhilu.opml': { prerender: true, headers: { 'Content-Type': 'application/xml' } },
	},

	runtimeConfig: {
		public: {
			buildTime: new Date().toISOString(),
			nodeVersion: process.version,
			platform: process.platform,
			arch: process.arch,
			ci: process.env.TENCENTCLOUD_RUNENV === 'SCF' ? 'EdgeOne' : ci.name || '',
			// doubanApiBase: process.env.DOUBAN_API_BASE || 'https://api.douban.com/v2',
			// doubanApiKey: process.env.DOUBAN_API_KEY || '',
			// doubanUserId: process.env.DOUBAN_USER_ID || ''
		},
	},

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "@/assets/css/_variable.scss" as *;',
				},
			},
		},
		define: {
			/** 在生产环境启用 Vue DevTools */
			// __VUE_PROD_DEVTOOLS__: 'true',
			/** 在生产环境启用 Vue 水合不匹配详情 */
			// __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
		},
		server: {
			allowedHosts: true,
		},
	},

	// @keep-sorted
	modules: [
		'@nuxt/content',
		'@nuxt/icon',
		'@nuxt/image',
		'@nuxtjs/color-mode',
		'@nuxtjs/seo',
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'unplugin-yaml/nuxt',
	],

	colorMode: {
		preference: 'system',
		fallback: 'light',
		classSuffix: '',
	},

	content: {
		build: {
			markdown: {
				highlight: false,
				// @keep-sorted
				remarkPlugins: {
					'remark-math': {},
					'remark-reading-time': {},
				},
				rehypePlugins: {
					'rehype-katex': {},
				},
				toc: { depth: 4, searchDepth: 4 },
			},
		},
		experimental: { 
			nativeSqlite: true 
		}
	},

	hooks: {
		'ready': () => {
			console.info(`
================================
${packageJson.name} ${packageJson.version}
${packageJson.homepage}
================================
`)
		},
		'content:file:afterParse': (ctx) => {
			const permalink = ctx.content.permalink as string
			if (permalink) {
				ctx.content.path = permalink
				return
			}
			// 在 URL 中隐藏文件路由自动生成的 /posts 路径前缀
			if (blogConfig.article.hidePostPrefix) {
				const realPath = ctx.content.path as string | undefined
				ctx.content.path = realPath?.replace(/^\/posts/, '')
			}
		},
	},

	icon: {
		customCollections: [
			{ prefix: 'zi', dir: './app/assets/icons' },
		],
	},

	image: {
		// Netlify 需要特殊处理
		provider: process.env.NUXT_IMAGE_PROVIDER,
		format: ['avif', 'webp'],
	},

	linkChecker: {
		// @keep-sorted
		skipInspections: [
			'no-baseless',
			'no-non-ascii-chars',
			'no-uppercase-chars',
		],
	},

	robots: {
		disableNuxtContentIntegration: true,
		disallow: blogConfig.article.robotsNotIndex,
	},

	site: {
		name: blogConfig.title,
		url: blogConfig.url,
		defaultLocale: blogConfig.language,
	},
})
