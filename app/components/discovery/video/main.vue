<script setup lang="ts">
import type { VideoApiResponse } from '../../../types/discovery'
import VideoCard from './VideoCard.vue'
const { data: listRaw } = useArticleIndex('video/%')
const { listSorted, isAscending, sortOrder } = useArticleSort(listRaw)
const { category, categories, listCategorized } = useCategory(listSorted)
</script>

<template>
<div class="p-6 portrait:p-5 portrait:lg:p-6 landscape:p-8 sfc-main-section">
  <ul class="row-video">
    <li class="clo-video-card">
      <div class="zy-video-card">
        <VideoCard 
          v-for="article in listCategorized"
			    :key="article.path"
			    v-bind="article"
			    :to="article.path"
			    :use-updated="sortOrder === 'updated'"
        />
      </div>
    </li>
  </ul>
</div>
</template>

<style lang="css" scoped>
/* 基础函数CSS */
@import url(../../../zhiyuage.main.styl);
/* 公用函数CSS */
@media (orientation: landscape) {
    .landscape\:line-clamp-2 {
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
}
.text-sm {
    font-size: .875rem;
    line-height: 1.25rem;
}
.line-clamp-2 {
    -webkit-line-clamp: 2;
}
.line-clamp-1, .line-clamp-2 {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
}
.mt-2 {
    margin-top: .5rem;
}
.m-0 {
    margin: 0;
}
.text-text-1 {
    color: var(--text-1);
}
.overflow-hidden {
    overflow: hidden;
}
.cursor-pointer {
    cursor: pointer;
}
.block {
    display: block;
}
.sfc-main-section[data-v-4768be07] {
    display: flow-root;
}
.sfc-main-section[data-v-4768be07] {
    display: flow-root;
}
@media (orientation: landscape) {
    .landscape\:p-8 {
        padding: 2rem;
    }
}
.p-6 {
    padding: 1.5rem;
}
.object-cover {
    -o-object-fit: cover;
    object-fit: cover;
}
.justify-center {
    justify-content: center;
}
.flex-col {
    flex-direction: column;
}
.flex {
    display: flex;
}
/* landscape模式  */
@media (orientation: landscape) {
    @media (min-width: 1500px) {
        .clo-video-card {
            grid-column: span 2 / span 2;
        }
    }
}
@media (orientation: landscape) {
    @media (min-width: 1200px) {
        .clo-video-card {
            grid-column: span 3 / span 3;
        }
    }
}
@media (orientation: landscape) {
    @media (min-width: 900px) {
        .clo-video-card {
            grid-column: span 3 / span 3;
        }
    }
}
@media (orientation: landscape) {
    @media (min-width: 600px) {
        .clo-video-card {
            grid-column: span 3 / span 3;
        }
    }
}
@media (orientation: landscape) {
    .clo-video-card {
      grid-column: span 4 / span 3;
    }
}

/*  */
.row-video {
    display: grid;
    gap: .5rem;
    grid-template-columns: repeat(12, minmax(0, 1fr));
}
@media (min-width: 900px) {
    .row-video {
        gap: 1rem;
    }
}

@media (min-width: 600px) {
    .row-video {
        gap: .75rem;
    }
}

.zy-video-card {
    background-color: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-2xs);
    border-radius: var(--border-radius-base);
    box-shadow: var(--shadow-base);
    overflow: hidden;
    position: relative;
    transition: transform .1s;
}

.zy-video-card .zy-card-image img {
    height: 100%;
    transform: scale(1.05);
    transition: all .4s ease-in-out;
    vertical-align: middle;
    width: 100%;
}
.zy-video-card .zy-card-image img {
    transition: opacity .3s ease-in-out;
}
.zy-video-card .zy-card-image img {
    transition: opacity .3s ease-in-out;
}
.opacity-100 {
    opacity: 1;
}

.zy-video-card .zy-card-title>div {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    background-color: #000000b3;
    padding: 1rem;
}
</style>