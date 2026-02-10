---
title: 【本地+云端】搭建道理鱼音乐
description: 该文章主要写了对于低价机器的试水，并提醒是超开类型的机器。在测试的过程中发现机器性能较高，且展示出机器的具体价格，并单独列出只有精简版未采用完整版测试。
date: 2026-02-04 10:00:00
updated: 2026-02-06 20:49:00
image: /image/PostCover/vpsTalk.avif
categories: [博客魔改]
tags: [Nuxt, 魔改, 美化]
recommend: true
---
## 前言
前篇文章讲了我在自己的老电脑上安装了飞牛NAS系统，但是今天刚好要整理一些东西顺手写一下**本地**+**云端**的方式来安装道理鱼音乐，让我在学校（可能会把本地的带去学校）、家里、远程听歌得到最好的体验。音乐的占用空间也不大。1个G至少能装下百首起步的音乐了，而且道理鱼有刮削功能。可以通过单首音乐来自动刮削出歌词、图片、专辑，这不比那些依靠第三方音乐API的软件好。

## 定位&特点
### 定位
整体因为没有使用到第三方音乐的API，可以认为是一种本地化（自托管）的媒体平台（或者是流媒体平台），在作为歌曲、有声书、专辑、MV等其他用途上来说是非常可以。而且在以Docker容器的方式安装上手低，自动化部署已经常态化了。

### 特点
- 自托管：刚才也已经说过了，在这些用途上都可以将后缀不同的各种类型文件放入特定位置，就可以识别到了（需要刮削）。
- 刮削：在对歌曲类型文件刮削的时候，会自动重新匹配的同时解析音乐文件的ID3标签（如歌手、专辑、曲目名），补全缺失部分的内容存储到数据库中。
- 转码：软件自身集成FFmpeg的实时转码，支持自动生成指定码率（如64kbps~320kbps）的缓存文件，后台会统计缓存使用情况并自动清理冗余文件，平衡音质与存储空间。
- 账户权限分离：这个应该不用说了，主要就是管理员对普通用户的权限控制以及一些设置控制，这个除非你的人多，人少也没必要知道这个。
- 拓展(插件&元数据)：支持插件清单自动识别，元数据提供方可配置优先级（如优先从Last.fm获取专辑信息），未来还可扩展Spotify等第三方源集成。

## 功能
### 1.媒体扫描与入库​
- 多目录支持：可添加多个音乐、MV、有声书目录（如“音乐合集”“专辑歌单”“有声书专辑”），系统会分别识别与管理。
自动刮削：扫描时会自动解析文件的metadata（如ID3标签），并抓取封面、歌词、歌手简介等信息，写入数据库；若metadata缺失，可通过AcoustID（音乐识别）或Last.fm（元数据补全）自动填充。
### 2.媒体管理​
- 分类浏览：支持按艺人、专辑、歌单、曲目分类查看，音乐与有声书分开显示（如“音乐” tab 显示歌曲，“有声书” tab 显示章节）。
- 收藏与队列：可将曲目、专辑、歌单加入收藏，或直接加入播放队列；队列支持调整顺序、删除等操作。
歌单管理：支持创建、导入歌单（如从本地导入.m3u文件），歌单可分享给其他用户（需管理员开启注册）。

### 3.播放功能​
- 多端支持：提供Web前端（适配PC、平板）与移动端网页访问，部分版本有专用App（如“箭头音乐”适配的移动端）；播放时支持歌词显示、均衡器调节。
- 高音质支持：支持DTS、DSD、APE、WMA等高码率音频格式，自动转码为兼容流（如MP3），边播边转不卡顿；封面同步生成100/300/600三档缩略图，提升列表加载速度。

### 4.系统设置​
- 管理员功能：可设置站点名称、Logo、注册开关，管理用户账号（如禁用违规用户），查看系统日志。
- 普通用户功能：可修改个人信息（如昵称、头像、密码），管理自己的收藏与队列。

## 安装
::tab{:tabs='["应用中心", "Docker"]'} 
#tab1
- 1.登入飞牛OS中，找到应用中心。
- 2.选择影音娱乐分类，找到道理鱼音乐，按照提示来安装即可。

#tab2
- 1.使用`Docker Compose`把以下yml文件内容添加进去，并添加名称后确认构建即可
``` yml lang="yml"
services:
  postgres:
    image: postgres:16-alpine
    container_name: daoliyu-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: "daoliyu"
      POSTGRES_USER: "daoliyu"
      POSTGRES_PASSWORD: "daoliyupassword"
      PGDATA: "/var/lib/postgresql/data/pgdata"
    command:
      - "postgres"
      - "-c"
      - "max_connections=200"
      - "-c"
      - "shared_buffers=256MB"
      - "-c"
      - "work_mem=32MB"
      - "-c"
      - "maintenance_work_mem=256MB"
      - "-c"
      - "checkpoint_completion_target=0.9"
      - "-c"
      - "wal_buffers=16MB"
      - "-c"
      - "port=5433"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U daoliyu -d daoliyu -p 5433"]
      interval: 10s
      timeout: 5s
      retries: 6
      start_period: 30s
    ports:
      - "5433:5433"
    volumes:
      - ./docker-data/postgres:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: daoliyu-redis
    restart: unless-stopped
    command: ["redis-server", "--appendonly", "yes"]
    volumes:
      - ./docker-data/redis:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    image: msmkls/daoliyu-backend:0.1.7
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: daoliyu-backend
    restart: unless-stopped
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
    environment:
      NODE_ENV: production
      DATABASE_URL: "postgresql://daoliyu:daoliyupassword@postgres:5433/daoliyu?schema=public&connection_limit=25&pool_timeout=10&statement_timeout=60000&idle_in_transaction_session_timeout=60000"
      APP_PORT: 4000
      LIBRARY_ROOT: "/data/media"
      AUDIOBOOK_LIBRARY_ROOT: "/data/audiobooks"
      VIDEO_LIBRARY_ROOT: "/data/music-videos"
      VIDEO_TRANSCODE_CACHE: "/app/storage/transcoded/videos"
      VIDEO_THUMBNAIL_CACHE: "/app/storage/thumbnails/videos"
      PLAYLISTS_IMPORT_ROOT: "/data/playlists"
      REGISTRATION_OPEN: "${REGISTRATION_OPEN:-true}"
      PLUGINS_DIR: "/plugins"
      REDIS_URL: "redis://redis:6379/0"
      LOG_LEVEL: "${LOG_LEVEL:-info}"
      DEBUG: "${DEBUG:-true}"
    volumes:
      - ./backend-storage:/app/storage     # 后端数据（左侧为飞牛目录:容器目录勿动）
      - ./media:/data/media                # 歌曲目录（左侧为飞牛目录:容器目录勿动）
      - ./audiobooks:/data/audiobooks      # 有声书  （左侧为飞牛目录:容器目录勿动）
      - ./music-videos:/data/music-videos  # 音乐视频（左侧为飞牛目录:容器目录勿动）
      - ./playlists:/data/playlists        # 歌单目录（左侧为飞牛目录:容器目录勿动）
      - ./plugins:/plugins                 # 占位闲置
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:4000/health"]
      interval: 30s
      timeout: 5s
      retries: 5

  frontend:
    image: msmkls/daoliyu-frontend:0.1.7
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: daoliyu-frontend
    restart: unless-stopped
    depends_on:
      backend:
        condition: service_started
    ports:
      - "5173:8080"
```
::

### 效果
::pic  
---  
src: /image/PostInternal/2026/musicInstall/index.png  
caption: 音乐主页 
---  
::

## 优缺点
| **优点**                              | **缺点**                              |
|---------------------------------------|---------------------------------------|
| **多媒体统一管理**：支持音乐、MV、有声书一体化管理，无需切换多个应用。 | **部分操作体验待优化**：如切歌时偶尔出现卡顿，窗口缩放适配不足（如手机端显示不全）。 |
| **自动化程度高**：自动扫描、补全元数据、转码，减少手动操作。 | **移动端适配不足**：目前主要依赖Web端或第三方App（如“箭头音乐”），原生App仍在规划中。 |
| **部署灵活**：支持Docker快速部署，兼容多种NAS系统，提供双数据库选项。 | **功能完善度待提升**：如推荐算法尚未成熟（仅基于最近7天播放次数），PC端功能仍在开发中。 |
| **数据安全**：自托管模式，数据存储在本地NAS，避免公有云的版权或隐私风险。 | **插件生态不完善**：目前插件功能尚未完全启用，第三方源集成（如Spotify）需手动配置。 |
| **性价比高**：免费开源（部分版本），适合个人或小团队使用，无需支付订阅费。 | **学习成本较高**：Docker部署对新手来说有一定门槛，需了解基本的命令行操作。 |