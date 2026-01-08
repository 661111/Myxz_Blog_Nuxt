<script setup lang="ts">
const appConfig = useAppConfig()

const section = computed(() => ([
  {label: '主题', value: appConfig.other.Themes_Info},
  {label: '版本', value: appConfig.other.Themes_Version},
]))
</script>
<template>
<div class="aboutInfo">
  <img src="/assets/img/xiaoyuange.svg">
  <div class="info-section">
    <h3>基础信息</h3>
    <ZDlGroup size="medium" :items="section"/>
  </div>
</div>
</template>

<style lang="scss" scoped>
.aboutInfo {
  display: flex;
  flex-direction: column;
  gap: 1.2em;
  margin-top: 0.5em;

  img {
    width: 200px;
    margin: auto;
  }
  .info-section {
    background-color: var(--c-bg-soft);
    border: 1px solid var(--c-primary-soft);
    border-radius: .6em;
    margin-bottom: .4em;
    padding: .8em 1em;
    
  }
}
</style>