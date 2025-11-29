<script setup lang="ts">
import { computed } from 'vue';
// 导入外部数据
import { creativityData } from '../../creativity';
</script>
<template>
<div class="author-content-item creativityMain" v-for="(creativity, index) in creativityData" :key="index">
  <div class="cardItem" v-for="item in creativity.creativity_list" :key="item.name">
    <div class="creativityIcon" :style="{background: item.color}">
      <NuxtImg :src="item.icon"/>
    </div>
    <div class="creativityInfo">
      {{ item.name }}
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.creativityMain {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  .cardItem {
    align-items: center;
    color: inherit;
    display: flex;
    line-height: 1.3;
    border-radius: 0.4rem;
    // gap: 0.5rem;
    padding: 0.3rem 0.5rem;
    text-decoration: none;
    transition: 0.2s;
    background: var(--heo-background);

    .creativityIcon {
      width: 30px;
      height: 30px;
      border-radius: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
      user-select: none;

      img {
        width: 18px;
        height: 18px;
      }
    }
  }
}
</style>