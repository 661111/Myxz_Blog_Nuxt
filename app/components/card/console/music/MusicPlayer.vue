<script lang="ts" setup>
// 播放器实例引用
const aplayer = ref<any>(null)
// Meting 实例引用
const meting = ref<any>(null)
// 当前播放状态
const isPlaying = ref(false)

// 初始化 Meting 和 Aplayer
const initPlayer = async () => {
  // 动态加载 MetingJS 库
  await loadScript('https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js')
  
  // 创建 Meting 实例（使用第三方配置）
  meting.value = new (window as any).Meting({
    api: 'https://api.imjad.cn/cloudmusic.md', // 第三方 API 配置
    node: 'https://netease-cloud-music-api.vercel.app', // 音乐节点
    proxy: false, // 是否启用代理
  })

  // 获取歌曲数据（使用 Meting 的第三方配置）
  const songData = await meting.value.song('185916') // 示例歌曲 ID
  
  // 初始化 Aplayer
  aplayer.value = new (window as any).APlayer({
    container: document.getElementById('aplayer')!,
    fixed: true,
    autoplay: false,
    audio: [{
      name: songData.name,
      artist: songData.ar.map((a: any) => a.name).join('/'),
      url: songData.url,
      pic: songData.al.picUrl,
      lrc: '[00:00.00]歌词示例\n[00:01.00]请替换为真实歌词'
    }]
  })

  // 监听播放状态变化
  aplayer.value.on('play', () => isPlaying.value = true)
  aplayer.value.on('pause', () => isPlaying.value = false)
}

// 动态加载脚本
const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve()
    script.onerror = reject
    document.head.appendChild(script)
  })
}

// 组件挂载时初始化
onMounted(async () => {
  try {
    await initPlayer()
  } catch (error) {
    console.error('播放器初始化失败:', error)
  }
})

// 组件卸载前清理
onBeforeUnmount(() => {
  if (aplayer.value) {
    aplayer.value.destroy()
    aplayer.value = null
  }
})
</script>
<template>
  <div class="PlayerInfo">
    <div class="cover">
      <NuxtImg src="https://sourceimage.s3.bitiful.net/myxz.avif" class="image"/>
    </div>
    <div class="details">
      <div class="title">
        cscs
      </div>
      <div class="artlist">
        cscs
      </div>
    </div>
  </div>
  <div class="controls">
    <div class="cardLeft">
      <button class="control-btn lyric-btn" >
        <Icon name="mdi:text" />
      </button>
      <button class="control-btn playlist-btn">
        <Icon name="mdi:playlist-music" />
      </button>
    </div>

    <div class="cardCenter">
      <button class="control-btn" title="上一首" @click="playPrev">
        <Icon name="mdi:skip-previous" aria-hidden="true"/>
      </button>
      <button class="play-btn" title="播放" @click="togglePlay">
        <Icon name="mdi:play" aria-hidden="true"/>
      </button>
      <button class="control-btn" title="下一首" @click="playNext">
        <Icon name="mdi:skip-next" aria-hidden="true"/>
      </button>
      <button class="control-btn repeat-btn" title="循环模式: 关闭">
        <Icon name="mdi:repeat-off" aria-hidden="true"/>
      </button>
    </div>

    <div class="cardRight">
    
    </div>
  </div>
</template>

<style lang="scss" scoped>
.PlayerInfo {
  align-items: flex-start;
  display: flex;
  gap: 0.6rem;
  .cover {
    flex-shrink: 0;
    height: 40px;
    width: 40px;
    background: var(--c-bg);
    border: 1px solid var(--c-border);
    border-radius: 0.4rem;
    overflow: hidden;
    transition: border-color 0.2s;

    .image {
      display: block;
      height: 100%;
      object-fit: cover;
      width: 100%;
      transition: transform 0.2s;
    }
  }
  .details {
    display: block;
    height: 100%;
    object-fit: cover;
    width: 100%;
    transition: transform 0.2s;

    .title {
      color: var(--c-text-1);
      font-size: 0.9rem;
      font-weight: 600;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .artlist {
      color: var(--c-text-2);
      font-size: 0.8rem;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
.controls {
  align-items: center;
  display: flex;
  gap: .3rem;
  justify-content: space-between;
  width: 100%;
  .cardLeft {
    flex: 0 0 auto;
  }
  .cardCenter {
    flex: 1;
    justify-content: center;
  }
  .cardRight {
    flex: 0 0 auto;
  }
  .cardLeft, .cardCenter, .cardRight {
    align-items: center;
    display: flex;
    gap: .3rem;
  }
}
.control-btn, .play-btn {
  align-items: center;
  background: transparent;
  border: none;
  border-radius: .4rem;
  color: var(--c-text-2);
  cursor: pointer;
  display: flex;
  justify-content: center;
  transition: all .2s ease;
  padding: .3rem
}
</style>