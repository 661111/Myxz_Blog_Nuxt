<script setup lang="ts">
const layoutStore = useLayoutStore()
layoutStore.setAside(['blog-account', 'blog-stats', 'blog-tech', 'blog-site-info', 'blog-log'])
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

import music from '../components/discovery/music/main.vue'
import video from '../components/discovery/video/main.vue'
</script>

<template lang="pug">
  .discovery-page
    .discovery-hidden.center
      .discovery-menu(class="landscape_menu")
        .discovery-full
          nav.discovery-tabs(class="loading_title_animation")
            ul.tabs-full
              button.text-lg.px-6(:class="['NavItem Page', {active: discoveryTabs === 'music'}]")
                //- span(v-for="(item, index) in discoveryIconItem" )
                //-   span(v-for="icon in discoveryIconItem.iconfly")
                //-     span.iconify(v-for="icon.name === 'music'" :class="")
                p.button_text 音乐
              button.text-lg.px-6(:class="['NavItem Page', {active: discoveryTabs === 'video'}]")
                p.button_text 视频
    //- .loading(v-if)
    //-   .loading-ripple

    //- .error(v-else-if)
    //-   h3 加载失败
    //-   p 请重新加载
    //-   button 立即刷新

    .discovery-card
      .discovery-list(v-if="discoveryTabs === 'music'")
        music
      .discovery-list(v-if="discoveryTabs === 'video'")
        video
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