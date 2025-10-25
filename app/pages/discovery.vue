<script setup lang="ts">
const layoutStore = useLayoutStore()
layoutStore.setAside(['blog-stats', 'blog-tech', 'blog-site-info', 'blog-log'])
// 状态管理
const discoveryTabs = ref<'music' | 'video'>('music')
</script>

<template lang="pug">
  .discovery-menu
    nav.discovery-tabs
      ul.tabs-full
        button(:class="['NavItem Page', {active: discoveryTabs === 'music'}]") 音乐
        button(:class="['NavItem Page', {active: discoveryTabs === 'video'}]") 视频
  
  .discovery-card(v-else)
    .discovery-list(v-if="discoveryTabs === 'music'")

    .discovery-list(v-if="discoveryTabs === 'video'")
</template>