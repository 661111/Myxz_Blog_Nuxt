---
title: 轻笑底部美化
description: 本篇文章讲述了如何在博客的底部模块进行魔改添加图标、来源图片、返回顶部以及建站时间，对建站时间进行js内联到模块中。
date: 2025-02-27 10:00
update: 2025-02-28 10:00
image: https://sourceimage.s3.bitiful.net/img/default_cover_15.avif
categories: [博客魔改]
tags: [hexo, butterfly, 美化]
recommend: true
---
## 1.前言

这篇文章根据[轻笑](https://qcqx.cn)的css文件和html进行美化，本篇文章的主题为：4.5.0，其他版本需自己适配

## 2.页脚Html文件（默认已经添加js）

打开[BlogRoot]/sxiaohe/layout/includes/footer.pug，把以下代码添加进来：

```pg [footer.pug]
#footer-wrap
  #footer_icon
    .icon_left
      a.icon_link(href="http://foreverblog.cn/go.html" rel="noopener external nofollow" target="_blank" title="虫洞-随机访问十年之约成员博客")
        i.fa-circle-notch.fa-fw.fa-solid
      a.icon_link(href="https://www.travellings.cn/go.html" rel="noopener external nofollow" target="_blank" title="开往-随机跳转到另一个加入开往的网页")
        i.fa-fw.fa-solid.fa-subway
      a.icon_link(data-pjax-state="" href="/link/" title="友链")
        i.fa-fw.fa-link.fa-solid
      a.icon_link(data-pjax-state="" href="/messageboard/" title="留言")
        i.fa-comment.fa-fw.fa-regular
    img.entered.footer_logo.loaded(data-lazy-src="/img/avatar.avif?v=d3d8e5e465" data-ll-status="loaded" onclick="btf.scrollToDest(0,500)" src="/img/avatar.avif?v=d3d8e5e465" title="返回顶部")
    .icon_left
      a.icon_link(href="/" rel="noopener" target="_blank" title="我的主页")
        i.fa-compass.fa-fw.fa-solid
      a.icon_link(href="https://res.abeim.cn/api/qq/?qq=3227988255" rel="noopener external nofollow" target="_blank" title="联系QQ")
        i.fa-brands.fa-fw.fa-qq
      a.icon_link(href="https://github.com/661111" rel="noopener external nofollow" target="_blank" title="我的Github主页")
        i.fa-brands.fa-fw.fa-github
      a.icon_link(data-pjax-state="" href="mailto:3227988255@qq.com" rel="noopener external nofollow" title="邮件联系")
        i.fa-envelope.fa-fw.fa-solid
  if theme.footer.owner.enable
    - var now = new Date()
    - var nowYear = now.getFullYear()
    if theme.footer.owner.since && theme.footer.owner.since != nowYear
      .copyright!= `&copy;${theme.footer.owner.since} - ${nowYear} By ${config.author}`
    else
      .copyright!= `&copy;${nowYear} By ${config.author}`
  if theme.footer.copyright
    .framework-info
      span= _p('footer.framework') + ' '
      a(href='https://hexo.io')= 'Hexo'
      span.footer-separator |
      span= _p('footer.theme') + ' '
      a(href='https://github.com/jerryc127/hexo-theme-butterfly')= 'Butterfly'
  if theme.footer.custom_text
    .footer_custom_text!=`${theme.footer.custom_text}`
  .footer-banner-time
    span#timeDate
    span#times
    script.
      if(! (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))){
      function createtime() {
      var now = new Date();
      var grt= new Date("03/10/2022 00:00:00");
      now.setTime(now.getTime()+1000);
      days = (now - grt ) / 1000 / 60 / 60 / 24; dnum = Math.floor(days);
      hours = (now - grt ) / 1000 / 60 / 60 - (24 * dnum); hnum = Math.floor(hours);
      if(String(hnum).length ==1 ){hnum = "0" + hnum;} minutes = (now - grt ) / 1000 /60 - (24 * 60 * dnum) - (60 * hnum);
      mnum = Math.floor(minutes); if(String(mnum).length ==1 ){mnum = "0" + mnum;}
      seconds = (now - grt ) / 1000 - (24 * 60 * 60 * dnum) - (60 * 60 * hnum) - (60 * mnum);
      snum = Math.round(seconds); if(String(snum).length ==1 ){snum = "0" + snum;}
      document.getElementById("timeDate").innerHTML = "自 2022-3-10 建站以来，小站已苟活 "+dnum+" 天 ";
      document.getElementById("times").innerHTML = hnum + " 时 " + mnum + " 分 ( =•ω•= )m";
      }
      createtime();
      if(typeof footer_time == "undefined"){
      var footer_time = setInterval("createtime()",1000*60);
      }else{
      clearInterval(footer_time);
      footer_time = setInterval("createtime()",1000*60);
      }
      }
  p#ghbdages
    a.github-badge(href="https://hexo.io/" style="margin-inline:5px" target="_blank")
      img.entered.loaded(data-lazy-src="/img/footer_svg/hexo.svg" data-ll-status="loaded" src="/img/footer_svg/hexo.svg")
    a.github-badge(href="https://butterfly.js.org/" style="margin-inline:5px" target="_blank")
      img.entered.loaded(data-lazy-src="/img/footer_svg/butterfly.svg" data-ll-status="loaded" src="/img/footer_svg/butterfly.svg")
    a.github-badge(href="https://github.com/" style="margin-inline:5px" target="_blank")
      img.entered.loaded(data-lazy-src="/img/footer_svg/github.svg" data-ll-status="loaded" src="/img/footer_svg/github.svg")
    a.github-badge(href="https://icp.gov.moe/?keyword=20251949" style="margin-inline:5px" target="_blank")
      img.entered.loaded(data-lazy-src="/img/footer_svg/menicp.svg" data-ll-status="loaded" src="/img/footer_svg/menicp.svg")
    a.github-badge(href="https://jsd.sxiaohe.top/" style="margin-inline:5px" target="_blank")
      img.entered.loaded(data-lazy-src="/img/footer_svg/jsd.svg" data-ll-status="loaded" src="/img/footer_svg/jsd.svg")
    a.github-badge(href="https://www.upyun.com/?utm_source=lianmeng&amp;utm_medium=referral" style="margin-inline:5px" target="_blank")
      img.entered.loaded(data-lazy-src="/img/footer_svg/ypy.svg" data-ll-status="loaded" src="/img/footer_svg/ypy.svg")
    a.github-badge(href="http://creativecommons.org/licenses/by-nc-sa/4.0/" style="margin-inline:5px" target="_blank")
      img.entered.loaded(data-lazy-src="/img/footer_svg/cc.svg" data-ll-status="loaded" src="/img/footer_svg/cc.svg")
```

### 2.1修改pug文件中的内容

href中的链接修改为你自己的链接
data-lazy-src中的图片链接修改为自己的图片链接
src中的图片链接修改为自己的图片链接

## 3.添加css

在自定义的css文件中添加以下内容：

```CSS
/* 底部透明 */
#footer:before {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: transparent !important;
    content: '';
}
/* 底部图标 */
div#footer_icon {
    border-radius: 12px 12px 0 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-bottom: 1rem;
    align-items: center
}

#footer_icon {
    margin: auto;
    max-width: 1200px;
    width: 97%
}

.icon_left,.icon_right {
    display: flex
}

a.icon_link {
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem;
    background-color: #363636e2;
    border-radius: 3rem
}

img.footer_logo {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    margin: 0 1rem;
    cursor: pointer;
    transition: all .25s
}

#footer_icon i {
    padding-top: 1px;
    font-size: 20px;
    color: #fff;
    transition: .3s
}

[data-theme=dark] a.icon_link {
    background-color: #ececece7
}

[data-theme=dark] #footer_icon i {
    color: #202020
}

#footer_icon a:hover {
    background-color: #49b1f5;
    text-decoration: none!important
}

@media screen and (max-width: 768px) {
    #enlargePage-btn,#footer_icon,#narrowPage-btn,.footer-banner {
        display:none!important
    }

    #footer-wrap {
        padding: 20px 5px
    }
}
```
