---
title: 给页面加上所属分类和标签以及美化
description: 这篇简述如何给自己博客中的归档、分类、标签页三个页面的文章卡片加上所属分类和标签，并说明了具体的实践环境，以最大限度的方式进行CSS美化。但也请注意要经常备份以免出现大量错误。
date: 2025-03-24 08:00:09
updated: 2025-03-24 10:56:09
image: https://sourceimage.s3.bitiful.net/img/default_cover_37.avif
categories: [博客魔改]
tags: [hexo, butterfly]
---

## 前言

魔改到一定程度，会跟轻笑的风格大致一样，同时这篇文章大概是魔改分类，归档以及标签（没有存在感的）的最后修改，也是目前完善的一版，基于轻笑的版本且适配4.5.0（4.5.1大概能用），其实想起来还有这么一个压箱底的东西没有发表，轻笑只写了pug内容。

## 本篇环境

主题：butterfly 4.5.0
博客框架：hexo 6.3.0

## 实现

1. 打开[BlogRoot:]\themes\butterfly\layout\includes\mixins\article-sort.pug修改：

```pug [article-sort.pug]
mixin articleSort(posts)
  .article-sort
    - var year
    - posts.each(function (article) {
      - let tempYear = date(article.date, 'YYYY')
      - let no_cover = article.cover === false || !theme.cover.archives_enable ? 'no-article-cover' : ''
      - let title = article.title || _p('no_title')
      if tempYear !== year
        - year = tempYear
        .article-sort-item.year= year
      .article-sort-item(class=no_cover)
        a.article-sort-item-a(href=url_for(article.path) title=title)
        if article.cover && theme.cover.archives_enable
          a.article-sort-item-img(href=url_for(article.path) title=title)
            img(src=url_for(article.cover) alt=title onerror=`this.onerror=null;this.src='${url_for(theme.error_img.post_page)}'`)
        .article-sort-item-info
          a.article-sort-item-title(href=url_for(article.path) title=title)= title
          span.article-sort-item-index
          .article-sort-meta
            .article-meta-wrap
              if (theme.post_meta.page.categories && article.categories.data.length > 0)
                span.article-sort-item-categories
                  i.iconfont.icon-fenlei
                  each item, index in article.categories.data
                    a(href=url_for(item.path)).article-meta__categories #[=item.name]
                    if (index < article.categories.data.length - 1)
                      span.article-meta__link •
              if (theme.post_meta.page.tags && article.tags.data.length > 0)
                span.article-sort-item-tags
                  i.iconfont.icon-biaoqian
                  each item, index in article.tags.data
                    a(href=url_for(item.path)).article-meta__tags #[=item.name]
                    if (index < article.tags.data.length - 1)
                      span.article-meta__link •
            .article-sort-item-time
              time.post-meta-date-created(datetime=date_xml(article.date) title=_p('post.created') + ' ' + full_date(article.date))= date(article.date, config.date_format)
    - })
```

2. 打开[BlogRoot]\source\css，并新建自定义css文件：

```CSS
/* 归档，分类，标签三个页面调整 */
/* 由苏晓河进行编写以及调整 */
/* 时间：2025年2月4日 */

/* 归档 */
.article-sort {
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
    -webkit-box-lines: multiple;
    -moz-box-lines: multiple;
    -o-box-lines: multiple;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: justify;
    -moz-box-pack: justify;
    -o-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between
}

.article-sort-title {
    padding-bottom: 0!important;
    position: relative;
    font-size: 2em;
    color: var(--text-highlight-color);
    font-weight: 700
}

.article-sort-item {
    position: relative;
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
    margin: 7.5px 0;
    border-radius: 12px;
    padding: 8px;
    width: calc(50% - 7.5px);
    background: var(--ah-card-bg);
    -webkit-transition: all .2s ease-in-out;
    -moz-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    -ms-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out
}

@media screen and (max-width: 768px) {
    .article-sort-item {
        width:100%
    }

    .category-bar-item a {
        padding: .1rem .2rem
    }
}

.article-sort-item.no-article-cover {
    height: 80px;
    padding-left: 80px
}

.article-sort-item.year {
    font-size: 1.8em;
    font-weight: 700;
    margin-bottom: 0;
    background: 0 0;
    width: 100%;
    padding: 0
}

.article-sort-item.year:hover {
    background: 0 0
}

.article-sort-item-title {
    color: var(--font-color);
    font-size: 17px;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -o-transition: all .3s;
    -ms-transition: all .3s;
    transition: all .3s;
    -webkit-line-clamp: 2;
    font-weight: 700;
    line-height: 1.4em
}

.article-sort-item-title:hover {
    color: var(--btn-hover-color)
}

.article-sort-item-img {
    overflow: hidden;
    width: 160px;
    height: 90px;
    border-radius: 7px;
    border: 1px solid var(--ah-hover-bg)
}

@media screen and (max-width: 768px) {
    .article-sort-item-img {
        width: 100px;
        height: 80px
    }
}

.article-sort-item-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 7px
}

.article-sort-item-info {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -o-box-flex: 1;
    box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding-left: 10px;
    padding: 0!important
}

.article-sort-item-info a.article-meta__tags {
    color: var(--dark-grey);
    font-size: 15px
}

.article-sort-item-info a.article-meta__tags:hover {
    color: var(--btn-hover-color)
}

.article-sort-item-info time.post-meta-date-created {
    bottom: 10px;
    right: 10px;
    position: absolute;
    font-size: 14px;
    line-height: 14px;
    color: var(--dark-grey)
}
```

## 后续

如果你已经按照上面的方案进行修改，就会出现这样子：

::pic
---
src: https://sourceimage.s3.bitiful.net/post%2Fimg%2F%E5%BD%92%E6%A1%A3%E3%80%81%E5%88%86%E7%B1%BB%E3%80%81%E6%A0%87%E7%AD%BE%E9%A1%B5%E6%96%87%E7%AB%A0%E5%8D%A1%E7%89%87%E5%8A%A0%E4%B8%8A%E6%89%80%E5%B1%9E%E5%88%86%E7%B1%BB%E5%92%8C%E6%A0%87%E7%AD%BE%E4%BB%A5%E5%8F%8A%E7%BE%8E%E5%8C%96%E9%A1%B5%E9%9D%A2%EF%BC%88%E8%BD%BB%E7%AC%91%E7%89%88%E6%9C%AC%E9%87%8D%E5%88%B6%E7%89%88%EF%BC%89%2F1.avif
# mirror: # 是否借助第三方图片加载服务，见源代码
caption: 归档页面
# zoom: false # 是否开启灯箱缩放，默认开启
---
::

::pic
---
src: https://sourceimage.s3.bitiful.net/post%2Fimg%2F%E5%BD%92%E6%A1%A3%E3%80%81%E5%88%86%E7%B1%BB%E3%80%81%E6%A0%87%E7%AD%BE%E9%A1%B5%E6%96%87%E7%AB%A0%E5%8D%A1%E7%89%87%E5%8A%A0%E4%B8%8A%E6%89%80%E5%B1%9E%E5%88%86%E7%B1%BB%E5%92%8C%E6%A0%87%E7%AD%BE%E4%BB%A5%E5%8F%8A%E7%BE%8E%E5%8C%96%E9%A1%B5%E9%9D%A2%EF%BC%88%E8%BD%BB%E7%AC%91%E7%89%88%E6%9C%AC%E9%87%8D%E5%88%B6%E7%89%88%EF%BC%89%2F2.avif
# mirror: # 是否借助第三方图片加载服务，见源代码
caption: 分类文章
# zoom: false # 是否开启灯箱缩放，默认开启
---
::

::pic
---
src: https://sourceimage.s3.bitiful.net/post%2Fimg%2F%E5%BD%92%E6%A1%A3%E3%80%81%E5%88%86%E7%B1%BB%E3%80%81%E6%A0%87%E7%AD%BE%E9%A1%B5%E6%96%87%E7%AB%A0%E5%8D%A1%E7%89%87%E5%8A%A0%E4%B8%8A%E6%89%80%E5%B1%9E%E5%88%86%E7%B1%BB%E5%92%8C%E6%A0%87%E7%AD%BE%E4%BB%A5%E5%8F%8A%E7%BE%8E%E5%8C%96%E9%A1%B5%E9%9D%A2%EF%BC%88%E8%BD%BB%E7%AC%91%E7%89%88%E6%9C%AC%E9%87%8D%E5%88%B6%E7%89%88%EF%BC%89%2F3.avif
# mirror: # 是否借助第三方图片加载服务，见源代码
caption: 标签文章
# zoom: false # 是否开启灯箱缩放，默认开启
---
::