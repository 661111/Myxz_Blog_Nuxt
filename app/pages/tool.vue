<script setup lang="ts">
const appConfig = useAppConfig()
useSeoMeta({
	title: '预览',
	description: `${appConfig.title}的文章预览。`,
})
const layoutStore = useLayoutStore()
layoutStore.setAside(['blog-log'])

const { data: listRaw } = useArticleIndex('tool/%')
const { listSorted, isAscending, sortOrder } = useArticleSort(listRaw)
const { category, categories, listCategorized } = useCategory(listSorted)

import toolCard from '~/components/card/toolCard.vue'
</script>

<template>
<div class="ToolMain">
  <div class="PageHeader">
    <h1>
      工具
    </h1>
  </div>
  <div class="PageBody">
    <div class="Item">
      <toolCard 
        v-for="article in listCategorized"
        :key="article.path"
        v-bind="article"
        :to="article.path"
        :use-updated="sortOrder === 'updated'"
      />
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.ToolMain {
  margin: 1rem;

  .preview-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      mask-image: linear-gradient(#FFF, transparent);
    }
  }
}
</style>