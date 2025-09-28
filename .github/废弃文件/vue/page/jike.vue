<!-- ~/pages/essays.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { 
  customEssays, 
  bannerData, 
  essayConstants 
} from '~/essay'

const appConfig = useAppConfig()
const layoutStore = useLayoutStore()

layoutStore.setAside(['blog-stats', 'blog-tech', 'blog-log'])

useSeoMeta({
  title: '说说',
  ogType: 'profile',
  description: `${appConfig.title}的说说页面。`,
})

// 加载外部脚本
onMounted(() => {
  const loadScript = (src: string) => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve(null)
      
      const script = document.createElement('script')
      script.src = src
      script.async = true
      script.onload = resolve
      script.onerror = reject
      document.head.appendChild(script)
    })
  }

  loadScript('/assets/js/essay.js')
    .catch(err => console.error('脚本加载失败:', err))
})

</script>

<template>
  <link rel="stylesheet" href="/assets/css/essay.css">
  <div id="essay_page">
    <!-- 顶部横幅区域 -->
    <div 
      class="essay_page_banner" 
      :style="`background-image:url(${bannerData.top_background})`"
    >
      <div class="essay_banner_content">
        <h1>
          即刻短文
        </h1>
        <p>
          {{ essayConstants.pageDescription }}
        </p>
      </div>
      <div class="essay_banner_extra">
        <div class="essay_friend_stats">
          <div class="essay_update_time">
            Updated at {{ essayConstants.lastUpdate }}
          </div>
          <div class="essay_powered_by">
            Powered by {{ essayConstants.poweredBy }}
          </div>
        </div>
      </div>
    </div>

    <div class="page-essay" style="margin: 1rem;">
      <!-- 说说内容区域 -->
      <div id="bber">
        <section class="timeline page-1">
          <ul id="waterfall" class="list">
            <li 
              v-for="(item, index) in customEssays" 
              :key="index"
              class="bber-item"
            >
              <div class="bber-header">
                <img class="avatar" src="https://blog.myxz.top/img/avatar.avif">
                </img>
                <div class="info">
                  <div class="info-name">
                    <span> {{ essayConstants.siteName }} </span>
                    <span class="iconify i-material-symbols:verified verified"></span>
                  </div>
                  <div class="info-date"> {{ item.date }} </div>
                </div>
              </div>
              <div class="bber-content">
                <!-- 内容 -->
                <p class="datacont">{{ item.content }}</p>
                
                <!-- 图片展示 -->
                <div class="bber-imgbox">
                  <figure class="imgBox-item" v-if="item.image && item.image.length > 0">
                    <figure 
                      class="image bber-image-content"
                      loading="lazy"
                      fetchpriority="high"
                      target="_blank"
                      data-fancybox="gallery"
                      data-caption=""
                    >
                      <img class="image" :src="item.image" style="cursor: zoom-in;">
                    </figure>
                  </figure>
                  
                  <!-- 占位格 -->
                  <div 
                    v-if="!item.image || item.image === ''" 
                    class="bber-content-noimg"
                  ></div>
                  <div class="bber-content-noimg"></div>
                  <div class="bber-content-noimg"></div>
                </div>
              </div>

              <!-- 底部信息 -->
              <div class="bber-bottom">
                <div class="bber-tags">
                  <span class="bber-tags-name"> {{ item.tags }} </span>
                </div>
              </div>
            </li>
          </ul>
        </section>
        
        <!-- 底部提示 -->
        <div id="bber-tips" style="color: var(--anzhiyu-secondtext);">
          只展示最近{{ bannerData.limit }}条短文
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.essay_page_banner {
  background-position: 50%;
  background-size: cover;
  border-radius: 8px;
  margin: 1rem;
  max-height: 320px;
  min-height: 256px;
  overflow: hidden;
  position: relative;
  .essay_banner_content {
    color: #eee;
    display: flex;
    flex-direction: column;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    justify-content: space-between;
    padding: 1rem;
    position: absolute;
    text-shadow: 0 4px 5px rgba(0,0,0,.5);
    h1 {
      font-size: 2rem;
    }
    p {
      font-size: 1rem;
      opacity: .9;
    }
  }
  .essay_banner_extra {
    align-items: flex-end;
    display: flex;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    justify-content: flex-end;
    margin: 1rem;
    position: absolute;
  }
  .banner-btn {
    align-items: center;
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    background: #ffffff1a;
    border-radius: 20px;
    color: #eee;
    display: flex;
    font-size: .9rem;
    gap: .1rem;
    opacity: .8;
    padding: .5rem .8rem;
    transition: all .3s;
    &:hover {
      background: #0003;
    }
    .icon {
      font-size: 1.2rem;
    }
  }
}
.essay_friend_stats {
  align-items: flex-end;
  color: #eee;
  display: flex;
  flex-direction: column;
  font-family: var(--font-monospace);
  font-size: .7rem;
  gap: .1rem;
  opacity: .7;
  text-shadow: 0 4px 5px rgba(0,0,0,.5);
  .essay_update_time {
    opacity: 1;
  }
  .essay_powered_by {
    opacity: .8;
  }
}
</style>