---
title: 在友链页面添加滚动头像banner
description: 本篇文章讲述了添加模块代码并在博客的友情链接中添加模块，且使用css美化
date: 2025-08-11 10:00
update: 2025-08-11 20:49
image: https://sourceimage.s3.bitiful.net/img/default_cover_25.avif
categories: [博客魔改]
tags: [Nuxt, 魔改, 美化]
recommend: true
---

## 前言
由于本人之前在Hexo博客中有着许多的魔改内容，正巧迁移出来做成魔改教程，并且这篇文章适用于vue

## 添加vue模块
::alert{type="warning"}
#title
注意事项
#default
1. 请在vue中查找修改代码
``` vue
const maxShowPairs = 8;
if (path.startsWith('')) return `${domain}${path}`;
flink: '/assets/images/error-flink.png'
```
::

在 [Blogroot:]/app/components 中 添加 **FlinkTop.vue**：

``` vue [FlinkTop.vue] lang="vue"
<!-- components/FlinkTop.vue -->
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import friendsInfo from '~/friends'; // 假设同步导入数据（或替换为异步）

// 定义类型接口
interface FriendEntry {
  author: string;
  link: string;
  avatar: string;
  hundredSuffix?: string;
  date?: string;
}

interface LinkGroup {
  name: string;
  entries: FriendEntry[];
  hundredSuffix?: string;
}

// 获取路由实例
const router = useRouter();

// 从环境变量获取域名（需配置 .env 文件）
const domain = 'https://www.myxz.top';

// /​**​
//  * 动态生成 URL（修复 your-domain.com 循环问题）
//  * @param path 原始路径
//  * @returns 完整 URL
//  */
const urlFor = (path: string): string => {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('')) return `${domain}${path}`;
  return path;
};

// 主题配置
const theme = ref({
  error_img: {
    flink: 'https://www.myxz.top/assets/img/friend_404.gif'
  }
});

// 横幅信息
const bannerInfo = ref([
  {
    title: "友情链接",
    description: "与数百名博主无限进步",
    buttonTextOne: "随机访问",
    buttonTextTwo: "申请友链",
  }
]);

// 友情链接数据加载状态
const friendsData = ref<LinkGroup[]>([]);
const isLoading = ref(true);

// 异步加载数据（若 friendsInfo 是同步数据，直接赋值即可）
onMounted(() => {
  // 模拟异步加载（实际根据项目调整）
  setTimeout(() => {
    friendsData.value = friendsInfo as LinkGroup[]; // 假设 friendsInfo 符合 LinkGroup 结构
    isLoading.value = false;
  }, 500);
});

// /​**​
//  * 处理头像 URL（移除感叹号）
//  */
const getAvatarWithoutExclamationMark = (url: string): string => {
  const exclamationIndex = url.indexOf('!');
  return exclamationIndex !== -1 ? url.substring(0, exclamationIndex) : url;
};

// /​**​
//  * 图片加载错误处理
//  */
const handleImageError = (event: Event): void => {
  const target = event.target as HTMLImageElement;
  target.onerror = null;
  target.src = urlFor(theme.value.error_img.flink);
};

// /​**​
//  * 预处理链接数据（生成图标对）
//  */
const processedLinks = computed(() => {
  return friendsData.value.slice(0, 999).map((group: LinkGroup) => {
    const linkList = [...group.entries];
    const evenNum = linkList.filter((_, index) => index % 2 === 0); // 原数组偶数索引元素（0,2,4...）
    const oddNum = linkList.filter((_, index) => index % 2 === 1);  // 原数组奇数索引元素（1,3,5...）
    const hundredSuffix = group.hundredSuffix || '';

    const validPairs: Array<{
      even: FriendEntry;
      odd: FriendEntry;
      evenAvatar: string;
      oddAvatar: string;
    }> = [];

    const maxPairCount = Math.min(evenNum.length, oddNum.length);
    // 最多显示8对（可根据需求调整）
    const maxShowPairs = 20; 
    const loopCount = Math.min(maxPairCount, maxShowPairs);

    for (let i = 0; i < loopCount; i++) {
      // 直接用i作为evenNum和oddNum的索引（对应原数组的2i和2i+1位置）
      const evenItem = evenNum[i];
      const oddItem = oddNum[i];
      if (evenItem && oddItem) {
        validPairs.push({
          even: evenItem,
          odd: oddItem,
          evenAvatar: getAvatarWithoutExclamationMark(evenItem.avatar),
          oddAvatar: getAvatarWithoutExclamationMark(oddItem.avatar)
        });
      }
    }

    return { ...group, hundredSuffix, pairs: validPairs };
  });
});
</script>

<template>
  <link rel="stylesheet" href="/assets/css/flinktop.css">
  <div id="flink_top">
    <!-- 横幅区域 -->
    <div id="flink-banners">
      <div class="banner-top-box" v-for="(info, infoItem) in bannerInfo" :key="infoItem">
        <div class="flink-banners-title">
          <div class="banners-title-small">{{ info.title }}</div>
          <div class="banners-title-big">{{ info.description }}</div>
        </div>
        <div class="banner-button-group">
          <a class="banner-button secondary no-text-decoration">
            <i class="anzhiyufont anzhiyu-icon-paper-plane1" style="margin-right: 8px;"></i>
            <span class="banner-button-text">{{ info.buttonTextOne }}</span>
          </a>
          <a class="banner-button no-text-decoration">
            <i class="anzhiyufont anzhiyu-icon-arrow-circle-right"></i>
            <span class="banner-button-text">{{ info.buttonTextTwo }}</span>
          </a>
        </div>
      </div>

      <!-- 技能标签组区域（修正后） -->
      <div id="skills-tags-group-all">
        <div class="tags-group-wrapper" v-for="group in processedLinks" :key="group.name">
          <!-- 遍历当前组的图标对 -->
          <div v-for="(pair, pairIndex) in group.pairs" :key="pairIndex" class="tags-group-icon-pair" style="margin-left: 1rem;">
            <!-- 偶数项图标 -->
            <a class="tags-group-icon no-text-decoration" target="_blank" rel="noopener" :href="urlFor(pair.even.link)" :title="pair.even.author">
              <img class="no-lightbox" :title="pair.even.author" :src="urlFor(pair.evenAvatar + group.hundredSuffix)" @error="handleImageError" :alt="pair.even.author">
            </a>

            <!-- 奇数项图标 -->
            <a class="tags-group-icon no-text-decoration" target="_blank" rel="noopener" :href="urlFor(pair.odd.link)" :title="pair.odd.author">
              <img class="no-lightbox" :title="pair.odd.author" :src="urlFor(pair.oddAvatar + group.hundredSuffix)" @error="handleImageError" :alt="pair.odd.author">
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```

## 修改vue页面
在 [Blogroot:]/app/pages/link.vue中添加以下代码：
``` vue [link.vue] lang="vue"
    <header class="link-reminder">
        <div class="content">
            <p><Icon name="ph:newspaper-clipping-bold" /> 我会通过订阅源阅读友链文章。</p>
            <p>
                欢迎加入 QQ 群 <Tip copy>
                    {{ appConfig.qqGroup }}
                </Tip> 闲聊或技术交流。
            </p>
            <p>
                我制作了本站的
                <!-- eslint-disable-next-line vue/singleline-html-element-content-newline -->
                <ProseA href="/zhilu.opml">友链源 OPML 聚合</ProseA>，可导入阅读器或
                <!-- eslint-disable-next-line vue/singleline-html-element-content-newline -->
                <ProseA href="https://app.follow.is/share/lists/72840182614552576">订阅 Folo List</ProseA>。
            </p>
        </div>
        <div class="operations">
            <ProseA href="/atom.xml" icon="ph:rss-simple-bold">
                订阅源
            </ProseA>
            <ProseA href="https://app.follow.is/share/feeds/62533754566736896" icon="ph:list-plus-bold">
                在 Folo 上订阅
            </ProseA>
        </div>
    </header>

+    <FlinkTop/>

    <FeedGroup label="友链" :feeds="friends" />
    <FeedGroup label="订阅" :feeds="subscriptions" />
```

## 添加CSS内容
添加以下css样式表内容
``` css [flinktop.css] lang="css"
/* 颜色 */
:root {
    --anzhiyu-theme-op: #4259ef23;
    --anzhiyu-white: #fff;
    --anzhiyu-black: #000;
    --anzhiyu-none: rgba(0, 0, 0, 0);
    --anzhiyu-gray: #999999;
    --anzhiyu-yellow: #ffc93e;
    --anzhiyu-border-radius: 8px;
    --anzhiyu-main: var(--anzhiyu-theme);
    --anzhiyu-main-op: var(--anzhiyu-theme-op);
    --anzhiyu-shadow-theme: 0 8px 12px -3px var(--anzhiyu-theme-op);
    --anzhiyu-shadow-main: 0 8px 12px -3px var(--anzhiyu-main-op);
    --anzhiyu-shadow-blue: 0 8px 12px -3px rgba(40, 109, 234, 0.2);
    --anzhiyu-shadow-white: 0 8px 12px -3px rgba(255, 255, 255, 0.2);
    --anzhiyu-shadow-black: 0 0 12px 4px rgba(0, 0, 0, 0.05);
    --anzhiyu-shadow-yellow: 0px 38px 77px -26px rgba(255, 201, 62, 0.12);
    --anzhiyu-shadow-red: 0 8px 12px -3px #ee7d7936;
    --anzhiyu-shadow-green: 0 8px 12px -3px #87ee7936;
    --anzhiyu-shadow-border: 0 8px 16px -4px #2c2d300c;
    --anzhiyu-logo-color: linear-gradient(215deg, #4584ff 30%, #ff7676 70%);
    --style-border: 1px solid var(--anzhiyu-card-border);
    --anzhiyu-blue-main: #3b70fc;
    --style-border-hover: 1px solid var(--anzhiyu-main);
    --style-border-dashed: 1px dashed var(--anzhiyu-theme-op);
    --style-border-avatar: 4px solid var(--anzhiyu-background);
    --style-border-always: 1px solid var(--anzhiyu-card-border);
    --anzhiyu-white-acrylic1: #fefeff !important;
    --anzhiyu-white-acrylic2: #fcfdff !important;
    --anzhiyu-black-acrylic2: #08080a !important;
    --anzhiyu-black-acrylic1: #0b0b0e !important;
  }
  
.light,:root {
    --anzhiyu-theme: #3b70fc;
    --anzhiyu-theme-op: #4259ef23;
    --anzhiyu-blue: #3b70fc;
    --anzhiyu-red: #d8213c;
    --anzhiyu-pink: #ff7c7c;
    --anzhiyu-green: #57bd6a;
    --anzhiyu-fontcolor: #363636;
    --anzhiyu-background: #f7f9fe;
    --anzhiyu-reverse: #000;
    --anzhiyu-maskbg: rgba(255, 255, 255, 0.6);
    --anzhiyu-maskbgdeep: rgba(255, 255, 255, 0.85);
    --anzhiyu-hovertext: var(--anzhiyu-theme);
    --anzhiyu-ahoverbg: #f7f7fa;
    --anzhiyu-lighttext: var(--anzhiyu-main);
    --anzhiyu-secondtext: rgba(60, 60, 67, 0.6);
    --anzhiyu-scrollbar: rgba(60, 60, 67, 0.4);
    --anzhiyu-card-btn-bg: #edf0f7;
    --anzhiyu-post-blockquote-bg: #fafcff;
    --anzhiyu-post-tabs-bg: #f2f5f8;
    --anzhiyu-secondbg: #edf0f7;
    --anzhiyu-shadow-nav: 0 5px 12px -5px rgba(102, 68, 68, 0.05);
    --anzhiyu-card-bg: #fff;
    --anzhiyu-shadow-lightblack: 0 5px 12px -5px rgba(102, 68, 68, 0);
    --anzhiyu-shadow-light2black: 0 5px 12px -5px rgba(102, 68, 68, 0);
    --anzhiyu-card-border: #c0c6d8;
}
  
.dark {
    --anzhiyu-theme: #0084ff;
    --anzhiyu-theme-op: #0084ff23;
    --anzhiyu-blue: #0084ff;
    --anzhiyu-red: #ff3842;
    --anzhiyu-pink: #ff7c7c;
    --anzhiyu-green: #57bd6a;
    --anzhiyu-fontcolor: #f7f7fa;
    --anzhiyu-background: #18171d;
    --anzhiyu-reverse: #fff;
    --anzhiyu-maskbg: rgba(0, 0, 0, 0.6);
    --anzhiyu-maskbgdeep: rgba(0, 0, 0, 0.85);
    --anzhiyu-hovertext: #0a84ff;
    --anzhiyu-ahoverbg: #fff;
    --anzhiyu-lighttext: #f2b94b;
    --anzhiyu-secondtext: #a1a2b8;
    --anzhiyu-scrollbar: rgba(200, 200, 223, 0.4);
    --anzhiyu-card-btn-bg: #30343f;
    --anzhiyu-post-blockquote-bg: #000;
    --anzhiyu-post-tabs-bg: #121212;
    --anzhiyu-secondbg: #30343f;
    --anzhiyu-shadow-nav: 0 5px 20px 0px rgba(28, 28, 28, 0.4);
    --anzhiyu-card-bg: #1d1b26;
    --anzhiyu-shadow-lightblack: 0 5px 12px -5px rgba(102, 68, 68, 0);
    --anzhiyu-shadow-light2black: 0 5px 12px -5px rgba(102, 68, 68, 0);
    --anzhiyu-card-border: #42444a;
}

/* 友链顶部轮播美化 */
.banners-title-small {
  font-size: 12px;
  line-height: 1;
  color: var(--anzhiyu-secondtext);
  margin-top: 8px;
  margin-bottom: .5rem;
}
.banners-title-big {
  font-size: 36px;
  line-height: 1;
  font-weight: 700;
  margin-bottom: 8px;
}
#flink-banners .banner-button-group .banner-button i {
  margin-right: 8px!important;
  font-size: 1rem;
}
#flink-banners {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  width: 100%;
  height: 76%;
  background: var(--anzhiyu-card-bg);
  padding: 1.5rem;
  border: var(--style-border);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  -webkit-box-shadow: var(--anzhiyu-shadow-border);
  box-shadow: var(--anzhiyu-shadow-border);
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -o-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow: hidden;
  -webkit-transition: .3s;
  -moz-transition: .3s;
  -o-transition: .3s;
  -ms-transition: .3s;
  transition: .3s;
  will-change: transform;
  -webkit-animation: slide-in .6s .2s backwards;
  -moz-animation: slide-in .6s .2s backwards;
  -o-animation: slide-in .6s .2s backwards;
  -ms-animation: slide-in .6s .2s backwards;
  animation: slide-in .6s .2s backwards;
}
#flink-banners .banner-top-box {
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: box;
    display: flex;
    -webkit-box-align: center;
    -moz-box-align: center;
    -o-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: justify;
    -moz-box-pack: justify;
    -o-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
}
#flink-banners .banner-button-group {
    position: absolute;
    right: 2rem;
    top: 2.5rem;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: box;
    display: flex;
}
#flink-banners .banner-button-group .banner-button.secondary {
    color: var(--anzhiyu-fontcolor);
}

#flink-banners .banner-button-group .banner-button {
    color: var(--anzhiyu-card-bg);
}
#article-container a {
    color: var(--anzhiyu-fontcolor);
}
.banner-button.secondary {
    background: var(--anzhiyu-secondbg);
    border: var(--style-border-always);
    color: var(--anzhiyu-lighttext);
    margin-right: 1rem;
    -webkit-box-shadow: var(--anzhiyu-shadow-border);
    box-shadow: var(--anzhiyu-shadow-border);
}
.banner-button {
    padding: 8px 12px;
    background: var(--anzhiyu-fontcolor);
    border-radius: 12px;
    color: var(--anzhiyu-card-bg);
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: box;
    display: flex;
    -webkit-box-align: center;
    -moz-box-align: center;
    -o-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    z-index: 1;
    -webkit-transition: .3s;
    -moz-transition: .3s;
    -o-transition: .3s;
    -ms-transition: .3s;
    transition: .3s;
    cursor: pointer;
    -webkit-box-shadow: var(--anzhiyu-shadow-black);
    box-shadow: var(--anzhiyu-shadow-black);
}
#flink-banners .banner-button-group .banner-button i {
    margin-right: 8px;
    font-size: 1rem;
}
#skills-tags-group-all {
    display: flex;
    transform: rotate(0);
    transition: .3s;
}
#flink-banners #skills-tags-group-all .tags-group-wrapper {
    -webkit-animation: rowup 120s linear infinite;
    -moz-animation: rowup 120s linear infinite;
    -o-animation: rowup 120s linear infinite;
    -ms-animation: rowup 120s linear infinite;
    animation: rowup 120s linear infinite;
}
#skills-tags-group-all .tags-group-wrapper {
    margin-top: 40px;
    display: flex;
    flex-wrap: nowrap;
    animation: rowup 60s linear infinite;
}
#flink-banners #skills-tags-group-all .tags-group-wrapper {
    -webkit-animation: rowup 120s linear infinite;
    -moz-animation: rowup 120s linear infinite;
    -o-animation: rowup 120s linear infinite;
    -ms-animation: rowup 120s linear infinite;
    animation: rowup 120s linear infinite;
}
#skills-tags-group-all .tags-group-wrapper {
    margin-top: 40px;
    display: flex;
    flex-wrap: nowrap;
    animation: rowup 60s linear infinite;
}
#flink-banners #skills-tags-group-all .tags-group-icon {
    border-radius: 50%;
}
#skills-tags-group-all .tags-group-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 66px;
    font-weight: 700;
    box-shadow: var(--anzhiyu-shadow-blackdeep);
    width: 120px;
    height: 120px;
    border-radius: 30px;
}
#flink-banners #skills-tags-group-all .tags-group-icon img {
    min-width: 100%;
    min-height: 100%;
    border-radius: 50%;
    object-fit: cover;
}

[data-theme=dark] #skills-tags-group-all .tags-group-icon img {
    filter: none;
}
#skills-tags-group-all .tags-group-icon img {
    min-width: 100%;
    min-height: 100%;
    border-radius: 50%;
    object-fit: cover;
}
#article-container img {
    display: block;
    margin: 0 auto 20px;
    max-width: 100%;
    -webkit-transition: .3s;
    -moz-transition: .3s;
    -o-transition: .3s;
    -ms-transition: .3s;
    transition: .3s;
    border-radius: 8px;
}
#flink-banners #skills-tags-group-all .img-alt {
    display: none;
}
.img-alt {
    font-size: 12px;
    margin: 0;
    margin-top: 8px;
    color: var(--anzhiyu-secondtext);
}
.is-center {
    text-align: center;
}
#flink-banners #skills-tags-group-all .tags-group-icon {
    border-radius: 50%;
}
#skills-tags-group-all .tags-group-icon-pair .tags-group-icon:nth-child(even) {
    margin-top: 1rem;
    transform: translate(-60px);
}
#skills-tags-group-all .tags-group-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 66px;
    font-weight: 700;
    box-shadow: var(--anzhiyu-shadow-blackdeep);
    width: 120px;
    height: 120px;
    border-radius: 30px;
}


/* 动画效果 */
@keyframes rowup {
  0% {
      transform: translateX(0)
  }

  100% {
      transform: translateX(-50%)
  }
}
```