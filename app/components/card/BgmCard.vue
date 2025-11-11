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
<div class="banguimItem" @click="handleClick">
	<img
		v-if="bangumiCollectionItem.subject.images?.common"
		:src="bangumiCollectionItem.subject.images.common"
		:alt="bangumiCollectionItem.subject.name"
		class="banguimImage"
	>
	<div class="title">
		{{ bangumiCollectionItem.subject.name_cn || bangumiCollectionItem.subject.name }}
	</div>
	<span class="dateSignpost">{{ getPostDate(bangumiCollectionItem.updated_at) }}</span>
	<span class="score">评分: {{ bangumiCollectionItem.subject.score || '暂无' }}</span>
</div>
</template>

<style scoped lang="scss">
      .banguimItem {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: flex-end;
        align-items: center;
        text-align: center;
        width: 100%;
        height: 100%;
        padding: 1em;
        gap: .5em;
        margin: 0 20px 20px 0;
        border-radius: $border-radius;
        background: #000;
        overflow: hidden;
        position: relative;
        
        .banguimImage {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 0;
          -webkit-mask: linear-gradient(#0006, #000c, #0000);
          transition: ease-in-out .3s;
          object-fit: cover;
          inset: 0;
        }
        
        .title {
          order: -1;
          z-index: 1;
          flex: 100%;
          position: relative;
          padding: .5em 1em;
          margin: 0;
          border-radius: 1em;
          line-height: 1;
          font-weight: 400;
          color: white;
          width: auto;
          margin-top: 2px;
          font-size: 14px;
          line-height: 1.4;
          color: $text-color;
          
          &::before {
            content: "\e667";
            display: inline-block;
            text-indent: 0;
            margin: 0 .25em 0 0;
            rotate: 45deg;
            scale: .75;
            transition: rotate .5s;
          }
          
          a {
            color: hsl(var(--thyuu--main-color));
          }
        }
        
        .dateSignpost, .score {
          position: relative;
          padding: .5em 1em;
          margin: 0;
          border-radius: 1em;
          line-height: 1;
          font-weight: 400;
          color: white;
          width: auto;
          background: #f5c518;
          color: #000;
          border-radius: 4px;
          line-height: 1;
          padding: 3px 5px;
          font-size: 12px;
          display: flex;
          margin-bottom: 2px;
          font-weight: 900;
          color: #ffffffb3 !important;
          background: #ffffff1c !important;
          -webkit-backdrop-filter: saturate(1.8) blur(20px);
          backdrop-filter: saturate(1.8) blur(20px);
          font-size: $small-size !important;
        }
        
        .dateSignpost:after {
          all: unset;
          content: '标记';
          margin: 0 0 0 .5em;
        }
        
        .score {
          svg {
            fill: #f5c518;
            margin-right: 5px;
          }
        }
      }
</style>