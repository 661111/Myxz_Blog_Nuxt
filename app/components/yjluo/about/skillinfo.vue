<script setup lang="ts">
// 导入外部数据
import { creativityData } from '~/creativity';
</script>
<template>
<div class="author-content-item creativityMain" v-for="(creativity, index) in creativityData" :key="index">
  <div class="author-content-item-tips">
    技能
  </div>
  <div class="author-content-item-list">
    <div class="cardInfo" v-for="item in creativity.creativity_list" :key="item.name">
      <div class="creativityIcon" :style="{background: item.color}">
        <NuxtImg :src="item.icon"/>
      </div>
      <div class="creativityTitle">
        {{ item.name }}
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.creativityMain {
  .author-content-item-tips {
    opacity: 0.8;
    font-size: 12px;
    margin-bottom: 0.5rem;
  }
  .author-content-item-list {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    .cardInfo {
      align-items: center;
      color: inherit;
      display: flex;
      line-height: 1.3;
      border-radius: 1rem;
      // gap: 0.5rem;
      padding: 0.45rem 1rem;
      text-decoration: none;
      transition: 0.2s;
      border-color: color-mix(in srgb, currentcolor 10%, transparent);
      background-color: color-mix(in srgb, currentcolor 5%, transparent);
      color: color-mix(in srgb, currentcolor 80%, transparent);

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
}
</style>