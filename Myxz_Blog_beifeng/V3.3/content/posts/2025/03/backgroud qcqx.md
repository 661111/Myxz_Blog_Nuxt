---
title: 轻笑风格背景
description: 这篇文章讲述如何在页面中添加模块以及使用CSS添加颜色以及背景图片。
date: 2025-03-05 8:00
updated: 2025-03-06 18:00
image: https://sourceimage.s3.bitiful.net/img/default_cover_21.avif
categories: [博客魔改]
tags: [hexo, butterfly]
---
一.前言

因为这部分内容轻笑并没有有关于这个内容，所以我在这里写好了，方便以后查找

二.教程开始

1.在 [BlogRoot]\themes\butterfly\layout\includes\head.pug 中引入 div模块

```pug
#web_bg
#svg_bg
```

2.在自定义css里面引入以下样式

```css
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