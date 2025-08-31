<script setup lang="ts">
import type { MorningNewsItem } from '../../types/MorningNews'

const props = defineProps<{
    MorningNewsCollectionItem: MorningNewsItem
}>()

function handleClick() {
    const url = 'https://60s-cf.viki.moe/v2/60s'
    window.open(url, '_blank')
}
</script>

<template>
    <div class="MorningNewsContent" @click="handleClick">
        <div class="head">
            <h2 v-for="(item, index) in MorningNewsCollectionItem.data" :key="index">
                {{ item.date }}
            </h2>
        </div>
        <div class="body">
            {{ MorningNewsCollectionItem.data.news }}
        </div>
    </div>
</template>

<style lang="css" scoped>
</style>