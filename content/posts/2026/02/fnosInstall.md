---
title: 给老MAC升级为飞牛OS
description: 该文章主要写了对于低价机器的试水，并提醒是超开类型的机器。在测试的过程中发现机器性能较高，且展示出机器的具体价格，并单独列出只有精简版未采用完整版测试。
date: 2026-01-12 10:00:00
updated: 2026-01-12 20:49:00
image: /image/PostCover/vpsTalk.avif
categories: [博客魔改]
tags: [Nuxt, 魔改, 美化]
recommend: true
---

## 前言
前段时间不是实测了一台80G HDD的大容量机器，结果呢花了一些时间还是没法搞定飞牛OS(即FNOS)，秉承着有旧机不搞垃圾货的原则，所以拿出一台来自于2013年的macbook air。至于为什么用这台机器呢，毕竟是我第一台电脑也是我抵达互联网搭建博客的来时路，外加我弟弟没完全用到这台也就闲着了。

## 安装过程
- 1.首先下载飞牛的系统，等待下载完成。
- 2.使用刻录软件，进行刻录
- 3.启动安装盘，各个厂商主板可以去查找快捷键进入BIOS或UEFI两种模式，这边因为是苹果主板所以长按option键。
- 4.按照官方的教程来，在一些特定的步骤中可以进行自定义，在网卡方面需要注意，没有显示出网卡代表未适配该主板产商需要外接网线。

## 遇到问题
在专研这台mac的时候发现许多问题，包括了网卡问题、启动问题、访问问题。
### 网卡问题
正如我所说的那样，即使是Intel版本的macbook也在网卡这方面栽倒，网卡驱动这方面太过抓马了。所以我通过使用腾讯元宝来为我生成出一套脚本来辅助我适配网卡驱动，因为在手机上面适配不好导致大多数UI无法完全看到。
``` bash
#!/bin/bash
# MacBook Air 2013 A1466 飞牛系统无线网卡驱动安装脚本
# 适用于 Broadcom 802.11ac 网卡
set -e # 遇到错误则退出脚本

echo "开始为 MacBook Air 2013 (A1466) 安装无线网卡驱动..."

# 1. 更新系统包列表
echo "步骤1: 更新软件包列表..."
sudo apt update

# 2. 安装必要的内核头文件和编译工具
echo "步骤2: 安装编译依赖..."
sudo apt install -y linux-headers-$(uname -r) build-essential dkms git libelf-dev rfkill [10](@ref)

# 3. 安装针对 Broadcom 43xx 系列网卡的固件
# 此固件包可能包含对 BCM4360 等型号的支持 [4,8](@ref)
echo "步骤3: 安装 Broadcom 无线网卡固件..."
sudo apt install -y firmware-b43-installer [4](@ref)

# 4. 可选：安装无线网络工具，便于后续管理和调试
echo "步骤4: 安装无线网络工具..."
sudo apt install -y wireless-tools iw [4](@ref)

# 5. 解除无线网卡可能存在的软阻塞
echo "步骤5: 解除无线网卡阻塞..."
sudo rfkill unblock wlan

# 6. 重新加载内核模块
echo "步骤6: 重新加载相关驱动模块..."
sudo modprobe -r b43 bcma
sudo modprobe b43

echo "驱动安装步骤已完成！"

# 7. 提示用户重启
echo "建议您现在重启系统，以使驱动生效。"
echo "重启后，您应该可以在网络设置中扫描并连接Wi-Fi网络。"
```

### 启动问题
在大部分消耗的时间中都是因为启动项的问题，看到许多人都有这种问题，有一位大佬出来说明了这个问题。这个问题就是苹果主板的BIOS或者是UEFI模式为魔改版本，在2016年版本中苹果公司调整了整个引导项启动，导致出现了问号文件夹。需要采用ventoy来进行启动一个基于ISO的引导项配置文件。