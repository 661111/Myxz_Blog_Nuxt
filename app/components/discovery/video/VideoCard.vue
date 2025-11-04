<script setup lang="ts">
import type ArticleProps from '~/types/article'
const { data: pv  } = useFetch('https://artalk.myxz.top/api/v2/pages/pv')

const props = defineProps<{ useUpdated?: boolean } & ArticleProps>()

const appConfig = useAppConfig()

const showAllDate = isTimeDiffSignificant(props.date, props.updated)

const categoryLabel = computed(() => props.categories?.[0])
const categoryColor = computed(() => appConfig.article.categories[categoryLabel.value!]?.color)
const categoryIcon = computed(() => getCategoryIcon(categoryLabel.value))
</script>

<template>
<ZRawLink class="w-full h-full block overflow-hidden cursor-pointer text-text-1">
	<div class="zy-video-card-inner">
    <div class="zy-card-image">
      <div class="relative w-full h-full">
        <div class="relative w-full h-full">
          <div class="relative w-full h-full">
            <NuxtImg v-if="image" class="article-cover" :src="image" :alt="title" />
          </div>
        </div>
      </div>
    </div>
    <div class="zy-card-title">
      <div class="flex flex-col justify-center">
        <div class="m-0 mt-2 text-sm line-clamp-2 landscape:line-clamp-2">
          {{ title }}
        </div>
        <div class="mt-2 flex justify-between font-light">
          <div class="text-sm opacity-80">
            {{ date }}
          </div>
          <div class="flex items-center">
            <div class="text-sm opacity-80">
              {{ pv }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</ZRawLink>
</template>

<style lang="scss" scoped>
@import url(@/zhiyuage.main.styl);
.text-sm {
    font-size: .875rem;
    line-height: 1.25rem;
}
.line-clamp-2 {
    -webkit-line-clamp: 2;
}
.justify-center {
  justify-content: center;
}
.flex-col {
  flex-direction: column;
}
.font-light {
    font-weight: 300;
}
.justify-between {
    justify-content: space-between;
}
.mt-2 {
    margin-top: .5rem;
}

@media (orientation: landscape) {
    .landscape\:line-clamp-2 {
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
}

.zy-video-card {
  .zy-card-image {
    align-items: center;
    aspect-ratio: 9 / 16;
    border-radius: var(--border-radius-2xs) var(--border-radius-2xs) 0 0;
    display: flex;
    justify-content: center;
    overflow: hidden;
    img {
      height: 100%;
      transform: scale(1.05);
      transition: all .4s ease-in-out;
      vertical-align: middle;
      width: 100%;
    }
  }
  .zy-card-title {
    bottom: 0;
    color: #fff;
    position: absolute;
    width: 100%;

    >div {
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      background-color: #000000b3;
      padding: 1rem;
    }
  }
}
</style>