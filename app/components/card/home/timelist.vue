<template>
  <!-- 外层容器：仅当有短文数据时渲染 -->
  <div v-if="hasEssays" id="bbTimeList" class="bbTimeList container">
    <!-- 即刻图标：绑定点击事件与 hover 标题 -->
    <i 
      class="anzhiyufont anzhiyu-icon-jike bber-logo fontbold" 
      @click="handleOnclick" 
      :title="'即刻短文'" 
      :href="hrefValue"
      aria-hidden="true"
    ></i>

    <!-- Swiper 容器：承载短文列表 -->
    <div id="bbtalk" class="swiper-container swiper-no-swiping essay_bar_swiper_container" tabindex="-1">
      <div id="bber-talk" class="swiper-wrapper" @click="handleOnclick">
        <!-- 遍历前 10 条短文，生成带标记的链接 -->
        <a 
          v-for="(item, index) in timeList_info.slice(0, 10)" 
          :key="index"
          class="li-style swiper-slide" 
          :href="hrefValue"
        >
          {{ item.content }}
        </a>
      </div>
    </div>

    <!-- 查看全文按钮：绑定点击事件 -->
    <a 
      class="bber-gotobb anzhiyufont anzhiyu-icon-circle-arrow-right" 
      @click="handleOnclick" 
      :href="hrefValue" 
      title="查看全文"
    ></a>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue'
import { useAsyncData, useHead, useRuntimeConfig } from '#imports'
import timeList_info from '~/timeList_info'
import appConfig from '~/app.config'
// ========== 1. 数据获取与处理 ==========
// 读取 Nuxt 运行时主题配置（需提前在 nuxt.config.ts 中暴露 theme）
const runtimeConfig = useRuntimeConfig()
const theme = runtimeConfig.public.theme

// 异步获取短文数据（假设通过 @nuxt/content 从 content/essay 目录读取）
const { data: essayData } = await useAsyncData('essay', async () => {
  const { data } = await useContent('essay').findAll()
  return data.value
})

// 判断是否有有效短文数据
const hasEssays = computed(() => 
  essayData?.value?.some((timeList_info: { value: any }) => timeList_info.value)
)

// ========== 2. 交互逻辑：点击事件与路由 ==========

const handleOnclick = () => {
  window.location.href = '/essay/'
}

// ========== 3. Swiper 动态加载与初始化 ==========
useHead({
  script: [
    { 
      src: 'https://npm.elemecdn.com/anzhiyu-theme-static@1.0.0/swiper/swiper.min.js', 
      defer: true, 
      // Swiper JS 加载完成后，初始化轮播
      callback: () => {
        nextTick(() => {
          new Swiper('#bbtalk', {
            noSwiping: true, // 禁止滑动（与原类名 swiper-no-swiping 对应）
            // 其他 Swiper 配置（如 loop、pagination 等，需与原项目一致）
          })
        })
      }
    }
  ]
})
</script>

<style lang="scss" scoped>
.TimeList.container {
  align-items: center;
  background: var(--anzhiyu-white);
  border: var(--style-border);
  border-radius: 12px;
  box-shadow: var(--anzhiyu-shadow-lightblack);
  color: var(--anzhiyu-fontcolor);
  display: flex;
  font-weight: 700;
  height: 50px;
  margin: 0 auto;
  padding: .5rem 1rem;
  margin: 1rem;
}

.swiper_item_card {
  animation: scroll-right 5s linear infinite;
}
@keyframes scroll-right {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}
</style>