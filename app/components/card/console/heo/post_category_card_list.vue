<script lang="ts" setup>
const { data: stats } = useFetch('/api/stats')
const categoryItem = stats.value?.categories
</script>

<template>
  <div class="content">
    <div class="tips">
      分类
    </div>
    <div class="title">
      测试测试测试测试测试测试测试测试测试测试
    </div>
  </div>
  
  <div class="category_cloud">
    <div v-for="item in stats?.categories">
      {{ item.name }}
      <sup>{{ item.posts }}</sup>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .content {
    .tips {
      opacity: .8;
      font-size: .6rem;
      margin-bottom: .5rem;
    }
    .title {
      font-size: 28px;
      font-weight: 700;
      line-height: 1;
      display: flex;
    }
  }
  .category_cloud {
    display: flex;
    flex-wrap: wrap;
    // overflow-y: scroll;
    gap: 6px;

    div {
      color: var(--heo-fontcolor) !important;
      padding: 2px 8px;
      border-radius: 8px;
      background: var(--heo-card-bg);
      border: var(--style-border);
      font-size: 14px !important;
      font-weight: 700;

      sup {
        opacity: .6;
        top: -.5em;
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
      }
    }
  }
  
</style>