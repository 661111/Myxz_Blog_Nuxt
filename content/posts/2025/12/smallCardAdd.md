---
title: 组件美化
description: 该文章记录了项目版本迭代中的UI优化与功能调整，包括站点详情卡片组件化改造（采用Badge组件优化布局）、分类卡片新增文章数量统计功能（重新严重问题）、标签卡片新增文章标签统计功能、博主信息模块的拆分与重构，同时删除了冗余的左侧图片和完整博主卡片，最终形成模块化组件结构（涉及5个核心组件及数据调用逻辑调整）。
date: 2025-12-04 10:00:00
updated: 2025-12-04 20:49:00
image: /PostCover/smallCard.avif
categories: [博客魔改]
tags: [Nuxt, 魔改, 美化]
recommend: true
---
## 前言
由于最近的累计魔改的内容已经多到需要记录了，索性也写成一篇魔改文章。

## 功能增加与删减
### V20251210-OFFICIAL
增加内容
- 由标签展示卡片代替掉分类展示卡片

删减内容
- 分类展示卡片导致其首页`index.vue`中的渲染逻辑出现错误，导致了无法正常渲染出`精选文章卡片`、`文章具体分类`，需要切换到其他页面或者文章再切回才能正常渲染

### V20251130-OFFICIAL
新增内容
- 站点详情卡片中的镜像节点采用`Badge`组件，在标题栏中的`title`与`description`排列为一行。
- 在分类卡片中的单个分类新增向上标头，让读者查看站点中的分类中有多少篇文章
- 将博主信息简略到`BlogStats.vue`中，且增加了在几个小时前在线（该功能暂时还未写完，有兴趣者可以二开）

删减内容
- 站点详情卡片中的左侧图片进行删除，在ts文件中进行删除掉
- 博主信息卡片不在保留，但在该文章中会进行写出来（有兴趣者可以二开）

### V20251120-OFFICIAL
新增内容
- 增加站点详情卡片，套用了测试文件（暂时无需删除）
- 增加在分类卡片中的单个分类新增向上标头，让读者查看站点中的文章分布在哪些分类中。

### V20251120-OFFICIAL
新增内容
- 增加博主信息卡片

## 目录结构
- `/app/components/widget/BlogTag.vue`：标签卡片展示，自动匹配当前站点所有文章的所属标签，并通过该标签中的文章数量进行计数
- `/app/components/widget/BlogArchive.vue`：分类卡片展示，自动匹配当前站点所有文章的所属分类，并通过该分类中的文章数量进行计数（出现重大bug，因不在推荐使用）
- `/app/components/widget/BlogStats.vue`：服务卡片的魔改文件，通过增加上方的博主信息来完成魔改
- `/app/components/widget/BlogSiteInfo.vue`：站点详情卡片展示，通过调用`sitelink.ts`完成数据展示。
- `/app/sitelink.ts`：站点详情卡片展示，通过调用`sitelink.ts`完成数据展示。
- `/app/components/widget/BlogAccount.vue`：博主信息卡片，是博主信息实践的初代版本，后因占用过大而被撤下。

## 教程开始

### 主渲染组件模块
::tab{:tabs='["标签详情", "分类详情（请勿使用）", "服务卡片", "站点详情", "博主信息"]'}
#tab1
``` vue [BlogTag.vue] lang="vue"
<script setup lang="ts">
const { data: stats } = useFetch('/api/stats')
</script>
<template>
<ZWidget card title="分类展示">
  <div class="category_cloud">
    <ZRawLink v-for="item in stats?.tags" :to="'/?tag=' + item.name" class="category">
      {{ item.name }}
      <sup>{{ item.posts }}</sup>
    </ZRawLink>
  </div>
</ZWidget>
</template>

<style lang="scss" scoped>
  .category_cloud {
    display: flex;
    flex-wrap: wrap;
    // overflow-y: scroll;
    gap: 4px;

    .category {
      color: var(--heo-fontcolor) !important;
      padding: 2px 8px;
      border-radius: 8px;
      background: var(--heo-card-bg);
      border: var(--style-border);
      font-size: 14px !important;
      font-weight: 700;

      sup {
        opacity: .6;
        top: -.5em;
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
      }
    }
  }
  
</style>
```

#tab2
``` vue [BlogArchive.vue] lang="vue"
<script setup lang="ts">
const { data: stats } = useFetch('/api/stats')
</script>
<template>
<ZWidget card title="分类展示">
  <div class="category_cloud">
    <div v-for="item in stats?.categories">
      {{ item.name }}
      <sup>{{ item.posts }}</sup>
    </div>
  </div>
</ZWidget>
</template>

<style lang="scss" scoped>
  .category_cloud {
    display: flex;
    flex-wrap: wrap;
    // overflow-y: scroll;
    gap: 4px;

    div {
      color: var(--heo-fontcolor) !important;
      padding: 2px 8px;
      border-radius: 8px;
      background: var(--heo-card-bg);
      border: var(--style-border);
      font-size: 14px !important;
      font-weight: 700;

      sup {
        opacity: .6;
        top: -.5em;
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
      }
    }
  }
  
</style>
```

#tab3
``` vue [BlogStats.vue] lang="vue"
<script setup lang="ts">
import { NuxtTime } from '#components'

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
dayjs.extend(relativeTime)

const appConfig = useAppConfig()
const runtimeConfig = useRuntimeConfig()

const { data: stats } = useFetch('/api/stats')

const yearlyTip = computed(() => {
	if (!stats.value)
		return ''
	return Object.entries(stats.value.annual).reverse().map(([year, item]) =>
		`${year}年：${item.posts}篇，${formatNumber(item.words)}字`,
	).join('\n')
})

const blogStats = [{
	label: '运营时长',
	value: timeElapse(appConfig.timeEstablished),
	tip: `博客于${appConfig.timeEstablished}上线`,
}, {
	label: '上次更新',
	value: () => h(NuxtTime, { datetime: runtimeConfig.public.buildTime, relative: true }),
	tip: computed(() => `构建于${getLocaleDatetime(runtimeConfig.public.buildTime)}`),
}, {
	label: '总字数',
	value: computed(() => stats.value ? formatNumber(stats.value.total.words) : ''),
	tip: yearlyTip,
}]
</script>

<template>
<ZWidget card title="博客统计">
  <!-- 添加的位置 开始 -->
  <div class="avatar">
    <div class="avatar-img">
      <img :src="appConfig.favicon">
    </div>
		<div class="author-info">
			<div class="author-info__name">
				{{ appConfig.title }}
			</div>
			<div class="author-info__description">
				{{ appConfig.subtitle }}
			</div>
			<div class="status"> 
				在{{ dayjs(runtimeConfig.public.buildTime).locale('zh-cn').fromNow().replaceAll(/\s+/g,'') }}
			</div>
		</div>
  </div>
  <!-- 添加的位置 结束 -->
  <ZDlGroup :items="blogStats" size="small" />
</ZWidget>
</template>
<style lang="scss">
$status_backgroud: var(--status_backgroud);

.avatar {
	display: flex;
	gap: 10px;
	margin-bottom: 5px;

	.avatar-img {
		width: 70px;
    	height: 70px;

		img {
			width: 100%;
			height: 100%;
			-o-object-fit: cover;
			object-fit: cover;
			border-radius: 10px;
			transition: filter 375ms ease-in 0.2s, transform 0.3s;
		}
	}
	.author-info {
		.author-info__name {
			font-size: 1.1em;
			color: var(--c-text);
			font-weight: 550;
		}
		.status {
			background: $status_backgroud;
			--status_backgroud: rgba(60, 120, 60, .7);
			text-align: center;
			border-radius: 0.4rem;
			margin-top: 7.7px;
		}
	}
}
</style>
```

#tab4
``` vue [BlogSiteInfo.vue] lang="vue"
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { siteLinkItems, siteLinkWidgetInfo } from '../../sitelink'
const activeTab = ref(0); // 默认激活第一个标签页
</script>

<template>
  <ZWidget card v-for="WidgetInfo in siteLinkWidgetInfo" :key="WidgetInfo.title" :title="WidgetInfo.title">
    <div class="BlogSiteGroup">
      <div class="tabs-container">
        <div class="tabs">
          <button v-for="(tab, index) in siteLinkItems" :key="tab.name" @click="activeTab = index" :class="{ 'active': activeTab === index }">
            {{ tab.name }}
          </button>
        </div>
        <div class="sitelink-list">
          <div class="sitelink-item" v-for="(site, index) in siteLinkItems[activeTab].Item" :key="index">
            <!-- <img width="80" height="80" :alt="site.name" class="cover" :src="site.image"> -->
            <main>
              <header class="header">
                <div class="title">
                  {{ site.name }}
                </div>
                <div class="desc">
                  {{ site.desc }}
                </div>
              </header>
              <section>
                <div class="badges" v-for="service in site.service" :key="service.name">
                  <Badge :img="service.image" :link="service.link" :name="service.name" style="margin-bottom: -3rem;">
                    {{ service.name }}
                  </Badge>
                </div>
              </section>
              <!-- <footer>
                <h5 class="rss">
                  <span class="iconify i-ph:rss-fill" aria-hidden="true"></span>
                  <a :href="site.link" rel="noopener noreferrer" target="_blank">
                    {{ site.link }}
                  </a>
                </h5>
              </footer> -->
            </main>
          </div>
        </div>
      </div>
    </div>
  </ZWidget>
</template>

<style lang="scss" scoped>
.float-in-leave-active {
	position: revert;
}

.center {
	width: fit-content;
	max-width: 100%;
	margin-inline: auto;
}

.tabs {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 0.5em;
	position: relative;
	width: fit-content;
	margin: 0 auto;
	font-size: 0.9em;
	line-height: 1.4;
}

button {
	position: relative;
	margin-bottom: 0.5em;
	padding: 0.3em 0.5em;
	border-radius: 0.4em;
	color: var(--c-text-2);
	transition: all 0.2s;

	&:hover {
		background-color: var(--c-bg-soft);
		color: var(--c-text);
	}

	&::before, &::after {
		display: block;
		position: absolute;
		bottom: -0.5em;
		inset-inline: 0.8em;
		height: 2px;
		border-radius: 1em;
		pointer-events: none;
	}

	&::after {
		content: "";
		inset-inline: -0.8em;
		background-color: var(--c-border);
	}

	&.active {
		box-shadow: 0 1px 0.5em var(--ld-shadow);
		background-color: var(--ld-bg-card);
		color: var(--c-text);

		&::before {
			content: "";
			background-color: var(--c-primary);
			z-index: 1;
		}
	}
}

.tab-content {
	padding: 0.5em 0;
}

.sitelink-list {
  gap: 1rem;
  display: grid;
  margin-top: 0.5rem;
  .sitelink-item {
    display: flex;
    gap: 1rem;

    main{
      align-items: center;
      display: grid;

      .header {
        display: flex;
        gap: 5px;
        justify-content: space-between;
        align-items: center;

        .title {
          font-weight: 700;
        }
        .desc {
          font-weight: 500;
          font-size: 10px;
        }
      }
      section {
        display: flex;
        margin-top: 5px;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
```

#tab5
``` vue [BlogAccount.vue] lang="vue"
<script setup lang="ts">
const appConfig = useAppConfig()
const runtimeConfig = useRuntimeConfig()
import { NuxtTime } from '#components'

// 归档ts代码
const { data: stats } = useFetch('/api/stats')
const yearlyTip = computed(() => {
	if (!stats.value)
		return ''
	return Object.entries(stats.value.annual).reverse().map(([year, item]) =>
		`${year}年：${item.posts}篇，${formatNumber(item.words)}字`,
	).join('\n')
})

const blogStats = [{
  label: '文章数',
  value: computed(() => stats.value ? formatNumber(stats.value.total.posts) : ''),
  tip: yearlyTip,
}, {
  label: '总分类',
  value: computed(() => stats.value ? formatNumber(stats.value.totalCategories) : ''),
}, {
  label: '总标签',
  value: computed(() => stats.value ? formatNumber(stats.value.totalTags) : ''),
}]

const blogAccountInfo = [{
  herf: 'https://my.myxz.top/',
  title: '个人主页'
}]

const iconNav= [
  { icon: 'ph:github-logo-bold', text: 'GitHub: L33Z22L11', url: 'https://github.com/L33Z22L11' },
  { icon: 'ph:rss-simple-bold', text: 'Atom订阅', url: '/atom.xml' },
  { icon: 'ph:subway-bold', text: '开往', url: 'https://www.travellings.cn/go-by-clouds.html' },
]
</script>

<template>
  <ZWidget card title="作者信息">
    <div class="cardInfo">
      <div class="is-center">
        <div class="avatar-img">
          <img :src="appConfig.favicon">
        </div>
        <div class="author-info__name">
          {{ appConfig.title }}
        </div>
        <div class="author-info__description">
          {{ appConfig.subtitle }}
        </div>
      </div>
      <div class="card-info-data site-data is-center">
        <ZDlGroup :items="blogStats" size="small" />
      </div>
      <a class="cardInfoButton" v-for="accountInfo in blogAccountInfo" target="_blank" :href="accountInfo.herf" :key="accountInfo.title">
        {{ accountInfo.title }}
      </a>
      <div class="cardInfoSocialIcons is-center">
        <ZIconNavList :list="iconNav" />
      </div>
    </div>
  </ZWidget>
</template>

<style lang="scss" scoped>
.cardInfo {
  .is-center {
    text-align: center;
    .avatar-img {
      width: 110px;
      height: 110px;
      overflow: hidden;
      margin: 0px auto;
      border-radius: 70px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: filter 375ms ease-in 0.2s, transform 0.3s;
      }
    }
    .author-info__name{
      margin-top: 14px;
      font-size: 1.5em;
    }
    .author-info__description {
      font-size: 15px;
    }
  }
  .card-info-data.site-data.is-center {
    margin-top: 14px;
  }
  .cardInfoButton {
    display: block;
    margin-top: 14px;
    background-color: var(--c-bg-soft);
    color: var(--c-text);
    text-align: center;
    line-height: 2.4;
    border-radius: 0.5em;
  }
  .cardInfoSocialIcons {
    margin-top: 14px;
  }
}
</style>
```

::

### 渲染模块数据模块
::tab{:tabs='["站点详情"]'}
#tab1 
``` ts [sitelink.ts] lang="ts"
export interface siteInfo {
    title: string
}

export interface siteTabs {
    name: string
    itemnumber: string
    Item: Item[]
}

export interface Item {
    name: string
    image: string
    link: string
    desc: string
    service: service[]
}

export interface service {
    name: string
    image: string
    link: string
}

export const siteLinkWidgetInfo: siteInfo[] = [
    {
        title: '站点线路',
    }
]

export const siteLinkItems: siteTabs[] = [
    {
        name: '镜像站点',
        itemnumber: '3',
        Item: [
            {
                name: '博客镜像',
                image: 'https://sourceimage.s3.bitiful.net/myxz.avif',
                link: 'https://blog-v3.edgeone.mirrors.myxz.top',
                desc: "可以通过不同线路去访问",
                service: [
                    { 
                        name: 'EdgeOne', 
                        image: '/assets/img/link/service/edgeone.jpg', 
                        link: "https://blog-v3.edgeone.mirrors.myxz.top"
                    },
                    {
                        name: "Vercel",
                        image: "/assets/img/link/service/vercel.jpg",
                        link: "https://blog-v3.vercel.mirrors.myxz.top"
                    },
                    {
                        name: "Netlify",
                        image: "/assets/img/link/service/netlify.jpg",
                        link: "https://blog-v3.netifly.mirrors.myxz.top"
                    }
                ],
            },
        ]
    },
    {
        name: '服务',
        itemnumber: '1',
        Item: [
            {
                name: '说说',
                image: 'https://sourceimage.s3.bitiful.net/myxz.avif',
                link: 'https://blog-v3.myxz.top',
                desc: "",
                service: [
                    { 
                        name: 'EdgeOne', 
                        image: '/assets/img/link/service/edgeone.jpg', 
                        link: "" 
                    }
                ],
            }
        ]
    },
]
```
::