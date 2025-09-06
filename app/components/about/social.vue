<script setup lang="ts">
import { about } from '../../about'
</script>

<template>
    <div class="author-content-item social" style="width: 38%;">
        <div v-for="(page, index) in about" :key="index">
            <div v-for="social in page.social" :key="social.herf" style="margin-bottom: 1rem;">
                <a :herf="social.herf">
                    <span :class="social.class" aria-hidden="true" style="width: 25px; height: 25px; margin: 0 auto;"></span>
                </a>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* 社交 */
.author-content-item {
  &.social {
    display: flex;
    -webkit-box-orient: horizontal;
    flex-direction: row;
    -webkit-box-pack: start;
    justify-content: flex-start;
    max-width: 39%;
    a {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      height: 60px;
      width: 60px;
      border-radius: 12px;
      background: rgb(153, 169, 191);
    }
  }
}
</style>