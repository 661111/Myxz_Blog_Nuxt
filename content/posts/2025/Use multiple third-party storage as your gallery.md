---
title: 博客基础之静态文件存储
description: 这篇文章讲述使用多个第三方存储作为图库或者静态文件进行存储，在使用第三方存储或者第三方图库不要忘记备份图片以免出现丢失的情况。
date: 2025-04-01 10:00
updated: 2025-04-01 12:00
image: https://sourceimage.s3.bitiful.net/img/default_cover_26.avif
categories: [教程]
top_img: false
tags: [存储, 第三方]
---
## 前言
一直以来，我一直想要找一些兼顾空间、读取速度（访问速度）、通用性（可以通过第三方工具或者网页嵌入），经过一段时间找到了一些拥有这些特性的，[缤纷云](https://www.bitiful.com/)无疑就是性价比较高的存储桶，每个月50GB的存储和30GB的请求。那么其他的就不好吗？

其实市面上许多免费的存储桶，但大部分都要加入他们设立的联盟中，大部分加入后也没有去使用（访问速度要不然慢要不然就是空间太小），所以我们可以把这些作为备份搭配一下网盘来进行白嫖。

## 各个存储桶平台
### 缤纷云S4（包含Picgo使用方案）
|优点                                                    |  缺点                                                 |
|:-----------------------------------------------------:|:-----------------------------------------------------:|
|稳定性好 ✅                                            | CDN加速需要备案                                        |
|方便管理图片，上传方便，支持S3存储桶 ✅                  | 无法通过链接访问（会被自动下载文件）                    |
|容量取决于服务器 ✅                                     |                                                       |
|图像处理：如保护源文件，跨域配置等 ✅                    |                                                       |
|每月50GB存储和30GB请求 ✅                               |                                                       |
|无需支付存储桶费用（超过限制要付费）✅                   |                                                       |

访问[https://console.bitiful.com/login](https://console.bitiful.com/login)，按照要求进行注册并登录

1. 新建存储桶
新建存储桶位置，并点击进入存储桶
![](https://sourceimage.s3.bitiful.net/post%2Fimg%2F20250401%2F1.avif)

2. 查看存储桶信息（后续使用Picgo时需要用到）
![](https://sourceimage.s3.bitiful.net/post%2Fimg%2F20250401%2F2.avif)

3. 新建授权子账号
![](https://sourceimage.s3.bitiful.net/post%2Fimg%2F20250401%2F3.avif)
![](https://sourceimage.s3.bitiful.net/post%2Fimg%2F20250401%2F4.avif)
![](https://sourceimage.s3.bitiful.net/post%2Fimg%2F20250401%2F5.avif)

4. 配置PicGo
[PicGo](https://molunerfinn.com/PicGo/)是一个开源免费的全平台的图片入床工具，基本支持了主流的所有图床，配合typora使用更为锦上添花。

- 首先下载好对应系统的PicGo
- 你可以在PicGo设置里选择隐藏不需要的图床，在图床设置里配置你的图床，这里以缤纷云S4为例，下面是设置一览↓，下面将分别介绍

**查找S3图库插件：**
![](https://sourceimage.s3.bitiful.net/post%2Fimg%2F20250401%2F6.png)

**如何设置S3存储桶：**
![](https://sourceimage.s3.bitiful.net/post%2Fimg%2F20250401%2F7.png)

### github图床


## 管理图片平台
### alist

| 优点                                                  |  缺点                                                       |
|:-----------------------------------------------------:|:-----------------------------------------------------------:|
| 支持网页浏览和 WebDAV                                  |  公网访问可能需要购买服务器                                  |
| 支持市面上的存储                                       |  更新迭代需要备份数据库再升级（无法无损更新）                  |
| 支持linux、windows、android的本地部署                   |  部署在一些公共平台可能还会出现数据泄露（即你的后台密码泄露） |
| 支持文件夹加密或者私密                                  |                                                             |

1. 部署Alist

**1.本地部署**
[手动安装](https://alist.nn.ci/zh/guide/install/manual.html)

**2.服务器部署**
[一键部署](https://alist.nn.ci/zh/guide/install/script.html)
[Docker部署](https://alist.nn.ci/zh/guide/install/docker.html)

2. S3部署

第一步：打开你自己的后台，如果是linux系统，先初始化一下密码：
``` BASH
# 随机生成一个密码
docker exec -it alist ./alist admin random
# 手动设置一个密码,`NEW_PASSWORD`是指你需要设置的密码
docker exec -it alist ./alist admin set NEW_PASSWORD
```

第二步：新建对象存储
对象存储填写内容：

参数名                      | 参数作用                                                                                                        |
:--------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------:|
存储桶                      | 存储桶名                                                                                                        |
Endpoint                    | Endpoint address（不知道可以看下方的官方文档）                                                                   |
地区                        | 地区（不知道可以看下方的官方文档）                                                                                |
访问密钥 id                 | Access key id                                                                                                   |
安全访问密钥                | Secret access key                                                                                               |
会话令牌                    | 会话令牌，三段式token需要使用，正常是两段式不需要填写                                                              |
自定义 Host                 | 自定义 CDN 加速域名                                                                                              |
启用自定义 HOST 签名        | 不填写“自定义 Host”时本选项无效。关闭时：返回的URL后不接签名信息，适用于自定义Host是CDN的情况。启用时：返回的URL后接签名信息，适用于主机和对象存储服务来自同一个机房，Endpoint是机房内部访问域名，自定义Host是外部访问域名的情况。                                                 |
签名链接有效期              | 签名下载地址的有效期默认为 4 小时。 如果使用自定义加速域名，该选项无效。                                             |
占位文件名                  | 占位符文件的名称。                                                                                                |
强制路径样式                | 是否启用 ForcePathStyle，通常是 minio 需要的。                                                                    |
列出对象版本                | 参见 S3 的 SDK 文档。                                                                                             |
移除bucket                  | 使用自定义主机时从路径中删除bucket名称。                                                                          |
添加filename到disposition   | 添加filename到Content-Disposition头中。                                                                           |

**部分存储如何查找以及在Alist中使用：**
[添加对象存储示例及官方文档](https://alist.nn.ci/zh/guide/drivers/s3.html#%E6%B7%BB%E5%8A%A0%E5%AF%B9%E8%B1%A1%E5%AD%98%E5%82%A8%E7%A4%BA%E4%BE%8B%E5%8F%8A%E5%AE%98%E6%96%B9%E6%96%87%E6%A1%A3)

把以下内容一一粘贴到Alist对象存储中的配置项中：

参数名       | 参数作用              |
:-----------:|:--------------------:|
访问密钥 id  | 子用户的Access key    |
安全访问密钥 | 子用户的access key    |
Endpoint    | s3.bitiful.net        |
地区        | cn-east-1             |
存储桶      | 你自己的存储桶名称     |

成功后来到首页打开，即可看到：
![](https://cloud.myxz.top/d/post/img/20250401/8.png?sign=kpLD6g0N6IL0xcD1BGKEn28E3PCUCFYEBgli_z7Vh2A=:0)
