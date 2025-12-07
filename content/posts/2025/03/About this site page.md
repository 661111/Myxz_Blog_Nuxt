---
title: 关于页面美化
description: 本文章以安知鱼的页面文件为模版进行大幅度修改，仿轻笑的关于页面的模块摆放以及调整CSS样式来进行细致魔改。
date: 2025-03-24 9:00
updated: 2025-03-25 11:20
image: https://sourceimage.s3.bitiful.net/img/default_cover_11.avif
categories: [博客魔改]
top_img: false
tags: [hexo, butterfly]
---

## 前言
本篇文章在安知鱼的文章基础上加入轻笑部分css，删减不必要的内容

## 实现

### 效果

::pic
---
src: https://sourceimage.s3.bitiful.net/post%2Fimg%2F%E5%85%B3%E4%BA%8E%E9%A1%B5%E9%9D%A2%E7%BE%8E%E5%8C%96%2F1.avif
# mirror: # 是否借助第三方图片加载服务，见源代码
caption: 关于页面展示
# zoom: false # 是否开启灯箱缩放，默认开启
---
::

### 覆盖pug文件内容
1. 覆盖 \themes\butterfly\layout\includes\page\about.pug（如果没有就新建）: 

```pug
#about-page
  .author-main
    style.
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
    .author-tag-left
      span.author-tag 💻 Like数码科技
      span.author-tag 🥣 干饭魂 干饭人
      span.author-tag 🕊 咕咕咕咕咕咕~
      span.author-tag 🧱 CV工程师
    .author-box
      span
      .author-img
        img.no-lightbox(src='https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg')
    .author-tag-right
      span.author-tag 吃饭不如碎觉 💤
      span.author-tag 乐观 积极 向上 🤝
      span.author-tag 专攻各种困难 🔨
      span.author-tag 人不狠话超多 💢
    .image-dot
  p.p.center.logo.large 关于本站
  .author-content
    .author-content-item.myInfoAndSayHello
      .title1 你好，很高兴认识你👋
      .title2                       
        | 我叫
        span.inline-word 陈志伟
      .title1
        | 是一名 前端工程师、学生、独立开发者、
        span.inline-word 博主
    .aboutsiteTips.author-content-item
      .author-content-item-tips 追求
      h2
        | 源于
        br
        | 热爱而去
        span.inline-word 感受
        .mask
          span.first-tips 学习
          |
          span 生活
          |
          span(data-up) 程序
          |
          span(data-show) 体验

  .hello-about
    .cursor(style='translate:none;rotate:none;scale:none;transform:translate(721px,180px)')
    .shapes
      .shape.shape-1(style='translate:none;rotate:none;scale:none;transform:translate(721px,180px)')
      .shape.shape-2(style='translate:none;rotate:none;scale:none;transform:translate(721px,180px)')
      .shape.shape-3(style='translate:none;rotate:none;scale:none;transform:translate(721px,180px)')
    .content
      h1 Hello there!

  .author-content
    .about-statistic.author-content-item
      .card-content
        .author-content-item-tips 数据
        span.author-content-item-title 访问统计
        #statistic
        .post-tips
          | 统计信息来自
          a(href='https://invite.51.la/1NzKqTeb?target=V6', target='_blank', rel='noopener nofollow') 51la网站统计
        .banner-button-group
          a.banner-button(onclick='pjax.loadUrl("/archives/")', data-pjax-state)
            i.fas.fa-circle-right
            |
            span.banner-button-text 文章隧道
    .author-content-item-group.column.mapAndInfo
      .author-content-item.map.single
        span.map-title
          | 我现在住在
          b 中国，长沙市
      .author-content-item.selfInfo.single
        div
          span.selfInfo-title 生于
          |
          span.selfInfo-content#selfInfo-content-year(style='color:#43a6c6') 2002
        div
          span.selfInfo-title 湖南信息学院
          |
          span.selfInfo-content(style='color:#c69043') 软件工程
        div
          span.selfInfo-title 现在职业
          |
          span.selfInfo-content(style='color:#b04fe6') 

  .author-content
    .author-content-item.maxim
      .author-content-item-tips 座右铭
      span.maxim-title
        span(style='opacity:.6;margin-bottom:8px') 生活明朗，
        |
        span 万物可爱。
    .author-content-item.myphoto
      img.author-content-img.no-lightbox(alt='自拍', src='https://img02.anheyu.com/adminuploads/1/2022/09/24/632e9643611ec.jpg')

  .author-content
    .author-content-item.like-technology
      .card-content
        .author-content-item-tips 关注偏好
        span.author-content-item-title 数码科技
        .content-bottom
          .tips 手机、电脑软硬件
    .author-content-item.game-yuanshen
      .card-content
        .author-content-item-tips 爱好游戏
        span.author-content-item-title 原神
        .content-bottom
          .icon-group
            .loading-bar(role='presentation', aria-hidden='true')
              img.no-lightbox(src='https://yuanshen.site/imgs/loading-bar.png', alt='Loading...', longdesc='https://ys.mihoyo.com/main/')
          .tips.game-yuanshen-uid UID: 125766904

  .author-content
    .create-site-post.author-content-item.single
      .author-content-item-tips 心路历程
      | 欢迎来到我的博客 😝，这里是我记笔记的地方 🙌，目前就读于长沙
      strong 湖南信息学院
      | 的
      strong 软件工程
      | 专业，虽然有时候常常会忘记更新笔记，咕咕 ✋~ 但是记笔记真的是一个很棒的习惯 💪，能把学下来的知识进行积累，沉淀，有一句话说的好，能教给别人的知识，才是真正学会了的知识 ⚡ 每周我都会尽量进行更新 ☁️，如果没更的话，可能是我忘了，也可能是我在钻研某个东西的时候太入迷了

  .author-content
    .author-content-item.single.reward
      .author-content-item-tips 致谢
      span.author-content-item-title 赞赏名单
      .author-content-item-description 感谢因为有你们，让我更加有创作的动力。
        each i in site.data.reward
          - let rawData = [...i.reward_list]
          .reward-list-all
            - let reward_list_amount = i.reward_list.sort((a,b)=>b.amount -  a.amount)
            each item, index in reward_list_amount
              .reward-list-item
                .reward-list-item-name=item.name
                .reward-list-bottom-group
                  if item.amount >= 50
                    .reward-list-item-money(style='background:var(--anzhiyu-yellow)')=`¥${item.amount}`
                  else
                    .reward-list-item-money=`¥${item.amount + (item.suffix ? item.suffix : "")}`
                  .datatime.reward-list-item-time(datatime=item.datatime)=new Date(item.datatime).toISOString().slice(0, -14)
          .reward-list-updateDate
            | 最新更新时间：
            time.datatime.reward-list-updateDate-time(datatime=rawData[0].datatime)=new Date(rawData[0].datatime).toISOString().slice(0, -14)
      .post-reward
        style.
          .post-reward .reward-button {
            display: inline-block!important;
            adding: .2rem 2rem!important;
            ound: var(--btn-bg)!important;
            color: var(--btn-color)!important;
            cursor: pointer!important;
            -webkit-transition: all .4s!important;
            -moz-transition: all .4s!important;
            -o-transition: all .4s!important;
            -ms-transition: all .4s;
            transition: all .4s;
          }
        .reward-main
          ul.reward-all
            li.reward-item
              a.about-reward(arget="_blank" data-pjax-state="")
                img.entered.loaded.post-qr-code-img(alt="微信" data-lazy-src="https://sourceimage.s3.bitiful.net/pay/weixin.jpg" data-ll-status="loaded" loading="lazy" src="https://sourceimage.s3.bitiful.net/pay/weixin.jpg")
              .post-qr-code-desc 微信
            li.reward-item
              a.about-reward(target="_blank")
                img.entered.loaded.post-qr-code-img(alt="支付宝" data-lazy-src="https://sourceimage.s3.bitiful.net/pay/zfb.png" data-ll-status="loaded" loading="lazy" src="https://sourceimage.s3.bitiful.net/pay/zfb.png")
              .post-qr-code-desc 支付宝
        button.reward-button.tip-button
          span.tip-button__text 投 喂

script(src="https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/gsap/3.9.1/gsap.min.js")
script.
  (() => {
    function isInViewPortOfOne(el) {
      if (!el) return;
      const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      const offsetTop = el.offsetTop;
      const scrollTop = document.documentElement.scrollTop;
      const top = offsetTop - scrollTop;
      return top <= viewPortHeight;
    }
    fetch('https://v6-widget.51.la/v6/527574/quote.js').then(res => res.text()).then((data) => {
        let title = ['最近活跃', '今日人数', '今日访问', '昨日人数', '昨日访问', '本月访问', '总访问量']
        let num = data.match(/(<\/span><span>).*?(\/span><\/p>)/g)

        num = num.map((el) => {
          let val = el.replace(/(<\/span><span>)/g, '')
          let str = val.replace(/(<\/span><\/p>)/g, '')
          return str
        })

        let statisticEl = document.getElementById('statistic')

        // 自定义不显示哪个或者显示哪个，如下为不显示 最近活跃访客 和 总访问量
        let statistic = []
        for (let i = 0; i < num.length; i++) {
            if (!statisticEl) return
            if (i == 0 || i == num.length - 1) continue;
            statisticEl.innerHTML += '<div><span>' + title[i] + '</span><span id='+ title[i] + '>' + num[i] + '</span></div>'
            queueMicrotask(()=> {
              statistic.push(new CountUp(title[i], 0, num[i], 0, 2, {
                  useEasing: true,
                  useGrouping: true,
                  separator: ',',
                  decimal: '.',
                  prefix: '',
                  suffix: ''
              }))
            })
        }

        function statisticUP () {
          let statisticElment = document.querySelector('.about-statistic.author-content-item');
          if(isInViewPortOfOne(statisticElment)) {
            for (let i = 0; i < num.length; i++) {
              if (i == 0 || i == num.length - 1) continue;
              statistic[i-1].start();
            }
            document.removeEventListener('scroll', throttleStatisticUP);
          }
        }

        const selfInfoContentYear = new CountUp('selfInfo-content-year', 0, 2002, 0, 2, {
          useEasing: true,
          useGrouping: false,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
        })

        function scrollSelfInfoContentYear() {
          let selfInfoContentYearElment = document.querySelector('.author-content-item.selfInfo.single');
          if (selfInfoContentYearElment && isInViewPortOfOne(selfInfoContentYearElment)) {
            selfInfoContentYear.start()
            document.removeEventListener('scroll', throttleScrollSelfInfoContentYear);
          }
        }
        const throttleStatisticUP = btf.throttle(statisticUP, 200)
        document.addEventListener('scroll', throttleStatisticUP, {passive: true})

        const throttleScrollSelfInfoContentYear = btf.throttle(scrollSelfInfoContentYear, 200)
        document.addEventListener('scroll', throttleScrollSelfInfoContentYear, {passive: true})
    });

    var pursuitInterval = null;
      pursuitInterval = setInterval(function () {
        const show = document.querySelector('span[data-show]')
        const next = show.nextElementSibling || document.querySelector('.first-tips')
        const up = document.querySelector('span[data-up]')

        if (up) {
          up.removeAttribute('data-up')
        }

        show.removeAttribute('data-show')
        show.setAttribute('data-up', '')

        next.setAttribute('data-show', '')
      }, 2000)

      document.addEventListener('pjax:send', function(){
        clearInterval(pursuitInterval);
      });

      var helloAboutEl = document.querySelector('.hello-about')
      helloAboutEl.addEventListener("mousemove", evt => {
        const mouseX = evt.offsetX;
        const mouseY = evt.offsetY;
        gsap.set(".cursor", {
          x: mouseX,
          y: mouseY,
        })

        gsap.to(".shape", {
          x: mouseX,
          y: mouseY,
          stagger: -0.1
        })
      })
  })()
```

### 添加css
1. 这里使用的是来自于安知鱼的css代码，为了可以后续方便一些，所以写在这里

```css
#gitcalendar {
    margin: 0 auto;
    border-radius: 24px;
    background: var(--anzhiyu-card-bg);
    border: var(--style-border-always);
    box-shadow: var(--anzhiyu-shadow-border);
    position: relative;
    padding: 1rem 2rem;
    overflow: hidden;
  }
  
  #page:has(#about-page) {
    border: 0;
    box-shadow: none !important;
    padding: 0 !important;
    background: transparent !important;
  }
  
  #page:has(#about-page) .page-title {
    display: none;
  }
  
  .page:has(#about-page) #footer-wrap {
    opacity: 1;
    overflow: visible;
    height: auto !important;
    min-height: 16px;
    color: #666;
  }
  
  #about-page .author-box {
    position: relative;
  }
  #about-page .author-box .author-img {
    margin: auto;
    border-radius: 50%;
    overflow: hidden;
    width: 180px;
    height: 180px;
  }
  #about-page .author-box .author-img img {
    border-radius: 50%;
    overflow: hidden;
    width: 180px;
    height: 180px;
  }
  
  #about-page .author-box .image-dot {
    width: 45px;
    height: 45px;
    background: #6bdf8f;
    position: absolute;
    border-radius: 50%;
    border: 6px solid var(--anzhiyu-background);
    top: 50%;
    left: 50%;
    transform: translate(35px, 45px);
  }
  
  .author-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin-top: 1rem;
  }
  
  #about-page .myInfoAndSayHello {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--anzhiyu-white);
    background: linear-gradient(120deg, #5b27ff 0, #00d4ff 100%);
    background-size: 200%;
    animation: gradient 15s ease infinite;
    width: 59%;
  }
  
  .author-content-item {
    width: 49%;
    border-radius: 24px;
    background: var(--anzhiyu-card-bg);
    border: var(--style-border-always);
    box-shadow: var(--anzhiyu-shadow-border);
    position: relative;
    padding: 1rem 2rem;
    overflow: hidden;
  }
  
  #about-page .myInfoAndSayHello .title1 {
    opacity: 0.8;
    line-height: 1.3;
  }
  
  #about-page .myInfoAndSayHello .title2 {
    font-size: 36px;
    font-weight: 700;
    line-height: 1.1;
    margin: 0.5rem 0;
  }
  .inline-word {
    word-break: keep-all;
    white-space: nowrap;
  }
  
  #about-page .myInfoAndSayHello .title1 {
    opacity: 0.8;
    line-height: 1.3;
  }
  
  .author-content-item.aboutsiteTips {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    width: 39%;
  }
  
  .aboutsiteTips h2 {
    margin-right: auto;
    font-size: 36px;
    font-family: Helvetica;
    line-height: 1.06;
    letter-spacing: -0.02em;
    color: var(--font-color);
    margin-top: 0;
  }
  
  .aboutsiteTips .mask {
    height: 36px;
    position: relative;
    overflow: hidden;
    margin-top: 4px;
  }
  .aboutsiteTips .mask span {
    display: block;
    box-sizing: border-box;
    position: absolute;
    top: 36px;
    padding-bottom: var(--offset);
    background-size: 100% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-repeat: no-repeat;
  }
  .aboutsiteTips .mask span[data-show] {
    transform: translateY(-100%);
    transition: 0.5s transform ease-in-out;
  }
  .aboutsiteTips .mask span[data-up] {
    transform: translateY(-200%);
    transition: 0.5s transform ease-in-out;
  }
  .aboutsiteTips .mask span:nth-child(1) {
    background-image: linear-gradient(45deg, #0ecffe 50%, #07a6f1);
  }
  .aboutsiteTips .mask span:nth-child(2) {
    background-image: linear-gradient(45deg, #18e198 50%, #0ec15d);
  }
  .aboutsiteTips .mask span:nth-child(3) {
    background-image: linear-gradient(45deg, #8a7cfb 50%, #633e9c);
  }
  .aboutsiteTips .mask span:nth-child(4) {
    background-image: linear-gradient(45deg, #fa7671 50%, #f45f7f);
  }
  @media screen and (max-width: 768px) {
    .author-content-item.map {
      margin-bottom: 0;
    }
  }
  #about-page .about-statistic {
    min-height: 380px;
    width: 39%;
    background: url(https://img02.anheyu.com/adminuploads/1/2022/09/23/632d634f8376d.jpg) no-repeat top;
    background-size: cover;
    color: var(--anzhiyu-white);
    overflow: hidden;
  }
  #about-page .about-statistic::after {
    box-shadow: 0 -159px 173px 71px #0c1c2c inset;
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .author-content-item .card-content {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem;
  }
  
  .author-content-item .card-content .author-content-item-title {
    margin-bottom: 0.5rem;
  }
  .author-content-item .author-content-item-title {
    font-size: 36px;
    font-weight: 700;
    line-height: 1;
  }
  #statistic {
    font-size: 16px;
    border-radius: 15px;
    width: 100%;
    color: var(--anzhiyu-white);
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
  #statistic div span:first-child {
    opacity: 0.8;
    font-size: 12px;
  }
  #statistic div span:last-child {
    font-weight: 700;
    font-size: 34px;
    line-height: 1;
    white-space: nowrap;
  }
  #statistic div {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 50%;
    margin-bottom: 0.5rem;
  }
  
  .post-tips {
    color: var(--anzhiyu-gray);
    font-size: 14px;
    position: absolute;
    bottom: 1rem;
    left: 2rem;
  }
  .post-tips a {
    color: var(--anzhiyu-gray) !important;
    border: none !important;
  }
  .author-content-item .card-content .banner-button-group {
    position: absolute;
    bottom: 1.5rem;
    right: 2rem;
  }
  .author-content-item .card-content .banner-button-group .banner-button {
    height: 40px;
    width: 124px;
    border-radius: 20px;
    justify-content: center;
    background: var(--anzhiyu-card-bg);
    color: var(--font-color);
    display: flex;
    align-items: center;
    z-index: 1;
    transition: 0.3s;
    cursor: pointer;
    border-bottom: 0 !important;
  }
  .author-content-item .card-content .banner-button-group .banner-button i {
    margin-right: 8px;
    font-size: 1rem;
  }
  #about-page .author-content-item .card-content .banner-button-group .banner-button i {
    font-size: 1.5rem;
  }
  
  .author-content-item .card-content .banner-button-group .banner-button:hover {
    background: var(--anzhiyu-main);
    color: var(--anzhiyu-white);
    border-radius: 20px !important;
  }
  .author-content-item.personalities {
    position: relative;
    width: 59%;
  }
  
  .author-content-item.personalities .image {
    position: absolute;
    right: 30px;
    top: 10px;
    width: 220px;
    transition: transform 2s cubic-bezier(0.13, 0.45, 0.21, 1.02);
  }
  .author-content-item.personalities .image img {
    display: block;
    margin: 0 auto 20px;
    max-width: 100%;
    transition: filter 375ms ease-in 0.2s;
  }
  .author-content-item.personalities:hover .image {
    transform: rotate(-10deg);
  }
  .author-content-item.myphoto {
    height: 60%;
    position: relative;
    overflow: hidden;
    min-height: 200px;
    max-height: 400px;
    width: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .author-content-item.myphoto img {
    position: absolute;
    min-width: 100%;
    object-fit: cover;
    transition: 0.6s;
    animation: coverIn 2s ease-out forwards;
    transition: transform 2s ease-out !important;
  }
  .author-content-item.myphoto:hover img {
    transform: scale(1.1);
  }
  .author-content-item:hover .card-background-icon {
    transform: rotate(20deg);
  }
  .author-content-item.personalities .title2 {
    font-size: 36px;
    font-weight: 700;
    line-height: 1.1;
  }
  
  .author-content-item.map {
    background: url(https://img02.anheyu.com/adminuploads/1/2022/09/24/632e6f48981d8.jpg) no-repeat center;
    min-height: 160px;
    max-height: 400px;
    position: relative;
    overflow: hidden;
    margin-bottom: 0.5rem;
    height: 60%;
    background-size: 100%;
    transition: 1s ease-in-out;
  }
  [data-theme="dark"] .author-content-item.map {
    background: url(https://img02.anheyu.com/adminuploads/1/2022/09/26/6330ebf1f3e65.jpg) no-repeat center;
    background-size: 100%;
  }
  
  .author-content-item.single {
    width: 100%;
  }
  
  .author-content-item.map .map-title {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: var(--anzhiyu-maskbg);
    padding: 0.5rem 2rem;
    backdrop-filter: saturate(180%) blur(20px);
    -webkit-backdrop-filter: blur(20px);
    transition: 1s ease-in-out;
    font-size: 20px;
  }
  .author-content-item.map .map-title b {
    color: var(--font-color);
  }
  .author-content-item.selfInfo {
    display: flex;
    min-height: 100px;
    max-height: 400px;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    height: -webkit-fill-available;
    height: 40%;
  }
  .author-content-item.selfInfo div {
    display: flex;
    flex-direction: column;
    margin: 0.5rem 2rem 0.5rem 0;
  }
  .author-content-item.selfInfo .selfInfo-title {
    opacity: 0.8;
    font-size: 12px;
    line-height: 1;
    margin-bottom: 8px;
  }
  .author-content-item.selfInfo .selfInfo-content {
    font-weight: 700;
    font-size: 34px;
    line-height: 1;
  }
  .author-content-item-group.column.mapAndInfo {
    width: 59%;
  }
  .author-content-item.map:hover {
    background-size: 120%;
    transition: 4s ease-in-out;
    background-position-x: 0;
    background-position-y: 36%;
  }
  .author-content-item.map:hover .map-title {
    bottom: -100%;
  }
  .author-content-item-group.column {
    display: flex;
    flex-direction: column;
    width: 49%;
    justify-content: space-between;
  }
  
  .post-tips a:hover {
    color: var(--anzhiyu-main) !important;
    background: none !important;
  }
  
  .author-content-item.single.reward .reward-list-updateDate {
    color: var(--anzhiyu-gray);
    font-size: 14px;
  }
  .tip-button {
    border: 0;
    border-radius: 8px;
    padding: .2rem 1.5rem;
    font-size: 20px;
    font-weight: 600;
    height: 2.6rem;
    margin-bottom: -4rem;
    outline: 0;
    position: relative;
    top: 0;
    transform-origin: 0 100%;
    transition: transform 50ms ease-in-out;
    width: auto;
    -webkit-tap-highlight-color: transparent;
  }
  .coin::before,
  .coin__back,
  .coin__back::after,
  .coin__front,
  .coin__front::after,
  .coin__middle {
    border-radius: 50%;
    box-sizing: border-box;
    height: 100%;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 3;
  }
  .coin-wrapper {
    background: 0 0;
    bottom: 0;
    height: 18rem;
    left: 0;
    opacity: 1;
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    transform: none;
    transform-origin: 50% 100%;
    transition: opacity 0.2s linear 0.1s, transform 0.3s ease-out;
    width: 100%;
  }
  .coin__front::after {
    background: rgba(0, 0, 0, 0.2);
    content: "";
    opacity: var(--front-y-multiplier);
  }
  .coin__back::after {
    background: rgba(0, 0, 0, 0.2);
    content: "";
    opacity: var(--back-y-multiplier);
  }
  .coin__middle {
    background: #737c99;
    transform: translateY(calc(var(--middle-y-multiplier) * 0.3181818182rem / 2)) scaleY(var(--middle-scale-multiplier));
  }
  .coin::before {
    background: radial-gradient(circle at 25% 65%, transparent 50%, rgba(255, 255, 255, 0.9) 90%), linear-gradient(55deg, transparent
          calc(var(--shine-bg-multiplier) + 0), #e9f4ff calc(var(--shine-bg-multiplier) + 0), transparent calc(var(
                --shine-bg-multiplier
              ) + 50%));
    content: "";
    opacity: var(--shine-opacity-multiplier);
    transform: translateY(calc(var(--middle-y-multiplier) * 0.3181818182rem / -2)) scaleY(var(--middle-scale-multiplier))
      rotate(calc(var(--coin-rotation-multiplier) * 1deg));
    z-index: 10;
  }
  
  .coin {
    --front-y-multiplier: 0;
    --back-y-multiplier: 0;
    --coin-y-multiplier: 0;
    --coin-x-multiplier: 0;
    --coin-scale-multiplier: 0;
    --coin-rotation-multiplier: 0;
    --shine-opacity-multiplier: 0.4;
    --shine-bg-multiplier: 50%;
    bottom: calc(var(--coin-y-multiplier) * 1rem - 3.5rem);
    height: 3.5rem;
    margin-bottom: 3.05rem;
    position: absolute;
    right: calc(var(--coin-x-multiplier) * 34% + 16%);
    transform: translateX(50%) scale(calc(0.4 + var(--coin-scale-multiplier))) rotate(calc(var(
              --coin-rotation-multiplier
            ) * -1deg));
    transition: opacity 0.1s linear 0.2s;
    width: 3.5rem;
    z-index: 3;
  }
  
  .coin__back {
    background: radial-gradient(circle at 50% 50%, transparent 50%, rgba(115, 124, 153, 0.4) 54%, #c2cadf 54%),
      radial-gradient(circle at 50% 40%, #fcfaf9 23%, transparent 23%), radial-gradient(circle at 50% 100%, #fcfaf9 35%, transparent
          35%);
    background-color: #8590b3;
    background-size: 100% 100%;
    transform: translateY(calc(var(--back-y-multiplier) * 0.3181818182rem / 2)) scaleY(var(--back-scale-multiplier));
  }
  .coin__front {
    background: radial-gradient(circle at 50% 50%, transparent 50%, rgba(115, 124, 153, 0.4) 54%, #c2cadf 54%),
      linear-gradient(210deg, #8590b3 32%, transparent 32%), linear-gradient(150deg, #8590b3 32%, transparent 32%),
      linear-gradient(to right, #8590b3 22%, transparent 22%, transparent 78%, #8590b3 78%), linear-gradient(
        to bottom,
        #fcfaf9 44%,
        transparent 44%,
        transparent 65%,
        #fcfaf9 65%,
        #fcfaf9 71%,
        #8590b3 71%
      ), linear-gradient(to right, transparent 28%, #fcfaf9 28%, #fcfaf9 34%, #8590b3 34%, #8590b3 40%, #fcfaf9 40%, #fcfaf9
          47%, #8590b3 47%, #8590b3 53%, #fcfaf9 53%, #fcfaf9 60%, #8590b3 60%, #8590b3 66%, #fcfaf9 66%, #fcfaf9 72%, transparent
          72%);
    background-color: #8590b3;
    background-size: 100% 100%;
    transform: translateY(calc(var(--front-y-multiplier) * 0.3181818182rem / 2)) scaleY(var(--front-scale-multiplier));
  }
  .tip-button__text {
    color: #fff;
    opacity: 1;
    position: relative;
    transition: opacity 0.1s linear 0.5s;
    z-index: 3;
  }
  .author-content .post-reward .reward-main .reward-all:before {
    top: -11px;
    bottom: auto;
  }
  #about-page .post-reward .reward-item a:hover {
    background: transparent !important;
  }
  #about-page .post-reward .reward-item a {
    border-bottom: none !important;
  }
  #about-page .post-reward .reward-item a img {
    margin-bottom: 0 !important;
  }
  #about-page .post-reward .reward-main .reward-all {
    border-radius: 10px;
    padding: 20px 10px !important;
  }
  .post-reward .reward-main .reward-all .reward-item {
    padding: 0 8px !important;
  }
  .post-reward .reward-main .reward-all li.reward-item::before {
    content: none !important;
  }
  .post-reward .reward-main .reward-all:after {
    content: none !important;
  }
  .author-content-item.maxim {
    font-size: 36px;
    font-weight: 700;
    line-height: 1.1;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    width: 53%;
  }
  .author-content-item .author-content-item-tips {
    opacity: 0.8;
    font-size: 12px;
    margin-bottom: 0.5rem;
  }
  .author-content-item.maxim .maxim-title {
    display: flex;
    flex-direction: column;
  }
  .author-content-item.buff {
    height: 200px;
    font-size: 36px;
    font-weight: 700;
    line-height: 1.1;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    background: linear-gradient(120deg, #ff27e8 0, #ff8000 100%);
    color: var(--anzhiyu-white);
    background-size: 200%;
    animation: gradient 15s ease infinite;
    min-height: 200px;
    height: fit-content;
    width: 59%;
  }
  .author-content-item.buff .card-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .author-content-item.buff .buff-title {
    display: flex;
    flex-direction: column;
  }
  .card-background-icon {
    font-size: 12rem;
    opacity: 0.2;
    position: absolute;
    right: 0;
    bottom: -40%;
    transform: rotate(30deg);
    transition: 2s ease-in-out;
  }
  .author-content-item.game-yuanshen {
    background: url(https://img02.anheyu.com/adminuploads/1/2022/12/19/63a079ca63c8a.webp) no-repeat top;
    background-size: cover;
    min-height: 300px;
    overflow: hidden;
    color: var(--anzhiyu-white);
    width: 49%;
  }
  
  .author-content-item .content-bottom {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .author-content-item .content-bottom .icon-group {
    display: flex;
    position: relative;
  }
  .author-content-item .content-bottom .icon-group i {
    display: inline-block;
    width: 143px;
    height: 18px;
    margin-right: 0.5rem;
  }
  .icon-pos-mid {
    background: url(https://img02.anheyu.com/adminuploads/1/2022/09/25/632fb9cecfc8c.png);
  }
  .author-content-item.game-yuanshen::after {
    box-shadow: 0 -69px 203px 11px #575d8b inset;
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  
  .author-content-item.comic-content {
    width: 39%;
    background: url(https://npm.elemecdn.com/anzhiyu-blog@1.1.6/img/post/common/violet.jpg) no-repeat top;
    background-size: cover;
    min-height: 300px;
    overflow: hidden;
    color: violet;
  }
  .author-content-item.comic-content::after {
    box-shadow: 0 -48px 203px 11px #fbe9b8 inset;
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  
  .author-content-item.like-technology {
    background: url(https://img02.anheyu.com/adminuploads/1/2022/09/24/632f0dd8f33c6.webp) no-repeat;
    background-size: cover;
    min-height: 230px;
    color: var(--anzhiyu-white);
    width: 49%!important;
  }
  
  .author-content-item.like-music {
    background: url(https://p2.music.126.net/Mrg1i7DwcwjWBvQPIMt_Mg==/79164837213438.jpg) no-repeat top;
    background-size: cover;
    min-height: 400px;
    color: var(--anzhiyu-white);
    overflow: hidden;
  }
  
  .author-content-item .card-content .banner-button-group {
    position: absolute;
    bottom: 1.5rem;
    right: 2rem;
  }
  
  .author-content-item.like-music::after {
    box-shadow: 0 -69px 203px 11px #453e38 inset;
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  
  @media screen and (max-width: 768px) {
    #gitcalendar {
      display: none;
    }
    [data-theme="dark"] .author-content-item .card-content .banner-button-group .banner-button {
      color: var(--anzhiyu-black) !important;
    }
    .author-content-item .card-content .banner-button-group .banner-button:hover {
      background: none !important;
    }
    .author-content-item.game-yuanshen .content-bottom {
      padding-bottom: 10px;
    }
    .author-content-item.game-yuanshen .game-yuanshen-uid {
      display: none;
    }
    .author-content {
      margin-top: 0;
    }
    .author-content-item {
      width: 100% !important;
      margin-top: 1rem;
      padding: 1rem;
    }
    .author-content-item.map {
      margin-bottom: 0;
    }
    .author-content-item-group.column {
      width: 100% !important;
    }
    .author-content-item.selfInfo {
      height: 95%;
    }
    .author-content-item.personalities {
      height: 170px;
    }
    .post-tips {
      left: auto;
    }
    .author-content-item.personalities .image {
      width: 90px;
    }
    .site-card-group > a {
      width: 100% !important;
    }
    .post-reward {
      margin-top: 2px !important;
    }
    .reward-list-item {
      width: 100% !important;
    }
    .layout > div:first-child:not(.recent-posts) {
      /* border-radius: 0; */
      padding: 0 1rem !important;
      box-shadow: none !important;
      background: var(--anzhiyu-background);
    }
    .author-content-item .card-content .banner-button-group .banner-button-text {
      display: none;
    }
    .author-content-item .card-content .banner-button-group {
      right: 1rem;
      bottom: 1rem;
    }
    .author-content-item .card-content .banner-button-group .banner-button {
      background: 0 0;
      padding: 0;
    }
    .author-content-item .card-content .banner-button-group .banner-button i {
      margin-right: 0;
      font-size: 1.5rem;
      background: white;
      border-radius: 50%;
      padding: 6px;
      margin-left: 80px;
    }
    .author-content-item .card-content .banner-button-group .banner-button:hover i {
      background: var(--anzhiyu-background) !important;
      color: var(--anzhiyu-theme);
    }
    #selfInfo-content-year {
      width: 90px;
    }
  }
  
  @media screen and (min-width: 768px) and (max-width: 896px) {
    .author-content-item.like-music .content-bottom .tips {
      display: none;
    }
  }
  
  /* 赞赏的css */
  
  .reward-list-all {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    margin-left: -0.25rem;
    margin-right: -0.25rem;
  }
  
  .reward-list-item {
    padding: 1rem;
    border-radius: 12px;
    border: var(--style-border-always);
    width: calc((100% / 3) - 0.5rem);
    margin: 0 0.25rem 0.5rem 0.25rem;
    box-shadow: var(--anzhiyu-shadow-border);
  }
  
  .reward-list-item .reward-list-item-name {
    font-size: 1rem;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0.5rem;
  }
  
  .reward-list-item .reward-list-bottom-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .reward-list-item .reward-list-item-money {
    padding: 4px;
    background: var(--font-color);
    color: var(--card-bg);
    font-size: 12px;
    line-height: 1;
    border-radius: 4px;
    margin-right: 4px;
    white-space: nowrap;
  }
  
  .reward-list-item .reward-list-item-time {
    font-size: 12px;
    color: var(--anzhiyu-secondtext);
    white-space: nowrap;
  }
```

```css
.author-content-item.careers {
    min-height: 400px;
  }
  .author-content-item.careers .careers-group {
    margin-top: 12px;
  }
  .author-content-item.careers .careers-item {
    display: flex;
    align-items: center;
  }
  .author-content-item.careers .careers-item .circle {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    border-radius: 16px;
  }
  .author-content-item.careers .careers-item .name {
    color: var(--anzhiyu-secondtext);
  }
  .author-content-item.careers .careers-item {
    display: flex;
    align-items: center;
  }
  .author-content-item.careers .careers-item .circle {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    border-radius: 16px;
  }
  .author-content-item.careers .careers-item .name {
    color: var(--anzhiyu-secondtext);
  }
  .author-content-item.careers img {
    position: absolute;
    left: 0;
    bottom: 20px;
    width: 100%;
    transition: 0.6s;
  }
```

```css
:root {
    --loadingbar-background-color: #2c2b30;
    --loadingbar-prospect-color: #ece5d8;
  }
  
  /* html.dark body {
    background-color: #161d22;
  } */
  
  .loading-bar {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 62.5px;
    transform: translate(-25%, -50%) scale(0.5);
    transition: all 0.5s;
    user-select: none;
    overflow: hidden;
  }
  
  .loading-bar img {
    position: absolute;
    top: 500px;
    left: 0;
    filter: drop-shadow(0 -500px 0 var(--loadingbar-background-color));
  }
  
  .loading-bar::after {
    content: "";
    position: absolute;
    top: 500px;
    left: 0;
    filter: drop-shadow(0 -500px 0 var(--loadingbar-prospect-color));
    width: 500px;
    height: 62.5px;
    background: url("https://yuanshen.site/imgs/loading-bar.png") no-repeat left 100%;
    background-size: 500px 62.5px;
    background-position-x: 0;
  }
  .author-content-item.game-yuanshen:hover .loading-bar::after {
    animation: loading-bar 3.5s cubic-bezier(0.28, 0.11, 0.32, 1) infinite forwards;
  }
  
  @media screen and (max-width: 719px) {
    .loading-bar .loading-bar {
      display: none;
    }
  }
  
  @media screen and (max-width: 719px) and (orientation: landscape) {
    .loading-bar .loading-bar {
      display: block !important;
      transform: translate(-50%, -50%) scale(0.7) !important;
    }
  }
  
  @supports not (filter: drop-shadow(0 0 0 #fff)) {
    .loading-bar:before {
      content: "Your browser does not support the animation";
    }
  }
  
  @keyframes loading-bar {
    0% {
      width: 0;
      background-size: 500px 62.5px;
    }
    16.6% {
    }
    33.2% {
    }
    49.8% {
    }
    66.4% {
    }
    83% {
      width: 475px;
    }
    83.1% {
      width: 475px;
    }
    83.2% {
      width: 475px;
    }
    83.3% {
      width: 475px;
    }
    83.4% {
      width: 475px;
    }
    83.5% {
      width: 475px;
    }
    83.6% {
      width: 475px;
    }
    83.7% {
      width: 475px;
    }
    83.8% {
      width: 475px;
    }
    83.9% {
      width: 475px;
    }
    84% {
      width: 475px;
    }
    85% {
      width: 475px;
    }
    86% {
      width: 475px;
    }
    87% {
      width: 475px;
    }
    100% {
      width: 500px;
    }
  }
```

```css
.hello-about {
    margin: 20px auto;
    border-radius: 24px;
    background: var(--anzhiyu-card-bg);
    border: var(--style-border-always);
    box-shadow: var(--anzhiyu-shadow-border);
    position: relative;
    overflow: hidden;
    user-select: none;
  }
  
  .shapes {
    position: relative;
    height: 315px;
    width: 100%;
    background: #2128bd;
    overflow: hidden;
  }
  
  .shape {
    will-change: transform;
    position: absolute;
    border-radius: 50%;
  }
  
  .shape.shape-1 {
    background: #005ffe;
    width: 650px;
    height: 650px;
    margin: -325px 0 0 -325px;
  }
  
  .shape.shape-2 {
    background: #ffe5e3;
    width: 440px;
    height: 440px;
    margin: -220px 0 0 -220px;
  }
  
  .shape.shape-3 {
    background: #ffcc57;
    width: 270px;
    height: 270px;
    margin: -135px 0 0 -135px;
  }
  
  .hello-about .content {
    top: 0;
    left: 0;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 315px;
    width: 100%;
    background: #fff;
    mix-blend-mode: screen;
  }
  [data-theme="dark"] .hello-about .content {
    background: transparent;
  }
  [data-theme="dark"] .hello-about h1 {
    color: var(--anzhiyu-white);
  }
  
  .hello-about h1 {
    font-size: 200px;
    color: #000;
    margin: 0;
    text-align: center;
    font: inherit;
    vertical-align: baseline;
    line-height: 1;
    font-size: calc((0.0989119683 * 100vw + (58.5558852621px)));
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (min-width: 419px) {
    .hello-about h1 {
      font-size: calc((0.0989119683 * 100vw + (58.5558852621px)));
    }
  }
  
  .cursor {
    position: absolute;
    background: #2128bd;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border-radius: 50%;
    will-change: transform;
    user-select: none;
    pointer-events: none;
    z-index: 3;
  }
  
  ::selection {
    color: #fff;
    background: #2128bd;
  }
```

```css
.site-card-group .site-card .info {
    margin-top: 0;
  }
  .site-card-group > a {
    width: calc(100% / 4 - 0.5rem);
    height: 150px;
    position: relative;
    display: block;
    margin: 0.5rem 0.25rem;
    float: left;
    overflow: hidden;
    padding: 0;
    border-radius: 8px;
    -webkit-transition: all 0.3s ease 0s, -webkit-transform 0.6s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
    -moz-transition: all 0.3s ease 0s, -moz-transform 0.6s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
    -o-transition: all 0.3s ease 0s, -o-transform 0.6s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
    -ms-transition: all 0.3s ease 0s, -ms-transform 0.6s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
    transition: all 0.3s ease 0s, transform 0.6s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
    -webkit-box-shadow: none;
    box-shadow: none;
    border: var(--style-border) !important;
  }
  
  .site-card-group > a .wrapper {
    position: relative;
  }
  
  .site-card-group > a .cover {
    width: 100%;
    -webkit-transition: -webkit-transform 0.5s ease-out;
    -moz-transition: -moz-transform 0.5s ease-out;
    -o-transition: -o-transform 0.5s ease-out;
    -ms-transition: -ms-transform 0.5s ease-out;
    transition: transform 0.5s ease-out;
  }
  
  .site-card-group > a .info,
  .site-card-group > a .wrapper .cover {
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .site-card-group > a .info {
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: box;
    display: flex;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -o-box-orient: vertical;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -moz-box-pack: center;
    -o-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -moz-box-align: center;
    -o-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.7);
    -webkit-transition: -webkit-transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
    -moz-transition: -moz-transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
    -o-transition: -o-transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
    -ms-transition: -ms-transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
    transition: transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
  }
  
  .site-card-group > a .info img {
    position: relative;
    top: 45px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    -webkit-box-shadow: 0 0 10px rgb(0 0 0 / 30%);
    box-shadow: 0 0 10px rgb(0 0 0 / 30%);
    z-index: 1;
    text-align: center;
    pointer-events: none;
  }
  
  .site-card-group > a .info span {
    padding: 20px 10% 60px 10%;
    font-size: 16px;
    width: 100%;
    text-align: center;
    -webkit-box-shadow: 0 0 10px rgb(0 0 0 / 30%);
    box-shadow: 0 0 10px rgb(0 0 0 / 30%);
    background-color: rgba(255, 255, 255, 0.7);
    color: var(--font-color);
    white-space: nowrap;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }
  
  .site-card-group .site-card:hover {
    border-color: var(--anzhiyu-main) !important;
    background-color: var(--anzhiyu-main) !important;
    -webkit-box-shadow: var(--anzhiyu-shadow-theme) !important;
    box-shadow: var(--anzhiyu-shadow-theme) !important;
  }
  .site-card-group > a:hover .wrapper img {
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -o-transform: scale(1.2);
    -ms-transform: scale(1.2);
    transform: scale(1.2);
  }
  
  .site-card-group > a .cover {
    width: 100%;
    -webkit-transition: -webkit-transform 0.5s ease-out;
    -moz-transition: -moz-transform 0.5s ease-out;
    -o-transition: -o-transform 0.5s ease-out;
    -ms-transition: -ms-transform 0.5s ease-out;
    transition: transform 0.5s ease-out;
  }
  .site-card-group > a .wrapper img {
    height: 150px;
    pointer-events: none;
  }
  .site-card-group .site-card .wrapper img {
    -webkit-transition: -webkit-transform 0.5s ease-out !important;
    -moz-transition: -moz-transform 0.5s ease-out !important;
    -o-transition: -o-transform 0.5s ease-out !important;
    -ms-transition: -ms-transform 0.5s ease-out !important;
    transition: transform 0.5s ease-out !important;
  }
  .site-card-group > a .wrapper .fadeIn {
    -webkit-animation: coverIn 0.8s ease-out forwards;
    -moz-animation: coverIn 0.8s ease-out forwards;
    -o-animation: coverIn 0.8s ease-out forwards;
    -ms-animation: coverIn 0.8s ease-out forwards;
    animation: coverIn 0.8s ease-out forwards;
  }
  
  .site-card-group > a:hover .info {
    -webkit-transform: translateY(-100%);
    -moz-transform: translateY(-100%);
    -o-transform: translateY(-100%);
    -ms-transform: translateY(-100%);
    transform: translateY(-100%);
  }
```

```css
.author-content-item.skills {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    width: 50%;
    min-height: 450px;
  }
  
  .author-content-item.skills .skills-style-group {
    position: relative;
  }
  
  .author-content-item.skills .tags-group-all {
    display: flex;
    transform: rotate(0);
    transition: 0.3s;
  }
  .author-content-item.skills .tags-group-wrapper {
    margin-top: 40px;
    display: flex;
    flex-wrap: nowrap;
    animation: rowup 60s linear infinite;
  }
  .tags-group-icon-pair {
    margin-left: 1rem;
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
  }
  .tags-group-icon img {
    width: 60%;
    margin: 0 auto !important;
  }
  .tags-group-icon-pair .tags-group-icon:nth-child(even) {
    margin-top: 1rem;
    transform: translate(-60px);
  }
  .author-content-item.skills .skills-list {
    display: flex;
    opacity: 0;
    transition: 0.3s;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    flex-wrap: wrap;
    flex-direction: row;
    margin-top: 10px;
  }
  .author-content-item.skills .skill-info {
    display: flex;
    align-items: center;
    margin-right: 10px;
    margin-top: 10px;
    background: var(--anzhiyu-background);
    border-radius: 40px;
    padding: 4px 12px 4px 8px;
    border: var(--style-border);
    box-shadow: var(--anzhiyu-shadow-border);
  }
  .author-content-item.skills .skill-icon {
    width: 32px;
    height: 32px;
    border-radius: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
  }
  .author-content-item.skills .skill-icon img {
    width: 18px;
    height: 18px;
    margin: 0 auto !important;
  }
  .author-content-item.skills .etc {
    margin-right: 10px;
    margin-top: 10px;
  }
  
  @keyframes rowup {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  .author-content-item.skills:hover .skills-style-group .tags-group-all {
    opacity: 0;
  }
  .author-content-item.skills:hover .skills-style-group .skills-list {
    opacity: 1;
  }
```

