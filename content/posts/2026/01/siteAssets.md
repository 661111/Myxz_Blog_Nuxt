---
title: 站点资源优化
description: 该文章记录了项目中对于字体、图片以及构建产物等静态资源的优化与处理，并且表示自身对于图片的存放位置进行优化。
date: 2026-01-05 10:00:00
updated: 2026-01-07 20:49:00
image: /image/PostCover/siteAssets.avif
categories: [博客魔改]
tags: [Nuxt, 魔改, 美化]
recommend: true
type: story
---

## 前言

在最近的计划文章中有提到过关于资源的滥用以及混乱的情况，而现在已经近乎优化到一定程度了。那么分为几大类来说吧

## 图片类

### 分类
对于我来说的话图片确实已经好久没分类了，所以最近重构了下图片资源，采用了以`类型 + 具体用处`且采用双驼峰命名来分类图片。

::pic
---
src: /image/PostInternal/2026/siteAssets/imageType-1.avif
caption: 图片分类位置，以Image为根目录
---
::

### 优化
分类完成之后就要优化了，把图片的位置内置后基本上就已经去除了一些缓存问题，但是没有优化完整的话也是不行的。

::tab{:tabs='["Vercel", "EdgeOne"]'}
#tab1
``` json [vercel.json] lang="json"
{
  "headers": [
    // 图片位置优化
    {
      "source": "/image/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
  ]
}
```

#tab2
``` json [edgeone.json] lang="json"
{
  "headers": [
    // ipx目录中的图片优化
    {
      "source": "/_ipx/*",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
  ],
  "caches": [
    // ipx目录下的图片缓存
    {
      "source": "/_ipx/*",
      "cacheTtl": 31536000
    },
  ]
}
```
::

## 字体文件

### 分包
对于字体在博客中的使用前需要分包才能更快加载，分包一方面有着许多工具。

### 优化
对于字体的优化，通过分包后进行以下配置后会进行缓存

::tab{:tabs='["Vercel", "EdgeOne"]'}
#tab1
``` json [vercel.json] lang="json"
{
  "headers": [
    // 字体位置优化
    {
      "source": "/fonts/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
  ]
}
```

#tab2
``` json [edgeone.json] lang="json"
{
  "headers": [
    // 字体目录中的优化
    {
      "source": "/fonts/*",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ],
  "caches": [
    // 字体目录下的缓存
    {
      "source": "/fonts/*",
      "cacheTtl": 31536000
    }
  ]
}
```
::