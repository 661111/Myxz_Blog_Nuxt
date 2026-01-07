import type { NitroConfig } from 'nitropack'
import { arch, env, version as nodeVersion, platform } from 'node:process'
import { name as ciName, CLOUDFLARE_PAGES, GITHUB_ACTIONS, NETLIFY } from 'ci-info'
import { pascal } from 'radash'
import blogConfig from './blog.config'
import packageJson from './package.json'
import redirectList from './redirects.json'

// 此处配置无需修改
export default defineNuxtConfig({
	app: {
		head: {
			meta: [
				{ name: 'author', content: [blogConfig.author.name, blogConfig.author.email].filter(Boolean).join(', ') },
				{ name: 'color-scheme', content: 'light dark' },
				// 此处为元数据的生成器标识，不建议修改
				{ 'name': 'generator', 'content': `${pascal(packageJson.name)} ${packageJson.version}`, 'data-github-repo': packageJson.homepage },
				{ name: 'mobile-web-app-capable', content: 'yes' },
			],
			link: [
				{ rel: 'icon', href: blogConfig.favicon },
				{ rel: 'alternate', type: 'application/atom+xml', href: '/atom.xml' },
				// "InterVariable", "Inter", "InterDisplay"
				{ rel: 'stylesheet', href: '/fonts/InterVariable/result.css', media: 'print', onload: 'this.media="all"' },
				// { rel: 'stylesheet', href: 'https://cdn-font.hyperos.mi.com/font/css?family=MiSans:100,200,300,400,450,500,600,650,700,900:Chinese_Simplify,Latin&display=swap', media: 'print', onload: 'this.media="all"' },
                { rel: 'stylesheet', href: '/fonts/lxgw-wenkai-screen-webfont/style.css', media: 'none', onload: 'this.media="all"' },
                // { rel: 'stylesheet', href: 'https://static.vercel.sxiaohe.top/fonts/anzhiyu/anzhiyufonts.css', media: 'none', onload: 'this.media="all"'  },
                { rel: 'stylesheet', href: '/assets/css/color.css', media: 'none', onload: 'this.media="all"'  },
				{ rel: 'stylesheet', href: '/assets/css/artalk.css', media: 'none', onload: 'this.media="all"'  },
			],
			templateParams: {
				separator: '|',
			},
			titleTemplate: `%s %separator ${blogConfig.title}`,
			script: blogConfig.scripts,
		},
		rootAttrs: {
			id: 'blog-root',
		},
	},

	compatibilityDate: '2024-08-03',

	components: [
		{ path: '~/components/partial', prefix: 'Z' },
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

	// @keep-sorted
	experimental: {
		extractAsyncDataHandlers: true,
		typescriptPlugin: true,
	},

	features: {
		inlineStyles: false,
	},

	nitro: {
		prerender: {
			// 修复部分平台会在文章路径后添加 `/`，导致闪现 404 错误
			// https://github.com/nuxt/content/issues/2378
			autoSubfolderIndex: CLOUDFLARE_PAGES || GITHUB_ACTIONS || NETLIFY ? false : undefined,
		},
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
		// @keep-sorted
		public: {
			arch,
			buildTime: new Date().toISOString(),
			// EdgeOne 检测暂时不可用
			ci: env.TENCENTCLOUD_RUNENV === 'SCF' ? 'EdgeOne' : ciName || '',
			nodeVersion,
			platform,
		},
	},

	/** 在生产环境启用 sourcemap */
	// sourcemap: true,

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
		'@nuxt/hints',
		'@nuxt/icon',
		'@nuxt/image',
		'@nuxtjs/color-mode',
		'@nuxtjs/seo',
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'nuxt-llms',
		'unplugin-yaml/nuxt',
		'@nuxtjs/critters'
	],

	critters: {
		config: {
			// 模块默认是 'media'，更激进但仍相对稳的是 'swap'
			// 文档示例就是这么配的
			preload: 'swap', // :contentReference[oaicite:0]{index=0}

			// 关键：不要让它处理字体（你要自己只 preload 字体 CSS）
			fonts: false, // 等价于 inlineFonts=false + preloadFonts=false :contentReference[oaicite:1]{index=1}

			// 建议保守：避免 SPA/多路由场景“首屏内联后把外链剪掉”导致后续页面缺样式
			pruneSource: false, // :contentReference[oaicite:2]{index=2}

			// 保持关键帧只内联必要的，避免把动画 keyframes 全塞进 critical
			keyframes: 'critical', // :contentReference[oaicite:3]{index=3}

			// 默认就很合理：合并 style、压缩
			mergeStylesheets: true, // :contentReference[oaicite:4]{index=4}
			compress: true,          // :contentReference[oaicite:5]{index=5}

			// 如果你有很多内联 <style>（比如组件里），又担心被改写引发布局差异：
			// 可以先保持 true（默认），出问题再关掉
			// reduceInlineStyles: true, // :contentReference[oaicite:6]{index=6}
		}
	},

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
					'remark-music': {},
					'remark-reading-time': {},
				},
				// @keep-sorted
				rehypePlugins: {
					'rehype-katex': {},
					'rehype-meta-slots': {},
				},
				toc: { depth: 4, searchDepth: 4 },
			},
		},
		experimental: {
			sqliteConnector: 'native',
		},
	},

	hooks: {
		'ready': () => {
			console.info(`
================================
${pascal(packageJson.name)} ${packageJson.version}
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
		clientBundle: {
			scan: {
				globInclude: ['**\/*.{vue,jsx,tsx,ts,md,mdc,mdx}'],
			},
		},
	},

	image: {
		// Neylify 下 netlify 处理器无法显示站外图片，ipx 处理器无法显示站内图片，需彻底禁用
		// https://github.com/nuxt/image/issues/1353
		provider: NETLIFY ? 'none' : undefined,
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

	llms: {
		domain: blogConfig.url,
		title: blogConfig.title,
		description: blogConfig.description,
	},

	ogImage: {
		enabled: false,
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