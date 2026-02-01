---
title: 随笔：大容量主机测试
description: 该文章主要写了对于大容量硬盘主机的试水。在测试的过程中发现机器性能较高，且展示出机器的具体价格，并单独列出只有精简版未采用完整版测试。
date: 2026-01-30 10:00:00
updated: 2026-01-30 20:49:00
image: /image/PostCover/vpsTalk.avif
categories: [博客魔改]
tags: [Nuxt, 魔改, 美化]
recommend: true
---
## 前言
原本想要查找一些大容量的VPS来搭建一些影视站，结果翻来覆去还是没找到，依旧小兔云起手。搞了台80G HDD的VPS来用了,后续将会出一期NAS系统使用与影视站的效果。

## 价格
| 序号 | 所属地区 | 数据中心 | CPU            | 内存    | 线路 | 带宽   | 系统盘   | 数据盘   | IP数量   | DDoS防御 | 价格（月） | 购买地址 |
|:----:|:--------:|:--------:|:--------------:|:-------:|:----:|:------:|:--------:|:-------:|:---------:|:--------:|:----------:|:--------:|
| ACS1 | 中国香港 | 大浦     | 2核 E5-2683 v4 | 2G DDR4 | CN2  | 5Mbps  | 30GB HDD | 50G HDD | IPv4 1个  | 无       | 10.45      | [购买链接](https://moebun.com/cart?action=configureproduct&pid=920) |
| ACS2 | 中国香港 | 大浦     | 4核 E5-2683 v4 | 4G DDR4 | CN2  | 8Mbps  |          |         | IPv4 1个  |          | 17.40      | [购买链接](https://moebun.com/cart?action=configureproduct&pid=921)         |
| ACS3 | 中国香港 | 大浦     | 8核 E5-2683 v4 | 8G DDR4 | CN2  | 12Mbps |          |         | IPv4 1个  |          | 36.58      | [购买链接](https://moebun.com/cart?action=configureproduct&pid=922)         |

## 基础信息
| 类型 | 结果 | 
|------|------|
| **CPU 型号** | Intel(R) Xeon(R) CPU E5-2683 v4 @ 2.10GHz |
| **CPU 数量** | 2 Virtual CPU(s) |
| **CPU 缓存** | L1: 64 KB / L2: 256 KB / L3: 40 MB |
| **GPU 型号** | GD 5446 |
| **AES-NI** | ✔️ Enabled |
| **虚拟化支持** | VM-x/AMD-V/Hyper-V ✔️ Enabled |
| **内存** | 1.92 GB |
| **气球驱动** | ❌ Undetected |
| **内核页合并** | ❌ Undetected |
| **硬盘空间** | Disk1: 48.91GB<br>Disk2: 38.58GB |
| **虚拟化架构** | KVM |
| **NAT类型** | Port Restricted Cone |
| **TCP加速** | cubic |
| **IPV4 ASN** | AS152705 Gcc Cloud Technology Limited |
| **IPV4 位置** | Seychelles |

**评价**：这机器配置比较基础，双核老款至强CPU，主频不高，干活可能有点慢。内存不到2GB，现在手机都比这大，跑点轻量应用还行。硬盘加起来不到90G，够用但别想存太多东西。IP在塞舌尔，位置有点远。整体就是一台普通的境外小水管VPS。

## 性能测试
### 1. CPU性能 (Sysbench)
| 测试模式 | 得分 |
|----------|------|
| 单核测试 | 690.02 |
| 多核测试 | 1066.06 |

**评价**：CPU分数有点低，单核不到700，多核才1000出头。看来这老型号双核性能确实一般，干重活会比较吃力，适合跑跑脚本、挂个小站。
### 2. 内存性能 (Stream)
| 功能 | 最佳速率(MB/s) | 平均耗时(s) | 最短耗时(s) | 最长耗时(s) |
|------|----------------|-------------|-------------|-------------|
| Copy | 13641.4 | 0.012519 | 0.011729 | 0.013127 |
| Scale | 7380.4 | 0.025681 | 0.021679 | 0.032331 |
| Add | 8017.1 | 0.035470 | 0.029936 | 0.041961 |
| Triad | 7926.1 | 0.033188 | 0.030280 | 0.039782 |

**评价**：内存复制速度还行，能到13GB/s，但其他操作就慢不少了，尤其是缩放（Scale）速度掉了一半多。日常用用没问题，但别指望它处理大量数据运算。
### 3. 硬盘性能 (FIO)
| 测试路径 | 块大小 | 读IOPS | 写IOPS | 总IOPS |
|----------|--------|--------|--------|--------|
| /root | 4K | 2564 | 2572 | 5136 |
| /root | 64K | 2526 | 2540 | 5066 |
| /root | 512K | 668 | 704 | 1372 |
| /root | 1M | 297 | 316 | 613 |

**评价**：硬盘IOPS在小文件（4K/64K）读写时还有5000左右，凑合能用。但处理大文件（512K/1M）时性能暴跌，只有几百。说明这硬盘适合零碎文件读写，不适合当下载盘或频繁搬运大文件。

## 流媒体解锁能力

| 平台                       | 状态       | 备注                   |
| ------------------------ | -------- | -------------------- |
| Apple                    | ✅ 原生     | 该机器判定地区为中国香港        |
| Bing Search              | ✅ 原生     | 该机器判定地区为全球           |
| Claude                   | ✅ 原生     | 该机器判定地区为中国香港                   |
| Dazn                     | ✅ 原生     | 该机器判定地区为新加坡       |
| Disney+                  | ✅ 原生     | 该机器判定地区为中国香港        |
| Gemini                   | ❌ 非原生    | —                    |
| Google Search            | ✅ 原生     | —                    |
| Google Play Store        | ✅ 原生     | 该机器判定地区为中国香港        |
| IQiYi                    | ✅ 原生     | 该机器判定地区为中国香港        |
| Instagram Licensed Audio | ✅ 原生     | 原生                   |
| KOCOWA                   | ❌ 非原生    | —                    |
| MetaAI                   | ❌ 非原生    | 不知道为啥会出现原生悖论   |
| Netflix                  | ✅ 原生     | 该机器判定地区为中国香港        |
| Netflix CDN              | US       | 该机器判定地区为美国           |
| OneTrust                 | ✅ 原生     | 通过 DNS；该机器判定地区为中国香港    |
| ChatGPT                  | ✅ 原生     | 仅可通过手机 App 使用；通过 DNS |
| Paramount+               | ✅ 原生     | 原生                   |
| Amazon Prime Video       | ✅ 原生     | 该机器判定地区为中国香港        |
| Reddit                   | ✅ 原生     | —                    |
| SonyLiv                  | ✅ 原生     | 该机器判定地区为中国香港        |
| Sora                     | Banned   | VPN 被封锁              |
| Spotify Registration     | ❌ 非原生    | —                    |
| Steam Store              | ✅ 原生     | 社区可用；该机器判定地区为新加坡     |
| TVBAnywhere+             | ✅ 原生     | 该机器判定地区为新加坡       |
| TikTok                   | ✅ 原生     | 该机器判定地区为新加坡       |
| Viu.com                  | ✅ 原生     | 原生                   |
| Wikipedia Editability    | ✅ 原生     | —                    |
| YouTube Region           | ✅ 原生     | 该机器判定地区为中国香港        |
| YouTube CDN              | ❌ 非原生 | 该机器判定地区为澳大利亚 |

**评价**：解锁能力真不错！Netflix、Disney+、TVB这些主流平台都是原生解锁，地区主要是中国香港和新加坡。不过Sora被封锁了，YouTube CDN也不是原生，有点小遗憾。看剧党应该会很喜欢。

## IP质量检测
| 检测类别 | 检测项目 | 检测结果 | 数据来源 |
| :--- | :--- | :--- | :--- |
| **安全得分** | 信任得分 (越高越好) | 100 | ipdata数据库 |
| | VPN得分 (越低越好) | 0 | ipdata数据库 |
| | 代理得分 (越低越好) | 0 | ipdata数据库 |
| | 社区投票-无害 | 0 | virustotal数据库 |
| | 社区投票-恶意 | 0 | virustotal数据库 |
| | 威胁得分 (越低越好) | 1 | ipdata数据库 |
| | 欺诈得分 (越低越好) | 65 | ipqualityscore数据库 |
| | 滥用得分 (越低越好) | 0 | abuseipdb数据库 |
| | ASN滥用得分 (越低越好) | 0.0023 (Low) | ipapiis数据库 |
| | 公司滥用得分 (越低越好) | 0.0117 (Elevated) | ipapiis数据库 |
| | 威胁级别 | low | db-ip数据库 |
| **黑名单记录** | 无害记录数 | 0 | virustotal数据库 |
| | 恶意记录数 | 0 | virustotal数据库 |
| | 可疑记录数 | 0 | virustotal数据库 |
| | 无记录数 | 93 | virustotal数据库 |
| | DNS-黑名单 | 314(Total_Check) 0(Clean) 9(Blacklisted) 21(Other) | 未提供 |
| **安全信息-使用类型** | 使用类型 | unknown, business, hosting | bigdatacloud数据库, db-ip数据库, ipapiis数据库, ipinfo数据库, abuseipdb数据库, ipregistry数据库, ipdata数据库 |
| | 公司类型 | business, hosting | ipinfo数据库, ipapiis数据库, ipregistry数据库 |
| **安全信息-主机特征** | 是否云提供商 | Yes | ipregistry数据库 |
| | 是否数据中心 | 存在矛盾 (No / Yes) | ip-api数据库, bigdatacloud数据库, ipfighter数据库 / ipinfo数据库, ipdata数据库, ipapiis数据库 |
| | 是否移动设备 | 存在矛盾 (No / Yes) | ip-api数据库, ipapiis数据库, bigdatacloud数据库, ipfighter数据库 / ipqualityscore数据库 |
| | 是否代理 | 存在矛盾 (No / Yes) | ipinfo数据库, ip2location数据库, ip-api数据库, ipregistry数据库, ipdata数据库, db-ip数据库, ipapiis数据库, bigdatacloud数据库 / ipqualityscore数据库, ipfighter数据库 |
| | 是否VPN | 存在矛盾 (No / Yes) | ipinfo数据库, ipregistry数据库, ipapiis数据库, bigdatacloud数据库, ipfighter数据库 / ipqualityscore数据库 |
| | 是否Tor出口 | No | ipregistry数据库 |
| | 是否网络爬虫 | No | db-ip数据库, ipapiis数据库, ipqualityscore数据库 |
| | 是否匿名 | No | ipregistry数据库, ipdata数据库 |
| | 是否攻击者 | No | ipregistry数据库, ipdata数据库 |
| | 是否滥用者 | No | ipregistry数据库, ipdata数据库, ipapiis数据库, bigdatacloud数据库, ipqualityscore数据库 |
| | 是否威胁 | No | ipregistry数据库, ipdata数据库, bigdatacloud数据库 |
| | 是否中继 | No | ipinfo数据库, ipregistry数据库, ipdata数据库, bigdatacloud数据库 |
| | 是否Bogon | No | ipregistry数据库, ipdata数据库, ipapiis数据库, bigdatacloud数据库 |
| | 是否机器人 | No | ipqualityscore数据库 |

**评价**：IP安全质量看起来挺好的，信任分满分，黑名单记录也是0，像个“干净IP”。不过好几个数据库对“是否代理/数据中心”的判断打架，有点怪，可能是个比较新的IP段。日常用风险不高。

## 邮件端口检测
| 平台 | SMTP | SMTPS | POP3 | POP3S | IMAP | IMAPS |
|------|------|-------|------|-------|------|-------|
| LocalPort | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| QQ | ✔ | ✔ | ✔ | ✘ | ✔ | ✘ |
| 163 | ✔ | ✔ | ✔ | ✘ | ✔ | ✘ |
| Sohu | ✔ | ✔ | ✔ | ✘ | ✔ | ✘ |
| Yandex | ✔ | ✔ | ✔ | ✘ | ✔ | ✘ |
| Gmail | ✔ | ✔ | ✘ | ✘ | ✘ | ✘ |
| Outlook | ✔ | ✘ | ✔ | ✘ | ✔ | ✘ |
| Office365 | ✔ | ✘ | ✔ | ✘ | ✔ | ✘ |
| Yahoo | ✔ | ✔ | ✘ | ✘ | ✘ | ✘ |
| MailCOM | ✔ | ✔ | ✔ | ✘ | ✔ | ✘ |
| MailRU | ✔ | ✔ | ✘ | ✘ | ✔ | ✘ |
| AOL | ✔ | ✔ | ✘ | ✘ | ✘ | ✘ |
| GMX | ✔ | ✔ | ✔ | ✘ | ✔ | ✘ |
| Sina | ✔ | ✔ | ✔ | ✘ | ✔ | ✘ |
| Apple | ✘ | ✔ | ✘ | ✘ | ✘ | ✘ |
| FastMail | ✘ | ✔ | ✘ | ✘ | ✘ | ✘ |
| ProtonMail | ✘ | ✘ | ✘ | ✘ | ✘ | ✘ |
| MXRoute | ✔ | ✘ | ✔ | ✘ | ✔ | ✘ |
| Namecrane | ✔ | ✔ | ✔ | ✘ | ✔ | ✘ |
| XYAMail | ✘ | ✘ | ✘ | ✘ | ✘ | ✘ |
| ZohoMail | ✘ | ✔ | ✘ | ✘ | ✘ | ✘ |
| Inbox_eu | ✔ | ✔ | ✔ | ✘ | ✘ | ✘ |
| Free_fr | ✘ | ✔ | ✔ | ✘ | ✔ | ✘ |

**评价**：本地邮件端口全开，但对外连接各大邮箱时情况不一。像QQ、163这些国内邮箱支持挺好，但Gmail、Outlook就只开了基础端口，安全端口（SSL/TLS）很多都不支持。ProtonMail干脆全关。发普通邮件还行，但安全性要求高的可能费劲。

## 三网回程路由检测
| 目标节点 | 延迟 | 自治系统号 (ASN) | 备注/地理位置 | 运营商 |
| :--- | :--- | :--- | :--- | :--- |
| **广州电信** | 3.85 ms | AS137443 | 中国, 中国香港, 51idc.com | - |
| | 1.28 ms | * | * | * |
| | 4.64 ms | * | * | * |
| | 149.00 ms | * | * | * |
| | 2.25 ms | * | * | * |
| **广州联通** | 3.74 ms | AS137443 | 中国, 中国香港, 51idc.com | - |
| | 1.26 ms | * | * | * |
| | 4.63 ms | * | * | * |
| | 148.77 ms | * | * | * |
| | 2.21 ms | * | * | * |
| | 18.58 ms | AS17623 | 中国, 广东, 深圳 | 联通 |
| **广州移动** | 15.48 ms | AS137443 | 中国, 中国香港, 51idc.com | - |
| | 1.31 ms | * | * | * |
| | 4.67 ms | * | * | * |
| | 148.56 ms | * | * | * |
| | 2.29 ms | * | * | * |
| | 44.25 ms | AS56040 | 中国, 广东, 深圳, gd.10086.cn | 移动 |

**评价**：回国内的路由挺直的！到广州三网延迟都很低（<20ms），第一跳都是香港机房。虽然中间有一跳延迟突然飙升到149ms，但最终延迟还是很低。说明到中国大陆的连接优化得不错，网络质量可以。

## PING值延迟检测
| 服务/节点 (低延迟 ↔ 高延迟) | 延迟 (ms) | 服务/节点 (低延迟 ↔ 高延迟) | 延迟 (ms) |
| :--- | :--- | :--- | :--- |
| TG-DC5 Singapore | 77 | Instagram | 279 |
| Sora | 64 | Bing | 285 |
| StackOverflow | 117 | MetaAI | 294 |
| Bilibili | 121 | Google | 312 |
| TikTok | 123 | Amazon | 314 |
| AliExpress | 131 | Facebook | 339 |
| OpenAI | 180 | Microsoft | 417 |
| ViuTV | 198 | Azure | 420 |
| TVB Anywhere | 202 | DigitalOcean | 427 |
| DisneyPlus | 274 | Apple | 464 |
| **... (更多服务)** | | **... (更高延迟)** | |
| Spotify | 526 | Twitter/X | 909 |
| Steam | 545 | CNN | 926 |
| iQIYI | 556 | GitLab | 937 |
| Docker Hub | 656 | NYTimes | 1064 |
| Twitch | 666 | Claude | 1137 |
| Reddit | 701 | eBay | 1198 |
| PrimeVideo | 715 | Gemini | 1280 |
| BBC | 742 | GitHub | 1495 |
| AWS | 742 | Google Cloud | 2564 |
| | | YouTube | 2698 |
| | | Netflix | 9999 |
| | | Wikipedia | 9999 |

**评价**：延迟分布两极分化。到香港、新加坡等东南亚节点很快（<80ms），但到美国西岸就300ms左右，到欧洲、美国东岸普遍700ms以上，甚至有些超时（9999ms）。这机器就适合在亚洲用，连欧美速度不行。

## 就近节点测速
这部分测试了您的VPS连接到不同地区节点的上传/下载速度、延迟和丢包率，反映了实际带宽表现。

| 位置 | 上传速度 | 下载速度 | 延迟 | 丢包率 |
| :--- | :--- | :--- | :--- | :--- |
| Speedtest.net | 5.57 Mbps | 4.84 Mbps | 117.44 ms | 0.00% |
| 中国中国香港 | 6.06 Mbps | 4.77 Mbps | 13.20 ms | N/A |
| 新加坡 | 5.08 Mbps | 4.73 Mbps | 45.08 ms | N/A |
| 联通Shanghai | 29.67 Mbps | N/A | 34.74 ms | N/A |
| 联通Shenzhen | 7.61 Mbps | 5.10 Mbps | 55.30 ms | N/A |
| 联通Changsha | 8.48 Mbps | 5.35 Mbps | 60.39 ms | N/A |
| 电信Shanghai | 7.76 Mbps | 4.97 Mbps | 251.59 ms | N/A |
| 电信Shenzhen | 8.88 Mbps | 5.22 Mbps | 290.12 ms | N/A |
| 移动Shanghai | 7.12 Mbps | 5.14 Mbps | 306.23 ms | N/A |
| 移动Shenzhen | 6.05 Mbps | 5.06 Mbps | 314.29 ms | N/A |

**评价**：带宽是硬伤！速度测试最高才30Mbps，普遍在5-10Mbps上下，就是个小水管。延迟到香港很好（13ms），但到国内电信、移动节点都超过250ms了。总结：网络定位在亚洲，带宽很小，适合低流量应用。

## 总结

| 评估维度 | 主要特点 | 说明 |
| :--- | :--- | :--- |
| **流媒体解锁** | **非常出色** | 能原生解锁 Netflix、Disney+、TVB 等多个主流平台，对“看剧党”是巨大优势。 |
| **网络质量** | **亚洲延迟低，国际带宽小** | 到中国香港、新加坡等地延迟很低（<80ms），但带宽是硬伤（普遍 5-10 Mbps），是典型的“小水管”。 |
| **硬件性能** | **基础水平** | CPU为老款至强处理器，性能评分偏低；内存不足2GB；硬盘处理大文件时性能一般。 |
| **IP质量** | **比较干净** | 安全得分高，黑名单记录为0，适合需要“干净IP”的常规业务。 |
| **架构与位置** | KVM虚拟化，塞舌尔机房 | 位于塞舌尔，适合对网络位置有特殊要求的用户。 |

## 适合人群
### ✅适合哪些人？

*   **流媒体解锁专用**：这是它最突出的亮点。如果你主要需求是流畅观看Netflix、Disney+等平台，它会是很好的选择。
*   **轻量级应用与测试**：适合部署访问量不大的**个人博客、介绍页面**，或作为**Linux环境学习、编程开发测试**平台。只要应用不消耗太多资源，基本可以稳定运行。
*   **对亚洲网络延迟敏感的业务**：需要低延迟连接香港、新加坡等地的轻量任务，例如**外贸建站**（主要面向亚洲客户）或**小型游戏私服**（对带宽要求不高）。

### ❌不适合哪些人？

*   **高性能计算或高流量网站**：需要运行**大型数据库、高并发Web应用**，或日均访问量过万的中大型网站。它的CPU、内存和I/O能力会成为瓶颈。
*   **大带宽应用**：需要频繁进行**大文件传输、视频直播、搭建高速代理**等。它的小水管带宽无法满足要求。
*   **主要面向欧美用户**：业务目标用户集中在欧美地区。服务器到这些地区的网络延迟很高（普遍300ms以上），体验会很差。
*   **追求最新硬件**：希望使用高性能CPU和高速SSD硬盘的用户。这款服务器的硬件配置属于入门级。