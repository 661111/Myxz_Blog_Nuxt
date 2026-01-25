---
title: 博客魔改教程总结(一)
description: 从零开始魔改butterfly
date: '2025-03-05 8:00'
updated: '2025-03-06 18:00'
image: 'https://sourceimage.s3.bitiful.net/img/default_cover_21.avif'
category:
  - hexo
top_img: false
tags:
  - hexo
  - butterfly
---
## 仿轻笑博客背景美化

**原作者**
{% link 轻笑Chuckle,漫天倾尘 风中轻笑,https://qcqx.cn/ %}
{% folding cyan, 请查看教程内容 %}
一.前言
因为这部分内容轻笑并没有有关于这个内容，所以我在这里写好了，方便以后查找

二.教程开始
1. 在 [BlogRoot]\themes\butterfly\layout\includes\head.pug 中引入 div模块
``` pug
#web_bg
#svg_bg
```

2. 在自定义css里面引入以下样式
``` css
#web_bg {
    position: fixed;
    z-index: -999;
    width: 100%;
    height: 100%;
    background: -webkit-linear-gradient(35deg, #0095c2 21%, #64e1C8f9 100%);
    background: -moz-linear-gradient(35deg, #0095c2 21%, #64e1C8f9 100%);
    background: -o-linear-gradient(35deg, #0095c2 21%, #64e1C8f9 100%);
    background: -ms-linear-gradient(35deg, #0095c2 21%, #64e1C8f9 100%);
    background: linear-gradient(55deg, #0095c2 21%, #64e1C8f9 100%);
    background-attachment: local;
    background-position: center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
}
#svg_bg {
    background-image: url(https://www.myxz.top/img/background.svg);
    -webkit-background-size: initial;
    -moz-background-size: initial;
    background-size: initial;
    position: fixed;
    height: 100%;
    width: 100%;
    opacity: .2;
    background-position: center;
    z-index: -998;
}
```
{% endfolding %}

## 侧边栏美化以及侧边栏卡片美化（轻笑）
**原作者**
{% link 轻笑Chuckle,漫天倾尘 风中轻笑,https://qcqx.cn/ %}

{% folding cyan, 请查看教程内容 %}

1. 前言
因为这部分内容轻笑并没有有关于这个内容，所以我在这里写好了，方便以后查找，喜欢这个风格的可以进行CTRL+C和CTRL+V

2. 教程开始
大部分已经有进行标识，对于以后可以进行维护
``` CSS
/* 侧边栏整体卡片样式调整 */
#aside-content .card-widget {
    border-width: 2px;
    border-style: solid;
    border-color: rgba(0, 255, 255, 0.6);
    border-image: initial;
    transition: 0.3s;
    background: rgba(255, 255, 255, .67);
}
/* 侧边栏整体卡片文字样式调整 */
#aside-content .card-widget.card-friend-link, .card-webinfo {
    font-size: 105%;
}
/* 侧边栏整体卡片和首页文章列表样式调整 */
#aside-content .card-widget, #recent-posts>.recent-post-item {
    border-radius: 18px;
}
/* 侧边栏本人介绍卡片样式调整 */
.avatar-img {
    border-radius: 25px!important;
    box-shadow: 2.2px 2.2px 2.2px rgba(10, 207, 233, .3)!important;
}
#aside-content > .card-widget:first-child {
    clip-path: polygon(0px 0px, 100% 0px, 100% 50%, 100% 100%, 80% 100%, 75% 99%, 25% 99%, 20% 100%, 0px 100%);
}
#aside-content .card-info .author-info__name {
    font-weight: 800!important;
    font-size: 1.8em!important;
}
#aside-content .card-info .author-info__description {
    margin-top: -.2em!important;
    font-size: 16.5px!important;
    font-weight: 700;
}
.card-info-data-item:not(:last-child)::after {
    opacity: .3;
    position: absolute;
    top: 11px;
    right: 0;
    content: "";
    width: 1px;
    height: 35px;
    background: var(--font-color);
}
.site-data > a .headline {
    color: var(--font-color);
    font-size: 1em!important;
}
.site-data > a .length-num {
    margin-top: -.42em!important;
    color: var(--text-highlight-color);
    font-size: 1.4em!important;
}
/* 侧边栏其他卡片样式调整 */
#aside-content .card-widget:not(.card-info):not(#card-tuijian):before {
    content: "";
    width: 12.5px;
    background: linear-gradient(to top, transparent, #ee6363bb);
    display: block;
    position: absolute;
    left: 0;
    height: 113px;
    bottom: 27px;
}
#aside-content .card-widget:not(.card-info):not(#card-tuijian) {
    clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 calc(100% - 52.5px), 12.5px calc(100% - 40px), 12.5px calc(100% - 50px), 0 calc(100% - 62.5px), 0 calc(100% - 82.5px), 12.5px calc(100% - 70px), 12.5px calc(100% - 80px), 0 calc(100% - 92.5px), 0 calc(100% - 112.5px), 12.5px calc(100% - 100px), 12.5px calc(100% - 112.5px), 12.5px calc(100% - 110px), 0 calc(100% - 122.5px), 0 calc(100% - 142.5px), 12.5px calc(100% - 130px), 12.5px calc(100% - 141.5px), 0 calc(100% - 154px), 0 0);
    border-left: none !important;
}
```
{% endfolding %}

## 首页文章卡片美化（轻笑）
**原作者**
{% link 轻笑Chuckle,漫天倾尘 风中轻笑,https://qcqx.cn/ %}
{% folding cyan, 请查看教程内容 %}

1. 前言
因为这部分内容轻笑并没有有关于这个内容，所以我在这里写好了，方便以后查找，喜欢这个风格的可以进行CTRL+C和CTRL+V

2. 在[BlogRoot]\source\css下新建自定义css并粘贴：
``` CSS
/* 首页文章卡片样式表调整 */
#recent-posts > .recent-post-item >.recent-post-info > .article-title {
    text-align: center;
}
#recent-posts > .recent-post-item >.recent-post-info > .article-meta-wrap {
    text-align: center;
}
#recent-posts > .recent-post-item >.recent-post-info > .content {
    text-align: center;
}
/* QCQX 首页文章卡片设置 */
#recent-posts>.recent-post-item {
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: box;
    display: flex;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -o-box-orient: horizontal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -moz-box-align: center;
    -o-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    overflow: hidden;
    height: 200px
}
@media screen and (max-width: 768px) {
    #recent-posts>.recent-post-item {
        -webkit-box-orient:vertical;
        -moz-box-orient: vertical;
        -o-box-orient: vertical;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        height: 300px
    }
}
/* QCQX 首页文章卡片设置 */
#recent-posts > .recent-post-item .post_cover img.post_bg {
    border-radius: 12px;
    transform: none;
}
```
{% endfolding %}

## 首页文章隐藏文字
**效果来源**
{% link 轻笑Chuckle,漫天倾尘 风中轻笑,https://qcqx.cn/ %}

{% folding cyan, 请查看教程内容 %}

这种隐藏文字的方式可以给大家展示出来，整个效果是非常可观的。
``` CSS
#recent-posts>.recent-post-item:hover .recent-post-info .content {
    opacity: 1;
    line-height: 1.5;
    transition: all .3s
}

#recent-posts>.recent-post-item:hover .recent-post-info {
    top: 0;
    transition: all .3s
}

#recent-posts>.recent-post-item>.recent-post-info>.content {
    opacity: 0;
    line-height: .7;
    transition: all .3s;
    bottom: 0
}
```
{% endfolding %}

## 首页文章卡片美化
**效果来源**
{% link 轻笑Chuckle,漫天倾尘 风中轻笑,https://qcqx.cn/ %}

{% folding cyan, 请查看教程内容 %}
既然已经添加了文章文字隐藏，那么就可以进行美化文章卡片
``` CSS
/* 首页文章卡片颜色 */
#recent-posts>.recent-post-item {
    border: 2px solid rgba(0, 255, 255, .6);
    font-size: 14.5px;
    font-weight: 700;
    background: rgba(255, 255, 255, .67);
}
/* 首页文章卡片的图片样式 */
#recent-posts>.recent-post-item .post_cover img.post_bg:hover {
    transform: none
}
/* 首页文章卡片样式表调整 */
#recent-posts > .recent-post-item >.recent-post-info > .article-title {
    text-align: center;
}
#recent-posts > .recent-post-item >.recent-post-info > .article-meta-wrap {
    text-align: center;
}
#recent-posts > .recent-post-item >.recent-post-info > .content {
    text-align: center;
}
/* QCQX 首页文章卡片设置 */
#recent-posts>.recent-post-item {
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: box;
    display: flex;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -o-box-orient: horizontal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -moz-box-align: center;
    -o-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    overflow: hidden;
    height: 200px
}
@media screen and (max-width: 768px) {
    #recent-posts>.recent-post-item {
        -webkit-box-orient:vertical;
        -moz-box-orient: vertical;
        -o-box-orient: vertical;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        height: 300px
    }
}
/* QCQX 首页文章卡片设置 */
#recent-posts > .recent-post-item .post_cover img.post_bg {
    border-radius: 12px;
    transform: none;
}
/* 首页文章卡片bar */
#recent-posts>.recent-post-item>.recent-post-info {
    padding: 0 40px;
    width: 57%
}

@media screen and (max-width: 768px) {
    #recent-posts>.recent-post-item>.recent-post-info {
        padding:2px 10px;
        width: 100%
    }
}
.recent-posts .recent-post-item .post-card-bar {
    width: 5px;
    height: 60px;
    margin: auto;
    position: absolute;
    border-radius: 30px
}
.recent-posts .recent-post-item .left+.recent-post-info+.post-card-bar {
    background: #00c4b6b6;
    right: 5px
}
.recent-posts .recent-post-item .right+.recent-post-info+.post-card-bar {
    background: #1dbfffb6;
    left: 5px
}
@media screen and (min-width: 768px) {
    #recent-posts>.recent-post-item .post_cover.left {
        padding:7px 0 7px 7px;
    }

    #recent-posts>.recent-post-item .post_cover.right {
        padding: 7px 7px 7px 0
    }
}

@media screen and (max-width: 768px) {
    .recent-posts .recent-post-item .post-card-bar {
        display:none
    }

    .ai-btn-box {
        justify-content: center
    }

    .ai-recommend .ai-recommend-item {
        width: 100%
    }

    #recent-posts>.recent-post-item .post_cover.left,#recent-posts>.recent-post-item .post_cover.right {
        transition: all .3s;
        padding: 5px 5px 0 5px;
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -ms-transition: all .3s;
        -o-transition: all .3s
    }

    #recent-posts>.recent-post-item:hover .post_cover.left,#recent-posts>.recent-post-item:hover .post_cover.right {
        padding: 0
    }

    #recent-posts>.recent-post-item .post_cover img.post_bg {
        transition: all .3s;
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -ms-transition: all .3s;
        -o-transition: all .3s
    }

    #recent-posts>.recent-post-item:hover .post_cover img.post_bg {
        border-radius: 12px 12px 5px 5px;
        -webkit-border-radius: 12px 12px 5px 5px;
        -moz-border-radius: 12px 12px 5px 5px;
        -ms-border-radius: 12px 12px 5px 5px;
        -o-border-radius: 12px 12px 5px 5px
    }
}
```
{% endfolding %}

## 首页分类条美化
**效果来源**
{% link 轻笑Chuckle,漫天倾尘 风中轻笑,https://qcqx.cn/ %}
{% link 魔改笔记七：分类条及外链卡片,清羽飞扬,https://blog.liushen.fun/posts/a64defb4/ %}

{% folding cyan, 请查看教程内容 %}
教程基于清羽飞扬的教程和轻笑的样式进行魔改，感兴趣的可以去看。
1. 在[BlogRoot]\themes\butterfly\layout\includes中新建categoryBar.pug
``` PUG
.home-catalog-bar#catalog-bar
  i.fa-fw.fas.fa-shapes
  #catalog-list(class=is_home() ? 'home' : '')
    .category-bar-item.catalog-shouye-item(class=is_home() ? 'select' : '', id="home-catalog-item")
      a(href=url_for('/'))= __('博客')
    each item in site.categories.find({ parent: { $exists: false } }).data
      .category-bar-item(class=select ? (select === item.name ? 'select' : '') : '', id=item.name)
        a(href=url_for(item.path))= item.name
  a.category-bar-more(href=url_for('/categories/'))= __('更多分类')
```
2. 然后将其添加到不同的位置，比如我这里实现了添加到分类页面等位置，配合上pjax可以做到无刷更新，效果很好，打开分类文件地址：[BlogRoot]\themes\butterfly\layout\category.pug和主页文件地址：[BlogRoot]\themes\butterfly\layout\index.pug，添加其中两行代码，去掉加号即为正常缩进。这个和原教程基本一样
{% tabs 分栏 %}

<!-- tab 分类文件 -->

{% note warning flat %}
注意：修改后需要将配置文件中，分类页面的主题改成index，否则不会显示。
{% endnote %}

``` PUG
extends includes/layout.pug

block content
  if theme.category_ui == 'index'
    include ./includes/mixins/post-ui.pug
    #recent-posts.recent-posts.category_ui
+      #category-bar.category-bar
+        include includes/categoryBar.pug
      +postUI
      include includes/pagination.pug
  else
    include ./includes/mixins/article-sort.pug
    #category
      <div id="categories-chart" data-parent="true" style="height: 300px; padding: 10px;"></div>
      .article-sort-title= _p('page.category') + ' - ' + page.category
      +articleSort(page.posts)
      include includes/pagination.pug
```
<!-- endtab -->

<!-- tab 主页文件 -->
``` PUG
extends includes/layout.pug

block content
  include ./includes/mixins/post-ui.pug
  #recent-posts.recent-posts
+    #category-bar.category-bar
+      include includes/categoryBar.pug
    +postUI
    include includes/pagination.pug
```
<!-- endtab -->
{% endtabs %}
3. 在[BlogRoot]\source\css\custom.css自定义样式的文件中引入如下代码（这是我的，你可以自行微调）：
```CSS
/* 首页分类条 */
.layout #recent-posts .home-catalog-bar {
    background: var(--mj-card-bg);
    border: var(--mj-style-border);
    margin-top: 12px;
    border-radius: 11px !important;
    transition: .3s;
    font-size: 15px;
    padding: 5px .8rem;
    animation: slide-in .5s .2s backwards;
    will-change: transform;
    -webkit-animation: slide-in .5s .2s backwards;
}

#catalog-bar {
    padding: .4rem .8rem;
    border-radius: .5rem;
    display: flex;
    border: 1px solid rgba(150, 150, 150, .2);
    justify-content: space-between;
}

#catalog-bar i {
    line-height: inherit;
}

#catalog-list {
    margin: 0 .5rem;
    display: flex;
}

.layout #recent-posts #catalog-bar #home-catalog-item {
    border-radius: .5rem;
}

.layout #recent-posts #catalog-bar .catalog-shouye-item {
    margin-right: 10px;
}

.layout #recent-posts #catalog-bar #home-catalog-item a {
    background: #00c4b6f1;
    color: #fff !important;
    margin: 0 .2em;
    padding: .2em .4em .3em;
    font-weight: 700;
    border-radius: .5rem;
    color: var(--font-color);
    -webkit-transition: all .15s ease-in-out;
    -moz-transition: all .15s ease-in-out;
    -o-transition: all .15s ease-in-out;
    -ms-transition: all .15s ease-in-out;
    transition: all .15s ease-in-out;
}

.catalog-list-item a {
    margin: 0 .2em;
    padding: .2em .4em .3em;
    font-weight: 700;
    border-radius: .5rem;
    color: var(--font-color);
    -webkit-transition: all .15s ease-in-out;
    -moz-transition: all .15s ease-in-out;
    -o-transition: all .15s ease-in-out;
    -ms-transition: all .15s ease-in-out;
    transition: all .15s ease-in-out;
}

.catalog-list-item a {
    margin: 0 .2em;
    padding: .2em .4em .3em;
    font-weight: 700;
    border-radius: .5rem;
    color: var(--font-color);
    -webkit-transition: all .15s ease-in-out;
    -moz-transition: all .15s ease-in-out;
    -o-transition: all .15s ease-in-out;
    -ms-transition: all .15s ease-in-out;
    transition: all .15s ease-in-out;
}
```
{% note warning flat %}
注意：要想实现点击切换后，高亮部分跟随分类页面走的部分，需要修改源码，打开[BlogRoot]\themes\butterfly\source\js\main.js，添加js函数，比如我添加到了778行左右，switchComments函数的上面：
``` JS
/**
   * 切换类别表
   */ 
  const setCategoryBarActive = () => {
    const categoryBar = document.querySelector("#category-bar");
    const currentPath = decodeURIComponent(window.location.pathname);
    const isHomePage = currentPath === GLOBAL_CONFIG.root;

    if (categoryBar) {
        const categoryItems = categoryBar.querySelectorAll(".category-bar-item");
        categoryItems.forEach(item => item.classList.remove("select"));

        const activeItemId = isHomePage ? "category-bar-home" : currentPath.split("/").slice(-2, -1)[0];
        const activeItem = document.getElementById(activeItemId);

        if (activeItem) {
            activeItem.classList.add("select");
        }
    }
};
```
4. 然后再在引用部分执行这个函数，在同一个文件，找到下面的函数并添加函数的调用，位置看下方注释:
``` JS
window.refreshFn = function () {
  initAdjust()

  if (GLOBAL_CONFIG_SITE.isPost) {
    GLOBAL_CONFIG.noticeOutdate !== undefined && addPostOutdateNotice()
    GLOBAL_CONFIG.relativeDate.post && relativeDate(document.querySelectorAll('#post-meta time'))
  } else {
    GLOBAL_CONFIG.relativeDate.homepage && relativeDate(document.querySelectorAll('#recent-posts time'))
    GLOBAL_CONFIG.runtime && addRuntime()
    addLastPushDate()
    toggleCardCategory()
    setCategoryBarActive()      // 切换类别栏目
  }

```