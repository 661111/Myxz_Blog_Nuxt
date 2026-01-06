<script setup lang="ts">
import { UtilDate } from '#components'

const appConfig = useAppConfig()
const runtimeConfig = useRuntimeConfig()

// 响应头不正确时，stats.value 可能会是字符串，首次属性访问可能为 undefined
const { data: stats } = useFetch('/api/stats')

const yearlyTip = computed(() => Object
	.entries(stats.value?.annual || {})
	.reverse()
	.map(([year, item]) => `${year}年：${item.posts}篇，${formatNumber(item.words)}字`)
	.join('\n') || '数据获取失败',
)

const categroyTip = computed(() => {
	if (!stats.value)
		return ''
	return Object.entries(stats.value.categories).reverse().map(([name, item]) =>
		`${item.name}：${item.posts}篇`,
	).join('\n')
})

// const tagsTip = computed(() => {
// 	if (!stats.value)
// 		return ''
// 	return Object.entries(stats.value.tags).reverse().map(([name, item]) =>
// 		`${item.name}：${item.posts}篇`,
// 	).join('\n')
// })

const postTip = computed(() => {
	if (!stats.value)
		return ''
	return Object.entries(stats.value.annual).reverse().map(([year, item]) =>
		`${year}年：${item.posts}篇`,
	).join('\n')
})

const blogStats = [{
	label: '运营时长',
	value: timeElapse(appConfig.timeEstablished),
	tip: `博客于${appConfig.timeEstablished}上线`,
}, {
	label: '上次更新',
	value: () => h(UtilDate, {
		date: runtimeConfig.public.buildTime,
		relative: true,
		tipPrefix: '构建于',
	}),
}, {
	label: '总字数',
	value: computed(() => formatNumber(stats.value?.total?.words) || '--'),
	tip: yearlyTip,
}, {
	label: '总分类',
	value: computed(() => stats.value ? formatNumber(stats.value.categories.length) : ''),
	tip: categroyTip,
}, {
	label: '总标签',
	value: computed(() => stats.value ? formatNumber(stats.value.tags.length) : ''),
}, {
	label: '总文章',
	value: computed(() => stats.value ? formatNumber(stats.value.total.posts) : ''),
	tip: postTip,
}]
</script>

<template>
<BlogWidget card title="博客统计">
	<ZDlGroup :items="blogStats" size="small" />
</BlogWidget>
</template>
