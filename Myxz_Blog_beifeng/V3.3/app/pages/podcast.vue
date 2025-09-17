<!-- <script lang="ts" setup>
// import {customPodCast} from '~/podcast';
// const props = defineProps<{
//     /** tab 下标从 1 开始 */
//     tabs: string[]
//     center?: boolean
//     active?: number
// }>()
// // 使用 v-bind:active 以传递 Number 值
// const activeTab = ref(Number(props.active) || 1)

// const layoutStore = useLayoutStore()
// layoutStore.setAside(['blog-stats', 'connectivity', 'blog-log'])
</script> -->

<template>
    <!-- <h2 class="feed-label"> 收听的播客 </h2>
    <main class="container" v-for="(podcast, index) in customPodCast" :key="index">
        <div :class="{ center }">
            <div class="tabs">
                <button
                    v-for="(tab, tabIndex) in tabs"
                    :key="tabIndex"
                    :class="{ active: activeTab === tabIndex + 1 }"
                    @click="activeTab = tabIndex + 1"
                >
                    {{ tab }}
                </button>
            </div>
            <div class="tab-content" > -->
                <!-- <Transition>
                <slot :name="`tab${activeTab}`" /> -->
                <!-- </Transition> -->
                <!-- <div class="podcast-list" style="margin-top: 20px;" v-for="content in podcast.tabItem" :key="content.podcastTitle">
                    <div class="podcast-item">
                        <img :src="content.podcastTmage">
                            <main>
                                <header>
                                    <h2 class="title">
                                        <a :herf="content.podcastLink" rel="noopener noreferrer" target="_blank">{{ content.podcastTitle }}</a>
                                        <span class="iconify i-ph:link-duotone" aria-hidden="true" style="font-size: 0.8em;"></span>
                                    </h2>
                                </header>
                                <section>
                                    <div class="badges" v-for="(badges, badgesIndex) in content.podcastBadge" :key="badgesIndex">
                                        <a :herf="badges.BadgeLink" rel="noopener noreferrer" target="_blank" class="badge badge-img">
                                            <img class="badge-icon" :src="badges.BadgeImage" :alt="badges.BadgeName"></img>
                                            <span class="badge-text">{{ badges.BadgeName }}</span>
                                        </a>
                                    </div>
                                    <div class="description">
                                        {{ content.podcastDesc }}
                                    </div>
                                </section>
                                <footer>
                                    <h5 class="rss">
                                        <span class="iconify i-ph:rss-fill" aria-hidden="true"></span>
                                        <a :href="content.podcastLink" rel="noopener noreferrer" target="_blank">
                                            {{ content.podcastLink }}
                                        </a>
                                    </h5>
                                </footer>
                            </main>
                        </div>
                    </div>
                </div>
            
        </div>
    </main> -->
</template>

<style scoped>
.tabs{
    display: flex;
    flex-wrap: wrap;
    font-size: .9em;
    gap: .5em;
    justify-content: center;
    line-height: normal;
    margin: 0 auto;
    padding: .5em 0;
    position: relative;
}

button.active{
    background-color: var(--ld-bg-card);
    box-shadow: 0 1px .5em var(--ld-shadow);
    color: var(--c-text);
    position: relative;
}

button{
    border-radius: .4em;
    color: var(--c-text-2);
    padding: .3em .5em;
    transition: all .2s;
}

button.active:before {
    background-color: var(--c-primary);
    border-radius: 1em;
    bottom: -.5em;
    content: "";
    display: block;
    height: 2px;
    left: .8em;
    position: absolute;
    right: .8em;
}

.tab-content{
    padding: .5em 0;
}

.podcast-list {
    margin: 1rem;
}

.podcast-item {
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
    transition: all .2s;
}

.podcast-item .cover {
    border-radius: .8em;
    height: 150px;
    width: 150px;
}

.podcast-item main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.podcast-item main header {
    margin-bottom: .5rem;
}

.podcast-item .title {
    align-items: center;
    color: var(--c-text);
    display: flex;
    font-size: 1.2em;
    gap: .5rem;
    line-height: 1.2;
    margin: 0;
}

.podcast-item main section {
    flex: 1;
}

.podcast-item .badges {
    display: flex
;
    flex-wrap: wrap;
    gap: .5rem;
    margin-bottom: .2em;
    margin-top: .2em;
}

.badge {
    align-items: baseline;
    background-color: var(--c-bg-2);
    border: 1px solid var(--c-border);
    border-radius: 4px;
    display: inline-flex;
    font-size: .875em;
    height: 1.6em;
    line-height: 1.6;
    transition: color .2s;
}

@supports (color:color-mix(in srgb,transparent,transparent)) {
    .badge {
        background-color: color-mix(in srgb, currentcolor 5%, transparent);
        border-color: color-mix(in srgb, currentcolor 10%, transparent);
        color: color-mix(in srgb, currentcolor 80%, transparent);
    }
}

.badge-img .badge-icon {
    align-self: center;
    border-radius: 3.5px;
    height: 100%;
}

img:before {
    background-color: var(--c-border);
    color: var(--c-bg-soft);
    content: attr(alt);
    display: grid;
    font: 700 1.5rem / 1.2 var(--font-serif);
    inset: 0;
    overflow: visible;
    padding: .5em;
    place-content: center;
    position: absolute;
    text-align: center;
    text-shadow: none;
    word-break: normal;
}

.badge-img .badge-text {
    margin-left: -.1em;
}

.badge-text {
    padding: 0 .4em;
}

.podcast-item .description {
    color: var(--c-text-2);
    margin: .5em 0;
}

.podcast-item footer, .podcast-item footer .rss {
    align-items: center;
    display: flex;
    gap: .5rem;
}

.podcast-item footer {
    color: var(--c-text-2);
    font-size: .9em;
}

.podcast-item footer .rss {
    align-items: center;
    display: flex;
    gap: .5rem;
}
</style>