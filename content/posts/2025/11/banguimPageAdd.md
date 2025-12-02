---
title: 添加追更历史
description: 本篇文章主要简述了如何给Nuxt框架添加追更历史
date: 2025-12-01 10:00
update: 2025-12-01 20:49
image: /img/post/2025/12/banguimPageAddCover.webp
categories: [博客魔改]
tags: [Nuxt, 魔改, 美化]
recommend: true
---

# 前言
鸽了这么久的时间，至于为什么鸽了这么久的原因有很多：写小说、默默对站点进行添加新的功能（没有写文）、玩游戏等等，当然这次的文章也是非常高级的。
本教程参考了以下页面的东西
::link-card
---
icon: https://cravatar.com/avatar/1012bf78fb01d5b964c3a9a0f515911a?s=160
title: Mikuの鬆
description: 采用该卡片的元素样式
link: "https://blog.sotkg.com/previews/example#%E8%87%AA%E5%8A%A8%E5%8A%A0%E8%BD%BD%E6%A8%A1%E5%BC%8F-%E7%95%AA%E5%89%A7%E5%8D%A1%E7%89%87"
# mirror: # 是否借助第三方图片加载服务，见源代码
---
::

::link-card
---
icon: https://weavatar.com/avatar/6085f2ddd3c17e493dafdaeccbf2713e3f679298246f35fc7d4d248f5cea361b
title: 风纪星辰
description: 采用该卡片的元素样式（v0版本的卡片，现已抛弃）与tab样式
link: "https://www.thyuu.com/douban/"
# mirror: # 是否借助第三方图片加载服务，见源代码
---
::

## 功能解析
- 采用两栏菜单栏，分为追更作品类型栏（第一个tab栏）与追更作品可见范围栏（第二个tab栏）
- 使用全新加载方式（即风纪星辰豆瓣记录的loading加载）

## 目录结构
- /app/page/banguim.vue：追更页面中的主界面渲染模块，传递useBangumi.ts的模块请求数据（模块来源于喵落阁，经过本人重新二开）
- /app/components/Bangumi/bgmCard.vue：追更页面的卡片主渲染模块（样式来自Mikuの鬆，模块来源于喵落阁，本模块经过本人重新二开）
- /app/composables/useBangumi.ts：追更页面中的api请求模块，具有subject_type与type两种请求方式（模块来源于喵落阁，经过本人重新二开）
- /app/types/bangumi：追更页面全局数据类型，本身作为数据加载以及页面引用（模块来源于喵落阁）

## 核心代码

### 追更页面渲染展示
::tab{:tabs='["页面1.0版本", "页面2.0版本"]'}

#tab1
``` vue [banguim.vue] lang="vue"
<script setup lang="ts">
import type { BangumiCollectionItem } from '~/types/bangumi'
import { getPostDate } from '~/utils/time'

const props = defineProps<{
	bangumiCollectionItem: BangumiCollectionItem
}>()

function handleClick() {
	const url = `https://bgm.tv/subject/${props.bangumiCollectionItem.subject_id}`
	window.open(url, '_blank')
}
</script>

<template>
<div class="banguimItem" >
	<img
		v-if="bangumiCollectionItem.subject.images?.common"
		:src="bangumiCollectionItem.subject.images.common"
		:alt="bangumiCollectionItem.subject.name"
		class="banguimImage"
	>
	<div class="title">
		<a :href="`https://bgm.tv/subject/${props.bangumiCollectionItem.subject_id}`">
			{{ bangumiCollectionItem.subject.name_cn || bangumiCollectionItem.subject.name }}
		</a>
	</div>
	<span class="dateSignpost">{{ getPostDate(bangumiCollectionItem.updated_at) }}</span>
	<span class="score">
		<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
			<path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path>
		</svg>
	  	{{ bangumiCollectionItem.subject.score || '暂无' }}
	</span>
</div>
</template>

<style scoped lang="scss">
// 变量定义
$main-color: var(--db-main-color);
$hover-color: var(--db-hover-color);
$text-color: var(--db--text-color);
$text-color-light: var(--db--text-color-light);
$border-radius: var(--thyuu--size-radius);
$card-normal-size: var(--thyuu--size-card-normal);
$small-size: var(--thyuu--size-small);
$animation: opacity .5s var(--animation-in) backwards, transform 1s var(--animation-in) backwards, filter .7s var(--animation-in);
// 卡片样式表
      .banguimItem {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: flex-end;
        align-items: center;
        text-align: center;
        width: 100%;
        height: 100%;
        padding: 1em;
        gap: .5em;
        margin: 0 20px 20px 0;
        border-radius: $border-radius;
        background: #000;
        overflow: hidden;
        position: relative;
        
        .banguimImage {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 0;
          -webkit-mask: linear-gradient(#0006, #000c, #0000);
          transition: ease-in-out .3s;
          object-fit: cover;
          inset: 0;
        }
        
        .title {
          order: -1;
          z-index: 1;
          flex: 100%;
          position: relative;
          padding: .5em 1em;
          margin: 0;
          border-radius: 1em;
          line-height: 1;
          font-weight: 400;
          color: white;
          width: auto;
          margin-top: 2px;
          font-size: 14px;
          line-height: 1.4;
          color: $text-color;
          
          &::before {
            content: "\e667";
            display: inline-block;
            text-indent: 0;
            margin: 0 .25em 0 0;
            rotate: 45deg;
            scale: .75;
            transition: rotate .5s;
          }
          
          a {
            color: hsl(var(--thyuu--main-color));
          }
        }
        
        .dateSignpost, .score {
          position: relative;
          padding: .5em 1em;
          margin: 0;
          border-radius: 1em;
          line-height: 1;
          font-weight: 400;
          color: white;
          width: auto;
          background: #f5c518;
          color: #000;
          border-radius: 4px;
          line-height: 1;
          padding: 3px 5px;
          font-size: 12px;
          display: flex;
          margin-bottom: 2px;
          font-weight: 900;
          color: #ffffffb3 !important;
          background: #ffffff1c !important;
          -webkit-backdrop-filter: saturate(1.8) blur(20px);
          backdrop-filter: saturate(1.8) blur(20px);
          font-size: $small-size !important;
        }
        
        .dateSignpost:after {
          all: unset;
          content: '标记';
          margin: 0 0 0 .5em;
        }
        
        .score {
          svg {
            fill: #f5c518;
            margin-right: 5px;
          }
        }
      }
</style>
```

#tab2
``` vue [banguim.vue] lang="vue"
<script setup lang="ts">
import type { CollectionType, ContentType } from '../composables/useBangumi'
import type { BangumiCollectionItem } from '~/types/bangumi'
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
const currentData = ref<any[]>([])

// 数据预加载控制
const isDataReady = ref(false)

// 监听数据变化
watch([contentType, collectionType], async () => {
  page.value = 1
  isDataReady.value = false
  await refresh()
})

// 数据加载完成处理
watch(data, (newData) => {
  currentData.value = newData?.data || []
  isDataReady.value = true
}, { immediate: true })

// 防抖处理连续点击
const debouncedRefresh = debounce(refresh, 300)

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
        {{ key }}
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
      <div v-if="isLoading && !isDataReady" class="loading">
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
        </div>
      </div>
    </Transition>

    <!-- 错误提示增强
    <Transition name="fade">
      <div v-if="error && isDataReady" class="error-wrapper">
        <div class="error-icon">⚠️</div>
        <div class="error-message">{{ error.message }}</div>
        <button @click="refresh">重试</button>
      </div>
    </Transition> -->

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
```
::

### 追更页面主体卡片渲染展示模块
::tab{:tabs='["卡片1.0版本", "卡片2.0版本"]'}

#tab1
::alert{type="warning" card}
#title
提示
#default
该版本已被弃用，不再维护
::
``` vue lang="vue" [bgmCard.vue]
<script setup lang="ts">
import type { BangumiCollectionItem } from '~/types/bangumi'
import { getPostDate } from '~/utils/time'

const props = defineProps<{
	bangumiCollectionItem: BangumiCollectionItem
}>()

function handleClick() {
	const url = `https://bgm.tv/subject/${props.bangumiCollectionItem.subject_id}`
	window.open(url, '_blank')
}
</script>

<template>
<div class="banguimItem" >
	<img
		v-if="bangumiCollectionItem.subject.images?.common"
		:src="bangumiCollectionItem.subject.images.common"
		:alt="bangumiCollectionItem.subject.name"
		class="banguimImage"
	>
	<div class="title">
		<a :href="`https://bgm.tv/subject/${props.bangumiCollectionItem.subject_id}`">
			{{ bangumiCollectionItem.subject.name_cn || bangumiCollectionItem.subject.name }}
		</a>
	</div>
	<span class="dateSignpost">{{ getPostDate(bangumiCollectionItem.updated_at) }}</span>
	<span class="score">
		<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
			<path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path>
		</svg>
	  	{{ bangumiCollectionItem.subject.score || '暂无' }}
	</span>
</div>
</template>

<style scoped lang="scss">
// 变量定义
$main-color: var(--db-main-color);
$hover-color: var(--db-hover-color);
$text-color: var(--db--text-color);
$text-color-light: var(--db--text-color-light);
$border-radius: var(--thyuu--size-radius);
$card-normal-size: var(--thyuu--size-card-normal);
$small-size: var(--thyuu--size-small);
$animation: opacity .5s var(--animation-in) backwards, transform 1s var(--animation-in) backwards, filter .7s var(--animation-in);
// 卡片样式表
      .banguimItem {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: flex-end;
        align-items: center;
        text-align: center;
        width: 100%;
        height: 100%;
        padding: 1em;
        gap: .5em;
        margin: 0 20px 20px 0;
        border-radius: $border-radius;
        background: #000;
        overflow: hidden;
        position: relative;
        
        .banguimImage {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 0;
          -webkit-mask: linear-gradient(#0006, #000c, #0000);
          transition: ease-in-out .3s;
          object-fit: cover;
          inset: 0;
        }
        
        .title {
          order: -1;
          z-index: 1;
          flex: 100%;
          position: relative;
          padding: .5em 1em;
          margin: 0;
          border-radius: 1em;
          line-height: 1;
          font-weight: 400;
          color: white;
          width: auto;
          margin-top: 2px;
          font-size: 14px;
          line-height: 1.4;
          color: $text-color;
          
          &::before {
            content: "\e667";
            display: inline-block;
            text-indent: 0;
            margin: 0 .25em 0 0;
            rotate: 45deg;
            scale: .75;
            transition: rotate .5s;
          }
          
          a {
            color: hsl(var(--thyuu--main-color));
          }
        }
        
        .dateSignpost, .score {
          position: relative;
          padding: .5em 1em;
          margin: 0;
          border-radius: 1em;
          line-height: 1;
          font-weight: 400;
          color: white;
          width: auto;
          background: #f5c518;
          color: #000;
          border-radius: 4px;
          line-height: 1;
          padding: 3px 5px;
          font-size: 12px;
          display: flex;
          margin-bottom: 2px;
          font-weight: 900;
          color: #ffffffb3 !important;
          background: #ffffff1c !important;
          -webkit-backdrop-filter: saturate(1.8) blur(20px);
          backdrop-filter: saturate(1.8) blur(20px);
          font-size: $small-size !important;
        }
        
        .dateSignpost:after {
          all: unset;
          content: '标记';
          margin: 0 0 0 .5em;
        }
        
        .score {
          svg {
            fill: #f5c518;
            margin-right: 5px;
          }
        }
      }
</style>
```
#tab2
``` vue lang="vue" [bgmCard.vue]
<script setup lang="ts">
import type { BangumiCollectionItem } from '~/types/bangumi'
import { getPostDate } from '~/utils/time'

const props = defineProps<{
	bangumiCollectionItem: BangumiCollectionItem
}>()

function handleClick() {
	const url = `https://bgm.tv/subject/${props.bangumiCollectionItem.subject_id}`
	window.open(url, '_blank')
}

// 计算满星数量：score 除以 2 后向下取整
const fullStars = Math.floor(props.bangumiCollectionItem.subject.score / 2);

const score = Math.floor(props.bangumiCollectionItem.subject.score); // 动态评分(全局评分)
const rate = Math.floor(props.bangumiCollectionItem.rate); // 动态评分(全局评分)

const scoreClass = computed(() => (index: number) => {
  // 将评分值乘以2，实现半星精度（例如3.5 * 2=7，表示3个全星+1个半星）
  const scoreTotal = score / 2;
  const integerPartScore = Math.floor(scoreTotal); // 总星数的整数部分（包含半星换算）
  const hasHalfScore = scoreTotal % 1 !== 0; // 是否存在半星

  // 根据索引判断星星状态
  if (index < integerPartScore) {
    return 'ri:star-fill';     // 全星
  } else if (index === integerPartScore && hasHalfScore) {
    return 'ri:star-half-line'; // 半星（仅在有余数时显示）
  } else {
    return 'ri:star-line';     // 空星
  }
});

const rateClass = computed(() => (rate: number) => {
  const rateTotal = rate /2;
  const integerPartRate = Math.floor(rateTotal); // 总星数的整数部分（包含半星换算）
  const hasHalfRate = rateTotal % 1 !== 0; // 是否存在半星
  if (rate < integerPartRate) {
    return 'ri:star-fill';     // 全星
  } else if (rate === integerPartRate && hasHalfRate) {
    return 'ri:star-half-line'; // 半星（仅在有余数时显示）
  } else {
    return 'ri:star-line';     // 空星
  }
})
</script>

<template>
  <div class="bgmInfoMainCard card-layout-horizontal">
    <div class="bgmInfoImageWarrper card-image-landscape">
      <NuxtImg :src="bangumiCollectionItem.subject?.images.common" :alt="bangumiCollectionItem.subject.name" class="banguimImage"/>
    </div>
    <div class="bgmInfoConnect">
      <section class="bgmInfoMainSection">
        <div class="title">
          <h3 class="fontColor">
            {{ bangumiCollectionItem.subject.name_cn }}
            <sup>
              {{ bangumiCollectionItem.subject.name }}
            </sup>
          </h3>
        </div>
        <p class="desc">
          {{ bangumiCollectionItem.subject.short_summary }}
        </p>
      </section>
      <section class="bgmInfoSection">
        <div class="infoStars">
          <div class="ratingStarsIcon">
            <Icon class="star-icon star-filled" v-for="(_ , index) in 5"  :key="index" :name="scoreClass(index)" />
          </div>
          <div class="ratingStarsNumber">
            {{ bangumiCollectionItem.subject.score }}
          </div>
        </div>
        <div class="infoTagList">
          <span class="infoTag" v-for="tags in bangumiCollectionItem.subject.tags">
            {{ tags.name }}
            <sup> {{ tags.count }} </sup>
          </span>
        </div>
        <div class="infoCombinedList">
          <div class="infoCombinedCard">
            <div class="label">
              话数:
            </div>
            <div class="value">
              {{ bangumiCollectionItem.subject.eps }}
            </div>
          </div>
          <div class="infoDate">
            <Icon name="ph:calendar-dots-bold" />
            {{ getPostDate(bangumiCollectionItem.updated_at) }}
          </div>
        </div>
        <div class="footer">
          <div class="source-badge">
            <div class="source-name">
              <Icon name="ri:bilibili-line" class="source-icon" />
              Bangumi
            </div>
          </div>
          <button class="view-button" @click="handleClick()">
            <span>查看详情</span>
            <Icon name="ri:arrow-right-line" class="buttonIcon" />
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .bgmInfoMainCard {
    cursor: pointer;
    display: flex;
    background: var(--ld-bg-card);
    border: 1px solid var(--c-border);
    border-radius: 0.75em;
    margin: 1.5em 0px;
    overflow: hidden;
    transition: border-color 0.2s;
    @media (max-width: 480px) {
      margin: 0.75em 0px;
      gap: 0.5em;
      padding: 0.25em;
    }
    @media (max-width: 786px) {
      flex-direction: column;
    }

    .bgmInfoImageWarrper {
      flex-shrink: 0;
      position: relative;
      background: var(--c-border);
      border-radius: 0.5em;
      overflow: hidden;
      @media (max-width: 480px) {
        height: 320px;
        width: 100%;
      }
      @media (max-width: 768px) {
        height: 360px;
        min-width: unset;
        width: 100%;
      }

      .banguimImage {
        height: 100%;
        object-fit: cover;
        object-position: center center;
        width: 100%;
        background: var(--ld-bg);
      }
    }
    .bgmInfoConnect {
      align-items: start;
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 1em;
      @media (max-width: 768px) {
        gap: .75em;
        grid-template-columns: 1fr;
      }

      .bgmInfoMainSection {
        display: flex;
        flex-direction: column;
        min-width: 0px;
        gap: 0.5em;

        .title {
          display: flex;
          flex-direction: column;
          gap: 0.25em;

          .fontColor {
            color: var(--c-text);
            font-family: var(--font-basic, sans-serif);
            font-size: 1.25em;
            font-weight: 600;
            line-height: 1.3;
            word-break: break-word;
            margin: 0px;
            sup {
              opacity: 0.6;
              font-size: 75%;
              line-height: 0;
              vertical-align: baseline;
            }
          }
        }

        .desc {
          display: -webkit-box;
          -webkit-line-clamp: 5;
          line-height: 1.5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }

      .bgmInfoSection {
        display: flex;
        flex-direction: column;
        font-size: 0.875em;
        gap: 0.5em;

        .infoStars {
          align-items: center;
          background: linear-gradient(135deg, color-mix(in srgb, #ffc107 8%, transparent), color-mix(in srgb, #ffc107 3%, transparent));
          border: 1px solid color-mix(in srgb, #ffc107 20%, transparent);
          border-radius: .5em;
          display: flex;
          gap: .5em;
          margin-bottom: .5em;
          padding: .25em .5em;
          position: relative;
          ::before {
            background: linear-gradient(135deg, color-mix(in srgb, #ffc107 15%, transparent), transparent);
            border-radius: .5em;
            content: "";
            inset: 0;
            opacity: 0;
            position: absolute;
            transition: opacity .2s ease;
          }

          .ratingStarsIcon {
            display: flex;
            gap: 2px;

            .star-icon.star-filled {
              animation: star-pulse-9e9bd9dc 2s ease-in-out infinite;
              color: #ffc107;
            }
            .star-icon {
              filter: drop-shadow(0 1px 2px rgba(255, 193, 7, .3));
              font-size: 1.1em;
              height: 1em;
              transition: all .2s ease;
              width: 1em;
            }
          }

          .ratingStarsNumber {
            background: linear-gradient(135deg, var(--c-text), color-mix(in srgb, #ffc107 30%, var(--c-text)));
            background-clip: text;
            -webkit-background-clip: text;
            color: var(--c-text);
            font-size: .875em;
            font-weight: 700;
            -webkit-text-fill-color: transparent;
            margin-left: .25em;
            position: relative;
            text-shadow: 0 1px 2px rgba(0, 0, 0, .1);

            ::after {
              background: linear-gradient(90deg, #ffc107, transparent);
              bottom: -2px;
              content: "";
              height: 1px;
              left: 0;
              opacity: .6;
              position: absolute;
              right: 0;
            }
          }
        }
        .infoTagList {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25em;
          margin: 0px;

          .infoTag {
            color: var(--c-primary);
            display: inline-block;
            font-size: 0.75em;
            font-weight: 500;
            background: color-mix(in srgb, var(--c-primary) 15%, transparent);
            border-radius: 0.25em;
            padding: 0.25em 0.5em;
            white-space: nowrap;

            sup {
              opacity: 0.6;
              top: -0.5em;
              font-size: 75%;
              line-height: 0;
              position: relative;
              vertical-align: baseline;
            }
          }
        }

        .infoCombinedList {
          align-items: center;
          display: flex;
          flex-wrap: wrap;
          font-size: 0.875em;
          gap: 0.75em;
          @media (max-width: 480px) {
            align-items: flex-start;
            flex-direction: column;
            font-size: .75em;
            gap: .25em;

            >:not(.footer) {
              margin-bottom: .25em;
            }
          }
          @media (max-width: 768px) {
            gap: .5rem;
          }

          .infoCombinedCard {
            align-items: center;
            display: flex;
            gap: 0.25em;

            .label {
              color: var(--c-text-2);
              font-weight: 500;
            }
            .value {
              color: var(--c-text);
              font-weight: 600;
            }
          }
          .infoDate {
            align-items: center;
            color: var(--c-text-2);
            display: flex;
            gap: 0.25em;
          }
        }
      }
      .footer {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: auto;
        padding-top: 0.5em;
        border-top: 1px solid var(--c-border);
        gap: 1em;
        @media (max-width: 480px) {
          align-items: stretch;
          flex-direction: column;
          gap: .5em;
          padding-top: .25em;
        }
        @media (max-width: 768px) {
          gap: .75rem
        }

        .source-badge {
            align-items: center;
            color: var(--c-text-2);
            display: flex;
            font-size: 0.875em;
            font-weight: 500;
            gap: 0.25em;
        }
        .view-button {
          align-items: center;
          cursor: pointer;
          display: flex;
          font-size: 0.875em;
          font-weight: 500;
          background: var(--c-border);
          border-width: initial;
          border-style: none;
          border-color: initial;
          border-image: initial;
          border-radius: 0.25em;
          gap: 0.25em;
          padding: 0.25em 0.5em;
          transition: 0.2s;
          @media (max-width: 480px) {
            font-size: .75em;
            min-height: 36px;
            padding: .25em;
          }
          @media (max-width: 768px) {
            justify-content: center;
            width: 100%;
          }
        }
      }
    }
  }
  .card-layout-horizontal {
    align-items: stretch;
    display: flex;
    width: 100%;
    gap: 1em;
    padding: 0.75em;
  }
  .card-image-landscape {
    height: 200px;
    min-width: 150px;
    width: 150px;
  }
  .bgmInfoConnect {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 0px;
    flex: 1 1 0%;
    gap: 0.5em;
  }
  .desc, .card-subtitle {
    color: var(--c-text-2);
    font-size: 0.9375em;
    margin: 0px;
  }
  .source-name, .view-button {
    color: var(--c-text);
    white-space: nowrap;
  }
  @media (max-width: 768px) {
    .card-layout-horizontal {
      flex-direction: column;
      gap: 0.75em;
      padding: 0.5em;
    }
  }
</style>
```
::

### 追更页面全局api加载模块
``` ts lang="ts" [useBangumi.ts]
// import type { BangumiApiResponse } from '../types/bangumi'

// export type ContentType = 'anime' | 'game' | 'real' | 'book' | 'music'
// export type CollectionType = keyof typeof TYPE_ID_MAP

// export const ITEMS_PER_PAGE = 20

// const TYPE_ID_MAP = {
// 	wish: 1,
// 	collect: 2,
// 	do: 3,
// } as const

// export default function useBangumiCollection(
// 	contentType: ContentType = 'anime',
// 	collectionType: Ref<CollectionType> = ref('wish'),
// 	page: Ref<number> = ref(1),
// ) {
// 	const username = 'kemiao'

// 	const subjectType = computed(() => contentType === 'anime' ? 2 : contentType === 'game' ? 4 : contentType === 'book' ? 1 : contentType === 'music' ? 3 : 6)
// 	const typeId = computed(() => TYPE_ID_MAP[toValue(collectionType)])
// 	const offset = computed(() => (page.value - 1) * ITEMS_PER_PAGE)

// 	const { data, status, error } = useFetch<BangumiApiResponse>(
// 		() => {
// 			return `https://api.bgm.tv/v0/users/${username}/collections?subject_type=${subjectType.value}&type=${typeId.value}&limit=${ITEMS_PER_PAGE}&offset=${offset.value}`
// 		},
// 		{
// 			key: () =>
// 				`bangumi-${contentType}-${collectionType.value}-page-${page.value}`,
// 		},
// 	)

// 	const totalPages = computed(() =>
// 		data.value ? Math.ceil(data.value.total / ITEMS_PER_PAGE) : 0,
// 	)

// 	return {
// 		data,
// 		status,
// 		error,
// 		totalPages,
// 	}
// }
import type { BangumiApiResponse } from '~/types/bangumi'

export type ContentType = keyof typeof TYPE_SUBJECT_MAP
export type CollectionType = keyof typeof TYPE_ID_MAP

export const ITEMS_PER_PAGE = 20

const TYPE_SUBJECT_MAP = {
	book: 1,
	anime: 2,
	music: 3,
	game: 4,
} as const

const TYPE_ID_MAP = {
	wish: 1,
	collect: 2,
	do: 3,
	on_hold: 4,
	dropped: 5,
} as const

export default function useBangumiCollection(
	contentType: Ref<ContentType> = ref('anime'),
	collectionType: Ref<CollectionType> = ref('wish'),
	page: Ref<number> = ref(1),
) {
	const username = '1152095'

	const subjectType = computed(() => TYPE_SUBJECT_MAP[toValue(contentType)])
	const typeId = computed(() => TYPE_ID_MAP[toValue(collectionType)])
	const offset = computed(() => (page.value - 1) * ITEMS_PER_PAGE)

	const { data, status, error, refresh } = useFetch<BangumiApiResponse>(
		() => {
			return `https://api.bgm.tv/v0/users/${username}/collections?subject_type=${subjectType.value}&type=${typeId.value}&limit=${ITEMS_PER_PAGE}&offset=${offset.value}`
		},
		{
			key: () =>
				`bangumi-${contentType}-${collectionType.value}-page-${page.value}`,
		},
	)

	const totalPages = computed(() =>
		data.value ? Math.ceil(data.value.total / ITEMS_PER_PAGE) : 0,
	)

	return {
		data,
		status,
		error,
		totalPages,
		refresh,
	}
}
```

### 追更页面全局数据类型及数据存储库
``` ts lang="ts" [bangumi.ts]
// Bangumi API 响应类型
export interface BangumiApiResponse {
	data: BangumiCollectionItem[]
	total: number
	limit: number
	offset: number
}

// 单个收藏项
export interface BangumiCollectionItem {
	updated_at: string // ISO 8601 格式时间
	comment: string | null
	tags: Tag[]
	subject: Subject
	subject_id: number
	vol_status: number
	ep_status: number
	subject_type: number // 2=动画，4=游戏
	type: number // 收藏类型
	rate: number // 用户评分
	private: boolean
}

// 作品主体信息
export interface Subject {
	date: string // YYYY-MM-DD
	images: {
		small: string
		grid: string
		large: string
		medium: string
		common: string
	}
	name: string// 日文原名
	name_cn: string// 中文译名
	short_summary: string
	tags: Tag[]
	score: number // 社区评分
	type: number // 作品类型
	id: number // 作品ID
	eps: number // 集数
	volumes: number // 卷数
	collection_total: number // 收藏人数
	rank: number // 排名
}

export interface Tag {
	name: string
	count: number
	total_cont: number
}
```

## 效果展示
::tab{:tabs='["卡片1.0版本展示", "卡片2.0版本展示"]'}
#tab1

::pic
---
src: /img/post/2025/12/banguimPageAddCover/version1.png
# mirror: # 是否借助第三方图片加载服务，见源代码
caption: 卡片1.0版本展示（已不再使用）
# zoom: false # 是否开启灯箱缩放，默认开启
---
::

#tab2

::pic
---
src: /img/post/2025/12/banguimPageAddCover/version2.png
# mirror: # 是否借助第三方图片加载服务，见源代码
caption: 卡片2.0版本展示（已不再使用）
# zoom: false # 是否开启灯箱缩放，默认开启
---
::
::