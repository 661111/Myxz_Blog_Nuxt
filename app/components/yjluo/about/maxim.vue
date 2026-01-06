<script setup lang="ts">
import { about } from '~/about'
</script>

<template>
    <div class="author-content-item maxim" v-for="(maximItem, index) in about" :key="index">
        <div v-for="maxim in maximItem.maxim" :key="maxim.tip">
            <div class="author-content-item-tips">
                {{ maxim.tip }}
            </div>
            <span class="maxim-title">
                <span style="opacity:.6;margin-bottom:8px">
                    {{ maxim.title1 }}
                </span>
                <span>
                    {{ maxim.title2 }}
                </span>
            </span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* maxim */
.author-content-item {
  &.maxim {
    font-size: 36px;
    font-weight: 700;
    line-height: 1.1;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    .maxim-title {
      display: flex;
      flex-direction: column;
    }
  }
  .author-content-item-tips {
    opacity: .8;
    font-size: .6rem;
    margin-bottom: .5rem;
  }
}
</style>