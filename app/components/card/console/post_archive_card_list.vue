<script setup lang="ts">
// 卡片需要的数据代码
import { group } from 'radash'
const { data: listRaw } = await useArticleIndex()
const { listSorted, isAscending, sortOrder } = useArticleSort(listRaw)
const { category, categories, listCategorized } = useCategory(listSorted)

const listGrouped = computed(() => {
	const groupList = Object.entries(group(
		listCategorized.value,
		article => new Date(article[sortOrder.value] || 0).getFullYear(),
	))
	return isAscending.value ? groupList : groupList.reverse()
})
</script>
<template>
  <ul class="card-archive-list">
    <li class="card-archive-list-item" v-for="[year, yearGroup] in listGrouped" :key="year">
      <div class="card-archive-list-link">
        <span class="year_name">
            {{ year }}
        </span>
        <div class="countGroup">
            <span class="count">{{ yearGroup?.length }}</span>
            <span class="count-unit">篇</span>
        </div>  
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.card-archive-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 164px;
  gap: 8px;

  .card-archive-list-item {
    flex: 0 0 24%;

    .card-archive-list-link {
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-content: space-between;
      border: var(--style-border);
      background: var(--heo-maskbgdeep);
      padding: 8px 16px;
      box-shadow: var(--heo-shadow-border);
    }
    .year_name {
      font-size: 14px;
      opacity: .6;
    }

    .countGroup {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      gap: 4px;

      .count {
        width: auto;
        text-align: left;
        font-size: 1.1rem;
        line-height: .9;
        font-weight: 700;
      }

      .count-unit {
        width: auto;
        text-align: left;
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
}
</style>