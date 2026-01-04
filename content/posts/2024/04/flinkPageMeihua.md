---
title: 友链魔改
description: 友链页面美化以及添加功能
date: 2024-04-19 10:00:00
updated: 2025-04-19 12:09:00
image:  https://source.yjluo.top/PostCover/flinkPage.avif
categories: [博客魔改]
top_img: false
tags: [hexo, butterfly]
recommend: true
---
## 前言
为了实现部分功能所以采用了大多数教程进行挑选，修改后进行优化（对于部分在yml配置文件的进行保留，还不是最终版本）
所采用的模块来自于
::link-card
---
icon: https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/0a/c6/9e/0ac69e21-363c-e663-8e89-37fc9b5d6cb1/AppIcon-0-0-1x_U007epad-0-1-85-220.png/512x512bb.jpg
title: Github
description: 安知鱼主题友链页面部分模块
link: "https://blog.sotkg.com/previews/example#%E8%87%AA%E5%8A%A8%E5%8A%A0%E8%BD%BD%E6%A8%A1%E5%BC%8F-%E7%95%AA%E5%89%A7%E5%8D%A1%E7%89%87"
---
::

::link-card
---
icon: https://p.liiiu.cn/i/2025/03/13/67d2fc82d329c.webp
title: LiuShen
description: 使用该教程的大部分UI
link: "https://blog.liushen.fun/posts/59fe844d/"
---
::

## 页面内容
### 友链页面覆盖
在flink.pug中使用以下代码进行覆盖：
``` pug [flink.pug] lang="pug"
#article-container
  style.
    div#page {
      border: none!important;
      background: none!important;
      padding: 0!important
    }
  #flink-banners-card
    #flink-banners
      .banner-top-box
        .flink-banners-title
          .banners-title-small 友情链接
          .banners-title-big=theme.linkPageTop ? theme.linkPageTop.title : "与数百名博主无限进步"
        .banner-button-group
          a.banner-button.secondary.no-text-decoration(onclick="friendChainRandomTransmission()")
            i.anzhiyufont.anzhiyu-icon-paper-plane1(style="margin-right: 8px;")
            span.banner-button-text 随机访问
          a.banner-button.no-text-decoration(onclick="anzhiyu.addFriendLink()")
            i.anzhiyufont.anzhiyu-icon-arrow-circle-right
            span.banner-button-text 申请友链
      #skills-tags-group-all
        .tags-group-wrapper
          - function getAvatarWithoutExclamationMark(url) {
          -   const index = url.indexOf('!');
          -   return index !== -1 ? url.substring(0, index) : url;
          - }
          each y in [1,2]
            each i, index in site.data.link.slice(0, 15)
              - const link_list = i.link_list.slice()
              - const hundredSuffix = i.hundredSuffix ? i.hundredSuffix : ""
              - const evenNum = link_list.filter((x, index) => index % 2 === 0);
              - const oddNum = link_list.filter((x, index) => index % 2 === 1);
              each item, index2 in link_list.slice(0, Math.min(evenNum.length, oddNum.length))
                - const index = index2 * 2
                if (index <= 15 && typeof evenNum[index] !== 'undefined' && typeof oddNum[index] !== 'undefined')
                  - let oddNumAvatar = getAvatarWithoutExclamationMark(oddNum[index].avatar);
                  - let evenNumAvatar = getAvatarWithoutExclamationMark(evenNum[index].avatar);
                  .tags-group-icon-pair
                    a.tags-group-icon.no-text-decoration(href=url_for(evenNum[index].link), title=evenNum[index].name)
                      img.no-lightbox(title=evenNum[index].name, src=url_for(evenNumAvatar + hundredSuffix) onerror=`this.onerror=null;this.src='` + url_for(theme.error_img.flink) + `'` alt=evenNum[index].name)
                    a.tags-group-icon.no-text-decoration(href=url_for(oddNum[index].link), title=oddNum[index].name)
                      img.no-lightbox(title=oddNum[index].name, src=url_for(oddNumAvatar + hundredSuffix) onerror=`this.onerror=null;this.src='` + url_for(theme.error_img.flink) + `'` alt=oddNum[index].name)
  .flink
    if site.data.link
      each i in site.data.link
        if i.class_name
          h2!= i.class_name
        if i.class_desc
          .flink-desc!=i.class_desc
        if i.flink_style === 'img-link'
          .volantis-flink-list
            - let randomList = i.link_list.slice()
            if i.random
              - randomList.sort(() => Math.random() - 0.5)
            each item in randomList
              a.site-card(target='_blank' rel='noopener' href=url_for(item.link))
                .img
                  - var siteshot = item.siteshot ? url_for(item.siteshot) : 'https://s0.wp.com/mshots/v1/' + item.link + '?w=400&h=300'
                  img.nolazyload.no-lightbox(src=siteshot onerror=`this.onerror=null;this.src='` + url_for(theme.error_img.post_page) + `'` alt='' )
                .info
                  img.nolazyload.no-lightbox(src=url_for(item.avatar) onerror=`this.onerror=null;this.src='` + url_for(theme.error_img.flink) + `'` alt='' )
                  span.title= item.name
                  span.desc(title=item.descr)= item.descr
        else if i.flink_style === 'not-img-link'
          .site-card-group.link-no-img
            - let randomList = i.link_list.slice()
            if i.random
              - randomList.sort(() => Math.random() - 0.5)
            each item in randomList
              a.site-card(target='_blank' rel='noopener' href=url_for(item.link))
                .info
                  img.nolazyload.no-lightbox(src=url_for(item.avatar) onerror=`this.onerror=null;this.src='` + url_for(theme.error_img.flink) + `'` alt='' )
                  span.title= item.name
                  span.desc(title=item.descr)= item.descr

    != page.content
```

### 友链页面样式
在自定义css文件下添加：
``` css [flink.css] lang="css"
  /* 友链页面模块美化 */
  /* 由苏晓河进行编写以及调整 */
  /* 时间：2025年3月7日 */
  
  .volantis-flink-list .flink-list-item {
    margin: 8px;
    width: calc(100% / 4 - 16px);
    display: block;
    line-height: 1.4;
    height: 100%
  }
  
  @media screen and (min-width: 2048px) {
    .volantis-flink-list .flink-list-item {
        width:calc(100% / 5 - 16px)
    }
  }
  
  @media screen and (max-width: 768px) {
    .volantis-flink-list .flink-list-item {
        width:calc(100% / 3 - 16px)
    }
  }
  
  @media screen and (max-width: 500px) {
    .volantis-flink-list .flink-list-item {
        width:calc(100% / 2 - 16px)
    }
  }
  
  .volantis-flink-list .flink-list-item .img {
    height: 150px
  }
  
  @media screen and (max-width: 450px) {
    .volantis-flink-list .flink-list-item .img {
        height:130px
    }
  }
  
  .volantis-flink-list .flink-list-item .img img {
    width: 100%;
    height: 100%;
    pointer-events: none;
    object-fit: cover
  }
  
  .volantis-flink-list .flink-list-item .info {
    margin-top: 8px;
    height: 55px;
  }
  
  .volantis-flink-list .flink-list-item .info img {
    width: 32px;
    height: 32px;
    pointer-events: none;
    border-radius: 16px!important;
    float: left;
    margin-right: 8px!important;
    -webkit-transition: height .5s ease,width .5s ease,margin .5s ease!important;
    -moz-transition: height .5s ease,width .5s ease,margin .5s ease!important;
    -o-transition: height .5s ease,width .5s ease,margin .5s ease!important;
    -ms-transition: height .5s ease,width .5s ease,margin .5s ease!important;
    transition: height .5s ease,width .5s ease,margin .5s ease!important
  }
  
  .volantis-flink-list .flink-list-item .info span {
    display: block
  }
  
  .volantis-flink-list .flink-list-item .info .title {
    font-weight: 600;
    font-size: var(--global-font-size);
    color: var(--liushen-text);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-transition: color .3s ease;
    -moz-transition: color .3s ease;
    -o-transition: color .3s ease;
    -ms-transition: color .3s ease;
    transition: color .3s ease
  }
  
  .volantis-flink-list .flink-list-item .info .desc {
    font-size: var(--global-font-size);
    word-wrap: break-word;
    line-height: 1.2;
    color: #888;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2
  }
  
  .volantis-flink-list .flink-list-item:hover .info img {
    width: 0;
    height: 0;
    margin-right: 0
  }
  
  .volantis-flink-list .flink-list-item:hover .info .title {
    color: #ff5722
  }
  
  .volantis-flink-list .flink-list-item .img {
    background: var(--card-bg);
    -webkit-box-shadow: var(--card-box-shadow);
    box-shadow: var(--card-box-shadow);
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -o-transition: all .3s;
    -ms-transition: all .3s;
    transition: all .3s;
    border-radius: 12px;
  }
  #article-container img {
    display: block;
    margin: 0 auto 20px;
    max-width: 100%;
    -webkit-transition: filter 375ms ease-in .2s;
    -moz-transition: filter 375ms ease-in .2s;
    -o-transition: filter 375ms ease-in .2s;
    -ms-transition: filter 375ms ease-in .2s;
    transition: filter 375ms ease-in .2s;
    border-radius: 12px;
    }
  
  .volantis-flink-list .flink-list-item .info img {
    width: 32px;
    height: 32px;
    pointer-events: none;
    border-radius: 16px !important;
    float: left;
    margin-right: 8px !important;
    -webkit-transition: height .5s ease, width .5s ease, margin .5s ease !important;
    -moz-transition: height .5s ease, width .5s ease, margin .5s ease !important;
    -o-transition: height .5s ease, width .5s ease, margin .5s ease !important;
    -ms-transition: height .5s ease, width .5s ease, margin .5s ease !important;
    transition: height .5s ease, width .5s ease, margin .5s ease !important;
  }
  .volantis-flink-list .flink-list-item {
    margin: 8px;
    width: calc(100% / 4 - 16px);
    display: block;
    line-height: 1.4;
    height: 100%;
  }
  /* 友链检查延迟美化(柳神) */
  /* 由苏晓河进行编写以及调整 */
  /* 时间：2025年3月7日 */
  .status-tag {
    position: absolute;
    top: 0;
    left: 0;
    padding: 2px 8px;
    margin: 5px;
    border-radius: 8px;
    font-size: 9px;
    color: #fff;
    font-weight: 700;
    transition: font-size .3s ease-out, width .3s ease-out, opacity .3s ease-out;
  }
  .flink-list-item:hover .status-tag {
    font-size: 0px;
    opacity: 0;
  }
  /* 固态颜色 */
  .status-tag-green {
    background-color: #005E00; /* 绿色 */
  }
  .status-tag-light-yellow {
    background-color: #FED101; /* 浅黄色 */
  }
  .status-tag-dark-yellow {
    background-color: #F0B606; /* 深黄色 */
  }
  .status-tag-red {
    background-color: #B90000; /* 红色 */
  }
  /* 友链检查延迟美化以及卡片美化(轻笑) */
  /* 由苏晓河进行编写以及调整 */
  /* 时间：2025年3月7日 */
  
  /* 1.美化延迟卡片 */
  .state {
    position: absolute;
    left: 10px;
    top: 5px;
    font-size: 12px;
    color: #ddd;
    border-radius: 6px;
    padding: 2px 5px;
    background: rgba(0, 0, 0, .5);
    transform: scale(.6);
    transform-origin: left top;
  }
  .site-card .img {
    border-radius: 11.5px !important;
  }
  .site-card-group.link-no-img .site-card .state {
    left: 3px;
    top: 3px;
  }
  /* 2.美化友链卡片 */
  .site-card-group.link-no-img .site-card {
    border: 1px solid #ddd;
    border-bottom: 1px solid #ddd !important;
    border-radius: 8px;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    -ms-border-radius: 8px;
    -o-border-radius: 8px;
    background: rgba(255, 255, 255, .35);
    transition: all .3s;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    height: 69px;
    overflow: hidden;
    padding: 0 .2em;
  }
  .site-card-group.link-no-img {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: -8px;
    align-items: stretch;
  }
  .site-card-group.link-no-img {
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: box;
    display: flex;
    -webkit-box-lines: multiple;
    -moz-box-lines: multiple;
    -o-box-lines: multiple;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: start;
    -moz-box-pack: start;
    -o-box-pack: start;
    -ms-flex-pack: start;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;
    margin: -8px;
    -webkit-box-align: stretch;
    -moz-box-align: stretch;
    -o-box-align: stretch;
    -ms-flex-align: stretch;
    -webkit-align-items: stretch;
    align-items: stretch;
  }
  .site-card-group.link-no-img .site-card .info img {
    margin: 3px 4px 0 0 !important;
    width: 50px;
    height: 50px;
  }
  .site-card .info {
    margin: 6px 5px 7px;
  }
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
  #flink-banners .banner-button-group .banner-button i {
    margin-right: 8px!important;
    font-size: 1rem;
  }
  #flink-banners {
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: box;
    display: flex;
    width: 100%;
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
  }
  #flink-banners .banner-top-box {
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
  #flink-banners .banner-button-group {
      position: absolute;
      right: 2rem;
      top: 2.5rem;
      display: -webkit-box;
      display: -moz-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: box;
      display: flex;
  }
  #flink-banners .banner-button-group .banner-button.secondary {
      color: var(--anzhiyu-fontcolor);
  }
  
  #flink-banners .banner-button-group .banner-button {
      color: var(--anzhiyu-card-bg);
  }
  #article-container a {
      color: var(--anzhiyu-fontcolor);
  }
  .banner-button.secondary {
      background: var(--anzhiyu-secondbg);
      border: var(--style-border-always);
      color: var(--anzhiyu-lighttext);
      margin-right: 1rem;
      -webkit-box-shadow: var(--anzhiyu-shadow-border);
      box-shadow: var(--anzhiyu-shadow-border);
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
  }
  #flink-banners .banner-button-group .banner-button i {
      margin-right: 8px;
      font-size: 1rem;
  }
  #skills-tags-group-all {
      display: flex;
      transform: rotate(0);
      transition: .3s;
  }
  #flink-banners #skills-tags-group-all .tags-group-wrapper {
      -webkit-animation: rowup 120s linear infinite;
      -moz-animation: rowup 120s linear infinite;
      -o-animation: rowup 120s linear infinite;
      -ms-animation: rowup 120s linear infinite;
      animation: rowup 120s linear infinite;
  }
  #skills-tags-group-all .tags-group-wrapper {
      margin-top: 40px;
      display: flex;
      flex-wrap: nowrap;
      animation: rowup 60s linear infinite;
  }
  #flink-banners #skills-tags-group-all .tags-group-wrapper {
      -webkit-animation: rowup 120s linear infinite;
      -moz-animation: rowup 120s linear infinite;
      -o-animation: rowup 120s linear infinite;
      -ms-animation: rowup 120s linear infinite;
      animation: rowup 120s linear infinite;
  }
  #skills-tags-group-all .tags-group-wrapper {
      margin-top: 40px;
      display: flex;
      flex-wrap: nowrap;
      animation: rowup 60s linear infinite;
  }
  #flink-banners #skills-tags-group-all .tags-group-icon {
      border-radius: 50%;
  }
  #skills-tags-group-all .tags-group-icon {
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
  }
  #flink-banners #skills-tags-group-all .tags-group-icon img {
      min-width: 100%;
      min-height: 100%;
      border-radius: 50%;
      object-fit: cover;
  }
  
  [data-theme=dark] #skills-tags-group-all .tags-group-icon img {
      filter: none;
  }
  #skills-tags-group-all .tags-group-icon img {
      width: 60px;
      margin: 0 auto !important;
  }
  #article-container img {
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
  #flink-banners #skills-tags-group-all .img-alt {
      display: none;
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
  #flink-banners #skills-tags-group-all .tags-group-icon {
      border-radius: 50%;
  }
  #skills-tags-group-all .tags-group-icon-pair .tags-group-icon:nth-child(even) {
      margin-top: 1rem;
      transform: translate(-60px);
  }
  #skills-tags-group-all .tags-group-icon {
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
  }
  /* 动画效果 */
  @keyframes rowup {
    0% {
        transform: translateX(0)
    }
  
    100% {
        transform: translateX(-50%)
    }
  }
```

### 友链页面特定触发
功能：识别json内容传到触发网页div元素中oclink值，并采用snankbar（提示框）中，通过修改网站名称以及指定的链接进行传送，可以在这个基础上添加几秒自动跳转。
在自定义js文件中添加以下js,并将链接替换为自己的链接（需要部署友链朋友圈）:

``` js [flink.js] lang="js"
function travelling() {
    fetch("https://moments.myxz.top/randomfriend").then((e=>e.json())).then((e=>{
            var t = e.link
                , o = "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + e.name + "」";
            // document.styleSheets[0].addRule(":root", "--bywind-snackbar-time:8000ms!important"),
            Snackbar.show({
                text: o,
                duration: 6000,
                pos: "top-center",
                actionText: "前往",
                onActionClick: function(e) {
                    $(e).css("opacity", 0),
                    window.open(t, "_blank")
                }
            })
        }
    ))
}
function addFriendLinksInFooter() {
    var a = document.getElementById("footer-random-friends-btn");
    if (a) {
        a.style.opacity = "0.2",
        a.style.transitionDuration = "0.3s",
        a.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
        for (var t = [], n = 0; friend_link_list.length && n < 3; ) {
            var s = Math.floor(Math.random() * friend_link_list.length)
              , s = friend_link_list.splice(s, 1)[0]
              , e = s.name
              , i = s.link
              , s = s.avatar;
            t.push({
                name: e,
                link: i,
                avatar: s
            }),
            n++
        }
        var m = t.map(function(a) {
            var t = a.name;
            return "<a class='footer-item' href='" + a.link + "' target='_blank' rel='noopener nofollow'>" + t + "</a>"
        }).join("");
        m += "<a class='footer-item' href='/link/'>更多</a>",
        document.getElementById("friend-links-in-footer").innerHTML = m,
        setTimeout(function() {
            a.style.opacity = "1"
        }, 300)
    }
}
```

## 后记
因为最近一些事情，比如：把stellar的wiki页面搬过来（无法使用，放弃），完善部分代码以及调整样式表整理资料，尝试使用css函数调用来简单化样式表（50%进度）。
大部分原因是因为没有什么可以写的导致断更以及部分小伙伴说标题与链接中的标题不匹配，这些也在优化调整。