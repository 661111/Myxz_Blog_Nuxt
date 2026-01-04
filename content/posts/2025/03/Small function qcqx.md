---
title: 功能美化
description: 从零开始魔改butterfly
date: 2025-03-05 08:00:00
updated: 2025-03-06 18:00:00
image: /PostCover/functionMeihua.avif
categories: [博客魔改]
tags: [hexo, butterfly]
---
## 首页文章隐藏文字

这种隐藏文字的方式可以给大家展示出来，整个效果是非常可观的。

```css
#recent-posts>.recent-post-item:hover .recent-post-info .content {
    opacity: 1;
    line-height: 1.5;
    transition: all .3s
}

#recent-posts>.recent-post-item:hover .recent-post-info {
    top: 0;
    transition: all .3s
}

#recent-posts>.recent-post-item>.recent-post-info>.content {
    opacity: 0;
    line-height: .7;
    transition: all .3s;
    bottom: 0
}
```