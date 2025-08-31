<script setup lang="ts">
import { MorningNewsItem } from '../../types/MorningNews'

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
            <h2 v-for="(item, index) in props.MorningNewsCollectionItem.data" :key="index">
                {{ item.date }}
            </h2>
        </div>
        <div class="body">
            {{ MorningNewsItem.data.news }}
        </div>
    </div>
</template>

<style lang="css" scoped>
</style>