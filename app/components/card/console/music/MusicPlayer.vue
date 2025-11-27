<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Meting from '@xizeyoupan/meting'

// 播放器实例引用
const player = ref<any>(null)
const playerContainer = ref<HTMLElement | null>(null)

// 播放状态
const isPlaying = ref(false)
const currentSong = ref('')

// 第三方歌曲配置 (示例数据)
const songConfig = {
  server: 'netease', // 音乐平台 (qq/netease/xiami/etc)
  type: 'playlist',  // 类型: song/playlist/album/artist/search
  id: '156399885',   // 歌曲/歌单ID
  // 其他可选配置:
  // order: 'random', // 播放顺序
  // volume: 0.7,     // 初始音量
}

// 初始化播放器
const initPlayer = () => {
  if (!playerContainer.value) return

  player.value = new Meting({
    ...songConfig,
    container: playerContainer.value,
    autoplay: false,
    mini: false,
    fixed: false,
    audio: {
      theme: '#ff2d55',
    },
    // 歌词显示设置
    lyrics: {
      show: true,
      color: '#ff2d55',
      size: 16,
    }
  })

  // 监听播放器事件
  player.value.on('canplay', () => {
    isPlaying.value = true
    currentSong.value = player.value.currentSong.name
  })

  player.value.on('pause', () => {
    isPlaying.value = false
  })

  player.value.on('play', () => {
    isPlaying.value = true
  })

  player.value.on('ended', () => {
    playNext()
  })
}

// 播放控制方法
const playPrev = () => player.value?.prev()
const playNext = () => player.value?.next()
const togglePlay = () => player.value?.toggle()

// 组件挂载时初始化
onMounted(() => {
  // 确保 DOM 已渲染
  setTimeout(initPlayer, 100)
})

// 清理播放器实例
onBeforeUnmount(() => {
  player.value?.destroy()
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