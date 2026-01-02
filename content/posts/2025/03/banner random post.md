---
title: Banner随机文章展示(轻笑同款)
description: 本文依照轻笑的部分内容，参考首页banner写法以及对首页banner添加鼠标滚动以及移动端滑动，通过CSS样式进行美化整个首页banner，此篇文章重点讲述了如何解决轻笑给的js内容在首页会出现不断加载的问题。
date: 2025-03-01 10:00:00
updated: 2025-03-05 12:09:00
image: https://nuxtsource.s3.bitiful.net/PostCover/randomPost.avif
categories: [博客魔改]
tags: [hexo, butterfly, 美化]
---
## 1.前言

为了把lighthouse的性能优化到极致，所以采用了这种轻笑方案的随机banner来优化

## 2.添加hometop

### 1.在 [BlogRoot]\themes\sxiaohe\scripts\helpers中新建home_random_post.js:

```JS
hexo.extend.generator.register('thePosts', function (locals) {
    const jsonData = locals.posts
      .filter(post => post.random !== false)
      .map(post => {
        return {
          title: post.title || "暂无标题",
          abbrlink: post.abbrlink,
          image: post.cover,
          description: post.description || "暂无简介"
        };
      });
  
    return {
      path: 'random.json',
      data: JSON.stringify(jsonData)
    };
  });
  
```
### 2.在 [BlogRoot]\themes\butterfly\layout\includes中新建hometop.pug：

::alert{type="question"}
提示：如果在页面中添加js文件，会导致浏览器一直读取js，从而让用户无法看到页面内容，所以这里采用pug内嵌js文件展示出来
::

```pug [hometop.pug]
#home_top
  .home_top_group
    #homeTopGroup.homeTopGroup
      .left-arrow-tip
      .right-arrow-tip
      .category_group
          .category_item
            a.category_button(href="/archives/",style="background:linear-gradient(to right,#00868Bdb,#3fc1c9db)")
              span.category_button_text 归档
              i.fas.fa-laptop-code
          .category_item
            a.category_button(href="/archives/2022/",style="background:linear-gradient(to right, #0A5ABEdb, #2fcbffdb)")
              span.category_button_text 2022
              i.fas.fa-lightbulb
      .top_post_group
        //- 这下面是原来固定的写法
        //- if site.data.slider
        //-   each i in site.data.slider
        //-     .top_post_item
        //-       .post_cover
        //-         a(href=url_for(i.link) title=i.title)
        //-           img.post_bg.entered.loaded(src=url_for(i.cover))
        //-           .post_cover_info
        //-             p.post_cover_text= i.description
        //-       .post_info(onclick=`"window.open(`+url_for(i.link)+`,"_self")"`)
        //-         a.article-title(href=url_for(i.link) title=i.title)= i.title
      script(type='text/javascript')
        | function getRandomElementsFromArray(arr, num) {
        |   const totalElements = arr.length;
        |   const selectedElements = new Set();
        |   while (selectedElements.size < num) {
        |     const randomIndex = Math.floor(Math.random() * totalElements);
        |     selectedElements.add(arr[randomIndex]);
        |   }
        |   return Array.from(selectedElements);
        | }
        | function renderingPosts(data){
        |   const randomElements = getRandomElementsFromArray(data, 6);
        |   const postsHtml = randomElements.map((i) => `
        |     <div class="top_post_item">
        |       <div class="post_cover">
        |         <a href="/article/${i.abbrlink}.html" title="${i.title}">
        |           <img srcset class="post_bg entered loaded" src="${i.cover}" alt="${i.title}" data-no-lazy>
        |           <div class="post_cover_info">
        |             <p class="post_cover_text">${i.description}</p>
        |           </div>
        |         </a>
        |       </div>
        |       <div class="post_info" onclick="window.open('/article/${i.abbrlink}.html', '_self')">
        |         <a class="article-title" href="/article/${i.abbrlink}.html" title="${i.title}">${i.title}</a>
        |       </div>
        |     </div>`).join('');
        |   document.querySelector("#homeTopGroup>.top_post_group").innerHTML = postsHtml
        | }
        | if(!sessionStorage.getItem("postsInfo")){
        |   fetch("/random.json")
        |   .then(res=>res.json())
        |   .then(data=>{
        |     console.log(1);
        |     sessionStorage.setItem("postsInfo", JSON.stringify(data));
        |     renderingPosts(data);
        |   })
        | }else{
        |   renderingPosts(JSON.parse(sessionStorage.getItem("postsInfo")));
        | }
        | if(true){
        |   const leftArrowTip = document.querySelector(".left-arrow-tip");
        |   const rightArrowTip = document.querySelector(".right-arrow-tip");
        |   const xscroll = document.getElementById("homeTopGroup");
        |   leftArrowTip.addEventListener("click", function () {
        |     xscroll.scrollTo({ left: 0, behavior: "smooth" }); // 回到最左边
        |   });
        |   rightArrowTip.addEventListener("click", function () {
        |     xscroll.scrollTo({ left: xscroll.scrollWidth, behavior: "smooth" }); // 回到最右边
        |   });
        |   function toggleArrowVisibility() {
        |     // 计算滚动位置与容器宽度的差值
        |     const scrollDiff = xscroll.scrollWidth - xscroll.scrollLeft - xscroll.clientWidth;
        |     if (xscroll.scrollLeft === 0) {
        |       // 在最左边，隐藏左箭头，显示右箭头
        |       leftArrowTip.style.opacity = "0";
        |       rightArrowTip.style.opacity = "1";
        |       rightArrowTip.style.zIndex = "1";
        |       leftArrowTip.style.zIndex = "-1";
        |     } else if (scrollDiff <= 1) {
        |       // 在最右边，隐藏右箭头，显示左箭头
        |       rightArrowTip.style.opacity = "0";
        |       leftArrowTip.style.opacity = "1";
        |       leftArrowTip.style.zIndex = "1";
        |       rightArrowTip.style.zIndex = "-1";
        |     } else {
        |       // 既不在最右边又不在最左边，显示两个箭头
        |       leftArrowTip.style.opacity = "1";
        |       rightArrowTip.style.opacity = "1";
        |       leftArrowTip.style.zIndex = "1";
        |       rightArrowTip.style.zIndex = "1";
        |     }
        |   }
        |   function topPostScroll() {
        |     if (document.getElementById("homeTopGroup")) {
        |       xscroll.addEventListener("mousewheel", function (e) {
        |         let v = -e.wheelDelta / 2;
        |         xscroll.scrollLeft += v;
        |         e.preventDefault();
        |       }, false);
        |       let isScrolling = false;
        |       xscroll.addEventListener("scroll", function scrollHandler() {
        |         if (!isScrolling) {
        |           isScrolling = true;
        |           setTimeout(function () {
        |             isScrolling = false;
        |             toggleArrowVisibility();
        |           }, 100);
        |         }
        |       });
        |     }
        |   }
        |   toggleArrowVisibility();
        |   topPostScroll();
        | }
        | try{
        |   document.removeEventListener('pjax:complete', catalogActive);
        |   document.addEventListener('pjax:complete', catalogActive);
        | }catch(e){}
```
### 3.在自定义css文件中添加：
```CSS
:root{
    --mj-white: #fff;
    --mj-card-bg: rgba(255,255,255,0.67);
    --mj-theme: #128adadb;
    --mj-secondbg: #ededed;
    --mj-card-border: #e3e8f7;
    --style-border: 2px solid rgba(0, 255, 255, 0.6);
    --anchor-border: 1px solid rgba(21, 158, 208, 0.8);
    --style-hover-border: 2px solid var(--mj-theme);
}
[data-theme=dark] {
    --mj-card-bg: rgba(0,0,0,0.6);
    --style-border: 2px solid rgba(56,211,203,0.8);
}
/* home top */
#home_top {
    width: 100%;
    margin-bottom: 20px;
}
.home_top_group {
    border-radius: 11px;
    overflow: auto;
    width: 100%;
    margin-bottom: 0;
}
.homeTopGroup {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    overflow: hidden;
    overflow-x: score;
    border-radius: 11px;
}
.homeTopGroup::-webkit-scrollbar {
    display: none;
}

.homeTopGroup .category_group{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 200px;
    min-height: 166px;
}
.top_post_item>.post_cover>a{
    display: block;
}
.homeTopGroup .category_item {
    overflow: hidden;
    transform: scale(1);
    transition: .3s;
    height: 48%;
    border-radius: 12px;
}
.homeTopGroup .category_item a.category_button {
    height: 100%;
    width: 100%;
    background: var(--mj-card-bg);
    border-radius: 12px;
    display: inline-block;
    text-align: left;
    line-height: 4em;
    font-weight: 800;
    font-size: 16px;
    color: var(--mj-white);
    transition: all .4s cubic-bezier(.39,.575,.565,1);
    transform: scale(1);
    overflow: hidden;
}
.category_button_text {
    padding-left: 25px;
}
a.category_button i {
    font-size: 3rem;
    opacity: .3;
    position: absolute;
    right: 15px;
    top: 10%;
    transition: .3s;
    transform: rotate(-10deg);
    /*width: 100px;
    text-align: center;*/
}
a.category_button:hover i {
    opacity: .8;
    transition: .8s;
    transition-delay: .15s;
    transform: scale(1.1)
}
a.category_button:hover:after{
    width: 3rem;
    transition: .8s;
}
a.category_button:after {
    top: 45px;
    width: 1rem;
    left: 25px;
    height: 2.5px;
    background: var(--mj-white);
    content: "";
    border-radius: 1px;
    position: absolute;
    transition: .8s;
}
@media screen and (max-width: 1245px){
  .homeTopGroup,.home_top_group {
      border-radius: 0px;
  }
}
@media screen and (max-width: 768px){
  .homeTopGroup .category_group {
    min-width: 130px!important;
  }
  #home_top {
    width: calc(100% + 17px);
  }
  .home_top_group {
      overflow: visible;
  }
  .homeTopGroup {
      margin-left: -17px;
      scrollbar-width: none;
      width: calc(100% + 17px);
  }
  .homeTopGroup .category_group{
      margin-left: 17px;
  }
}
.top_post_group{
    display: flex;
    position: relative;
}
.top_post_group .top_post_item {
    display: flex;
    width: 200px;
    height: 166px;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 8px;
    background: var(--mj-card-bg);
    border-radius: 12px;
    overflow: hidden;
    border: var(--style-border);
    color: var(--text-highlight-color);
    transition: 0.3s;
}
/* .top_post_group .top_post_item:first-child{
    right: 0px;
} */
.top_post_group .top_post_item:hover {
    border: var(--style-hover-border);
    background: #128adadb;
}
.top_post_group .top_post_item .post_cover {
    width: 100%;
    height: 110px;
    position: relative;
}
.top_post_group .top_post_item .post_cover img {
    object-fit: cover;
    width: 100%;
    height: 110px;
    background: var(--mj-secondbg);
}
.top_post_group .top_post_item .post_cover .post_cover_info {
    position: absolute;
    top: 0;
    width: 101%;
    height: 100%;
    opacity: 0;
    background-color: rgba(0,0,0,0.7) !important;
    transition: all 0.3s ease;
    display: flex;
} 
.top_post_group .top_post_item:hover .post_cover .post_cover_info{
    opacity: 1;
}
.top_post_group .top_post_item .post_cover .post_cover_info .post_cover_text{
    color: #fff;
    padding: 13px 14px;
    font-size: 15px;
    font-weight: 400;
    margin: 0;
    -webkit-line-clamp: 3;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
.top_post_group .top_post_item .post_info a{
    color: var(--mj-fontcolor) !important;
    transition: 0;
}
.top_post_group .top_post_item:hover .post_info a{
    color: var(--mj-white) !important;
}
.top_post_group .top_post_item .post_info {
    padding: 6px 9px!important;
    transition: .3s;
    width: 100%;
    height: 100%;
}
.top_post_group .top_post_item .post_info .article-title {
    -webkit-line-clamp: 2;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-height: 1.4;
    justify-content: center;
    align-items: flex-end;
    align-content: center;
    font-weight: 800;
    font-size: 14px!important;
    padding: 0!important;
}
```

## 3.后记

对于一些需要这种方案的以及想要简洁风格的可以根据这篇文章进行修改。