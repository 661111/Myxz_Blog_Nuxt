<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

// ---------------------- 状态与实例管理 ----------------------
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const progressPercent = ref(0)
const currentLyric = ref('')
const playlist = ref<{ id: string; name: string; artist: string; url: string; lrc: string }[]>([])
const currentSongIndex = ref(0)
const playerContainer = ref<HTMLElement | null>(null) // Vue ref获取播放器容器
let ap: any = null // Aplayer实例


// ---------------------- 资源加载工具函数 ----------------------
/** 加载CSS（修正原代码错误：用link而非script加载样式） */
const loadCSS = (href: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    link.onload = resolve
    link.onerror = reject
    document.head.appendChild(link)
  })
}

/** 加载JS脚本 */
const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const el = document.createElement('script')
    el.src = src
    el.onload = resolve
    el.onerror = reject
    document.head.appendChild(el)
  })
}

/** 动态加载外部依赖（Meting + Aplayer） */
const loadExternalResources = async () => {
  try {
    // 1. 先加载CSS（确保样式生效）
    await loadCSS('https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css')
    // 2. 加载Meting（获取歌单数据）
    await loadScript('https://cdn.jsdelivr.net/npm/meting@2.0.1/dist/Meting.min.js')
    // 3. 加载Aplayer（播放器核心）
    await loadScript('https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js')
    console.log('✅ 外部资源加载完成')
  } catch (error) {
    console.error('❌ 外部资源加载失败:', error)
    throw error // 抛出错误以便上层捕获
  }
}


// ---------------------- 播放器初始化 ----------------------
const initPlayer = async () => {
  try {
    // 🔴 关键校验：确保Meting/Aplayer已加载到window
    if (!window.Meting || !window.APlayer) {
      throw new Error('Meting或APlayer未加载成功，请检查资源路径！')
    }

    const meting = window.Meting
    
    // 📌 配置Meting（需替换为你的歌单信息！）
    meting.config({
      server: 'netease', // 音乐平台（网易云/qq/xiami等）
      type: 'playlist', // 数据类型：歌单
      id: '123456789', // 🔴 必填：目标歌单的实际ID（如网易云歌单ID）
      timeout: 10000 // 请求超时时间
    })

    // 🎵 获取歌单数据
    console.log('🔍 开始获取歌单数据...')
    const playlistData = await meting.playlist()
    console.log('📦 歌单数据:', playlistData)

    // ❗ 校验歌单数据是否有效
    if (!playlistData.data || playlistData.data.length === 0) {
      throw new Error('未获取到歌单数据，请检查歌单ID或平台配置！')
    }

    // 🔄 转换歌单数据为Aplayer所需格式
    playlist.value = playlistData.data.map((item: any) => ({
      id: item.id.toString(),
      name: item.name,
      artist: item.ar.map((a: any) => a.name).join('/'), // 拼接歌手名
      url: item.url, // 歌曲播放地址
      lrc: item.lyric || '' // 歌词（若有）
    }))
    console.log('🔄 转换后的播放列表:', playlist.value)

    // 🎧 初始化Aplayer（用Vue ref获取容器，更可靠）
    if (!playerContainer.value) throw new Error('播放器容器未找到！')
    ap = new window.APlayer({
      container: playerContainer.value,
      audio: playlist.value.map(song => ({
        name: song.name,
        artist: song.artist,
        url: song.url,
        pic: song.al?.picUrl || '', // 专辑封面（若需显示可保留）
        lrc: song.lrc.split('').map(line => ({ time: 0, text: line })) // 简单解析歌词
      })),
      // Aplayer配置（按需调整）
      autoplay: false,
      theme: '#3498db', // 主题色
      loop: 'one', // 单曲循环
      order: 'list', // 列表顺序播放
      preload: 'metadata', // 预加载元数据
      volume: 0.7, // 初始音量
      mutex: true, // 禁止同时播放多个播放器
      listShow: false, // 隐藏Aplayer默认列表（用自定义列表）
      lrcType: 3, // LRC解析类型（3=显示原始歌词，可按需调整）
      callback: () => console.log('✅ Aplayer初始化完成')
    })

    // 📡 监听Aplayer事件（更新状态/歌词）
    ap.on('play', () => { isPlaying.value = true; console.log('▶️ 开始播放') })
    ap.on('pause', () => { isPlaying.value = false; console.log('⏸️ 暂停播放') })
    ap.on('canplay', () => {
      duration.value = ap.audio.duration || 0;
      console.log('⏳ 总时长:', formatTime(duration.value))
    })
    ap.on('timeupdate', (e: any) => {
      currentTime.value = e.detail.parsedTime;
      progressPercent.value = (e.detail.parsedTime / duration.value) * 100 || 0;
      currentLyric.value = ap.player.lrc.currentLine?.text || ''; // 更新歌词
      console.log('⏱️ 当前时间:', formatTime(currentTime.value), '歌词:', currentLyric.value)
    })
    ap.on('error', (err: any) => console.error('❌ Aplayer播放错误:', err)) // 捕获播放错误

  } catch (error) {
    console.error('❌ 播放器初始化失败:', error)
    alert(`播放器初始化失败: ${error.message}`) // 给用户明确提示
  }
}


// ---------------------- 播放控制功能 ----------------------
/** 播放/暂停 */
const togglePlay = () => {
  if (!ap) return;
  ap[isPlaying.value ? 'pause' : 'play']();
}

/** 上一首 */
const prevTrack = () => ap?.skipBack();

/** 下一首 */
const nextTrack = () => ap?.skipForward();

/** 点击歌单项播放指定歌曲 */
const playByIndex = (index: number) => {
  if (!ap || index < 0 || index >= playlist.value.length) return;
  currentSongIndex.value = index;
  ap.play(index); // Aplayer按索引播放
}

/** 拖动进度条 seek */
const handleSeek = (e: Event) => {
  if (!ap || !duration.value) return;
  const percent = (e.target as HTMLInputElement).value;
  ap.audio.currentTime = (percent / 100) * duration.value;
}

/** 格式化时间（秒→分:秒） */
const formatTime = (seconds: number): string => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec.toString().padStart(2, '0')}`;
}


// ---------------------- 生命周期 ----------------------
onMounted(async () => {
  await loadExternalResources(); // 先加载资源
  await initPlayer(); // 再初始化播放器
});

onUnmounted(() => {
  ap?.destroy(); // 销毁播放器释放资源
});
</script>
<template>
  <div class="PlayerInfo">
    <div class="cover">
      <NuxtImg src="https://sourceimage.s3.bitiful.net/myxz.avif" class="image"/>
    </div>
    <div class="details">
      <div class="title">
        
      </div>
      <div class="artlist">
        
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
      <button class="control-btn" title="上一首" @click="prevTrack">
        <Icon name="mdi:skip-previous" aria-hidden="true"/>
      </button>
      <button class="play-btn" title="播放" @click="togglePlay">
        <Icon name="mdi:play" aria-hidden="true"/>
      </button>
      <button class="control-btn" title="下一首" @click="nextTrack">
        <Icon name="mdi:skip-next" aria-hidden="true"/>
      </button>
      <button class="control-btn repeat-btn" title="循环模式: 关闭">
        <Icon name="mdi:repeat-off" aria-hidden="true"/>
      </button>
    </div>

    <div class="cardRight">
    
    </div>
  </div>

  <audio :src="playlist[0-999]?.url" crossorigin="anonymous"></audio>
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