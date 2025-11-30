<script setup lang="ts">
import type { BangumiCollectionItem } from '~/types/bangumi'
import { getPostDate } from '~/utils/time'

const props = defineProps<{
	bangumiCollectionItem: BangumiCollectionItem
}>()

function handleClick() {
	const url = `https://bgm.tv/subject/${props.bangumiCollectionItem.subject_id}`
	window.open(url, '_blank')
}
</script>

<template>
  <div class="bgmInfoMainCard">
    <div class="bgmInfoImageWarrper">
      <NuxtImg :src="bangumiCollectionItem.subject?.images.common" :alt="bangumiCollectionItem.subject.name" class="banguimImage"/>
    </div>
    <div class="bgmInfoConnect">
      <section class="bgmInfoMainSection">
        <div class="title">
          {{ bangumiCollectionItem.subject.name }}
        </div>
        <div class="desc">
          {{ bangumiCollectionItem.subject_type }}
        </div>
      </section>
      <section class="bgmInfoSection">

      </section>
    </div>
  </div>
</template>