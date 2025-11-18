// components/Player.vue
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import type { MusicItem } from '~/types/music';
import LyricDisplay from './lrc.vue';

const props = defineProps<{
  playlist: MusicItem[];
  initialIndex?: number;
}>();

const currentSong = ref(props.playlist[props.initialIndex || 0]);
const audioRef = ref<HTMLAudioElement>();
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const progressBar = ref(0);
const lyrics = ref<string[]>([]);
const currentLine = ref(0);

// 音频控制
const play = () => {
  if (audioRef.value) {
    audioRef.value.play().then(() => {
      isPlaying.value = true;
    });
  }
};

const pause = () => {
  audioRef.value?.pause();
  isPlaying.value = false;
};

const togglePlay = () => {
  if (isPlaying.value) {
    pause();
  } else {
    play();
  }
};

// 时间更新
watch(() => audioRef.value?.currentTime, (newTime) => {
  currentTime.value = newTime;
  progressBar.value = (newTime / duration.value) * 100;
});

// 歌曲切换
const selectSong = (index: number) => {
  currentSong.value = props.playlist[index];
  loadSong();
};

// 加载歌曲
const loadSong = async () => {
  if (!audioRef.value) return;
  
  // 重置状态
  audioRef.value.pause();
  currentTime.value = 0;
  progressBar.value = 0;
  isPlaying.value = false;
  
  // 加载音频
  audioRef.value.src = currentSong.value.url;
  await audioRef.value.load();
  
  // 获取歌词
  const lrcResponse = await fetch(currentSong.value.lrc);
  const lrcText = await lrcResponse.text();
  lyrics.value = parseLyrics(lrcText);
  
  // 设置时长
  duration.value = audioRef.value.duration;
  play();
};

// 解析歌词
function parseLyrics(text: string) {
  const lines = text.split('\n');
  return lines.map(line => {
    const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
    if (match) {
      const time = (+match[1] * 60 + +match[2]) * 1000 + (+match[3].slice(0, 2)) * 10;
      return { time, text: match[4] };
    }
    return null;
  }).filter(Boolean);
}

// 进度条拖拽
const handleProgressClick = (e: MouseEvent) => {
  const rect = audioRef.value?.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const percent = x / rect.width;
  currentTime.value = percent * duration.value;
  audioRef.value.currentTime = percent * duration.value;
};

onMounted(() => {
  loadSong();
});
</script>

<template>
  <div class="player-container">
    <!-- 导航栏 -->
    <div class="navbar">
      <div class="logo">APLAYER</div>
      <ul class="nav-tabs">
        <li :class="{ active: $route.name === 'index' }">首页</li>
        <li :class="{ active: $route.name === 'playlist' }">歌单</li>
      </ul>
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 歌曲列表 -->
      <div class="song-list">
        <div v-for="(song, index) in playlist" :key="song.name" 
             @click="selectSong(index)" 
             :class="{ active: song === currentSong }">
          
          <div class="info">
            <h3>{{ song.name }}</h3>
            <p>{{ song.artist }}</p>
          </div>
        </div>
      </div>

      <!-- 控制面板 -->
      <div class="control-panel">
        <button @click="togglePlay">
          <span v-if="isPlaying">⏸️</span>
          <span v-else>▶️</span>
        </button>
        
        <div class="progress-bar" @click="handleProgressClick">
          <div class="progress" :style="{ width: `${progressBar}%` }"></div>
        </div>
        
        <div class="time-display">
          {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
        </div>
      </div>

      <!-- 歌词显示 -->
      <LyricDisplay :lyrics="lyrics" :current-line="currentLine" />
    </div>
  </div>
</template>

<style lang="scss">
.player-container {
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  
  .nav-tabs {
    list-style: none;
    display: flex;
    
    li {
      padding: 0.5rem 1rem;
      cursor: pointer;
      
      &.active {
        color: #d9363e;
        border-bottom: 2px solid #d9363e;
      }
    }
  }
}

.main-content {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  padding: 2rem;
}

.song-list {
  .cover {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .info {
    margin-left: 1rem;
  }
}

.control-panel {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  
  .progress-bar {
    flex: 1;
    height: 4px;
    background: #eee;
    border-radius: 2px;
    cursor: pointer;
    
    .progress {
      height: 100%;
      background: #d9363e;
      border-radius: 2px;
    }
  }
}

.time-display {
  font-size: 0.8rem;
  color: #666;
}
</style>