---
title: 随笔：低价主机试水
description: 该文章主要写了对于低价机器的试水，并提醒是超开类型的机器。在测试的过程中发现机器性能较高，且展示出机器的具体价格，并单独列出只有精简版未采用完整版测试。
date: 2026-01-12 10:00:00
updated: 2026-01-12 20:49:00
image: /image/PostCover/NewYear.avif
categories: [博客魔改]
tags: [Nuxt, 魔改, 美化]
recommend: true
---
## 前言
最近有一些原因负担不起来服务器的价格加上本身用到的地方不多，所以低价买了个超开机。那么就来测试这台机器吧

## 价格&性能

### 价格
以下就是四款超开云服务器的配置与价格汇总表格：

|序号 | 所属地区 | 数据中心 | CPU           | 内存     | 线路 | 带宽           | 系统盘   | 数据盘   | IP数量   | DDoS防御 | 价格（月） |
| --- |:--------:|:--------:|:------------:|:-------:|:---:|:-------------:|:-------:|:-------:|:-------:|:--------:|:--------:|
| 01  | 中国香港 | 将军澳   | 2核 E5-2673v4 | 2G DDR4 | CN2 | 6Mbps↓100Mbps | 10GB SSD | 20GB SSD | IPv4 1个 | 5G      | 5.20     |
| 02  | 中国香港 | 将军澳   | 4核 E5-2682v4 | 4G DDR4 | CN2 | 8Mbps↓100Mbps | 10GB SSD | 30GB SSD | IPv4 1个 | 5G      | 8.10     |
| 03  | 中国香港 | 将军澳   | 8核 E5-2682v4 | 8G DDR4 | CN2 | 10Mbps↓100Mbps | 10GB SSD | 40GB SSD | IPv4 1个 | 5G      | 14.00    |
| 04  | 中国香港 | 将军澳   | 16核 E5-2682v4 | 16G DDR4 | CN2 | 12Mbps↓100Mbps | 10GB SSD | 60GB SSD | IPv4 1个 | 5G      | 22.00    |

### 机器跑分
这个就是为01列配置的超开机的性能配置了

::tab{:tabs='["精简版", "完整版"]'}
#tab1
``` sh [vpsInfo] lang="sh"
-----------------------A Bench Script By spiritlhl-----------------------
                   测评频道: https://t.me/+UHVoo2U4VyA5NTQ1                    
VPS融合怪版本：2025.11.29
Shell项目地址：https://github.com/spiritLHLS/ecs
Go项目地址 [推荐]：https://github.com/oneclickvirt/ecs
---------------------基础信息查询--感谢所有开源项目----------------------
 CPU 型号          : Intel(R) Xeon(R) CPU E5-2682 v4 @ 2.50GHz
 CPU 核心数        : 2
 CPU 频率          : 2499.996 MHz
 CPU 缓存          : L1: 32.00 KB / L2: 256.00 KB / L3: 40.00 MB
 AES-NI指令集      : ✔ Enabled
 VM-x/AMD-V支持    : ✔ Enabled
 内存              : 629.03 MiB / 1.92 GiB
 Swap              : 36.36 MiB / 1.00 GiB
 硬盘空间          : 6.69 GiB / 19.20 GiB
 启动盘路径        : /dev/vda1
 系统在线时间      : 0 days, 21 hour 49 min
 负载              : 0.25, 0.21, 0.14
 系统              : Ubuntu 24.04.1 LTS (x86_64)
 架构              : x86_64 (64 Bit)
 内核              : 6.8.0-48-generic
 TCP加速方式       : cubic
 虚拟化架构        : KVM
 NAT类型           : Inconclusive
 IPV4 ASN          : AS134365 Ansheng Network Technology Co., Limited
 IPV4 位置         : Hong Kong / Hong Kong / HK
------------------------CPU测试--通过sysbench测试-------------------------
 -> CPU 测试中 (Fast Mode, 1-Pass @ 5sec)
 1 线程测试(单核)得分:          600 Scores
 2 线程测试(多核)得分:          1638 Scores
--------------------内存测试--感谢lemonbench开源----------------------------
 -> 内存测试 Test (Fast Mode, 1-Pass @ 5sec)
 单线程读测试:          15368.94 MB/s
 单线程写测试:          10492.09 MB/s
----------------------磁盘fio读写测试--感谢yabs开源-----------------------
Block Size | 4k            (IOPS) | 64k           (IOPS)
  ------   | ---            ----  | ----           ---- 
Read       | 119.78 MB/s  (29.9k) | 1.02 GB/s    (16.0k)
Write      | 120.09 MB/s  (30.0k) | 1.03 GB/s    (16.1k)
Total      | 239.87 MB/s  (59.9k) | 2.06 GB/s    (32.2k)
           |                      |                     
Block Size | 512k          (IOPS) | 1m            (IOPS)
  ------   | ---            ----  | ----           ---- 
Read       | 1.40 GB/s     (2.7k) | 1.34 GB/s     (1.3k)
Write      | 1.48 GB/s     (2.8k) | 1.43 GB/s     (1.4k)
Total      | 2.89 GB/s     (5.6k) | 2.78 GB/s     (2.7k)
---------------流媒体解锁--感谢oneclickvirt/UnlockTests测试----------------
Can not detect IPv6 Address
测试时间:  2026-01-12 12:15:23
IPV4:
============[ 跨国平台 ]============
Apple                     YES (Region: HKG) [Native]
BingSearch                YES (Region: US)
Claude                    YES [Native]
Dazn                      YES (Region: US) [Native]
Disney+                   YES (Region: US) [Native]
Gemini                    NO
GoogleSearch              YES
Google Play Store         YES (Region: HK) [Native]
IQiYi                     YES (Region: HK) [Native]
Instagram Licensed Audio  YES [Native]
KOCOWA                    YES [Native]
MetaAI                    YES (Region: US) [Native]
Netflix                   YES (Region: US) [Native]
Netflix CDN               US
OneTrust                  YES (Region: HK) [Via DNS]
ChatGPT                   YES (Only Available with Mobile APP) [Via DNS]
Paramount+                YES [Native]
Amazon Prime Video        YES (Region: US) [Native]
Reddit                    YES
SonyLiv                   YES (Region: HK) [Native]
Sora                      Banned (VPN Blocked)
Spotify Registration      NO
Steam Store               YES (Community Available) (Region: US)
TVBAnywhere+              YES (Region: US) [Native]
TikTok                    YES (Region: US) [Native]
Viu.com                   YES [Native]
Wikipedia Editability     YES
YouTube Region            YES (Region: HK) [Native]
YouTube CDN               HKG
---------------------TikTok解锁--感谢lmc999的源脚本---------------------
 Tiktok Region:         Failed
---------------------自动更新测速节点列表--本脚本原创----------------------
位置             上传速度        下载速度        延迟
Speedtest.net    1.89Mbps        0.08Mbps        693.83ms
联通上海5G       5.08Mbps        0.00Mbps        87.37ms
电信Suzhou5G     5.98Mbps        5.76Mbps        50.13ms
移动Suzhou       5.49Mbps        0.32Mbps        87.00ms
------------------------------------------------------------------------
 总共花费      : 9 分 18 秒
 时间          : Mon Jan 12 12:18:28 UTC 2026
------------------------------------------------------------------------
```

#tab2
还未测试出来
::

## 面板
在安装了宝塔面板并安装了`docker`与`niginx`的环境配置以及添加了评论系统`artalk`和说说系统`moment`后的负载

### 总体负载
总体来说处于正常水平，毕竟只有2核2G内存。
::pic
---
src: /image/PostInternal/2026/vpsTalk/panelInfo.avif
caption: 具体面板显示负载
---
::

### 具体跑分
在宝塔跑分中非常亮眼，写的性能与读的性能相比的情况下接近10倍。
::pic
---
src: /image/PostInternal/2026/vpsTalk/panelBenchMarking.avif
caption: 跑分详情
---
::