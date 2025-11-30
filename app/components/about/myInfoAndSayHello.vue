<script setup lang="ts">
import { about } from '../../about'
</script>

<template>
    <div class="author-content-item myInfoAndSayHello" v-for="(myinfo, index) in about" :key="index" style="text-align: center; width: 100%">
        <div v-for="info in myinfo.myinfo" :key="info.title1">
            <div class="title1">
                {{ info.title1 }}
            </div>
            <div class="title2">
                {{ info.title2 }}
                <span class="inline-word">
                    {{ info.inlineword1 }}
                </span>
            </div>
            <div class="title1">
                {{ info.title3 }}
                <span class="inline-word">
                    {{ info.inlineword2 }}
                </span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* myInfoAndSayHello */
#about-page {
  .myInfoAndSayHello {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--heo-white);
    background: linear-gradient(120deg, #5b27ff 0, #00d4ff 100%);
    background-size: 200%;
    min-height: 175px;
    .title1 {
      opacity: .8;
      line-height: 1.3;
      opacity: .8;
      line-height: 1.3;
    }
    .title2 {
      font-size: 36px;
      font-weight: 700;
      line-height: 1.1;
      margin: .5rem 0;
    }
  }
}
.inline-word {
  word-break: keep-all;
  white-space: nowrap;
  word-break: keep-all;
  white-space: nowrap;
}
</style>