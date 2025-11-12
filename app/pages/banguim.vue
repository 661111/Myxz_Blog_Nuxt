<script setup lang="ts">
import type { CollectionType, ContentType } from '../composables/useBangumi'
import Pagination from '~/components/partial/Pagination.vue'
import bgmCard from '~/components/Bangumi/bgmCard.vue'
import useBangumi from '../composables/useBangumi'

const route = useRoute()
const contentType = ref<ContentType>('anime')

const layoutStore = useLayoutStore()
layoutStore.setAside(['blog-stats', 'blog-log'])

const page = ref(1)
const collectionType = ref<CollectionType>('wish')

// 关键修改：移除 isFetching，改用 status 计算 isLoading
const { data, error, totalPages, refresh, status } = useBangumi(
  contentType,
  collectionType,
  page
)

// 用 computed 生成加载状态（假设 status 为 'pending' 时表示加载中）
const isLoading = computed(() => status.value === 'pending')

const games = computed(() => data.value?.data || [])

const subjectMap = {
  book: '书籍',
  anime: '追番',
  game: '游戏',
}

const orderMap = {
  wish: '想看',
  do: '在看',
  collect: '看过',
}

// 监听contentType和collectionType的联合变化
watch(
  () => [contentType.value, collectionType.value],
  () => {
    page.value = 1
    refresh()
  },
  { immediate: true }
)

// 切换contentType时重置collectionType
watch(contentType, (newVal) => {
  collectionType.value = 'wish'
})
</script>

<template>
  <div class="banguimContainer">
    <!-- 分类切换导航 -->
    <div class="banguimNav">
      <ZButton 
        v-for="(label, key) in subjectMap" 
        :key="key" 
        :text="label"
        class="NavItem JiEun"
        :primary="contentType === key" 
        @click="contentType = key as ContentType"/>
    </div>

    <!-- 状态切换导航 -->
    <div class="banguimNav">
      <ZButton 
        v-for="(label, key) in orderMap" 
        :key="key" 
        :text="label"
        class="NavItem JiEun"
        :primary="collectionType === key" 
        @click="collectionType = key as CollectionType"/>
    </div>

    <!-- 错误提示 -->
    <Transition name="fade">
      <div v-if="error && !isLoading" class="error">
        {{ error.message }}
      </div>
    </Transition>

    <!-- <Transition name="fade">
      <div v-if="isLoading" class="loading">
        <div class="loading-ripple">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Transition> -->

    <!-- 数据列表 - 优化为单个Transition -->
    <Transition name="list" tag="div">
      <div class="banguimCard">
        <div class="banguimList" :key="contentType">
          <bgmCard
            v-for="game in games"
            :key="`${game.subject_id}-${contentType}`"
            :bangumi-collection-item="game"
          />
        </div>
      </div>
      
    </Transition>

    <!-- 分页 -->
    <Transition name="fade">
      <Pagination
        v-if="totalPages > 1 && !isLoading"
        v-model="page"
        :total-pages="totalPages"
      />
    </Transition>

    <PostComment :key="route.path" />
  </div>
</template>

<style lang="scss" scoped>
// 变量定义
$main-color: var(--db-main-color);
$hover-color: var(--db-hover-color);
$text-color: var(--db--text-color);
$text-color-light: var(--db--text-color-light);
$border-radius: var(--thyuu--size-radius);
$card-normal-size: var(--thyuu--size-card-normal);
$small-size: var(--thyuu--size-small);
$animation: opacity .5s var(--animation-in) backwards, transform 1s var(--animation-in) backwards, filter .7s var(--animation-in);

// 页面样式
.banguimContainer {
  margin-top: 20px;
  margin-left: 1rem;
  margin-right: 1rem;
  
  // 加载样式
  .loading {
    display: flex;
    justify-content: center;
    
    &-ripple {
      align-items: center;
      min-height: 50vh;
      display: inline-flex;
      position: relative;
      width: 80px;
      height: 80px;
      
      &:after, &:before {
        position: absolute;
        border: 4px solid $main-color;
        content: "";
        opacity: 1;
        border-radius: 50%;
        animation: lds-ripple 1s cubic-bezier(0,.2,.8,1) infinite;
      }
    }
  }
  
  // 错误样式
  .error {
    text-align: center;
    padding: 40px;
    color: #666;
    
    button {
      margin-top: 10px;
      padding: 8px 16px;
      background-color: #00a1d6;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  }
  
  // 无数据样式
  .empty {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 4rem 2rem;
    text-align: center;
    
    .error-icon {
      color: var(--c-text-secondary);
      font-size: 1.1rem;
      margin: 0 0 1rem;
    }
  }
  
  // 导航样式
  .banguimNav {
    padding: 0px 0 20px;
    justify-self: center;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    
    .NavItem {
      font-size: 1em;
      cursor: pointer;
      border-bottom: 1px solid transparent;
      transition: .5s border-color;
      display: flex;
      align-items: center;
      text-transform: capitalize;
      margin-right: 20px;
      color: $text-color;
      
      &.active {
        border-color: $main-color;
      }
    }
  }
  
  // 卡片容器
  .banguimCard {
    .banguimList {
      position: relative;
      display: grid;
      grid: auto-flow min(#{$card-normal-size} * 1.6, 70vw) / repeat(auto-fit, minmax(min(#{$card-normal-size} * .9, 50% - 1em), 1fr));
      gap: .5em;
      width: 100%;
      height: 100%;
      overflow: hidden;
      animation: $animation;
      transition: .1s;
    }
  }
  
  // 版权信息
  .banguimCopyright {
    font-size: 12px;
    text-align: right;
    margin-top: 20px;
    color: $text-color-light;
    
    .copyright a {
      color: hsl(var(--thyuu--main-color));
      
      &::before {
        content: "\e667";
        display: inline-block;
        text-indent: 0;
        margin: 0 .25em 0 0;
        rotate: 45deg;
        scale: .75;
        transition: rotate .5s;
      }
    }
  }
}

// 全局样式
:root {
  --banguim--edgelr: 3rem;
  --animation: opacity .5s var(--animation-in) backwards, transform 1s var(--animation-in) backwards, filter .7s var(--animation-in);
  --db--text-color: hsl(var(--thyuu--color-font) / var(--thyuu--alpha-font));
  --thyuu--color-font: 0deg 0% 20%;
  --thyuu--alpha-font: 100%;
  --db-main-color: hsl(var(--thyuu--main-color) / 70%);
  --db-hover-color: hsl(var(--thyuu--main-color) / 70%);
  --db--text-color: hsl(var(--thyuu--color-font) / var(--thyuu--alpha-font));
  --db--text-color-light: var(--thyuu--alpha-font);
  transition: .3s;
}

// 动画定义
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>