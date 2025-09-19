<script setup lang="ts">
import type { BilibiliBangumiResponse } from '../types/BilibiliBangumi'
import { getPostDate } from '~/utils/time'

const props = defineProps<{
	BilibiliBangumiResponse: BilibiliBangumiResponse
}>()

function handleClick() {
	const url = `https://www.bilibili.com/bangumi/play/ss${props.BilibiliBangumiResponse.list.season_id}`
	window.open(url, '_blank')
}
</script>

<template>
<div class="bgm-card" @click="handleClick">
	<img
		v-if="BilibiliBangumiResponse.list.images?.common"
		:src="BilibiliBangumiResponse.list.images.common"
		:alt="BilibiliBangumiResponse.list.name"
		class="bgm-card__image"
	>
</div>
</template>

<style scoped lang="scss">
.bgm-card {
  display: flex;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;
  height: 180px;
  cursor: pointer;
  background-color: var(--c-bg-3);
  color: var(--c-text-3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: var(--c-brand);
  }

  &__image {
    width: 120px;
    height: 100%;
    object-fit: cover;
    flex-shrink: 0;
  }

  &__info {
    padding: 12px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
  }

  &__title {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 600;
    color: var(--c-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__meta {
    display: flex;
    gap: 12px;
    margin: 0 0 8px;
    font-size: 12px;
    color: var(--c-text-2);
  }

  &__summary {
    margin-top: auto;
    font-size: 13px;
    color: var(--c-text-3);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.4;
  }

  &__comment {
    font-size: 13px;
    color: var(--c-text-1);
  }
}
</style>