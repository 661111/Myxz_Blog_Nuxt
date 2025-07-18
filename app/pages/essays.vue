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

layoutStore.setAside(['blog-stats', 'contentivity', 'blog-log'])

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
  <link rel="stylesheet" href="https://static.vercel.sxiaohe.top/fonts/anzhiyu/anzhiyufonts.css">
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
              <div class="bber-content">
                <!-- 内容 -->
                <p class="datacont">{{ item.content }}</p>
                
                <!-- 图片展示 -->
                <div 
                  v-if="item.image" 
                  class="bber-container-img"
                  style="width: auto!important"
                >
                  <div v-if="item.image && item.image.length > 0">
                    <a 
                      class="bber-content-img" 
                      :href="item.image" 
                      target="_blank" 
                      data-fancybox="gallery" 
                      data-caption=""
                      style="width: 100%!important"
                    >
                      <img :src="item.image">
                    </a>
                  </div>
                  
                  <!-- 占位格 -->
                  <div 
                    v-if="!item.image || item.image === ''" 
                    class="bber-content-noimg"
                  ></div>
                  <div class="bber-content-noimg"></div>
                  <div class="bber-content-noimg"></div>
                </div>
              </div>
              
              <!-- 分隔线 -->
              <hr>
              
              <!-- 底部信息 -->
              <div class="bber-bottom">
                <div class="bber-info">
                  <!-- 发布时间 -->
                  <div class="bber-info-time">
                    <i class="anzhiyufont anzhiyu-icon-clock"></i>
                    <time class="datatime" :datetime="item.date">{{ item.date }}</time>
                  </div>
                  
                  <!-- 来源信息 -->
                  <div class="bber-info-from">
                    <i class="anzhiyufont anzhiyu-icon-fw-fire"></i>
                    <span>{{ essayConstants.siteName }}</span>
                  </div>
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
    position: relative
}

.essay_page_banner .essay_banner_content {
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
    text-shadow: 0 4px 5px rgba(0,0,0,.5)
}

.essay_page_banner .essay_banner_content h1 {
    font-size: 2rem
}

.essay_page_banner .essay_banner_content p {
    font-size: 1rem;
    opacity: .9
}

.essay_page_banner .essay_banner_extra {
    align-items: flex-end;
    display: flex;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    justify-content: flex-end;
    margin: 1rem;
    position: absolute
}

.essay_page_banner .banner-btn {
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
    transition: all .3s
}

.essay_page_banner .banner-btn:hover {
    background: #0003
}

.essay_page_banner .banner-btn .icon {
    font-size: 1.2rem
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
    text-shadow: 0 4px 5px rgba(0,0,0,.5)
}

.essay_friend_stats .essay_update_time {
    opacity: 1
}

.essay_friend_stats .essay_powered_by {
    opacity: .8
}
</style>