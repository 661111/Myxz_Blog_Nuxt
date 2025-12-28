<script setup lang="ts">
import type ArticleProps from '~/types/article'

defineOptions({ inheritAttrs: false })
const props = defineProps<ArticleProps>()

const appConfig = useAppConfig()

const categoryLabel = computed(() => props.categories?.[0])
const categoryIcon = computed(() => getCategoryIcon(categoryLabel.value))

const shareText = `【${appConfig.title}】${props.title}\n\n${
	props.description ? `${props.description}\n\n` : ''}${
	new URL(props.path!, appConfig.url).href}`

const { copy, copied } = useCopy(shareText)
const showNovelInfo = useRouteQuery('categories', '小说');
</script>

<template>
  <BlogWidget 
    v-if="showNovelInfo === '小说'"
    card 
    title="特定徽标"
  >
    <p>这是小说文章，显示小说相关徽标和推荐作品。</p>
  </BlogWidget>
</template>