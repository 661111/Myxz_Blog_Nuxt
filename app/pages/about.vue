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
layoutStore.setAside(['blog-stats', 'blog-tech', 'blog-log'])

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
        <!-- 来自于柳神的关于页面版本 -->
        <Social />
      </div>
      <div class="author-content">
        <Technology />
        <Game />
      </div>
      <div class="author-content">
        <Single />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
  /* 1.基础架构 */
  #about-page .author-main {
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
    -webkit-box-pack: center;
    -moz-box-pack: center;
    -o-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    margin: 0 0 16px 0;
    user-select: none;
  }
  #about-page .author-box {
    position: relative;
    width: 189px;
    height: 189px;
    background: rgba(253, 253, 253, 0.8);
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #about-page .author-img {
    margin: auto;
    border-radius: 50%;
    overflow: hidden;
    width: 180px;
    height: 180px;
    z-index: 10;
    background: var(--mj-card-bg);
  }
  .author-tag-left {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 30px;
  }
  .author-tag-right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 30px;
  }
  /* 2.头像美化 */
  #about-page .author-box span {
    position: absolute;
    inset: 5px;
    border-radius: 50%;
    background: rgba(253, 253, 253, 0.8);
    z-index: 1;
  }
  #about-page .author-box::before {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    background-image: conic-gradient(transparent, transparent, transparent, #8758FF);
    animation: animate 4s linear infinite;
    animation-delay: -2s;
  }
  #about-page .author-box::after {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    background-image: conic-gradient(transparent, transparent, transparent, #5CB8E4);
    animation: animate 4s linear infinite;
  }
  /* 3.列表卡片美化 */
  .author-tag {
    transform: translate(0, -4px);
    padding: 1px 8px;
    background: var(--heo-card-bg);
    border: var(--style-border-always);
    border-radius: 40px;
    margin-top: 6px;
    font-size: 14px;
    font-weight: bold;
    box-shadow: var(--heo-shadow-lightblack);
    animation: 6s ease-in-out 0s infinite normal none running floating;
  }
  /* 4.列表卡片美化以及动画 */
  /* 4.1.左序列 */
  .author-tag-left .author-tag:first-child, .author-tag-left .author-tag:last-child {
    margin-right: -16px;
  }
  /* 4.2.右序列 */
  .author-tag-right .author-tag:first-child, .author-tag-right .author-tag:last-child {
    margin-left: -16px;
  }
  .author-tag:nth-child(1) {
    animation-delay: 0s;
  }
  .author-tag:nth-child(2) {
    animation-delay: 0.6s;
  }
  .author-tag:nth-child(3) {
    animation-delay: 1.2s;
  }
  .author-tag:nth-child(4) {
    animation-delay: 1.8s;
  }
  /* 5.动画css */
  @keyframes floating {
    0% {
      transform: translate(0, -4px);
    }
    50% {
      transform: translate(0, 4px);
    }
    100% {
      transform: translate(0, -4px);
    }
  }
  @keyframes animate {
    0% {
      transform: rotate(0)
    }
    100% {
      transform: rotate(360deg)
    }
  }
  /* 6.关于本站文字样式美化 */
  [data-theme=dark] #about-page .author-title {
    text-stroke: 1px #bccbe4;
    -webkit-text-stroke: 1px #bccbe4;
  }
  #about-page .author-title {
    font-size: 2.7rem;
    font-weight: 700;
    margin-top: 1px;
    letter-spacing: 6px;
    -webkit-background-clip: text;
    background-image: linear-gradient(90deg, #2ca2b4, #5598de 24%, #7f87ff 45%, #f65aad 85%, #df80b4);
    background-clip: text;
    display: inline-block;
    color: transparent;
    text-stroke: 2px #3fdaee;
    -webkit-text-stroke: 1px #3fdaee;
  }
/* 7.面板样式 */
.author-page-content {
    display: flex;
    flex-direction: column;
    gap: .5rem;
}

.author-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    gap: .5rem;
}

.author-content-item {
    width: 49%;
    border-radius: 12px;
    background: var(--heo-card-bg);
    border: var(--style-border-always);
    box-shadow: var(--heo-shadow-border);
    position: relative;
    padding: 1rem 2rem;
    overflow: hidden;
}

@media screen and (min-width: 1300px) {
    .author-content-item {
        animation: slide-in .6s 0s backwards;
    }
}
/* 8.动画组件 */
@keyframes rowleft {
    from {
        transform: translateX(0)
    }

    to {
        transform: translateX(-50%)
    }
}

@keyframes rowup {
    from {
        transform: translateY(0)
    }

    to {
        transform: translateY(-50%)
    }
}

@keyframes  floating {
    0% {
        transform: translate(0, -4px);
    }

    50% {
        transform: translate(0, 4px);
    }

    100% {
        transform: translate(0, -4px);
    }
}
/* 9.移动端页面 */
@media screen and (max-width: 768px) {
    .author-content {
        margin-top: 0;
        flex-direction: column;
    }
    .author-content-item {
        width: 100% !important;
        padding: 1rem;
    }
    #about-page .author-tag-left, #about-page .author-tag-right {
        display: none;
    }
    .author-content-item.skills {
        max-width: 100%!important;
    }
    .author-content-item.social{
        max-width: 100%!important;
    }
}
</style>