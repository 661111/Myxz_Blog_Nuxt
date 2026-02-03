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
``` bash [vps.sh] lang="sh"
#!/bin/bash

# 飞牛系统 MacBook Air (2013 A1466) 博通BCM4360无线网卡驱动适配脚本
# 适配飞牛系统（基于Linux）的Broadcom BCM4360 802.11ac无线网卡驱动

set -e # 遇到错误立即退出

echo "开始安装Broadcom BCM4360无线网卡驱动..."

# 1. 更新系统包管理器并安装必要组件
echo "步骤1: 更新系统并安装驱动编译工具..."
apt-get update
apt-get install -y linux-headers-$(uname -r) build-essential dkms firmware-brcm80211

# 2. 识别无线网卡型号
echo "步骤2: 识别系统网络硬件..."
NETWORK_CARD=$(lspci | grep -i "network" || true)
if echo "$NETWORK_CARD" | grep -q "Broadcom"; then
    echo "检测到Broadcom无线网卡"
elif [ -z "$NETWORK_CARD" ]; then
    echo "未检测到明确网卡信息，继续安装BCM4360通用驱动"
else
    echo "检测到其他网卡: $NETWORK_CARD"
fi

# 3. 检查并确保BCM4360固件存在
echo "步骤3: 配置BCM4360固件..."
FIRMWARE_FILE="/lib/firmware/brcm/brcmfmac43602-pcie.txt"
if [ ! -f "$FIRMWARE_FILE" ]; then
    echo "安装BCM4360固件配置..."
    mkdir -p /lib/firmware/brcm/
    
    # 尝试从本地资源或网络获取固件配置
    # 此处应替换为实际可访问的固件路径或下载URL
    # 例如: wget -O "$FIRMWARE_FILE" "https://示例网址/brcmfmac43602-pcie.txt"
    echo "请手动添加brcmfmac43602-pcie.txt固件文件到/lib/firmware/brcm/"
else
    echo "BCM4360固件已存在"
fi

# 4. 加载驱动模块
echo "步骤4: 加载驱动模块..."
modprobe -r brcmfmac || true # 尝试先卸载现有驱动
modprobe brcmfmac # 加载新驱动

# 5. 重启网络服务
echo "步骤5: 重启网络服务..."
systemctl restart NetworkManager 2>/dev/null || systemctl restart networking 2>/dev/null || echo "请手动重启网络服务"

# 6. 检查驱动状态
echo "步骤6: 验证驱动状态..."
if ip link show | grep -q "wl"; then
    echo "无线网卡驱动加载成功"
else
    echo "警告: 无线网卡可能未正确加载，尝试扫描WiFi网络..."
    iw dev 2>/dev/null || echo "请检查硬件连接"
fi

echo "驱动安装流程完成！建议重启系统。"
echo "重启后可使用 'ip link' 或飞牛OS Web界面检查无线网络状态。"
```

### 启动问题
在大部分消耗的时间中都是因为启动项的问题，看到许多人都有这种问题，有一位大佬出来说明了这个问题。这个问题就是苹果主板的BIOS或者是UEFI模式为魔改版本，在2016年版本中苹果公司调整了整个引导项启动，导致出现了问号文件夹。需要采用ventoy来进行启动一个基于ISO的引导项配置文件。