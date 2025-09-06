<script setup lang="ts">
import { about } from '../../about'
const { data: singlePost } = await useAsyncData('/about', () => queryCollection('content').path('/about').first())
</script>

<template>
    <div class="create-site-post author-content-item single" v-for="(singleItem, index) in about" :key="index" style="width: 100%">
        <div v-for="single in singleItem.single" :key="single.tip">
            <div class="author-content-item-tips">
                {{ single.tip }}
            </div>
            <div class="author-content-item-title">
                {{ single.title }}
            </div>
            <p class="author-content-item-content">
                {{ single.content }}
            </p>
            <div class="lishi">
                {{ single.lishi }}
            </div>
            <div class="singlePost">
                <ContentRenderer
                v-if="singlePost"
                :value="singlePost"
                class="article"
                />
                <p v-else class="text-center">
                    可于 about.md 配置补充说明。
                </p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* single */
.author-content-item {
  &.single {
    width: 100%;
  }
  .author-content-item-tips {
    opacity: .8;
    font-size: 12px;
    margin-bottom: .5rem;
  }
}
.author-content-item-title {
  font-size: 1.875rem;
  line-height: 2.25rem;
}
.lishi {
  font-size: 1.875rem;
  line-height: 2.25rem;
}
.author-content-item-content {
  margin-bottom: 1rem;
  margin-top: .5rem;
  vertical-align: middle;
}
</style>