<script setup lang="ts">
import type { CollectionType, ContentType } from '../composables/useBangumi'
import Pagination from '~/components/partial/Pagination.vue'
import bgmCard from '~/components/Bangumi/bgmCard.vue'
import useBangumi from '../composables/useBangumi'
import { debounce } from 'radash'

const banguimCard = [{
  name: '克喵Kemeow',
  link: 'https://blog-v3.kemeow.top/',
  type: '页面基础',
}, {
  name: '风纪星辰',
  link: 'https://www.thyuu.com/douban/',
  type: '页面样式'
}]

useSeoMeta({
  title: '追更历史',
})

const layoutStore = useLayoutStore()
const appConfig = useAppConfig()
layoutStore.setAside(['blog-stats', 'blog-log'])

// 状态管理增强
const route = useRoute()
const contentType = ref<ContentType>('anime')
const collectionType = ref<CollectionType>('wish')
const page = ref(1)
const { data, error, totalPages, refresh, status } = useBangumi(contentType, collectionType, page)

// 加载状态控制
const isLoading = computed(() => status.value === 'pending')
const isDataReady = ref(false)
const showLoading = ref(true) // 新增全局加载状态

// 数据预加载控制
const loadingTimeout = ref<NodeJS.Timeout | null>(null)

// 监听数据变化
watch([contentType, collectionType], async () => {
  page.value = 1
  isDataReady.value = false
  showLoading.value = true
  
  // 清除之前的超时
  if (loadingTimeout.value) clearTimeout(loadingTimeout.value)
  
  // 确保最小加载时间
  loadingTimeout.value = setTimeout(async () => {
    await refresh()
    showLoading.value = false
    isDataReady.value = true
  }, 800)
}, { immediate: true })

// 数据加载完成处理
watch(data, (newData) => {
  if (newData) {
    isDataReady.value = true
    showLoading.value = false
  }
}, { immediate: true })

// 防抖处理连续点击
const debouncedRefresh = debounce({ delay: 300 }, (newPage: number) => {
  page.value = newPage
  refresh()
})

const games = computed(() => data.value?.data || [])

const subjectMap = {
  book: '书籍',
  anime: '追番',
  game: '游戏',
  music: '音乐',
}

const orderMap = {
  wish: '想看',
  do: '在看',
  collect: '看过',
  on_hold: '搁置',
  dropped: '抛弃',
}

// 组件卸载时清除定时器
onUnmounted(() => {
  if (loadingTimeout.value) clearTimeout(loadingTimeout.value)
})
</script>

<template>
  <div class="banguimContainer">
    <!-- 导航栏保持原有结构 -->
    <div class="banguimNav">
      <div 
        class="NavItem JiEun" 
        v-for="(label, key) in subjectMap" 
        :class="{active: contentType === key}"
        @click="contentType = key as ContentType"
      >
        {{ label }}
      </div>
    </div>

    <div class="banguimNav">
      <button 
        class="typeItem" 
        v-for="(label, key) in orderMap" 
        :key="key" 
        @click="collectionType = key as CollectionType"
        :class="{active: collectionType === key}"
      >
        {{ label }}
      </button>
    </div>

    <!-- 增强版加载状态 -->
    <Transition name="fade">
      <div v-if="showLoading" class="loading">
        <div class="loading-ripple">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Transition>

    <!-- 数据容器优化 -->
    <Transition name="list" tag="div">
      <div 
        class="banguimCard" 
        v-show="isDataReady"
        :key="contentType"
      >
        <div class="banguimList" v-if="games.length > 0">
          <bgmCard
            v-for="game in games"
            :key="`${game.subject_id}-${contentType}`"
            :bangumi-collection-item="game"
          />
        </div>
        <div class="banguimEmpty" v-else-if="games.length === 0">
          <Icon name="ri:folder-open-line" class="error-icon"/>
          <p>暂无数据</p>
        </div>
      </div>
    </Transition>

    <!-- 分页优化 -->
    <Transition name="fade">
      <Pagination
        v-if="totalPages > 1 && isDataReady"
        v-model="page"
        :total-pages="totalPages"
        @update:model-value="debouncedRefresh"
      />
    </Transition>

    <!-- 版权信息保持原有结构 -->
    <div class="banguimCopyright">
      <div class="card_info" v-for="item in banguimCard" :key="item.link">
        基于
        <a class="copyright" :href="item.link">
          {{ item.name }}
        </a>
        的{{ item.type }}
      </div>
    </div>

    <PostComment herf="/banguim" />
  </div>
</template>

<style lang="scss" scoped>
// 变量定义
$main-color: var(--db-main-color);
$hover-color: var(--db-hover-color);
$text-color: var(--db--text-color-light);
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
    .typeItem { 
      margin-right: 10px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 700;
      border: 1px solid var(--db-border-color);
      border-radius: 999rem;
      border-radius: 999rem;
      padding: 7px 25px;
      color: var(--db--text-color-light);
      // add
      background: hsl(214deg 100% 50% / 50%);
      -webkit-backdrop-filter: saturate(1.8) blur(20px);
      backdrop-filter: saturate(1.8) blur(20px);
      &.active {
        color: var(--db-hover-color);
        border-color: var(--db-hover-color);
        cursor: not-allowed;
      }
    }
  }
  
  // 卡片容器
  .banguimCard {
    .banguimList {
      position: relative;
      gap: .5em;
      width: 100%;
      height: 100%;
      overflow: hidden;
      animation: $animation;
      transition: .1s;
    }
    // 无数据样式
    .banguimEmpty {
      background-repeat: no-repeat;
      height: 300px;
      width: 100%;
      font-size: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .error-icon {
        color: var(--c-text-secondary);
        display: flex;
      }
    }
  }
  
  // 版权信息
  .banguimCopyright {
    font-size: 12px;
    text-align: right;
    margin-top: 20px;
    color: $text-color-light;
    
    .copyright {
      color: hsl(var(--thyuu--main-color));
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