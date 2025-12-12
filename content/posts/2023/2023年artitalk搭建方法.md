---
title: 2023年artalk部署方式
date: 2023-01-26 20:05:09
updated: 2024-10-26 8:00:09
categories: [搭建]
top_img: false
tags: [artalk, butterfly]
image: https://sourceimage.s3.bitiful.net/img/default_cover_12.avif
---

artalk部署方式：
1. 在leancloud国际版去注册一个应用(没有就注册一个账号)
2. 绑定一下自定义域名(可以是自己的分域名,也可以是网上免费的二级域名,这个域名没有太多要求,只要能访问就行)
3. 在结构化数据中创建 class,命名为 shuoshuo
4. 在你新建的应用中找到结构化数据下的用户.点击添加用户,输入想用的用户名及密码.(注意:权限不能给用户,因为会导致在访问自己的说说时会出现跨域问题)
5. 然后新建一个名为atComment的class,权限什么的使用默认的即可.
6. 点击 class 下的 user添加列，列名称为 img,默认值填上你这个账号想要用的发布说说的头像url，这一项不进行配置，说说头像会显示为默认头像
7. 默认值填上你这个账号想要用的发布说说的头像url,这一项不进行配置，说说头像会显示为默认头像 —— Artitalk 的 logo.
8. 在最菜单栏中找到设置-> 应用 keys,记下来 AppID 和 AppKey,在博客引入以下代码:
``` HTML
<!-- 引用 artitalk -->
<script type="text/javascript" src="https://unpkg.com/artitalk"></script>
<!-- 存放说说的容器 -->
<div id="artitalk_main"></div>
<script>
new Artitalk({
    appId: '', // Your LeanCloud appId
    appKey: '', // Your LeanCloud appKey
    serverURL: ''// 引入自己绑定的leancloud域名
})
</script>
```
