<script setup lang="ts">
const appConfig = useAppConfig()
const layoutStore = useLayoutStore()
layoutStore.setAside([])

useSeoMeta({
	title: '友链',
	ogType: 'profile',
	description: `${appConfig.title}的友链页面，收集了添加他为友链的网站和他订阅的网站列表。`,
})

layoutStore.setAside(['blog-stats', 'connectivity', 'blog-log'])
</script>

<template>
<Tab :tabs="['我的博客信息', '申请友链']" center>
	<template #tab1>

	</template>
	<template #tab2>

	</template>
</Tab>
</template>