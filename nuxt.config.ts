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
				{ rel: 'stylesheet', href: 'https://source.yjluo.top/fonts/InterVariable/result.css', media: 'print', onload: 'this.media="all"' },
				// { rel: 'stylesheet', href: 'https://cdn-font.hyperos.mi.com/font/css?family=MiSans:100,200,300,400,450,500,600,650,700,900:Chinese_Simplify,Latin&display=swap', media: 'print', onload: 'this.media="all"' },
                { rel: 'stylesheet', href: 'https://cdn.jsdmirror.com/gh/661111/Myxz_Blog_Nuxt@master/public/fonts/jxzk/result.css', media: 'none', onload: 'this.media="all"', integrity: "sha384-mXDmIEidlbsSa49+bW/s00kMWytsxew5CuitzexHGJVMxDM8inSijf0dEwXZ+PHX", crossorigin: "anonymous" },
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
		'@/assets/css/comment.scss'
	],

	// @keep-sorted
	experimental: {
		extractAsyncDataHandlers: true,
		typescriptPlugin: true,
	},

	features: {
		inlineStyles: true,
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
		// ...Object.entries(redirectList)
		// 	.reduce<NitroConfig['routeRules']>((acc, [from, to]) => {
		// 		acc![from] = { redirect: { to, statusCode: 308 } }
		// 		return acc
		// 	}, {}),
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
			__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
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
			preload: 'media',
			inlineFonts: true,
			preloadFonts: true,
			// 关键：字体优化
			// 完全消除依赖树
			inlineThreshold: 0,
			minimumExternalSize: 0,
			// 保持布局稳定
			reduceInlineStyles: false,
			pruneSource: false,  // 如果遇到样式丢失，设为false
			// 外部资源全部处理
			// external: true,
			// mergeStylesheets: true,
			// compress: true,
			// noscriptFallback: true,
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