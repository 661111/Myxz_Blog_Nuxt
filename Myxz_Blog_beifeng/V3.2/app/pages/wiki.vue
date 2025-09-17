<script setup lang="ts">
const appConfig = useAppConfig()
useSeoMeta({
    title: '文档',
    description: `${appConfig.title}的文档。`,
})
const layoutStore = useLayoutStore()
layoutStore.setAside(['blog-stats', 'connectivity', 'blog-log'])

const { data: listRaw } = await useAsyncData(
    'wiki_list',
    () => queryContent('wiki')
        .only(['_path', 'categories', 'image', 'date', 'description', 'readingTime', 'title', 'updated'])
        .find(),
    { default: () => [] },
)

const { listSorted, isAscending, sortOrder } = useArticleSort(listRaw)
const { category, categories, listCategorized } = useCategory(listSorted)
</script>

<template>
    <div class="wiki">
        <div class="wiki-header">
            <h1>
                <ZRawLink class="mobile-only" to="/">
                    <Icon name="ph:caret-left-bold" />
                </ZRawLink>文档
            </h1>
            <ZOrderToggle
                v-model:is-ascending="isAscending"
                v-model:sort-order="sortOrder"
                v-model:category="category"
                :categories
            />
        </div>
        <p>勇敢的人探索世界。这里是一些还未发布的文章。</p>

        <menu>
            <ZArticle
                v-for="article in listCategorized"
                :key="article._path"
                v-bind="article"
                :to="article._path"
                :use-updated="sortOrder === 'updated'"
            />
        </menu>
    </div>
</template>

<style lang="scss" scoped>
.wiki {
    margin: 1rem;
}

.wiki-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
        mask: linear-gradient(#fff, transparent);
    }
}
</style>
