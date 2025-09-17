---
title: 添加关于页面
description: 近期将博客迁移至Nuxt框架时，重新搭建了「关于页面」。过程中添加了技能展示组件（skillinfo.vue），实现标签分组渲染；新建about.vue页面，整合个人信息、技能、偏好等多模块内容，并通过TS定义数据接口（about.ts/creativity.ts）。
date: 2025-08-22 10:00
update: 2025-08-22 20:49
image: https://sourceimage.s3.bitiful.net/img/default_cover_27.avif
categories: [博客魔改]
tags: [Nuxt, 魔改, 美化]
recommend: true
---
## 前言
在我把博客的框架迁移到Nuxt的时候，关于页面也一并迁移过来了，而在当时还没学会Nuxt的数据语法，只能按照原样的结构继续使用并不公开。当我学会了父类的子类数据架构之后。回过头来重写关于页面，尽管呈现出来是不太完美的。
## 效果展示
::pic
---
src: https://www.myxz.top/assets/img/postImage/08/22/prview.png
# mirror: # 是否借助第三方图片加载服务，见源代码
caption: 关于页面展示
# zoom: false # 是否开启灯箱缩放，默认开启
---
::

## 添加Vue模块
在 [BlogRoot:]/app/components/ 中添加 skillinfo.vue：
``` VUE [skillinfo.vue] wrap
<script setup lang="ts">
import { computed } from 'vue';
// 导入外部数据
import { creativityData } from '~/creativity';

// 从 creativityData 中提取技能数据（假设取第一个分类）
const skills = computed(() => {
  const firstCategory = creativityData?.[0];
  if (!firstCategory?.creativity_list) return null;
  
  // 补充原始代码中需要的字段（根据实际数据结构调整）
  return {
    ...firstCategory,
    title: firstCategory.class_name,  // 映射 class_name 到 title
    subtitle: firstCategory.subtitle  // 直接使用 subtitle
  };
});

// 计算属性：技能标签分组（每两个一组）- 使用 reduce 重构
const skillTagGroups = computed(() => {
  if (!skills.value?.creativity_list) return [];
  
  return skills.value.creativity_list.reduce((groups, currentTag) => {
    // 取最后一个分组（可能未填满）
    const lastGroup = groups[groups.length - 1];
    
    if (lastGroup?.length === 2) {
      // 当前分组已满，创建新分组
      groups.push([currentTag]);
    } else {
      // 当前分组未满，添加到最后一个分组
      lastGroup ? lastGroup.push(currentTag) : groups.push([currentTag]);
    }
    
    return groups;
  }, []); // 初始值为空数组
});
</script>
<template>
    <div v-if="skills" class="author-content-item skills">
      <div class="card-content">
        <div class="author-content-item-tips">{{ skills.class_name }}</div>
        <span class="author-content-item-title">{{ skills.subtitle }}</span>
        
        <div class="skills-style-group">
          <!-- 标签分组展示（每两个一组） -->
          <div class="tags-group-all">
            <div class="tags-group-wrapper">
              <div 
                v-for="(group, groupIdx) in skillTagGroups" 
                :key="groupIdx" 
                class="tags-group-icon-pair"
              >
                <div 
                  v-for="(tag, tagIdx) in group" 
                  :key="tagIdx" 
                  class="tags-group-icon" 
                  :style="{ background: tag.color }"
                >
                  <img 
                    class="entered loading"
                    :src="tag.icon" 
                    :title="tag.name"
                    :style="{ color: tag.icon_color || '' }"
                    alt=""
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- 全部技能列表 -->
          <!-- <div class="skills-list">
            <div 
              v-for="(tag, tagIdx) in skills.creativity_list" 
              :key="tagIdx" 
              class="skill-info"
            >
              <div 
                class="skill-icon" 
                :style="{ background: tag.color }"
              >
                <img 
                  v-if="tag.img" 
                  :src="tag.icon" 
                  :title="tag.name"
                  :style="{ color: tag.icon_color || '' }"
                  alt=""
                >
              </div>
              <div class="skill-name">
                <span>{{ tag.name }}</span>
              </div>
            </div>
            <div class="etc ...">...</div>
          </div> -->
        </div>
      </div>
    </div>
</template>
```

## 添加Vue页面
在 [BlogRoot:]/app/pages 中添加 about.vue

::alert{type="warning"}
#title
注意事项
#default
1. 还未写完
2. 基础内容精简，链接的文件可访问以下Github链接：
[CSS样式](https://github.com/661111/Myxz_Blog_Nuxt/blob/master/public/assets/css/about.css)
[JS内容](https://github.com/661111/Myxz_Blog_Nuxt/blob/master/public/assets/js/about.js)
::

``` VUE [about.vue] wrap
<script setup lang="ts">
import { aboutPage } from '~/about'

const layoutStore = useLayoutStore()
layoutStore.setAside(['blog-stats', 'connectivity', 'latest-comments', 'blog-log'])
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
    <div id="about-page" v-for="about in aboutPage" :key="about.author" style="margin-top: 1rem;margin-left: 1rem;margin-right: 1rem;">
        <div class="author-main" v-for="author in about.author" :key="author.left">
            <div class="author-tag-left" v-for="left in author.left" :key="left.tag1">
                <span class="author-tag">{{ left.tag1 }}</span>
                <span class="author-tag">{{ left.tag2 }}</span>
                <span class="author-tag">{{ left.tag3 }}</span>
                <span class="author-tag">{{ left.tag4 }}</span>
            </div>
            <div class="author-box" style="z-index:0">
                <span></span>
                <div class="author-img">
                    <img class="no-lightbox" :src="author.logo" style="width: 100%;">
                </div>
            </div>
            <div class="author-tag-right" v-for="right in author.right" :key="right.tag1">
                <span class="author-tag">{{ right.tag1 }}</span>
                <span class="author-tag">{{ right.tag2 }}</span>
                <span class="author-tag">{{ right.tag3 }}</span>
                <span class="author-tag">{{ right.tag4 }}</span>
            </div>
        </div>
        <p class="p center logo large">{{ about.large }}</p>
        <div class="author-page-content">
            <div class="author-content" v-for="info in about.myinfo" :key="info.title1">
                <div class="author-content-item myInfoAndSayHello" style="width: 45%;">
                    <div class="title1">
                        {{ info.title1 }}
                    </div>
                    <div class="title2">
                        {{ info.title2 }}
                        <span class="inline-word">
                            {{ info.inlineword1 }}
                        </span>
                    </div>
                    <div class="title1">
                        {{ info.title3 }}
                        <span class="inline-word">
                            {{ info.inlineword2 }}
                        </span>
                    </div>
                </div>
                <div class="aboutsiteTips author-content-item" v-for="card in info.card" :key="card.tips" style="width: 35%;">
                    <div class="author-content-item-tips">
                        {{ card.tips }}
                    </div>
                    <h2>
                        {{ card.conect1 }}
                        <br />
                        {{ card.conect2 }}
                        <span class="inline-word">
                            {{ card.inlineword }}
                        </span>
                        <div class="mask" v-for="mask in card.mask" :key="mask.firstTips">
                            <span class="first-tips">
                                {{ mask.firstTips }}
                            </span>
                            <span>
                                {{ mask.span }}
                            </span>
                            <span data-up="data-up">
                                {{ mask.up }}
                            </span>
                            <span data-show="data-show">
                                {{ mask.show }}
                            </span>
                        </div>
                    </h2>
                </div>
                <div class="author-content-item maxim" v-for="maxim in about.maxim" :key="maxim.tip" style="width: 30%;">
                    <div class="author-content-item-tips">
                        {{ maxim.tip }}
                    </div>
                    <span class="maxim-title">
                        <span style="opacity:.6;margin-bottom:8px">
                            {{ maxim.title1 }}
                        </span>
                        <span>
                            {{ maxim.title2 }}
                        </span>
                    </span>
                </div>
            </div>
            <div class="author-content">
                <!-- <div class="author-content-item skills" v-for="creativity in creativityData" :key="creativity.class_name">
                    <div class="card-content">
                        <div class="author-content-item-tips">
                            技能
                        </div>
                        <span class="author-content-item-title">
                            {{ creativity.class_name }}
                        </span>
                        <div class="skills-style-group">
                            <div class="tags-group-all">
                                <div class="tags-group-wrapper">
                                    <div class="tags-group-icon-pair"v-for="group in creativity.creativity_list" :key="group.name">
                                        <div class="tags-group-icon" :style="{ background:group.color, }">
                                            <img :title="group.name" class="entered exited" :src="group.icon">
                                        </div>
                                        <div class="tags-group-icon" :style="{ background:group.color, }">
                                            <img :title="group.name" class="entered exited" :src="group.icon">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="skills-list">
                                <div class="skill-info" v-for="group in creativity.creativity_list" :key="group.name">
                                    <div class="skill-icon" :style="{ background:color, }">
                                    <img :title="group.name" class="entered loading" :src="group.icon" data-ll-status="loading">
                                    </div>
                                    <div class="skill-name"> 
                                    <span>
                                        {{ group.name }}
                                    </span>
                                    </div>
                                </div>
                                <div class="etc">...</div>
                            </div>
                        </div>
                    </div>
                </div> -->
                <skillinfo />
                <!-- <div class="author-content-item careers">
                    <div class="card-content">
                        <div class="author-content-item-tips">生涯</div><span class="author-content-item-title">无限进步</span>
                        <div class="careers-group">
                            <div class="careers-item">
                                <div class="circle" style="background: #357ef5"></div>
                                <div class="name">DLPU,产品设计专业</div>
                            </div>
                            <div class="careers-item">
                                <div class="circle" style="background: #eb372a"></div>
                                <div class="name">ITSO,UI/产品经理</div>
                            </div>
                        </div><img class="author-content-img entered loading" alt="生涯" src="https://p.zhheo.com/jSNB8A24190681748947001875.png!cover" data-ll-status="loading">
                    </div>
                </div> -->
            </div>
            <!-- <div class="hello-about">
                <div class="cursor" style="translate:none;rotate:none;scale:none;transform:translate(721px,180px)"></div>
                <div class="shapes">
                    <div class="shape shape-1" style="translate:none;rotate:none;scale:none;transform:translate(721px,180px)"></div>
                    <div class="shape shape-2" style="translate:none;rotate:none;scale:none;transform:translate(721px,180px)"></div>
                    <div class="shape shape-3" style="translate:none;rotate:none;scale:none;transform:translate(721px,180px)"></div>
                </div>
                <div class="content">
                    <h1>{{ about.hello }}</h1>
                </div>
            </div> -->
            <div class="author-content">
                <div class="author-content-item like-technology" v-for="technology in about.technology" :key="technology.tip" style="width: 50%;">
                    <div class="card-content">
                        <div class="author-content-item-tips">
                            {{ technology.tip }}
                        </div>
                        <span class="author-content-item-title">
                            {{ technology.title }}
                        </span>
                        <div class="content-bottom">
                            <div class="tips">
                                {{ technology.bottomTip }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="author-content-item game" v-for="game in about.game"  style="width: 49%;">
                    <div class="card-content">
                        <div class="author-content-item-tips">
                            {{ game.tip }}
                        </div>
                        <span class="author-content-item-title">
                            {{ game.title }}
                        </span>
                        <div class="content-bottom">
                            <!-- <div class="icon-group">
                                <div class="loading-bar" role="presentation" aria-hidden="true">
                                    <img class="no-lightbox" :src="game.image" alt="Loading..." longdesc="https://ys.mihoyo.com/main/" />
                                </div>
                            </div> -->
                            <div class="tips game-yuanshen-uid">
                                {{ game.uid }}
                            </div>
                        </div>
                    </div>
                </div>
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
</style>
```

## 添加ts数据

::tab{:tabs='["页面TS数据", "组件TS数据"]'}
#tab1
::alert{type="warning"}
#title
注意事项
#default
1. 还未写完
::

在[BlogRoot:]/app/ 中添加 about.ts：
```TS [about.ts] warp
export interface aboutConnect {
    author: author[]; //头像数据
    large: string; //标题数据
    myinfo: myinfo[]; //个人介绍数据
    hello: string; //Hello there数据
    maxim: maxim[]; //左右铭数据
    technology: technology[]; //偏好数据
    game: game[]; //游戏数据
    single: single[]; //历程数据
}

// 头像数据
export interface author {
    left: left[];
    logo: string;
    // box: box[];
    right: right[];
}

export interface left {
    tag1: string;
    tag2: string;
    tag3: string;
    tag4: string;
}

export interface box {
    logo: string;
}

export interface right {
    tag1: string;
    tag2: string;
    tag3: string;
    tag4: string;
}

//个人介绍数据
export interface myinfo {
    title1: string;
    title2: string;
    inlineword1: string;
    title3: string;
    inlineword2: string;
    card: card[];
}

export interface card {
    tips: string;
    conect1: string;
    conect2: string;
    inlineword: string;
    mask: mask[];
}

export interface mask {
    firstTips: string;
    span: string;
    up: string;
    show: string;
}

//左右铭数据
export interface maxim {
    tip: string;
    title1: string;
    title2: string;
}

//偏好数据
export interface technology {
    tip: string;
    title: string;
    bottomTip: string;
}

//游戏数据
export interface game {
    tip: string;
    title: string;
    uid: string;
    image: string;
}

//历程数据
export interface single {
    tip: string;
    conect1: string;
    strong1: string;
    conect2: string;
    strong2: string;
    conect3: string
}

export const aboutPage: aboutConnect[] = [
    {
        author: [
            {
                left: [{
                    tag1: "💻 Like数码科技",
                    tag2: "🥣 干饭魂 干饭人",
                    tag3: "🕊 咕咕咕咕咕咕~",
                    tag4: "🧱 CV工程师"
                }],
                logo: "https://blog.myxz.top/img/avatar.avif",
                right: [{
                    tag1: "吃饭不如碎觉 💤",
                    tag2: "乐观 积极 向上 🤝",
                    tag3: "专攻各种困难 🔨",
                    tag4: "人不狠话超多 💢"
                }]
            }
        ],
        large: "关于本站",
        myinfo: [{
            title1: "你好，很高兴认识你👋",
            title2: "我叫",
            inlineword1: "渊",
            title3: "是一名 前端工程师、学生、",
            inlineword2: "博主",
            card: [{
                tips: "追求",
                conect1: "源于",
                conect2: "热爱而去",
                inlineword: "感受",
                mask: [{
                    firstTips: "学习",
                    span: "生活",
                    up: "程序",
                    show: "体验"
                }]
            }]
        }],
        hello: "Main Dis My Blogs",
        maxim: [{
            tip: "座右铭",
            title1: "生活明朗，",
            title2: "万物可爱。",
        }],
        technology: [{
            tip: "关注偏好",
            title: "数码科技",
            bottomTip: "手机、电脑软硬件"
        }],
        game: [{
            tip: "爱好游戏",
            title: "暂时未公开",
            uid: "暂时未公开",
            image: ""
        }],
        single: [{
            tip: "",
            conect1: "",
            strong1: "",
            conect2: "",
            strong2: "",
            conect3: ""
        }]
    }
]
```
#tab2
在[BlogRoot:]/app/ 中添加 creativity.ts：

```TS [creativity.ts] warp
// 定义外层分类的类型接口
export interface CreativityData {
  class_name: string;       // 分类名称
  subtitle: string;
  creativity_list: CreativityItem[];  // 创意项列表
}

// 定义最内层创意项的类型接口
export interface CreativityItem {
  name: string;       // 技术名称
  color: string;      // 颜色值（十六进制/关键字）
  icon: string;       // 图标 URL 地址
}

// 具体数据（与 YAML 结构完全对应）
export const creativityData: CreativityData[] = [
  {
    class_name: "开启创造力",
    subtitle: '技能',
    creativity_list: [
      {
        name: "Vue",
        color: "#b8f0ae",
        icon: "https://cdn.sxiaohe.top/img/banners/vue.webp"
      },
      {
        name: "Java",
        color: "#fff",
        icon: "https://cdn.sxiaohe.top/img/banners/Java.webp"
      },
      {
        name: "Docker",
        color: "#57b6e6",
        icon: "https://cdn.sxiaohe.top/img/banners/docker.webp"
      },
      {
        name: "Webpack",
        color: "#2e3a41",
        icon: "https://cdn.sxiaohe.top/img/banners/webpack.webp"
      },
      {
        name: "Photoshop",
        color: "#4082c3",
        icon: "https://cdn.sxiaohe.top/img/banners/PS.webp"
      },
      {
        name: "Swift",
        color: "#eb6840",
        icon: "https://cdn.sxiaohe.top/img/banners/swift.webp"
      },
      {
        name: "Python",
        color: "#fff",
        icon: "https://cdn.sxiaohe.top/img/banners/python.webp"
      },
      {
        name: "Node",
        color: "#333",
        icon: "https://cdn.sxiaohe.top/img/banners/node-logo.svg"
      },
      {
        name: "Git",
        color: "#df5b40",
        icon: "https://cdn.sxiaohe.top/img/banners/git.webp"
      },
      {
        name: "Css",
        color: "#2c51db",
        icon: "https://cdn.sxiaohe.top/img/banners/css.webp"
      },
      {
        name: "Js",
        color: "#f7cb4f",
        icon: "https://cdn.sxiaohe.top/img/banners/js.webp"
      }
    ],
  },
];
```
::