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
-------------------------------------VPS融合怪测试-------------------------------------
版本：v0.1.111
测评频道: https://t.me/+UHVoo2U4VyA5NTQ1
Go项目地址：https://github.com/oneclickvirt/ecs
Shell项目地址：https://github.com/spiritLHLS/ecs
--------------------------------------系统基础信息--------------------------------------
 CPU 型号            : Intel(R) Xeon(R) CPU E5-2682 v4 @ 2.50GHz
 CPU 数量            : 2 Virtual CPU(s)
 CPU 缓存            : L1: 64 KB / L2: 256 KB / L3: 40 MB
 GPU 型号            : GD 5446
 AES-NI              : ✔️ Enabled
 VM-x/AMD-V/Hyper-V  : ✔️ Enabled
 内存                : 664.48 MB / 1.92 GB
 气球驱动            : ❌ Undetected
 内核页合并          : ❌ Undetected
 虚拟内存 Swap       : 103.94 MB / 1.00 GB
 硬盘空间            : 6.78 GB / 19.20 GB [35.3%%] /dev/vda1 - /
 启动盘路径          : /dev/vda1
 系统                : ubuntu 24.04 [x86_64] 
 内核                : 6.8.0-48-generic
 系统在线时间        : 2 days, 00 hours, 26 minutes
 时区                : UTC
 负载                : 0.16 / 0.10 / 0.03
 虚拟化架构          : KVM
 NAT类型             : Inconclusive
 TCP加速方式         : cubic
 IPV4 ASN            : AS134365 Ansheng Network Technology Co., Limited
 IPV4 Location       : United States
 IPV4 Active IPs     : 65/256 (subnet /24) 408/1024 (prefix /22)
--------------------------------CPU测试-通过sysbench测试--------------------------------
1 线程测试(单核)得分:    835.85
2 线程测试(多核)得分:   1423.72
---------------------------------内存测试-通过stream测试----------------------------------
Function    Best Rate MB/s  Avg time     Min time     Max time
Copy:           14800.9     0.011329     0.010810     0.013002
Scale:           7930.2     0.021317     0.020176     0.026987
Add:             8657.3     0.029648     0.027722     0.037663
Triad:           8625.4     0.029657     0.027825     0.037671
-----------------------------------硬盘测试-通过fio测试-----------------------------------
测试路径         块大小       读测试(IOPS)            写测试(IOPS)            总和(IOPS)            
/root             4k        123.00 MB/s(30.7k)      123.32 MB/s(30.8k)      246.32 MB/s(61.6k)     
/root             64k       532.90 MB/s(8326)       535.71 MB/s(8370)       1.07 GB/s(16.7k)       
/root             512k      897.97 MB/s(1753)       945.68 MB/s(1847)       1.84 GB/s(3600)        
/root             1m        961.88 MB/s(939)        1.03 GB/s(1001)         1.99 GB/s(1940)        
--------------------------------------跨国平台解锁--------------------------------------
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
Paramount+                Failed (Network Connection Failed)
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
-------------------------------------三网回程路由检测-------------------------------------
[NextTrace API] preferred API IP - 104.26.12.151 - 398.64ms - Misaka.LAX
广州电信 - ICMP v4 - traceroute to 58.60.188.222, 30 hops max, 52 byte packets
16.04 ms     AS137443   *                  中国, 香港, 51idc.com 
1.51 ms      *          *                  *
21.58 ms     *          *                  *
12.74 ms     *          *                  *
2.32 ms      *          *                  *
*
广州联通 - ICMP v4 - traceroute to 210.21.196.6, 30 hops max, 52 byte packets
15.37 ms     AS137443   *                  中国, 香港, 51idc.com 
1.47 ms      *          *                  *
72.11 ms     *          *                  *
13.57 ms     *          *                  *
2.55 ms      *          *                  *
*
16.89 ms     AS17623    *                  中国, 广东, 深圳, chinaunicom.cn  联通
广州移动 - ICMP v4 - traceroute to 120.196.165.24, 30 hops max, 52 byte packets
8.31 ms      AS137443   *                  中国, 香港, 51idc.com 
1.12 ms      *          *                  *
72.12 ms     *          *                  *
13.61 ms     *          *                  *
2.50 ms      *          *                  *
*
55.61 ms     AS56040    [APNIC-AP]         中国, 广东, 深圳, gd.10086.cn  移动
--------------------------------------就近节点测速--------------------------------------
位置            上传速度        下载速度        延迟            丢包率          
Speedtest.net   6.25 Mbps       5.82 Mbps       835.756002ms    0.00% (Sent: 403/Dup: 0/Max: 402)
其他Shanghai     11.09 Mbps      6.18 Mbps       50.82 ms        N/A             
联通Shenzhen     6.30 Mbps       6.48 Mbps       258.56 ms       N/A             
电信Shenzhen     7.52 Mbps       5.95 Mbps       63.29 ms        N/A             
移动Shanghai     9.75 Mbps       6.05 Mbps       179.33 ms       N/A             
----------------------------------------------------------------------------------
花费          : 7 分 28 秒
时间          : Tue Jan 13 14:55:57 UTC 2026
----------------------------------------------------------------------------------
```

#tab2
``` sh [vpsInfo] lang="sh"
-------------------------------------VPS融合怪测试-------------------------------------
版本：v0.1.110
测评频道: https://t.me/+UHVoo2U4VyA5NTQ1
Go项目地址：https://github.com/oneclickvirt/ecs
Shell项目地址：https://github.com/spiritLHLS/ecs
--------------------------------------系统基础信息--------------------------------------
 CPU 型号            : Intel(R) Xeon(R) CPU E5-2682 v4 @ 2.50GHz
 CPU 数量            : 2 Virtual CPU(s)
 CPU 缓存            : L1: 64 KB / L2: 256 KB / L3: 40 MB
 GPU 型号            : GD 5446
 AES-NI              : ✔️ Enabled
 VM-x/AMD-V/Hyper-V  : ✔️ Enabled
 内存                : 677.90 MB / 1.92 GB
 气球驱动            : ❌ Undetected
 内核页合并          : ❌ Undetected
 虚拟内存 Swap       : 102.18 MB / 1.00 GB
 硬盘空间            : 6.78 GB / 19.20 GB [35.3%%] /dev/vda1 - /
 启动盘路径          : /dev/vda1
 系统                : ubuntu 24.04 [x86_64] 
 内核                : 6.8.0-48-generic
 系统在线时间        : 1 days, 14 hours, 31 minutes
 时区                : UTC
 负载                : 0.00 / 0.09 / 0.16
 虚拟化架构          : KVM
 NAT类型             : Inconclusive
 TCP加速方式         : cubic
 IPV4 ASN            : AS134365 Ansheng Network Technology Co., Limited
 IPV4 Location       : United States
 IPV4 Active IPs     : 65/256 (subnet /24)
--------------------------------CPU测试-通过sysbench测试--------------------------------
1 线程测试(单核)得分:    685.81
2 线程测试(多核)得分:   1558.64
---------------------------------内存测试-通过stream测试----------------------------------
Function    Best Rate MB/s  Avg time     Min time     Max time
Copy:           15016.2     0.011082     0.010655     0.011821
Scale:           7972.9     0.020528     0.020068     0.021185
Add:             8808.0     0.028036     0.027248     0.029124
Triad:           8782.5     0.028411     0.027327     0.029184
-----------------------------------硬盘测试-通过fio测试-----------------------------------
测试路径         块大小       读测试(IOPS)            写测试(IOPS)            总和(IOPS)            
/root             4k        131.45 MB/s(32.9k)      131.80 MB/s(32.9k)      263.25 MB/s(65.8k)     
/root             64k       1.07 GB/s(16.7k)        1.08 GB/s(16.8k)        2.15 GB/s(33.6k)       
/root             512k      1.20 GB/s(2349)         1.27 GB/s(2474)         2.47 GB/s(4823)        
/root             1m        1.47 GB/s(1436)         1.57 GB/s(1531)         3.04 GB/s(2967)        
--------------------------------------跨国平台解锁--------------------------------------
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
--------------------------------------IP质量检测--------------------------------------
以下为各数据库编号，输出结果后将自带数据库来源对应的编号
ipinfo数据库  [0] | scamalytics数据库 [1] | virustotal数据库   [2] | abuseipdb数据库   [3] | ip2location数据库    [4]
ip-api数据库  [5] | ipwhois数据库     [6] | ipregistry数据库   [7] | ipdata数据库      [8] | db-ip数据库          [9]
ipapiis数据库 [A] | ipapicom数据库    [B] | bigdatacloud数据库 [C] | dkly数据库        [D] | ipqualityscore数据库 [E]
ipintel数据库 [F] | ipfighter数据库   [G] | fraudlogix数据库   [H] | cloudflare数据库  [I] |
IPV4:
安全得分:
信任得分(越高越好): 33 [8] 
VPN得分(越低越好): 100 [8] 
代理得分(越低越好): 0 [8] 
社区投票-无害: 0 [2] 
社区投票-恶意: 0 [2] 
威胁得分(越低越好): 100 [8] 
欺诈得分(越低越好): 0 [E] 
滥用得分(越低越好): 0 [3 H] 
ASN滥用得分(越低越好): 0.0108 (Elevated) [A] 
公司滥用得分(越低越好): 0.0313 (High) [A] 
威胁级别: Low [H] low [9]
流量占比: 真人(越高越好)14% [I] 机器人(越低越好)85% [I]
黑名单记录统计:(有多少黑名单网站有记录):
无害记录数: 0 [2]  恶意记录数: 0 [2]  可疑记录数: 0 [2]  无记录数: 93 [2] 
安全信息:
使用类型: hosting [0 3 7 A C] residential [H] business [9] unknown [8]
公司类型: hosting [0 7] business [A]
浏览器类型: 主流87% 其他12% [I] 
设备类型: 桌面93% 移动6% 其他0% [I] 
操作系统类型: 主流93% 其他6% [I] 
是否云提供商: Yes [7 D] 
是否数据中心: No [5 8 A G H] Yes [0 C]
是否移动设备: No [5 A C G] Yes [E]
是否代理: No [0 4 5 7 8 9 A C D E H] Yes [G]
是否VPN: No [0 7 A C D E G H] 
是否TorExit: No [7 D] 
是否Tor出口: No [7 D] 
是否网络爬虫: No [9 A E] 
是否匿名: Yes [8] No [7 D]
是否攻击者: No [7 8 D] 
是否滥用者: No [7 8 A C D E] 
是否威胁: No [7 8 C D] 
是否中继: No [0 7 8 C D] 
是否Bogon: No [7 8 A C D] 
是否机器人: No [E H] 
--------------------------------------邮件端口检测--------------------------------------
Platform  SMTP  SMTPS POP3  POP3S IMAP  IMAPS
LocalPort ✔     ✔     ✔     ✔     ✔     ✔    
QQ        ✔     ✔     ✔     ✘     ✔     ✘    
163       ✔     ✔     ✔     ✘     ✔     ✘    
Sohu      ✔     ✔     ✔     ✘     ✔     ✘    
Yandex    ✔     ✔     ✔     ✘     ✔     ✘    
Gmail     ✔     ✔     ✘     ✘     ✘     ✘    
Outlook   ✔     ✘     ✔     ✘     ✔     ✘    
Office365 ✔     ✘     ✔     ✘     ✔     ✘    
Yahoo     ✔     ✔     ✘     ✘     ✘     ✘    
MailCOM   ✔     ✔     ✔     ✘     ✔     ✘    
MailRU    ✔     ✔     ✘     ✘     ✔     ✘    
AOL       ✔     ✔     ✘     ✘     ✘     ✘    
GMX       ✔     ✔     ✔     ✘     ✔     ✘    
Sina      ✔     ✘     ✔     ✘     ✔     ✘    
Apple     ✘     ✘     ✘     ✘     ✘     ✘    
FastMail  ✘     ✔     ✘     ✘     ✘     ✘    
ProtonMail✘     ✘     ✘     ✘     ✘     ✘    
MXRoute   ✔     ✘     ✔     ✘     ✔     ✘    
Namecrane ✔     ✔     ✔     ✘     ✔     ✘    
XYAMail   ✘     ✘     ✘     ✘     ✘     ✘    
ZohoMail  ✘     ✔     ✘     ✘     ✘     ✘    
Inbox_eu  ✔     ✔     ✔     ✘     ✘     ✘    
Free_fr   ✘     ✘     ✔     ✘     ✔     ✘    
------------------------------------上游及回程线路检测-------------------------------------
北京电信v4 219.141.140.10  检测不到回程路由节点的IPV4地址
北京联通v4 202.106.195.68  检测不到回程路由节点的IPV4地址
北京移动v4 221.179.155.161 检测不到回程路由节点的IPV4地址
上海电信v4 202.96.209.133  检测不到回程路由节点的IPV4地址
上海联通v4 210.22.97.1     检测不到回程路由节点的IPV4地址
上海移动v4 211.136.112.200 检测不到回程路由节点的IPV4地址
广州电信v4 58.60.188.222   检测不到回程路由节点的IPV4地址
广州联通v4 210.21.196.6    检测不到回程路由节点的IPV4地址
广州移动v4 120.196.165.24  检测不到回程路由节点的IPV4地址
成都电信v4 61.139.2.69     检测不到回程路由节点的IPV4地址
成都联通v4 119.6.6.6       检测不到回程路由节点的IPV4地址
成都移动v4 211.137.96.205  检测不到回程路由节点的IPV4地址
准确线路自行查看详细路由，本测试结果仅作参考
同一目标地址多个线路时，检测可能已越过汇聚层，除第一个线路外，后续信息可能无效
-------------------------------------三网回程路由检测-------------------------------------
广州电信 - ICMP v4 - traceroute to 58.60.188.222, 30 hops max, 52 byte packets
8.57 ms      AS137443   *                  中国, 香港, 51idc.com 
1.43 ms      *          *                  *
4.60 ms      *          *                  *
42.72 ms     *          *                  *
2.93 ms      *          *                  *
*
广州联通 - ICMP v4 - traceroute to 210.21.196.6, 30 hops max, 52 byte packets
13.37 ms     AS137443   *                  中国, 香港, 51idc.com 
1.52 ms      *          *                  *
4.64 ms      *          *                  *
14.20 ms     *          *                  *
2.98 ms      *          *                  *
*
17.33 ms     AS17623    *                  中国, 广东, 深圳, chinaunicom.cn  联通
广州移动 - ICMP v4 - traceroute to 120.196.165.24, 30 hops max, 52 byte packets
4.97 ms      AS137443   *                  中国, 香港, 51idc.com 
1.33 ms      *          *                  *
4.82 ms      *          *                  *
13.92 ms     *          *                  *
2.99 ms      *          *                  *
*
45.68 ms     AS56040    [APNIC-AP]         中国, 广东, 深圳, gd.10086.cn  移动
-------------------------------------PING值检测--------------------------------------
TG-DC5 Singapore      65 | TG-DC4 AMS NL        199 | TG-DC2 AMS NL        199 | 
TG-DC3 MIA USA       230 | TG-DC1 MIA USA       251 | 
Sora                  50 | StackOverflow         82 | Google                95 | 
Wikipedia            111 | Bilibili             111 | OpenAI               114 | 
DisneyPlus           201 | TVB Anywhere         209 | MetaAI               254 | 
AliExpress           281 | DigitalOcean         304 | Microsoft            323 | 
Facebook             356 | Bing                 368 | Apple                379 | 
Amazon               421 | iQIYI                454 | Steam                474 | 
eBay                 485 | Instagram            504 | Spotify              514 | 
GitLab               540 | Reddit               546 | BBC                  554 | 
AWS                  579 | Twitch               600 | Docker Hub           642 | 
NYTimes              706 | CNN                  742 | YouTube              826 | 
TikTok               903 | Twitter/X            920 | Claude               993 | 
GitHub              1128 | Azure               1278 | Gemini              1302 | 
PrimeVideo          1489 | Google Cloud        1583 | ViuTV               1963 | 
Netflix             9999 | 
--------------------------------------就近节点测速--------------------------------------
位置            上传速度        下载速度        延迟            丢包率          
Speedtest.net   5.11 Mbps       4.41 Mbps       803.19659ms     0.50% (Sent: 401/Dup: 0/Max: 402)
中国香港        5.51 Mbps       5.73 Mbps       4.128719ms      N/A             
新加坡          5.71 Mbps       5.76 Mbps       47.097017ms     N/A             
联通Shanghai     31.26 Mbps      N/A             35.02 ms        N/A             
联通Shenzhen     9.78 Mbps       5.99 Mbps       49.61 ms        N/A             
电信Shanghai     9.99 Mbps       5.20 Mbps       242.81 ms       N/A             
电信Chengdu      10.23 Mbps      6.48 Mbps       266.59 ms       N/A             
移动Shanghai     8.94 Mbps       6.29 Mbps       164.15 ms       N/A             
移动Shenzhen     8.00 Mbps       5.91 Mbps       170.18 ms       N/A             
----------------------------------------------------------------------------------
花费          : 10 分 34 秒
时间          : Tue Jan 13 05:04:39 UTC 2026
----------------------------------------------------------------------------------
```
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