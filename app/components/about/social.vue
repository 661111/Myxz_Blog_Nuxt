<script setup lang="ts">
import { about } from '../../about'
</script>

<template>
    <div class="author-content-item social">
        <div class="author-content-social-tips">
            社交
        </div>
        <div class="author-content-social-item" v-for="(page, index) in about" :key="index">
            <a class="infoCard" :href="social.href" v-for="social in page.social" :key="social.name">
                <span :class="social.class" aria-hidden="true" style="width: 25px; height: 25px; margin: 0 auto;"></span>
                {{ social.name }}
            </a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* 社交 */
.author-content-item {
  &.social {
    -webkit-box-orient: horizontal;
    flex-direction: row;
    -webkit-box-pack: start;
    justify-content: flex-start;
  }
}
.author-content-social-item {
    gap: 1rem;
    margin-top: 0.8em;
    display: flex;
}
.infoCard {
    display: flex;
    align-items: center;
    gap: 0.3em;
    width: -moz-fit-content;
    width: fit-content;
    font-size: 0.9em;
    transition: background-color 0.2s, color 0.1s;
}
</style>