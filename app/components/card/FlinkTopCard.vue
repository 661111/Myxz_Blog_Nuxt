<!-- components/FlinkTop.vue -->
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import friendsInfo from '../../feeds'; // 假设同步导入数据（或替换为异步）

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
  loadScript('https://www.myxz.top/assets/js/FlinkTop.js')
    .then(() => {
      console.log('友链顶部重要JS加载完毕');
    })
    .catch((err) => {
      console.error('友链顶部重要JS加载完毕', err);
    });
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

const allPairs = computed(() => {
  return friendsData.value.flatMap((group: LinkGroup) => {
    const linkList = [...group.entries];
    const evenNum = linkList.filter((_, index) => index % 2 === 0);
    const oddNum = linkList.filter((_, index) => index % 2 === 1);
    // 获取当前组的 hundredSuffix（关键！）
    const hundredSuffix = group.hundredSuffix || '';

    const validPairs: Array<{
      even: FriendEntry;
      odd: FriendEntry;
      evenAvatar: string;
      oddAvatar: string;
      // 新增：将 hundredSuffix 存储到 pair 对象中
      hundredSuffix: string; 
    }> = [];

    const maxPairCount = Math.min(evenNum.length, oddNum.length);
    for (let i = 0; i < maxPairCount; i++) {
      const evenItem = evenNum[i];
      const oddItem = oddNum[i];
      if (evenItem && oddItem) {
        validPairs.push({
          even: evenItem,
          odd: oddItem,
          evenAvatar: getAvatarWithoutExclamationMark(evenItem.avatar),
          oddAvatar: getAvatarWithoutExclamationMark(oddItem.avatar),
          // 赋值当前组的 hundredSuffix
          hundredSuffix: hundredSuffix 
        });
      }
    }
    return validPairs;
  });
});
</script>

<template>
  <!-- <link rel="stylesheet" href="/assets/css/flinktop.css"> -->
  <div id="flink_top">
    <!-- 横幅区域 -->
    <div id="flink-banners">
      <div class="banner-top-box" v-for="(info, infoItem) in bannerInfo" :key="infoItem">
        <div class="flink-banners-title">
          <div class="banners-title-small">{{ info.title }}</div>
          <div class="banners-title-big">{{ info.description }}</div>
        </div>
      </div>

      <!-- 技能标签组区域（修正后） -->
      <div id="skills-tags-group-all">
        <div class="tags-group-wrapper">
          <!-- 遍历当前组的图标对 -->
          <div v-for="(pair, pairIndex) in allPairs" :key="pairIndex" class="tags-group-icon-pair" style="margin-left: 1rem;">
            <!-- 渲染偶数项头像 -->
            <a class="tags-group-icon no-text-decoration" target="_blank" rel="noopener" :href="urlFor(pair.even.link)" :title="pair.even.author">
              <img class="no-lightbox" :title="pair.even.author" :src="urlFor(pair.evenAvatar + pair.hundredSuffix)" @error="handleImageError" :alt="pair.even.author">
            </a>

            <!-- 渲染奇数项头像 -->
            <a class="tags-group-icon no-text-decoration" target="_blank" rel="noopener" :href="urlFor(pair.odd.link)" :title="pair.odd.author">
              <img class="no-lightbox" :title="pair.odd.author" :src="urlFor(pair.oddAvatar + pair.hundredSuffix)" @error="handleImageError" :alt="pair.odd.author">
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
#flink-banners {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  margin: 1rem;
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
  .banner-button-group {
    position: absolute;
    right: 2rem;
    top: 2.5rem;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: box;
    display: flex;
    .banner-button {
      color: var(--anzhiyu-card-bg);
      i {
        margin-right: 8px!important;
        font-size: 1rem;
        margin-right: 8px;
        font-size: 1rem;
      }
      &.secondary {
        color: var(--anzhiyu-fontcolor);
      }
    }
  }
  .banner-top-box {
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
  #skills-tags-group-all {
    .tags-group-wrapper {
      -webkit-animation: rowup 120s linear infinite;
      -moz-animation: rowup 120s linear infinite;
      -o-animation: rowup 120s linear infinite;
      -ms-animation: rowup 120s linear infinite;
      animation: rowup 120s linear infinite;
      -webkit-animation: rowup 120s linear infinite;
      -moz-animation: rowup 120s linear infinite;
      -o-animation: rowup 120s linear infinite;
      -ms-animation: rowup 120s linear infinite;
      animation: rowup 120s linear infinite;
    }
    .tags-group-icon {
      border-radius: 50%;
      border-radius: 50%;
      img {
        min-width: 100%;
        min-height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .img-alt {
      display: none;
    }
  }
}
#article-container {
  a {
    color: var(--anzhiyu-fontcolor);
  }
  img {
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
  &.secondary {
    background: var(--anzhiyu-secondbg);
    border: var(--style-border-always);
    color: var(--anzhiyu-lighttext);
    margin-right: 1rem;
    -webkit-box-shadow: var(--anzhiyu-shadow-border);
    box-shadow: var(--anzhiyu-shadow-border);
  }
}
#skills-tags-group-all {
  display: flex;
  transform: rotate(0);
  transition: .3s;
  .tags-group-wrapper {
    margin-top: 40px;
    display: flex;
    flex-wrap: nowrap;
    animation: rowup 60s linear infinite;
    margin-top: 40px;
    display: flex;
    flex-wrap: nowrap;
    animation: rowup 60s linear infinite;
  }
  .tags-group-icon {
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
    img {
      min-width: 100%;
      min-height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .tags-group-icon-pair {
    .tags-group-icon {
      &:nth-child(even) {
        margin-top: 1rem;
        transform: translate(-60px);
      }
    }
  }
}
[data-theme=dark] {
  #skills-tags-group-all {
    .tags-group-icon {
      img {
        filter: none;
      }
    }
  }
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
</style>
<style lang="css" scoped>
/* 动画效果 */
@keyframes rowup {
  0% {
      transform: translateX(0)
  }

  100% {
      transform: translateX(-50%)
  }
}
</style>