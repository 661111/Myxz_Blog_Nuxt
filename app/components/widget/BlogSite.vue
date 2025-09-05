<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { siteLinkItems } from '../../sitelink'
const activeTab = ref(0); // 默认激活第一个标签页
</script>

<template>
    <h3 class="widget-title">
        站点
    </h3>
    <div class="BlogSiteGroup">
        <div class="tabs-container">
            <div class="tabs">
                <button v-for="(tab, index) in siteLinkItems" :key="tab.name" @click="activeTab = index" :class="{ 'active': activeTab === index }">
                    {{ tab.name }}
                </button>
            </div>
            <div class="sitelink-list">
                <div class="sitelink-item" v-for="(site, index) in siteLinkItems[activeTab].Item" :key="index">
                    <img width="150" height="150" alt="Syntax" class="cover" :src="site.image">
                    <main>
                        <header class="header">
                            <div class="title">
                                <a :href="site.link" rel="noopener noreferrer" target="_blank">
                                    {{ site.name }}
                                </a>
                                <span class="iconify i-ph:link-duotone" aria-hidden="true" style="font-size: 0.8em;"></span>
                            </div>
                        </header>
                        <section>
                            <div class="badges" v-for="service in site.service" :key="service.name">
                                <a :href="service.link" rel="noopener noreferrer" target="_blank" class="badge badge-img">
                                    <img :alt="service.name" class="badge-icon" :src="service.image">
                                    <span class="badge-text">
                                        {{ service.name }}
                                    </span>
                                </a>
                            </div>
                            <p class="description">
                                {{ site.desc }}
                            </p>
                        </section>
                        <footer>
                            <h5 class="rss">
                                <span class="iconify i-ph:rss-fill" aria-hidden="true"></span>
                                <a :href="site.link" rel="noopener noreferrer" target="_blank">
                                    {{ site.link }}
                                </a>
                            </h5>
                        </footer>
                    </main>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
/* 页面宽度 */
.BlogSiteGroup {
    margin-left: 1rem;
    margin-right: 1rem;
}

/* tab组件样式（从原来的组件样式照搬） */
.float-in-leave-active {
    position: revert
}

.center {
    margin-inline:auto;max-width: 100%
}

.center,.tabs {
    width: -moz-fit-content;
    width: fit-content
}

.tabs {
    display: flex;
    flex-wrap: wrap;
    font-size: .9em;
    gap: .5em;
    justify-content: center;
    line-height: 1.4;
    margin: 0 auto
}

.tabs,button {
    position: relative
}

button {
    border-radius: .4em;
    color: var(--c-text-2);
    margin-bottom: .5em;
    padding: .3em .5em;
    transition: all .2s
}

button:hover {
    background-color: var(--c-bg-soft);
    color: var(--c-text)
}

button:after,button:before {
    border-radius: 1em;
    bottom: -.5em;
    display: block;
    height: 2px;
    left: .8em;
    pointer-events: none;
    position: absolute;
    right: .8em
}

button:after {
    background-color: var(--c-border);
    content: "";
    left: -.8em;
    right: -.8em
}

button.active {
    background-color: var(--ld-bg-card);
    box-shadow: 0 1px .5em var(--ld-shadow);
    color: var(--c-text)
}

button.active:before {
    background-color: var(--c-primary);
    content: "";
    z-index: 1
}

.tab-content {
    padding: .5em 0
}

/* badge组件样式（从原来的组件样式直接照搬） */
.badge {
    align-items: baseline;
    background-color: var(--c-bg-2);
    border: 1px solid var(--c-border);
    border-radius: 4px;
    display: inline-flex;
    font-size: .875em;
    height: 1.6em;
    line-height: 1.6;
    transition: color .2s
}

@supports (color: color-mix(in srgb,transparent,transparent)) {
    .badge {
        background-color:color-mix(in srgb,currentcolor 5%,transparent);
        border-color: color-mix(in srgb,currentcolor 10%,transparent);
        color: color-mix(in srgb,currentcolor 80%,transparent)
    }
}

.badge[href]:hover {
    color: var(--c-text)
}

.badge.badge-round,.badge.badge-round .badge-icon {
    border-radius: 1em
}

.badge-img .badge-icon {
    align-self: center;
    border-radius: 3.5px;
    height: 100%
}

.badge-img .badge-text {
    margin-left: -.1em
}

.badge-text {
    padding: 0 .4em
}

.badge-text:empty {
    display: none
}

/* 卡片组件样式 */
.feed-label {
    margin: 2rem 1rem -1rem
}

.sitelink-list {
    margin: 1rem
}

@media (max-width: 639px) {
    .sitelink-list {
        padding:1rem
    }

     .sitelink-item {
        display: grid;
        gap: 1rem;
        grid-template-columns: 1fr;
        justify-items: center
    }

     .sitelink-item main {
        font-size: .9em;
        line-height: 1.4;
        overflow-wrap: break-word
    }
}

.sitelink-item {
    animation: float-in .2s var(--delay) backwards;
    background: var(--c-bg);
    background-color: var(--ld-bg-card);
    border-radius: .8em;
    box-shadow: var(--ld-shadow);
    box-shadow: 0 .1em .2em var(--ld-shadow);
    display: grid;
    gap: 1rem;
    grid-template-columns: 150px 1fr;
    margin-bottom: 1rem;
    padding: 1rem;
    transition: all .2s
}

.sitelink-item:hover {
    box-shadow: 0 .5em 1em var(--ld-shadow);
    transform: translateY(-2px)
}

.sitelink-item main {
    display: flex;
    flex-direction: column;
    justify-content: space-between
}

.sitelink-item main section {
    flex: 1
}

.sitelink-item main header {
    margin-bottom: .5rem
}

.sitelink-item .title {
    align-items: center;
    color: var(--c-text);
    display: flex;
    font-size: 1.2em;
    gap: .5rem;
    line-height: 1.2;
    margin: 0
}

.sitelink-item .cover {
    border-radius: .8em;
    height: 150px;
    width: 150px
}

.sitelink-item .badges {
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    margin-bottom: .2em;
    margin-top: .2em
}

.sitelink-item .description {
    color: var(--c-text-2);
    margin: .5em 0
}

.sitelink-item footer {
    color: var(--c-text-2);
    font-size: .9em
}

.sitelink-item footer,.sitelink-item footer .rss {
    align-items: center;
    display: flex;
    gap: .5rem
}
</style>