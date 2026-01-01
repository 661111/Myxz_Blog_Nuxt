<template>
  <div class="basic-info-bar">
    <span class="title-text">{{ title }}</span>
  </div>
</template>

<style lang="scss" scoped>
.basic-info-bar {
  display: grid;
  .title-text {
    text-align: center;
    margin: 0 auto;
  }
}
</style>

<script setup lang="ts">
defineProps<{
  title: '基础信息' | '描述' | '由来' | '技能'
}>()
</script>