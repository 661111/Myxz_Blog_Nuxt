<script setup lang="ts">
import { about } from '../../about'
</script>

<template>
    <div class="author-content-item game" v-for="(gameItem, index) in about" :key="index" style="width: 49%;">
        <div v-for="game in gameItem.game" :key="game.tip">
            <div class="card-content">
                <div class="author-content-item-tips">
                    {{ game.tip }}
                </div>
                <span class="author-content-item-title">
                    {{ game.title }}
                </span>
                <div class="content-bottom">
                    <!-- <div class="icon-group">
                        <div class="loading-bar" role="presentation" aria-hidden="true">
                            <img class="no-lightbox" :src="game.image" alt="Loading..." longdesc="https://ys.mihoyo.com/main/" />
                        </div>
                    </div> -->
                    <div class="tips game-yuanshen-uid">
                        {{ game.uid }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
/* game */
.author-content-item.game {
    background: url(https://bcjyn0fc8o7wifyp.public.blob.vercel-storage.com/img/1567427018126688.jpg) no-repeat top;
    background-size: cover;
    min-height: 300px;
    overflow: hidden;
    color: var(--heo-white);
    width: 59%;
}
</style>