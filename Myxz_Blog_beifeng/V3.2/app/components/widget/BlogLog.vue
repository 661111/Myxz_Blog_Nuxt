<script setup lang="ts">
const appConfig = useAppConfig()
const timeEstablished = appConfig.timeEstablished

const blogLog = [
    { date: '2026-03-19', content: '域名到期，预计会提前重定向迁移，届时会通知友链中的各位' },
    { date: timeEstablished, content: '更换框架Nuxt，hexo网站迁移到blog.myxz.top' },
    { date: '2025-01-15', content: '更换到当前域名，重新使用Hexo框架' },
    { date: '2024-08-11', content: '更换域名为www.sxiaohe.top' },
    { date: '2023-09-24', content: '更换框架为 WordPress，开始做资源网。' },
    { date: '2022-08-24', content: '更换到www.anxkj.fun，使用Hexo框架。' },
    { date: '2020-05-19', content: '发布第一篇文章，使用wyblog1.tk域名。' },
]
</script>

<template>
    <h3 class="widget-title">
        更新日志
    </h3>
    <!-- TODO: 优化时间线样式 -->
    <div class="widget-card">
        <ul>
            <li v-for="(item, index) in blogLog" :key="index">
                <small>{{ item.date }}</small><br>
                {{ item.content }}
            </li>
        </ul>
    </div>
</template>
