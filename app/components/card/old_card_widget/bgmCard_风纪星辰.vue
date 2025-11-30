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
<div class="banguimItem" >
	<img
		v-if="bangumiCollectionItem.subject.images?.common"
		:src="bangumiCollectionItem.subject.images.common"
		:alt="bangumiCollectionItem.subject.name"
		class="banguimImage"
	>
	<div class="title">
		<a :href="`https://bgm.tv/subject/${props.bangumiCollectionItem.subject_id}`">
			{{ bangumiCollectionItem.subject.name_cn || bangumiCollectionItem.subject.name }}
		</a>
	</div>
	<span class="dateSignpost">{{ getPostDate(bangumiCollectionItem.updated_at) }}</span>
	<span class="score">
		<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
			<path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path>
		</svg>
	  	{{ bangumiCollectionItem.subject.score || '暂无' }}
	</span>
</div>
</template>

<style scoped lang="scss">
// 变量定义
$main-color: var(--db-main-color);
$hover-color: var(--db-hover-color);
$text-color: var(--db--text-color);
$text-color-light: var(--db--text-color-light);
$border-radius: var(--thyuu--size-radius);
$card-normal-size: var(--thyuu--size-card-normal);
$small-size: var(--thyuu--size-small);
$animation: opacity .5s var(--animation-in) backwards, transform 1s var(--animation-in) backwards, filter .7s var(--animation-in);
// 卡片样式表
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