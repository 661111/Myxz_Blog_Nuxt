---
title: butterfly导航栏修改方案
description: 这篇文章讲述在博客中对导航栏进行修改，并添加多个产品页面地址，且采用安知鱼的导航栏CSS样式表。
date: 2025-02-05 9:00
image: https://sourceimage.s3.bitiful.net/img/default_cover_1.avif
categories: [hexo]
top_img: false
tags: [hexo, butterfly]
recommend: true
---
## 一.前言

由于我想要修改一下导航栏，对一些功能进行优化，所以有了这篇文章，那么就来修改吧

## 二.教程开始

因为我们要先对导航栏修改为居中，把搜索以及其他功能分离到右侧，增加导航其他网站的区域，并且对魔改内容的一部分按钮进行兼容，**剔除返回内容**，防止不兼容
那么就是以下整个文件内容了

**主体内容修改**
```pug
- const { darkmode } = theme
nav#nav
  span#blog_name
    .back-home-button(tabindex='-1')
      i.back-home-button-icon.fas.fa-grip-vertical
      .back-menu-list-groups
        .back-menu-list-group
          .back-menu-list-title 网页
          .back-menu-list
            a.back-menu-item(href='/', title='前往博客主页', target='_blank', one-link-mark='yes')
              img.back-menu-item-icon(src='/img/avatar.jpg')
              span.back-menu-item-text 博客
            a.back-menu-item(href='https://www.cloud.anheyu.com/', rel='external nofollow', title='前往云盘主页', target='_blank', one-link-mark='yes')
              img.back-menu-item-icon(src='https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg')
              span.back-menu-item-text 云盘主页

    a#site-name(href=url_for('/'))
      .title #[=config.title]
      i.fa-solid.fa-house

  #menus
    if (theme.algolia_search.enable || theme.local_search.enable)
      div.nav-button#search-button
        a.site-page.social-icon.search
          i.fas.fa-search.fa-fw
          span=' '+_p('search.title')

      div.nav-button#search-button
        a.nav-rightbutton.site-page.darkmode_switchbutton(onclick="switchDarkMode()")
          i.fas.fa-adjust

    div.nav-button#nav-totop
      a.totopbtn
        i.fas.fa-arrow-up
        span#percent(onclick="btf.scrollToDest(0,500)") 0


    !=partial('includes/header/menu_item', {}, {cache: true})

    #toggle-menu
      a.site-page
        i.fas.fa-bars.fa-fw
```

那么如果先要修改左侧的导航内容，只需要把9到15行内容修改即可
css也是进行一部分的魔改，去除一部分的颜色和样式更新以支持部分内容

**css内容**

第一个:**菜单主体样式**，放到自定义css内容，也可以在主题内搞一个文件夹来存放**不太建议**，如果想要以后会发布并引用到整套魔改文章中。

```CSS
#nav a:hover {
  background: var(--anzhiyu-main);
  transition: 0.3s;
}

#nav-totop:hover .totopbtn i {
  opacity: 1;
}
#nav-totop #percent {
  font-size: 12px;
  background: var(--anzhiyu-white);
  color: var(--anzhiyu-main);
  width: 25px;
  height: 25px;
  border-radius: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
}
.nav-fixed #nav-totop #percent,
.page #nav-totop #percent {
  background: var(--font-color);
  color: var(--card-bg);
  font-size: 13px;
}

#nav-totop {
  width: 35px;
}
#page-header:not(.is-top-bar) #percent {
  transition: 0.3s;
}
#page-header:not(.is-top-bar) #nav-totop {
  width: 0;
  opacity: 0;
  transition: width 0.3s, opacity 0.2s;
  margin-left: 0 !important;
}
#nav-totop #percent {
  font-weight: 700;
}
#nav-totop:hover #percent {
  opacity: 0;
  transform: scale(1.5);
  font-weight: 700;
}
#page-header #nav #nav-right div {
  margin-left: 0.5rem;
  padding: 0;
}

#nav-totop {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}
.nav-button {
  cursor: pointer;
}
div#menus {
  display: flex;
  align-items: center;
}
#page-header #nav .nav-button a {
  height: 35px;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#nav .site-page {
  padding-bottom: 0px;
}
#nav *::after {
  background-color: transparent !important;
}

/* 顶栏修改 */
#nav .menus_items .menus_item .menus_item_child li a {
  padding: 2px 16px;
}
#nav .menus_items .menus_item .menus_item_child li:hover a {
  color: white !important;
}

#nav .menus_items .menus_item .menus_item_child li {
  margin: 6px;
  border-radius: 5px;
  transition: all 0.3s;
  display: inline-block;
  margin: 0 3px;
}
#nav .menus_items .menus_item .menus_item_child:before {
  top: -19px;
}
#site-name,
.shuoshuo {
  white-space: nowrap;
  overflow: hidden;
}
#site-name {
  padding: 0 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}

#blog_name #site-name i {
  opacity: 0;
  position: absolute;
}

#blog_name #site-name:hover .title {
  opacity: 0;
}

#blog_name #site-name:hover i {
  opacity: 1;
  transform: scale(1.01);
  color: white;
}
/* 圆角隐藏 */
ul.menus_item_child {
  border-radius: 5px;
}

/* 一级菜单居中 */
#nav .menus_items {
  position: absolute;
  width: fit-content;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 60px;
}

#nav .menus_items .menus_item:hover .menus_item_child {
  display: block;
  transform: translateX(-50%);
  right: auto;
  left: auto !important;
  padding: 6px 4px;
  box-sizing: content-box;
  line-height: 35px;
}
#nav .menus_items .menus_item:hover {
  padding: 0 5px 27px 5px !important;
  margin-bottom: -14.5px !important;
}

#nav .menus_items .menus_item .menus_item_child {
  top: 44px;
}

@media screen and (min-width: 768px) {
  .page .menus_item:hover > a.site-page {
    color: var(--anzhiyu-white) !important;
    background: var(--anzhiyu-main);
    transition: 0.3s;
    box-shadow: var(--anzhiyu-shadow-main);
  }
}

.nav-fixed #nav {
  transform: translateY(58px) !important;
}
#nav {
  padding: 0 calc((100% - 1420px) / 2);
}

#nav a {
  border-radius: 8px;
  color: var(--font-color);
}
.page #nav a:hover {
  color: var(--anzhiyu-white) !important;
  background: var(--anzhiyu-main);
  transition: 0.3s;
  box-shadow: var(--anzhiyu-shadow-main);
}

#menus > div.menus_items > div > a {
  letter-spacing: 0.3rem;
  font-weight: 700;
  padding: 0em 0.3em 0em 0.5em;
  height: 35px;
  line-height: 35px;
}
#nav .menus_items .menus_item {
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
}

#nav div#toggle-menu {
  padding: 2px 0 4px 6px;
}

#nav-totop .totopbtn i {
  position: absolute;
  display: flex;
  opacity: 0;
}
#page-name::before {
  font-size: 18px;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  color: white !important;
  top: 0;
  left: 0;
  content: "回到顶部";
  background-color: var(--anzhiyu-theme);
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  opacity: 0;
  box-shadow: 0 0 3px var(--anzhiyu-theme);
  line-height: 45px; /*如果垂直位置不居中可以微调此值，也可以删了*/
}
#page-name:hover:before {
  opacity: 1;
}
#name-container {
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
}
#name-container:hover {
  transform: translateX(-50%) scale(1.03);
}
#page-name {
  position: relative;
  padding: 10px 30px;
  -webkit-animation-timing-function: ease-out;
}

center#name-container {
  position: absolute;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  font-family: "ZhuZiAYuanJWD";
}
.nav-fixed.nav-visible #name-container {
  transition: 0.3s;
  transform: translate(-50%, 60px);
}
.nav-fixed.nav-visible #menus .menus_items {
  transform: translate(-50%);
  transition: 0.3s;
  line-height: 60px;
}
.nav-fixed #name-container {
  top: 15%;
  transition: 0.3s;
}
#name-container {
  bottom: 60px;
}

.mask-name-container {
  max-width: 1200px;
  width: 50%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  left: 50%;
  transform: translateX(-50%);
}

@media screen and (max-width: 992px) {
  .mask-name-container {
    width: 65%;
  }
}

@media screen and (max-width: 768px) {
  .mask-name-container {
    display: none;
  }
}
#sidebar #sidebar-menus .menus_items .site-page:hover {
  color: var(--anzhiyu-white);
  border-radius: var(--anzhiyu-border-radius);
}
#nav .menus_items .menus_item > a > i:last-child {
  display: none;
}
#nav #search-button {
  font-size: 1.3em;
}

@media screen and (min-width: 900px) {
  #nav .back-home-button:hover {
    box-shadow: var(--anzhiyu-shadow-main);
  }
}

.back-home-button:hover {
  background: var(--anzhiyu-main);
  color: var(--anzhiyu-white) !important;
}
.back-home-button {
  display: flex;
  width: 35px;
  height: 35px;
  align-items: center;
  justify-content: center;
  font-size: 120%;
  margin-top: 1.1px;
  margin-right: .5rem;
  transition: .2s;
  border-radius: 8px;
  padding: 0 !important;
}

.back-home-button:hover .back-menu-list-groups {
  display: flex;
  opacity: 1;
  transition: 0.3s;
  top: 55px;
  pointer-events: auto;
  left: 0;
}
.back-home-button .back-menu-list-groups {
  position: absolute;
  top: 65px;
  left: 0;
  background: var(--anzhiyu-card-bg);
  border-radius: 12px;
  border: var(--style-border);
  flex-direction: column;
  font-size: 12px;
  color: var(--anzhiyu-secondtext);
  box-shadow: var(--anzhiyu-shadow-border);
  transition: 0s;
  opacity: 0;
  pointer-events: none;
}

.back-home-button .back-menu-list-group {
  display: flex;
  flex-direction: column;
}
.back-home-button .back-menu-list-group .back-menu-list-title {
  margin: 8px 0 0 16px;
  transition: 0.3s;
}
.back-home-button .back-menu-list {
  display: flex;
  flex-direction: column;
}
.back-home-button .back-menu-list::before {
  position: absolute;
  top: -22px;
  left: 0px;
  width: 100%;
  height: 25px;
  content: "";
}

.back-home-button .back-menu-list-group:hover .back-menu-list-title {
  color: var(--anzhiyu-main);
}
.back-home-button .back-menu-list-groups:hover {
  border: var(--style-border-hover);
}
.back-home-button .back-menu-list .back-menu-item {
  display: flex;
  align-items: center;
  margin: 4px 8px;
  padding: 4px 8px !important;
  transition: 0.3s;
  border-radius: 8px;
}
.back-home-button .back-menu-list .back-menu-item .back-menu-item-text {
  font-size: var(--global-font-size);
  margin-left: 0.5rem;
  color: var(--anzhiyu-fontcolor);
  white-space: nowrap;
}
#nav #blog_name {
  flex-wrap: nowrap;
  height: 60px;
  display: flex;
  align-items: center;
  /* z-index: 102; */
  transition: 0.3s;
}
.back-home-button .back-menu-list .back-menu-item .back-menu-item-icon {
  width: 24px;
  height: 24px;
  border-radius: 24px;
  background: var(--anzhiyu-secondbg);
}
#page-header #nav .back-home-button {
  cursor: pointer;
  position: relative;
}

@media screen and (min-width: 1300px) {
  #nav a:hover {
    transform: scale(1.03);
  }
}
.back-home-button .back-menu-list .back-menu-item:hover .back-menu-item-text {
  color: var(--anzhiyu-white);
}
.back-menu-item-icon.loading img {
  width: 25px;
}

#page-header #nav #menus .nav-button.long a.totopbtn,
#page-header #nav #menus .nav-button.long,
#page-header #nav #menus .nav-button.long a.totopbtn span {
  width: 70px;
}
#page-header #nav #menus .nav-button.long a.totopbtn span {
  border-radius: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  white-space: nowrap;
}

#page-header #nav #menus .nav-button.long a.totopbtn:hover {
  border-radius: 35px;
  height: 30px;
}

#nav #search-button {
  padding-left: 0;
}
#page-header #nav .nav-button {
  margin-left: 0.5rem;
  padding: 0;
}
#page-header:not(.is-top-bar) #nav-totop a {
  display: none;
}
#search-button a.site-page.social-icon.search span {
  display: none;
}
```

第二个:**整体的颜色样式表**，还是那句话不建议放在主题内，除非有解决这个问题的方式，否则放到自定义文件

```CSS
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
  
  [data-theme="light"] {
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
  
  [data-theme="dark"] {
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

## 三.原教程

## 四.声明
我这篇文章主要是用于自己的美化。