<script setup lang="ts">
const appConfig = useAppConfig()
</script>
<template lang="pug">
.copyrightCard
  .copyrightNav
    p.timeLoad 
      p.Powerby ©{{ appConfig.timeStart }} — 2026 Powerby
      a.copyrightName(:href="appConfig.url" :title="appConfig.title" target="_blank")
        img.logo(:alt="appConfig.title" :src="appConfig.header.logo" :class="{circle: appConfig.header.showTitle}")
        p.title {{ appConfig.title }}
    p.themes
      p.Themesinfo 采用 {{appConfig.other.Themes_Info}} 主题
</template>

<style lang="css" scoped>
p.timeLoad {
  display: flex;
  gap: 0.2rem;
}
p.Powerby, p.title {
  font-size: 1em;
}
p.Powerby, a.copyrightName {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.2rem;
}
a.copyrightName {
  padding: 8px;
}
img.logo {
  width: 25px;
  border-radius: 25px;
  min-height: 25px;
  min-width: 25px;
}
.copyrightName:after, .copyrightName:before {
  content: '';
  background-color: var(--c-bg-soft);
  color: var(--c-text);
}
</style>