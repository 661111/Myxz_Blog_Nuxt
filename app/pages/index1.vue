<script lang="ts" setup>
import {indexData} from '../index'

const appConfig = useAppConfig()
useSeoMeta({
	description: appConfig.description,
	ogImage: appConfig.author.avatar,
})

const layoutStore = useLayoutStore()
layoutStore.setAside(['blog-stats', 'blog-tech', 'blog-log'])
</script>

<template>
    <div class="main-view relative z-20" v-for="index in indexData" :key="index.name">
        <div class="main-view-inner">
            <div class="nuxt-page mx-auto min-h-screen">
                <div class="!pt-0 py-6 portrait:py-2 portrait:sm:py-4 portrait:lg:py-6 landscape:py-8 sfc-main-section">
                    
                </div>
            </div>
        </div>
        <div :class="index.id" :key="index.class">
            <div class="service-grid">
                <div class="service-card pt-12 portrait:col-span-6 landscape:col-span-4 relative">

                </div>
            </div>
        </div>
    </div>
</template>