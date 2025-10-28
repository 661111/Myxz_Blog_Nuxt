<script setup lang="ts">
const appConfig = useAppConfig()
</script>
<template lang="pug">
.copyrightCard
  .copyrightNav
    p.timeLoad ©{{ appConfig.timeStart }} —— 2026 Powerby
      a.copyrightName(:href="appConfig.url" :title="appConfig.title" target="_blank") {{ appConfig.title }}
</template>