---
title: 美化文章卡片显示数字
description: 这篇文章讲述如何给自己博客中的归档、分类、标签页三个页面的文章卡片添加数字来进行编排，以及对添加的数字进行CSS美化，但也请注意要经常备份以免出现错误。
date: 2025-03-05 8:00
updated: 2025-03-06 18:00
image: https://sourceimage.s3.bitiful.net/img/default_cover_29.avif
categories: [hexo]
tags: [hexo, butterfly]
---
## 前言

此篇文章改动性质大，魔改前需备份。

## 页面核心内容修改

1. 打开[Blogroot:]\themes\BUTTERFLY\layout\includes\mixins\article-sort.pug，并覆盖以下内容：

```pg [article-sort.pug]
mixin articleSort(posts, current)
  .article-sort
    - var year
    - posts.each(function (article, post_index) {
      - let tempYear = date(article.date, 'YYYY')
      - let no_cover = article.cover === false || !theme.cover.archives_enable ? 'no-article-cover' : ''
      - let title = article.title || _p('no_title')
      if tempYear !== year
        - year = tempYear
        .article-sort-item.year= year
      .article-sort-item(class=no_cover)
        if article.cover && theme.cover.archives_enable
          a.article-sort-item-img(href=url_for(article.path) title=title)
            img(src=url_for(article.cover) alt=title onerror=`this.onerror=null;this.src='${url_for(theme.error_img.post_page)}'`)
        .article-sort-item-info(style="margin-left: 10px;")
          a.article-sort-item-title(href=url_for(article.path) title=title)= title
          span.article-sort-item-index= (current - 1) * config.per_page + post_index + 1
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
//- mixin articleSort(posts, current)
//-   .article-sort
//-     - var year
//-     - posts.each(function (article) {
//-       - let tempYear = date(article.date, 'YYYY')
//-       - let no_cover = article.cover === false || !theme.cover.archives_enable ? 'no-article-cover' : ''
//-       - let title = article.title || _p('no_title')
//-       if tempYear !== year
//-         - year = tempYear
//-         .article-sort-item.year= year
//-       .article-sort-item(class=no_cover)
//-         a.article-sort-item-a(href=url_for(article.path) title=title)
//-         if article.cover && theme.cover.archives_enable
//-           a.article-sort-item-img(href=url_for(article.path) title=title)
//-             img(src=url_for(article.cover) alt=title onerror=`this.onerror=null;this.src='${url_for(theme.error_img.post_page)}'`)
//-         .article-sort-item-info
//-           a.article-sort-item-title(href=url_for(article.path) title=title)= title
//-           span.article-sort-item-index= (current - 1) * config.per_page + post_index + 1
//-           .article-sort-meta
//-             .article-meta-wrap
//-               if (theme.post_meta.page.categories && article.categories.data.length > 0)
//-                 span.article-sort-item-categories
//-                   i.iconfont.icon-fenlei
//-                   each item, index in article.categories.data
//-                     a(href=url_for(item.path)).article-meta__categories #[=item.name]
//-                     if (index < article.categories.data.length - 1)
//-                       span.article-meta__link •
//-               if (theme.post_meta.page.tags && article.tags.data.length > 0)
//-                 span.article-sort-item-tags
//-                   i.iconfont.icon-biaoqian
//-                   each item, index in article.tags.data
//-                     a(href=url_for(item.path)).article-meta__tags #[=item.name]
//-                     if (index < article.tags.data.length - 1)
//-                       span.article-meta__link •
//-             .article-sort-item-time
//-               time.post-meta-date-created(datetime=date_xml(article.date) title=_p('post.created') + ' ' + full_date(article.date))= date(article.date, config.date_format)
//-     - })
```

## 样式表添加 

在自定义文件中添加以下内容：

```css
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

## 效果展示

[分类](https://www.myxz.top/categories/hexo/)
[归档](https://www.myxz.top/archives/)