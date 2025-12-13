<script setup lang="ts">
import Skillinfo from '../components/about/skillinfo.vue'
import Social from '../components/about/social.vue'
import Technology from '../components/about/technology.vue'
import Author from '../components/about/author.vue'
import Game from '../components/about/game.vue'
import Aboutsitetips from '../components/about/aboutsitetips.vue'
import Maxim from '../components/about/maxim.vue'
import MyInfoAndSayHello from '../components/about/myInfoAndSayHello.vue'
import Single from '../components/about/single.vue'

const layoutStore = useLayoutStore()
layoutStore.setAside(['blog-stats', 'blog-tech', 'blog-site-info', 'blog-log'])

// 动态加载外部 JS 脚本
  const loadScript = (url: string, callback?: () => void) => {
    return new Promise<void>((resolve, reject) => {
      // 检查是否已加载
      if (document.querySelector(`script[src="${url}"]`)) {
        console.log('JS脚本已加载');
        resolve();
        return;
      }

      // 创建 script 标签
      const script = document.createElement('script');
      script.src = url;
      script.type = 'text/javascript';
      script.async = true; // 异步加载（不阻塞页面渲染）

      // 加载成功回调
      script.onload = () => {
        console.log('脚本加载完成');
        callback?.();
        resolve();
      };

      // 加载失败回调
      script.onerror = (err) => {
        console.error('脚本加载失败', err);
        reject(err);
      };

      // 添加到 DOM（推荐添加到 head 或 body 末尾）
      document.head.appendChild(script);
    });
  };
  // 使用示例：加载百度统计脚本
  loadScript('https://www.myxz.top/assets/js/about.js')
    .then(() => {
      console.log('友链顶部重要JS加载完毕');
    })
    .catch((err) => {
      console.error('友链顶部重要JS加载完毕', err);
    });
</script>

<template>
  <link href="/assets/css/about.css" rel="stylesheet"></link>
  <div id="about-page" style="margin-top: 1rem;margin-left: 1rem;margin-right: 1rem;">
    <Author />
    <div class="author-page-content">
      <div class="author-content">
        <MyInfoAndSayHello />
      </div>
      <div class="author-content">
        <Aboutsitetips />
        <Maxim />
      </div>
      <div class="author-content">
        <!-- 来自于主流HEO主题的衍生版本 -->
        <Skillinfo />
        <!-- 来自于柳神的关于页面版本
        <Social /> -->
      </div>
      <!-- <div class="author-content">
        <Technology />
        <Game />
      </div> -->
      <div class="author-content">
        <Single />
      </div>
    </div>
  </div>
</template>