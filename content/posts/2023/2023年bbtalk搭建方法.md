---
title: 2023年bbtalk部署方式
date: 2023-01-27 20:05:00
updated: 2023-01-27 22:00:00
categories: [搭建]
top_img: false
tags: [artalk, butterfly]
image: /image/PostCover/ssVeryfunction.avif
---
bbtalk部署方式：
1. 在leancloud国际版去注册一个应用(没有就注册一个账号)
2. 绑定一下自定义域名(可以是自己的分域名,也可以是网上免费的二级域名,这个域名没有太多要求,只要能访问就行)
3. 绑定完成之后点击创建应用,应用名称随意,接着在存储→结构化数据中创建 class,命名为 content.
4. 在最菜单栏中找到设置-> 应用 keys,记下来 AppID 和 AppKey,在博客引入以下代码:
``` html
<!-- 存放哔哔的容器 -->
<div id="bbtalk"></div>
<!-- 引用 bbtalk -->
<script src="https://cdn.jsdelivr.net/npm/bbtalk@0.1.5/dist/bbtalk.min.js"></script>
<script>
bbtalk.init({
  appId: "",
  appKey: "",
  serverURLs: ''// 引入自己绑定的leancloud域名
})
</script>
```