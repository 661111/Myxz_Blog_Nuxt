<script setup lang="ts">
const layoutStore = useLayoutStore()
layoutStore.setAside(['blog-stats', 'blog-tech', 'blog-site-info', 'blog-log'])
// 状态管理
const discoveryTabs = ref<'music' | 'video'>('music')

interface discoveryIconItem {
  iconfly: discoveryIconFly[]
}
interface discoveryIconFly {
  icon: string
  name: 'music' | 'video'
}
const discoveryIcon : discoveryIconItem[] = [{
  iconfly: [
    {icon: '', name:'music'},
    {icon: '', name:'video'}
  ]
}]

import Mainmusic from '../components/discovery/music/main.vue'
import Mainvideo from '../components/discovery/video/main.vue'
</script>

<template lang="pug">
  .discovery-page
    .discovery-hidden.center
      .discovery-menu(class="landscape_menu")
        .discovery-full
          nav.discovery-tabs(class="loading_title_animation")
            ul.tabs-full
              //- 循环渲染音乐/视频按钮
              button.text-lg.px-6(
                v-for="(tab, index) in discoveryIcon[0].iconfly" 
                :key="index"
                :class="{ active: discoveryTabs === tab.name }"
                @click="discoveryTabs = tab.name"
              )
                p.button_text {{ tab.name === 'music' ? '音乐' : '视频' }}

    //- 内容卡片：根据 tabs 切换组件
    .discovery-card
      .discovery-list(v-if="discoveryTabs === 'music'") 
        Mainmusic
      .discovery-list(v-if="discoveryTabs === 'video'")
        Mainvideo
        
</template>

<style lang="css" scoped>
.discovery-page {
  margin: 0 1rem;
}
.discovery-hidden {
  align-items: center;
  height: 100%;
  justify-content: space-between;
  display: flex
}
/* 部分变量值 */
.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.gap-2 {
  gap: .5rem;
}
/* landscape模式 */
@media (orientation: landscape) {
  .loading_title_animation {
    animation: an-fade-in .4s;
  }
}
@media (orientation: landscape) {
  .landscape_menu {
    padding-bottom: 1rem;
    padding-top: 1rem;
  }
}
</style>