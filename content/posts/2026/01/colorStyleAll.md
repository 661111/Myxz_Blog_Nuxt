---
title: 自定义全局颜色
description: 自定义全局的样式颜色，具有对特定CSS中所具有的自定义样式颜色来进行整合，并且作者还顺便水了一篇文章
date: 2026-01-27 10:00:00
updated: 2026-01-27 20:49:00
image: /image/PostCover/colorStyleAll.avif
categories: [美化]
tags: [全局颜色,自定义]
recommend: true
---
## 前言
最近打算写一篇整合全部目前站点上的各类全局颜色的样式，并水篇文章。

## 张洪HEO
``` css [heo.css] lang="css"
/* 张洪HEO颜色样式 */
:root{
    --heo-white: #fff;
    --heo-black: #000;
    --heo-none: rgba(0,0,0,0);
    --heo-gray: #999999;
    --heo-yellow: #ffc93e;
    --heo-main: var(--heo-theme);
    --heo-main-op: var(--heo-theme-op);
    --heo-shadow-theme: 0 8px 12px -3px var(--heo-theme-op);
    --heo-shadow-main: 0 8px 12px -3px var(--heo-main-op);
    --heo-shadow-blue: 0 8px 12px -3px rgba(40, 109, 234,.20);
    --heo-shadow-white: 0 8px 12px -3px rgba(255, 255, 255,.20);
    --heo-shadow-black: 0 0 12px 4px rgba(0, 0, 0,.05);
    --heo-shadow-yellow: 0px 38px 77px -26px rgba(255, 201, 62,.12);
    --heo-shadow-red: 0 8px 12px -3px #ee7d7936;
    --heo-shadow-green: 0 8px 12px -3px #87ee7936;
    --heo-logo-color: linear-gradient(215deg,#4584ff 30%,#ff7676 70%);
    --style-border: 1px solid var(--heo-card-border);
    --style-border-hover: 1px solid var(--heo-theme);
  }

  
.root,.light {
    --heo-theme: #425AEF;
    --heo-theme-op: #4259ef23;
    --heo-blue: #425AEF;
    --heo-red: #D8213C;
    --heo-pink: #FF7C7C;
    --heo-green: #57bd6a;
    --heo-fontcolor: #363636;
    --heo-background: #f7f9fe;
    --heo-reverse: #000;
    --heo-maskbg: rgba(255, 255, 255, 0.6);
    --heo-maskbgdeep: rgba(255, 255, 255, 0.85);
    --heo-hovertext: var(--heo-theme);
    --heo-ahoverbg: #F7F7FA;
    --heo-lighttext: var(--heo-main);
    --heo-secondtext: rgba(60, 60, 67, 0.6);
    --heo-scrollbar: rgba(60, 60, 67, 0.4);
    --heo-card-btn-bg: #edf0f7;
    --heo-post-blockquote-bg: #fafcff;
    --heo-post-tabs-bg: #f2f5f8;
    --heo-secondbg: #edf0f7;
    --heo-shadow-nav:0 5px 12px -5px rgba(102, 68, 68, 0.05);
    --heo-card-bg: #fff;
    --heo-shadow-lightblack:0 5px 12px -5px rgba(102, 68, 68, 0.00);
    --heo-shadow-light2black:0 5px 12px -5px rgba(102, 68, 68, 0.00);
    --heo-card-border: #e3e8f7;
}
  
.dark {
    --heo-theme: #0084FF;
    --heo-theme-op: #0084FF23;
    --heo-blue: #0084FF;
    --heo-red: #FF3842;
    --heo-pink: #FF7C7C;
    --heo-green: #57bd6a;
    --heo-fontcolor: #F7F7FA;
    --heo-background: #18171d;
    --heo-reverse: #fff;
    --heo-maskbg: rgba(0,0,0, 0.6);
    --heo-maskbgdeep: rgba(0,0,0, 0.85);
    --heo-hovertext: #0A84FF;
    --heo-ahoverbg: #fff;
    --heo-lighttext: #f2b94b;
    --heo-secondtext: #a1a2b8;
    --heo-scrollbar: rgba(200, 200, 223, 0.4);
    --heo-card-btn-bg: #30343f;
    --heo-post-blockquote-bg: #000;
    --heo-post-tabs-bg: #121212;
    --heo-secondbg: #30343f;
    --heo-shadow-nav:0 5px 20px 0px rgba(28, 28, 28, 0.4);
    --heo-card-bg: #1d1b26;
    --heo-shadow-lightblack:0 5px 12px -5px rgba(102, 68, 68, 0.0);
    --heo-shadow-light2black:0 5px 12px -5px rgba(102, 68, 68, 0.0);
    --heo-card-border: #42444a;
}

[data-theme=dark], body.dark, body.dark-theme,[eagle-extension-theme="dark"],body.dark-open,[color-scheme=dark],[data-scheme="inverse"] {
  --heo-theme: #f2b94b;
  --heo-theme-op: #f2b94b23;
  --heo-theme-op-deep: #f2b94bdd;
  --heo-theme-none: #f2b94b00;
  --heo-blue: #0084FF;
  --heo-red: #FF3842;
  --heo-pink: #d44040;
  --heo-green: #3e9f50;
  --heo-yellow: #ffc93e;
  --heo-yellow-op: #ffc93e30;
  --heo-orange: #ff953e;
  --heo-fontcolor: #F7F7FA;
  --heo-background: #18171d;
  --heo-reverse: #fff;
  --heo-maskbg: rgba(0, 0, 0, 0.6);
  --heo-maskbgdeep: rgba(0, 0, 0, 0.85);
  --heo-hovertext: #0A84FF;
  --heo-ahoverbg: #fff;
  --heo-lighttext: var(--heo-theme);
  --heo-secondtext: #a1a2b8;
  --heo-scrollbar: rgba(200, 200, 223, 0.4);
  --heo-card-btn-bg: #30343f;
  --heo-post-blockquote-bg: #000;
  --heo-post-tabs-bg: #121212;
  --heo-secondbg: #30343f;
  --heo-shadow-nav: 0 5px 20px 0px rgba(28, 28, 28, 0.4);
  --heo-card-bg: #1d1e22;
  --heo-card-bg-op: var(--heo-white-op);
  --heo-card-bg-none: #1d1b2600;
  --heo-shadow-lightblack: 0 5px 12px -5px rgba(102, 68, 68, 0.0);
  --heo-shadow-light2black: 0 5px 12px -5px rgba(102, 68, 68, 0.0);
  --heo-card-border: #3d3d3f;
  --heo-shadow-border: 0 8px 16px -4px #00000050;
  --style-border: 1px solid var(--heo-card-border);
  --style-border-always: 1px solid var(--heo-card-border);
  --style-border-hover: 1px solid var(--heo-theme);
  --style-border-hover-always: 1px solid var(--heo-theme);
  --style-border-dashed: 1px dashed var(--heo-theme-op);
  --style-border-forever: 2px solid var(--heo-lighttext);
}

@media screen and (max-width: 768px){
    :root{
        --style-border: 0px solid var(--heo-card-border);
        --style-border-hover: 0px solid var(--heo-theme);
    }
}
```

## icat
``` css [qiyuange.css] lang="css"
/* 颜色变量定义(icat) */
:root {
    --icat-white: #fff;
    --icat-white-op: rgba(255, 255, 255, 0.2);
    --icat-black: #000;
    --icat-black-op: rgba(0, 0, 0, 0.2);
    --icat-none: #00000000;
    --icat-gray: #999999;
    --icat-gray-op: #9999992b;
    --icat-vip: #e5a80d;
    --icat-main: var(--icat-theme);
    --icat-main-op: var(--icat-theme-op);
    --icat-main-op-deep: var(--icat-theme-op-deep);
    --icat-main-op-light: var(--icat-theme-op-light);
    --icat-main-none: var(--icat-theme-none);
    --icat-shadow-theme: 0 8px 12px -3px var(--icat-theme-op);
    --icat-shadow-blackdeep: 0 2px 16px -3px rgba(0, 0, 0, .15);
    --icat-shadow-main: 0 8px 12px -3px var(--icat-main-op);
    --icat-shadow-blue: 0 8px 12px -3px rgba(40, 109, 234, .20);
    --icat-shadow-white: 0 8px 12px -3px rgba(255, 255, 255, .20);
    --icat-shadow-black: 0 0 12px 4px rgba(0, 0, 0, .05);
    --icat-shadow-yellow: 0px 38px 77px -26px rgba(255, 201, 62, .12);
    --icat-shadow-red: 0 8px 12px -3px #ee7d7936;
    --icat-shadow-green: 0 8px 12px -3px #87ee7936;
    --icat-logo-color: linear-gradient(215deg, #4584ff 0%, #cf0db9 100%);
    --icat-snackbar-time: 5s;
    --icat-post-bg: var(--icat-blue);
    --style-border-hover-always: 1px solid var(--icat-blue)
}

.light, :root {
    --icat-theme: #425AEF;
    --icat-theme-op: #4259ef23;
    --icat-theme-op-deep: #4259efdd;
    --icat-theme-op-light: #4259ef0d;
    --icat-theme-none: #4259ef01;
    --icat-blue: #425AEF;
    --icat-blue-op: #425AEF4D;
    --icat-red: #f04a63;
    --icat-pink: #FF7C7C;
    --icat-green: #57bd6a;
    --icat-yellow: #c28b00;
    --icat-yellow-op: #d99c001a;
    --icat-orange: #e38100;
    --icat-shadow-orange: 0 8px 12px -3px rgba(227, 129, 0, .2);
    --icat-purple: #7a60d2;
    --icat-fontcolor: #363636;
    --icat-background: #f7f9fe;
    --icat-reverse: #000;
    --icat-maskbg: rgba(255, 255, 255, 0.6);
    --icat-maskbgdeep: rgba(255, 255, 255, 0.85);
    --icat-hovertext: var(--icat-main);
    --icat-ahoverbg: #F7F7FA;
    --icat-lighttext: var(--icat-main);
    --icat-secondtext: rgba(60, 60, 67, 0.8);
    --icat-scrollbar: rgba(60, 60, 67, 0.4);
    --icat-card-btn-bg: #edf0f7;
    --icat-post-blockquote-bg: #fafcff;
    --icat-post-tabs-bg: #f2f5f8;
    --icat-secondbg: #f7f7f9;
    --icat-shadow-nav: 0 5px 12px -5px rgba(102, 68, 68, 0.05);
    --icat-card-bg: #fff;
    --icat-card-bg-op: var(--icat-black-op);
    --icat-card-bg-none: rgba(255, 255, 255, 0);
    --icat-shadow-lightblack: 0 5px 12px -5px rgba(102, 68, 68, 0.00);
    --icat-shadow-light2black: 0 5px 12px -5px rgba(102, 68, 68, 0.00);
    --icat-card-border: #e3e8f7;
    --icat-shadow-border: 0 8px 16px -4px #2c2d300c;
    --icat-tabs-background: #49B1F5;
    --style-border: 1px solid var(--icat-card-border);
    --style-border-hover: 1px solid var(--icat-main);
    --style-border-dashed: 1px dashed var(--icat-theme-op);
    --style-border-forever: 2px solid var(--icat-main)
}

.dark {
    --icat-theme: #f2b94b;
    --icat-theme-op: #f2b94b23;
    --icat-theme-op-deep: #f2b94bdd;
    --icat-theme-none: #f2b94b00;
    --icat-blue: #0084FF;
    --icat-blue-op: #0084FF4D;
    --icat-red: #FF3842;
    --icat-pink: #d44040;
    --icat-green: #3e9f50;
    --icat-purple: #7a60d2;
    --icat-yellow: #ffc93e;
    --icat-yellow-op: #ffc93e30;
    --icat-orange: #ff953e;
    --icat-shadow-orange: 0 8px 12px -3px rgba(255, 149, 62, .2);
    --icat-fontcolor: #F7F7FA;
    --icat-background: #18171d;
    --icat-reverse: #fff;
    --icat-maskbg: rgba(0, 0, 0, 0.6);
    --icat-maskbgdeep: rgba(0, 0, 0, 0.85);
    --icat-hovertext: #0A84FF;
    --icat-ahoverbg: #fff;
    --icat-lighttext: var(--icat-theme);
    --icat-secondtext: #a1a2b8;
    --icat-scrollbar: rgba(200, 200, 223, 0.4);
    --icat-card-btn-bg: #30343f;
    --icat-post-blockquote-bg: #000;
    --icat-post-tabs-bg: #121212;
    --icat-secondbg: #21232a;
    --icat-shadow-nav: 0 5px 20px 0px rgba(28, 28, 28, 0.4);
    --icat-card-bg: #1b1c20;
    --icat-card-bg-op: var(--icat-white-op);
    --icat-card-bg-none: #1d1b2600;
    --icat-shadow-lightblack: 0 5px 12px -5px rgba(102, 68, 68, 0.0);
    --icat-shadow-light2black: 0 5px 12px -5px rgba(102, 68, 68, 0.0);
    --icat-card-border: #3d3d3f;
    --icat-shadow-border: 0 8px 16px -4px #00000050;
    --icat-tabs-background: #81d8cf;
    --style-border: 1px solid var(--icat-card-border);
    --style-border-hover: 1px solid var(--icat-theme);
    --style-border-dashed: 1px dashed var(--icat-theme-op);
    --style-border-forever: 2px solid var(--icat-lighttext)
}
```

## 安知鱼
``` css [qiyuange.css] lang="css"
/* 安知鱼主题变量定义 */
:root {
  --anzhiyu-theme: #3b70fc;
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

.light, :root {
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
```
## 柒渊阁
``` css [qiyuange.css] lang="css"
/* 柒渊阁 */
.dark {
	--qiyuan-card-background: #000;
	--qiyuan-editor: var(--qiyuan-card-background);
	--qiyuan-warp: var(--qiyuan-card-background);
	--qiyuan-preview: var(--qiyuan-card-background);
	--qiyuan-bottom: var(--qiyuan-card-background);
  --qiyuan-card-backgroundtwo: #fff;
  --qiyuan-input: var(--qiyuan-card-backgroundtwo);
}

.light, :root {
  --qiyuan-card-backgroundtwo: #fff;
	--qiyuan-card-background: #fff;
	--qiyuan-editor: var(--qiyuan-card-background);
	--qiyuan-warp: var(--qiyuan-card-background);
	--qiyuan-preview: var(--qiyuan-card-background);
	--qiyuan-bottom: var(--qiyuan-card-background);
  --qiyuan-input: var(--qiyuan-card-backgroundtwo);
}

.atk-content {
    color: var(--c-text)!important;
}
```

## 风纪星辰
``` css [qiyuange.css] lang="css"
/* 风纪星辰样式表 */
:root {
	/* 颜色 */
	--thyuu--main-color: var(--custom-main-hue, 0deg) var(--custom-main-sat, 70%) var(--custom-main-lig, 70%);
	--thyuu--subs-color: var(--custom-subs-hue, 20deg) var(--custom-subs-sat, 70%) var(--custom-subs-lig, 70%);
	--thyuu--color-font: 0deg 0% 20%;
	--thyuu--alpha-font: 100%;
	--thyuu--color-font-head: hsl(var(--thyuu--color-font) / var(--thyuu--alpha-font));
	--thyuu--color-font-fill: hsl(0deg 0% 100% / .9);
	--thyuu--color-scroll: hsl(var(--thyuu--main-color) / 30%);
	--thyuu--color-back-font: hsl(var(--thyuu--color-font) / 5%);
	--thyuu--color-back-have: hsl(0deg 0% 98%);
	--thyuu--color-back-white: hsl(0deg 0% 100%);
	--thyuu--color-back-none: transparent;
	
	/* 字体 */
	--thyuu--font-weight-normal: 400;
	--thyuu--font-weight-title: 600;
	--thyuu--font-family-normal: var(--custom-fonts, none), 'Misans VF', 'PingFang SC', 'Noto Sans SC', sans-serif, thyuu-iconfont;
	--thyuu--font-family-slogn: var(--custom-slogn, none), '快看世界体', var(--thyuu--font-family-normal);
	--thyuu--font-family-coder: var(--custom-coder, none), 'Monaco', 'Consolas', var(--thyuu--font-family-normal);
	--thyuu--font-family-title: var(--thyuu--font-family-normal);
	
	/* 尺寸 */
	--thyuu--size-normal: var(--custom-font-size, 16px);
	--thyuu--size-medium: .875rem;
	--thyuu--size-small: .75rem;
	--thyuu--size-title: 1rem;
	--thyuu--size-edgetb: var(--thyuu--height-head);
	--thyuu--size-edgelr: 3rem;
	--thyuu--size-area: 3rem;
	--thyuu--size-divs: 1.5rem;
	--thyuu--size-span: 1rem;
	--thyuu--size-icon: 1.25rem;
	--thyuu--size-radius: var(--custom-radius, var(--thyuu--size-normal));
	--thyuu--size-card-normal: 22.5rem;
	--thyuu--size-card-small: 13.5rem;
	--thyuu--size-screen-medium: 1152px;
	--thyuu--size-content: var(--custom-content-size, 62.5rem);
	--thyuu--size-scroll: 12px;
	--thyuu--size-cover-top: max(10em, 30vh);
	
	/* 区块 */
	--thyuu--height-head: 4rem;
	--thyuu--sticky-head: var(--thyuu--height-head);
	--thyuu--height-cover: max(var(--thyuu--size-card-normal), 80vh);
	--thyuu--align-cover: var(--custom-cover-align,center);
	--thyuu--mask-scroll-y: linear-gradient(#0000, #000 var(--thyuu--size-divs), #000 calc(100% - var(--thyuu--size-divs)), #0000);
	--thyuu--mask-scroll-x: linear-gradient(90deg,#0000, #000 var(--thyuu--size-divs), #000 calc(100% - var(--thyuu--size-divs)), #0000);
	--thyuu--border: thin solid hsl(var(--thyuu--color-font) / 5%);
	--thyuu--shadow-text: 0 .04rem .2rem rgb(0 0 0 / 30%);
	--thyuu--shadow-normal: 0 .2rem 1rem 0 hsl(0deg 0% 15% / 10%);
	--thyuu--shadow-white: 0 .2rem 1rem 0 hsl(0deg 0% 15% / 4%);
	--thyuu--shadow-color: var(--thyuu--shadow-normal), 0 2rem 2rem -2rem hsl(var(--thyuu--main-color) / 30%);

	--animation-on:cubic-bezier(.6, .1, 0, 1);
	--animation-in:cubic-bezier(.6, .2, .25, 1);
	--animation: opacity .5s var(--animation-in) backwards, transform 1s var(--animation-in) backwards, filter .7s var(--animation-in);

	/* wp重置 */
	--wp--preset--font-size--small: .75em;
	--wp--preset--font-size--medium: 1.75em;
	--wp--preset--font-size--large: 2em;
	--wp--preset--font-size--x-large: 3em;

    /* 番剧 */
    --banguim--edgelr: 3rem;
    --animation: opacity .5s var(--animation-in) backwards, transform 1s var(--animation-in) backwards, filter .7s var(--animation-in);
    --db--text-color: hsl(var(--thyuu--color-font) / var(--thyuu--alpha-font));
    --thyuu--color-font: 0deg 0% 20%;
    --thyuu--alpha-font: 100%;
}
@media (max-width: 1152px) {
    :root {
        --thyuu--size-edgelr:1.5rem;
    }
}
@media (max-width: 641px) {
    :root {
        --thyuu--sticky-head:1rem;
        --thyuu--size-scroll:0rem;
    }
}
@view-transition {
    navigation: auto;
}
/* 夜间模式 */
:root, .dark {
    --thyuu--color-font:var(--custom-main-hue, 214deg) 5% 80%;
    --thyuu--color-back-have:hsl(var(--custom-main-hue, 214deg) 5% 5%);
    --thyuu--color-back-white:hsl(var(--custom-main-hue, 214deg) 5% 10%);
    --thyuu--color-back-shift:hsl(var(--custom-main-hue, 214deg) 5% 20% / 50%);
    --thyuu--color-font-fill:var(--thyuu--color-back-have);
    --db-main-color: hsl(var(--thyuu--main-color) / 70%);
	--db-hover-color: hsl(var(--thyuu--main-color) / 70%);
	--db--text-color: hsl(var(--thyuu--color-font) / var(--thyuu--alpha-font));
	--db--text-color-light: var(--thyuu--alpha-font);
	transition: .3s;
}
:root body.nav-fixed {
    --thyuu--height-head:3rem;
}

/* 附加属性 */
:root :where(body.dark-page),
:root:has(body.dark-page) {
    --logo-color:0deg 0% 100%;
    --thyuu--color-font:0deg 0% 100%;
    --thyuu--alpha-font:75%;
    --thyuu--color-back-font:hsl(0deg 0% 60% / .05);
    --thyuu--color-back-have:hsl(0deg 0% 0%);
    --thyuu--color-back-white:hsl(0deg 0% 60% / .1);
    --thyuu--color-back-shift:hsl(0deg 0% 60% / .1);
    --thyuu--color-back-text:none;
    --thyuu--color-font-fill:var(--thyuu--color-back-have);
    --thyuu--color-font-head:hsl(0deg 0% 100% / .9);
    --thyuu--shadow-shift:var(--thyuu--shadow-white);
}
:root body.single:not(.nav-fixed, .single-format-image, .single-format-gallery) header {
    --thyuu--color-font-head: hsl(0deg 0% 100% / .9);
    --thyuu--color-font-fill: hsl(0deg 0% 0% / .7);
    --logo-color: var(--thyuu--color-font-head);
}

[class*="thyuu-icon-"]::before {
	font-family: thyuu-iconfont;
	font-style: normal;
    font-weight: normal;
}

/* 通用动画 */
@keyframes rotate{
	from{transform: rotate(0deg)}
	to{transform: rotate(1turn)}
}
@keyframes opacity {
	0% {opacity: var(--opci, 0);}
	100% {opacity: var(--opci-in, 1);}
}
@keyframes transform {
	0% {transform: var(--trfm, translateY(1rem)); transform-origin: var(--trfm-or, top); }
	100% {transform: var(--trfm-in, none);}
}
@keyframes filter {
	0% {filter: var(--filter, none);}
	100% {filter: var(--filter-in, none);}
}
@keyframes nothumb {
	100% {background-position: 50%, 200%, 200%;}
}
@keyframes end {
	0% {opacity: 1;}
	100% {opacity: 0;}
}
@keyframes onheight {
	0% {height: 0;}
}
@keyframes onwidth {
	0% {width: 0;}
}
@keyframes userbg {
	0% {height: 0;scale: 2;}
}
```

## yriu
``` css [qiyuange.css] lang="css"
/* yriu */
@media (orientation: portrait) {
    :root {
        --header-bar-height:3.75rem;
        --footer-bar-height: 5.5rem;
        --centered-width: 100%;
        --side-bar-width: 0rem;
        --hide-side-bar-width: 0rem;
        --tool-bar-width: 0rem;
        --drawer-width: 16rem;
        --music-bar-height: 3rem;
        --music-bar-width: 100vw;
        --hide-music-bar-width: 100vw;
        --hide-music-bar-height: 100vw;
        --music-bar-bottom: calc(var(--footer-bar-height) - var(--music-bar-height)/2);
        --pt-main: var(--header-bar-height)
    }
}

@media (orientation: landscape) {
    :root {
        --header-bar-height:5.5rem;
        --footer-bar-height: 0rem;
        --side-bar-width: 12rem;
        --hide-side-bar-width: 3.5rem;
        --tool-bar-width: 0rem;
        --drawer-width: 18rem;
        --music-bar-width: calc(var(--side-bar-width) - 1rem);
        --music-bar-height: var(--music-bar-width);
        --hide-music-bar-width: calc(var(--hide-side-bar-width) - 1rem);
        --hide-music-bar-height: var(--hide-music-bar-width);
        --music-bar-bottom: .5rem;
        --pt-main: calc(var(--header-bar-height) - 2rem)
    }
}

@media (min-width: 1200px) and (orientation:landscape) {
    :root {
        --tool-bar-width:16rem;
        --centered-width: 70rem
    }
}

:root {
    --border-radius-3xs: .25rem;
    --border-radius-2xs: .375rem;
    --border-radius-xs: .5rem;
    --border-radius-sm: .625rem;
    --border-radius-base: .75rem;
    --border-radius-md: 1rem;
    --border-radius-lg: 1.25rem;
    --border-radius-xl: 1.5rem;
    --border-radius-2xl: 1.75rem;
    --border-radius-3xl: 2rem;
    --border-radius-full: 9999px;
    --shadow-sm: 0 1px 2px 0 rgba(44,45,48,.05);
    --shadow-base: 0 8px 16px -4px rgba(44,45,48,.047);
    --shadow-md: 0 4px 6px -1px rgba(44,45,48,.1),0 2px 4px -1px rgba(44,45,48,.06);
    --shadow-lg: 0px 2px 4px -2px hsla(0,0%,9%,.06),0px 4px 8px -2px hsla(0,0%,9%,.1);
    --shadow-xl: 0 20px 25px -5px rgba(44,45,48,.1),0 10px 10px -5px rgba(44,45,48,.04);
    --shadow-2xl: 0 25px 70px -12px rgba(44,45,48,.15);
    --border-color: rgba(171,192,221,.3)
}

.dark {
    --border-color: rgba(49,60,77,.3)
}

:root {
    --theme-color: #425aef;
    --theme-color-rgb: 66,90,239;
    --theme-color-50: #e8ebfd;
    --theme-color-100: #c8d0fa;
    --theme-color-200: #a9b5f7;
    --theme-color-300: #899af4;
    --theme-color-400: #6a7ff1;
    --theme-color-500: #425aef;
    --theme-color-600: #3448bf;
    --theme-color-700: #27368f;
    --theme-color-800: #1a245f;
    --theme-color-900: #0d122f;
    --theme-color-950: #060918
}

:root,body {
    --theme-color-switch: var(--theme-color-500)
}

.dark,.dark body {
    --theme-color-switch: var(--theme-color-300)
}

:root {
    --gray-50: #f8fafc;
    --gray-100: #f1f5f9;
    --gray-150: #edf2f7;
    --gray-200: #e2e8f0;
    --gray-250: #d9e2e8;
    --gray-300: #c9d1d9;
    --gray-350: #b9c2cd;
    --gray-400: #94a3b8;
    --gray-450: #7f8fa6;
    --gray-500: #64748b;
    --gray-550: #4f5e70;
    --gray-600: #475569;
    --gray-650: #3e4958;
    --gray-700: #334155;
    --gray-750: #273344;
    --gray-800: #222d3f;
    --gray-850: #101c2e;
    --gray-900: #0a1225;
    --gray-950: #060d1d;
    --gray-1000: #000
}

.light,:root {
    --bg-background: var(--gray-150);
    --bg-level-b1: var(--gray-200);
    --bg-level-1: var(--gray-100);
    --bg-level-2: var(--gray-50);
    --bg-level-3: var(--gray-50);
    --bg-level-4: #fff;
    --bg-level-5: #fff;
    --bg-card: hsla(0,0%,100%,.6);
    --text-1: var(--gray-900);
    --text-2: var(--gray-800);
    --text-3: var(--gray-700);
    --text-4: var(--gray-400);
    --text-5: var(--gray-200);
    --bg-mask: rgba(221,225,233,.5);
    --bg-head-bar: hsla(240,9%,98%,.7)
}

.dark {
    --bg-background: var(--gray-950);
    --bg-level-b1: var(--gray-1000);
    --bg-level-1: var(--gray-900);
    --bg-level-2: var(--gray-850);
    --bg-level-3: var(--gray-800);
    --bg-level-4: var(--gray-750);
    --bg-level-5: var(--gray-700);
    --bg-card: rgba(24,37,58,.5);
    --text-1: var(--gray-300);
    --text-2: var(--gray-400);
    --text-3: var(--gray-500);
    --text-4: var(--gray-600);
    --text-5: var(--gray-800);
    --bg-mask: rgba(1,8,24,.5);
    --bg-head-bar: rgba(14,29,47,.7)
}
```

### ganvin
``` css [ganvin.css] lang="css"
/* ganvin */
:root {
    --gavin-blue1: rgb(0, 150, 255);
    --gavin-blue2: rgb(0, 136, 255);
    --gavin-blue3: rgb(0, 100, 255);
    /* --gavin-theme-color: var(--gavin-blue2); */
    --gavin-highlight: rgb(var(--gavin-theme-color));
    --gavin-highlight-op: rgba(var(--gavin-theme-color), .18);
    --gavin-highlight-op-1: rgba(var(--gavin-theme-color), .1);
    --gavin-highlight-op-6: rgba(var(--gavin-theme-color), .6);
    --gavin-theme-color-light: 0,100,255;
    /* 129, 78, 250; */
    --gavin-theme-color-dark: 0,150,255;
    /* 0, 234, 208; */
    --gavin-background: var(--gavin-grey-1);
    /* --gavin-theme-color-dark: 26, 251, 255; 亮蓝 */
    --font-color: rgba(var(--font-color-rgb), .85);
    --font-color-blod: rgba(var(--font-color-rgb), 1);
    --rightside-bg: rgba(var(--op), .1);
    --vercel-btn-bg: var(--dis-f-0);
    --vercel-btn-hover-bg: var(--f-0);
    --vercel-btn-border: var(--dis-f-0);
    --hr-border: var(--gavin-blue2);
    --hr-before-color: var(--gavin-blue2);
    --article-card: var(--gavin-widget-bg1);
    /* 以下是安知鱼颜色 */
    --gavin-shadow-border: 0 8px 16px -4px #2c2d300c;
    --gavin-theme-op: #4259ef23;
    --gavin-shadow-theme: 0 0px 7px -3px var(--gavin-theme-op);
    --gavin-shadow-blackdeep: 0 2px 16px -3px rgba(0, 0, 0, 0.15);
}

.dark {
    --gavin-bg: 17, 18, 20;
    --gavin-op-1: rgba(0, 0, 0, .1);
    --gavin-op-3: rgba(0, 0, 0, .3);
    --gavin-op-5: rgba(0, 0, 0, .5);
    --gavin-op-7: rgba(0, 0, 0, .7);
    --gavin-op-dis-05: rgba(255, 255, 255, .05);
    --gavin-op-dis-15: rgba(255, 255, 255, .15);
    --gavin-op-dis-1: rgba(255, 255, 255, .1);
    --gavin-op-dis-2: rgba(255, 255, 255, .2);
    --gavin-op-dis-3: rgba(255, 255, 255, .3);
    --gavin-op-dis-4: rgba(255, 255, 255, .4);
    --gavin-op-dis-5: rgba(255, 255, 255, .5);
    --gavin-op-dis-6: rgba(255, 255, 255, .6);
    --gavin-op-dis-7: rgba(255, 255, 255, .7);
    --gavin-nav-bg: rgba(0, 0, 0, .56);
    --gavin-nav-hover: var(--gavin-highlight-op-6);
    /* --gavin-nav-hover: #00EAD0; */
    --gavin-mask: rgba(255, 255, 255, .18);
    --gavin-page-bg: rgba(255, 255, 255, 0.8);
    /*页码颜色*/
    --gavin-toc-bg: rgba(255, 255, 255, .15);
    /*目录颜色*/
    /*rgba(51, 144, 255, .3); */
    --gavin-scrollbar-dark: #242424;
    --gavin-scrollbar-light: rgba(180, 180, 180, .4);
    --gavin-item-bg: rgba(240, 240, 240, .2);
    --gavin-item-border: rgba(240, 240, 240, .5);
    --gavin-border-color: var(--gavin-grey-5);
    --gavin-border-hover-color: var(--gavin-blue3);
    --gavin-note-font-color: rgb(136, 136, 136);
    --gavin-hover-font-color: rgba(255, 255, 255, .9);
    /*17,17,17*/
    --gavin-widget-bg1: var(--gavin-grey-4);
    /*38, 38, 38; rgb(46, 48, 51)*/
    --gavin-widget-bg2: var(--gavin-grey-5);
    --gavin-widget-bg3: rgb(70, 71, 73);
    --gavin-widget-bg4: rgb(44, 44, 46);
    /* --gavin-grey-1: rgb(16, 19, 22);
    --gavin-grey-2: rgb(24, 27, 30);
    --gavin-grey-3: rgb(32, 35, 38);
    --gavin-grey-4: rgb(40, 43, 46);
    --gavin-grey-5: rgb(48, 51, 54);
    --gavin-grey-6: rgb(56, 59, 62);
    --gavin-grey-7: rgb(64, 67, 70);
    --gavin-grey-8: rgb(72, 75, 78); */
    --gavin-grey-1: rgb(15, 18, 21);
    --gavin-grey-2: rgb(25, 28, 31);
    --gavin-grey-3: rgb(35, 38, 41);
    --gavin-grey-4: rgb(45, 48, 51);
    --gavin-grey-5: rgb(55, 58, 61);
    --gavin-grey-6: rgb(65, 68, 71);
    --gavin-grey-7: rgb(75, 78, 81);
    --gavin-grey-op-1: 136, 139, 144;
    --gavin-grey-op-2: 136, 139, 143;
    /*60, 60, 60; rgb(66, 67, 70)*/
    /* --gavin-highlight: #0096FF; */
    /* --gavin-highlight: #00EAD0; */
    /* --gavin-highlight-op: #0096FF50; */
    /* --gavin-highlight-op: #00EAD023; */
    --gavin-theme-color: var(--gavin-theme-color-dark);
    --gavin-switch-off: rgb(57, 57, 61);
    --gavin-switch-on: rgb(48, 209, 88);
    --gavin-ripple: rgba(255, 255, 255, .3);
    --gavin-shadow-1: 0 8px 12px -4px #00000050;
    --gavin-shadow-2: 0 12px 16px -4px #00000050;
    --gavin-shadow-3: 0 0 16px -4px #66666699;
    --gavin-shadow-4: 0 0 16px -4px #000000;
    --gavin-scroll-bg: #5E5E6A;
    --vercel-background: rgb(17, 17, 17);
    --vercel-border-color: rgb(66, 68, 74);
    --vercel-hover-bg: rgba(51, 51, 51, 1);
    /* --card-bg: rgb(21,23,25); */
    --card-bg: var(--gavin-grey-2);
    /*rgba(29, 30, 34, 1);*/
    --text-bg-hover: rgba(240, 240, 240, .24);
    --btn-bg: rgba(100, 100, 100, .8);
    --btn-hover-color: rgb(80, 80, 80);
    --card-link-bg: rgba(240, 240, 240, .1);
    --card-link-border: rgba(240, 240, 240, .3);
    --font-color-rgb: 236, 236, 240;
    /* rgb(210, 210, 210); */
    --search-bg: rgba(0, 0, 0, .64);
    --system-logo: url(https://registry.npmmirror.com/cansin-blogdata/3.0.73/files/img/f1olM.webp);
    --web-bg: rgba(0, 0, 0, 0.25);
    --hl-bg: rgb(40, 44, 48);
    --hlnumber-bg: rgb(40, 44, 48);
    --hltools-bg: rgb(36, 37, 38);



    /* HarmonyOS */
    --hmos-theme: #317AF7;

    --twitter-border: rgb(47, 51, 54);
    --twitter-item-bg: rgb(22, 24, 28);
    --twitter-shadow: rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.15) 0px 0px 3px 1px;
    --twitter-text-note: rgb(113, 118, 123);
    --twitter-text: rgb(231, 233, 234);
    --twitter-btn-bg: rgb(239, 243, 244);
    --twitter-btn-hover: rgba(231, 233, 234, 0.1);
    --twitter-item-hover: rgba(255, 255, 255, 0.03);
    --twitter-item-active: rgba(255, 255, 255, 0.07);


    --supb-border: #2e2e2e;
    --supb-bg: #1c1c1c;
    --supb-bg2: hsla(0, 0%, 100%, .026);



    --gh-bg-1: var(--light-grad-pink-blue, radial-gradient(ellipse at 40% 0%, #bf398910 0, transparent 75%), radial-gradient(ellipse at 60% 0%, #096bde10 0, transparent 75%));

    --gh-dark-1: rgb(1, 4, 9);
    --gh-dark-2: rgb(13, 17, 23);
    --gh-dark-3: rgb(22, 27, 34);
    --gh-dark-4: rgb(33, 38, 45);
    --gh-dark-5: rgb(41, 47, 54);
    --gh-dark-6: rgb(48, 54, 61);
    --gh-dark-7: rgb(63, 67, 75);

    --gh-text-1: rgb(230, 237, 243);
    --gh-text-2: rgb(110, 118, 129);
    --gh-text-3: rgb(125, 133, 144);
}
```
