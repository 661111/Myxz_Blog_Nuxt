<script setup lang="ts">
import { Icon } from '#components'
import dayjs from 'dayjs'
import { packageManager, version, dependencies } from '~~/package.json'
import pnpmWorkspace from '~~/pnpm-workspace.yaml'

const appConfig = useAppConfig()
const { public: { arch, ci, nodeVersion, platform } } = useRuntimeConfig()

const ciPlatform = computed(() => {
	const iconName = ciIcons[ci]
	if (!iconName)
		return ''

	const iconNode = iconName.startsWith('http')
		? h('img', { src: iconName, alt: '' })
		: h(Icon, { name: iconName })

	return h('span', {}, [iconNode, ` ${ci.split(' ')[0]}`])
})

const packages = Object.assign({}, ...Object.values(pnpmWorkspace.catalogs as any)) as Record<string, string>
const packagesMain = {
	pug: dependencies.pug,
	stylus: dependencies.stylus,
	dayjs: dependencies.dayjs,
}
const [pm, pmVersion] = packageManager.split('@') as [string, string]

const service = computed(() => ([
	...ci ? [{ label: '构建平台', value: ciPlatform }] : ['本地构建'],
	{ label: '图片存储', value: () => [h('img', { src: '/assets/favicon.ico', alt: '缤纷云' , width: '1.2em', height: '1.2em'}), '缤纷云'] },
	{ label: '软件协议', value: 'MIT' },
	{ label: '文章许可', value: appConfig.copyright.abbr },
	{ label: '规范域名', value: getDomain(appConfig.url) },
]))

const techstack = computed(() => ([
	{ label: 'Blog', value: version },
	{ label: 'Vue', value: packages.vue },
	{ label: 'Nuxt', value: packages.nuxt },
	{ label: 'Content', value: packages['@nuxt/content'] },
	{ label: 'Node', value: nodeVersion },
	{ label: pm, value: pmVersion },
	{ label: 'OS', value: platform },
	{ label: 'Arch', value: arch },
	{ label: 'PUG', value: packagesMain.pug },
	{ label: 'Stylus', value: packagesMain.stylus },
	{ label: 'Dayjs', value: packagesMain.dayjs },
]))

const expand = ref(false)
</script>

<template>
<BlogWidget card title="技术信息">
	<ZDlGroup :items="service" />
	<ZExpand v-model="expand" in-place name="构建信息">
		<ZDlGroup size="small" :items="techstack" />
	</ZExpand>
</BlogWidget>
</template>

<style lang="scss" scoped>
.z-expand {
	margin-top: 0.2em;
}

.dl-group :deep(img) {
	height: 1.2em;
	vertical-align: sub;
}
</style>
