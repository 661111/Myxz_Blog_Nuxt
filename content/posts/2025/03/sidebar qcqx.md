---
title: 卡片美化
description: 这篇文章讲述了如何美化博客侧边栏，并调整各个卡片内容的样式表。
date: 2025-03-05 08:00:00
updated: 2025-03-06 18:00:00
image: https://source.yjluo.top/PostCover/cardMeihua.avif
categories: [博客魔改]
tags: [hexo, butterfly]
---
## 前言

因为这部分内容轻笑并没有有关于这个内容，所以我在这里写好了，方便以后查找，喜欢这个风格的可以进行CTRL+C和CTRL+V

## 侧边栏美化以及侧边栏卡片美化

大部分已经有进行标识，对于以后可以进行维护

```css
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

## 首页文章卡片美化

在[BlogRoot]\source\css下新建自定义css并粘贴：

```css
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

以下代码为高级代码，需要完成隐藏文字后方可使用。

```css
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