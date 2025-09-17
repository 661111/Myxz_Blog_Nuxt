<script setup lang="ts">
import { about } from '~/about'
</script>

<template>
    <div class="author-content-item social">
        <div  v-for="social in about.social" :key="social.herf">
            <a :herf="social.herf">
                <span :class="social.class" aria-hidden="true" style="width: 32px; height: 32px; margin: 0 auto;"></span>
            </a>
        </div>
    </div>
</template>

<style lang="css" scoped>
/* 社交 */
.author-content-item.social{
    display: flex;
    -webkit-box-orient: horizontal;
    flex-direction: row;
    -webkit-box-pack: start;
    justify-content: flex-start;
    max-width: 39%;
}
.author-content-item.social a {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    height: 60px;
    width: 60px;
    border-radius: 12px;
    background: rgb(153, 169, 191);
}
</style>