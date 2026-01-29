---
title: komari：全新的探针站点
description:
date: 2026-01-28 19:00:00
updated: 2026-01-29 13:00:00
image: /image/PostCover/komariMonitor.avif
categories: [随笔]
tags: [日常]
recommend: true
---
## 前言
很久之前用过哪吒探针的V0与V1版本，但是后来的云服务器基本上已经完全废止，所以就没进行搞了。不过最近在浏览一些文章时看到有别的探针系统，心血来潮便搭建该探针

## 对比
| 对比项目 | 哪吒监控V0| 哪吒监控V1 | Komari Monitor |
| :--- | :--- | :--- | :--- |
| **核心定位** | 功能相对集中的服务器状态监控 | **功能全面的服务器运维平台** | **极致轻量的服务器状态监控** |
| **监控面板模板** | 基础、直观 | 丰富多样，支持高度自定义 | 提供多种官方及社区主题（如PurCarte、Mochi），风格现代 |
| **关键功能** | 基础资源监控（CPU、内存、磁盘等） | 基础资源监控、**DDNS、内网穿透、SSL证书管理**等 | 基础资源监控、**历史数据图表（默认支持30天）**、Web SSH |
| **配置与备份** | 可能需要手动编辑配置文件（如JSON） | 配置相对复杂，备份需处理整个目录 | **后台图形化操作**，支持**一键导入/导出备份** |
| **资源占用** | 相对较低 | 相对较高（因功能更多） | **极低**（内存占用约30MB），专为小内存VPS优化 |
| **部署难度** | 中等 | 相对复杂 | **简单快捷**，Docker一行命令即可启动主控端 |

## 部署面板端

### 一键命令(非主流)
``` bash
curl -fsSL https://raw.githubusercontent.com/komari-monitor/komari/main/install-komari.sh -o install-komari.sh
chmod +x install-komari.sh
sudo ./install-komari.sh
```

### Docker(推荐)
``` bash
mkdir -p ./data
docker run -d \
  -p 25774:25774 \
  -v $(pwd)/data:/app/data \
  --name komari \
  --restart unless-stopped \
  ghcr.io/komari-monitor/komari:latest
docker logs komari
```
使用两种方案后可以通过访问 `http://<your-ip>:25774` 即可看到 Komari 的仪表盘。

### 账号密码
- 默认情况
在默认的情况下，不知道账号密码可以通过输入`docker logs komari`或者Docker容器中的日志功能，都能找到以下的日志。在第四行的`Password`的内容填入到管理面板中的密码部分，即可进入。
``` log
2026/01/28 09:47:00 Komari Monitor 1.1.3 (hash: b62fb1f70889fc1ac94e7c58ed928d7a27df5d09)
2026/01/28 09:47:00 Using SQLite database file: /app/data/komari.db
2026/01/28 09:47:00 Application timezone is set to 'UTC'.
2026/01/28 09:47:00 Default admin account created. Username: admin , Password: MG7y0jLUNYzX
2026/01/28 09:47:00 Starting server on 0.0.0.0:25774 ...
```

- 非默认情况
在我们都需要更改默认密钥来保证你无需更换后台用户密码，就需要对Docker的环境变量进行更改，在环境变量中输入
``` env 
ADMIN_USERNAME: admin
ADMIN_PASSWORD: yourpassword
```

## 部署受控端
当我们部署完面板端时，我们需要受控端来进行监测受控、查看相关配置以及各个自定义线路的情况，这些功能非常有用尤其是在无各类机器测试脚步的情况下非常有用。
### 配置受控端服务链接
- 1.反代25575端口并解析到需要受控服务链接上
- 2.填入到`设置`-`站点`-`Agent 连接地址`
- 3.使用系统自动生成的具体脚本在指定服务器上进行粘贴

### 销毁服务器上的受控服务
当我们需要销毁受控服务端时，使用以下的指令来进行销毁，实现`一键销不留服务`。
``` bash
sudo systemctl stop komari-agent && sudo systemctl disable komari-agent && sudo rm -f /etc/systemd/system/komari-agent.service && sudo systemctl daemon-reload && sudo rm -rf /opt/komari/agent /var/log/komari
```

## 具体功能
### 服务器
- 1.信息: 可自定义名称、标签(哪吒探针中的标签可无损使用)、分组、备注(公开/私有)、隐藏节点(登录后可见)、流量阈值(统计方式/设置数)
- 2.账单: 自定义定价、计费周期、设置货币、到期时间
- 3.一键部署命令: 有三种版本(Windows/Linux/Mac)，且都有自定义选项无需去了解那些繁琐的配置命令项。

|安装选项         | Windows  | Linux   | Mac     |
|:---------------:|:--------:|:-------:|:-------:|
|禁用远程控制     | ✅ 支持 | ✅ 支持 | ✅ 支持 |
|禁用自动更新     | ✅ 支持 | ✅ 支持 | ✅ 支持 |
|忽略不安全证书   | ✅ 支持 | ✅ 支持 | ✅ 支持 |
|包含缓冲区内存   | ✅ 支持 | ✅ 支持 | ✅ 支持 |
|GitHub 代理      | ✅ 支持 | ✅ 支持 | ✅ 支持 |
|安装目录         | ✅ 支持 | ✅ 支持 | ✅ 支持 |
|服务名称         | ✅ 支持 | ✅ 支持 | ✅ 支持 |
|只监测特定网卡   | ✅ 支持 | ✅ 支持 | ✅ 支持 |
|排除特定网卡     | ✅ 支持 | ✅ 支持 | ✅ 支持 |
|只监测特定挂载点 | ✅ 支持 | ✅ 支持 | ✅ 支持 |
|网络统计月重置日 | ✅ 支持 | ✅ 支持 | ✅ 支持 |

### 主题功能
在我们部署完成后，肯定需要美化的，在Komari Monitor中已经内置了主题功能，我们可以通过使用第三方的主题压缩包来快速美化。对于懒人来说非常有用，省略了自定义JS与样式的插入。
- 1.获取主题
在[主题](https://komari-document.pages.dev/community/theme)中查找到一款符合你的，然后进行下载
- 2.导入后台
打开后台，找到设置-主题管理导入压缩包

### 登录通知
- 1.登录功能：单点登录渠道选择（需要写入密钥）、API密钥、禁用密码功能
- 2.通知功能：自定义模板、通知渠道、测试

### 通用
通用功能严格来讲用途非常少，且大多默认开启。具有兼容哪吒探针、开启历史会话、(开启/刷新)地理位置、自动获取密钥(好像没啥卵用)

### 其余功能
- 1.远程执行: 通过自定义命令，并选定指定的服务器执行
- 2.延迟监测: 类似于哪吒探针中的测速功能(TCP\HTTP\ICMP)，这个会用的话其实非常可以
- 3.会话管理: 可以一键删除之前链接的会话，但是无法指定删除

## 美化
还未写完