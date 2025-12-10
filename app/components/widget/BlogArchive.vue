<script setup lang="ts">
const { data } = useFetch('/api/stats')
</script>
<template>
<ZWidget card title="分类展示">
  <div class="category_cloud">
    <div v-for="item in data?.categories" :href="'/?category=' + item.name" class="category">
      {{ item.name }}
      <sup>{{ item.posts }}</sup>
    </div>
  </div>
</ZWidget>
</template>

<style lang="scss" scoped>
  .category_cloud {
    display: flex;
    flex-wrap: wrap;
    // overflow-y: scroll;
    gap: 4px;

    .category {
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