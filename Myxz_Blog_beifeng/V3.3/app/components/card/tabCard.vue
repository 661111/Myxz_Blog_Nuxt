<script setup lang="ts">
import { custom, equipemt } from '~/types/tabCard',
</script>

<template>
    <div class="tab-content">
        <div class="list" style="margin-top: 20px;" v-for="content in custom.item || equipmentConnect in equipemt.list" :key="content.Title">
            <div class="item">
                <img :src="content.Tmage">
                <main>
                    <header>
                        <h2 class="title">
                            <a :herf="content.Link" rel="noopener noreferrer" target="_blank">{{ content.Title || equipemtConnect.name }}</a>
                            <span class="iconify i-ph:link-duotone" aria-hidden="true" style="font-size: 0.8em;"></span>
                        </h2>
                    </header>
                    <section>
                        <div class="badges" v-for="(badges, badgesIndex) in content.Badge" :key="badgesIndex">
                            <a :herf="badges.BadgeLink" rel="noopener noreferrer" target="_blank" class="badge badge-img">
                                <img class="badge-icon" :src="badges.BadgeImage" :alt="badges.BadgeName"></img>
                                <span class="badge-text">{{ badges.BadgeName }}</span>
                            </a>
                        </div>
                        <div class="description">
                            {{ content.Desc }}
                        </div>

                        <footer>
                            <h5 class="rss">
                                <span class="iconify i-ph:rss-fill" aria-hidden="true"></span>
                                <a :href="content.Link" rel="noopener noreferrer" target="_blank">
                                    {{ content.Link }}
                                 </a>
                            </h5>
                        </footer>
                    </section>
                </main>
            </div>
        </div>
    </div>
</template>