<script setup lang="ts">
const appConfig = useAppConfig()
const timeEstablished = appConfig.timeEstablished

const blogLog = [
	{ label: '2026-03-19', value: '域名到期，预计会提前重定向迁移，届时会通知友链中的各位' },
    { label: timeEstablished, value: '更换框架Nuxt，hexo网站迁移到blog.myxz.top' },
    { label: '2025-01-15', value: '更换到当前域名，重新使用Hexo框架' },
    { label: '2024-08-11', value: '更换域名为www.sxiaohe.top' },
    { label: '2023-09-24', value: '更换框架为 WordPress，开始做资源网。' },
    { label: '2022-08-24', value: '更换到www.anxkj.fun，使用Hexo框架。' },
    { label: '2020-05-19', value: '发布第一篇文章，使用wyblog1.tk域名。' },
]
</script>

<template>
<ZWidget card title="更新日志">
	<ZDlGroup size="large" :items="blogLog" />
</ZWidget>
</template>
