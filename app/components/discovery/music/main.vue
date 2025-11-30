<script setup lang="ts">
import type { MusicItem } from '~/music'; // 假设数据文件导出类型

import { ref, computed, onMounted, watch, onUnmounted } from 'vue';

const musicList = ref<MusicItem[]>([
  // {
  //   name: 'L E V E I S(Cyberpunk)(Remix)',
  //   artist: 'vodKe',
  //   url: '/sxiaohe_source/music/songs/levels.mp3',
  //   lrc: '/sxiaohe_source/music/lrc/L%20E%20V%20E%20I%20S(Cyberpunk)(Remix).lrc',
  //   cover: '/sxiaohe_source/music/cover/L%20E%20V%20E%20l%20S%20(Cyberpunk).avif'
  // },
  // {
  //   name: '逆天',
  //   artist: '呦猫UNEKO',
  //   url: '/sxiaohe_source/music/songs/呦猫UNEKO%20-%20逆天.mp3',
  //   lrc: '/sxiaohe_source/music/lrc/呦猫UNEKO%20-%20逆天.lrc',
  //   cover: '/sxiaohe_source/music/cover/逆天.avif'
  // },
  {
    name: 'BARRETE!(SLOWED + REVERB)',
    artist: 'CHASHKAKEFIRA&D4C',
    url: '/sxiaohe_source/music/songs/BARRETE.mp3',
    lrc: '/sxiaohe_source/music/lrc/BARRETE!(SLOWED%20+%20REVERB)-CHASHKAKEFIRA&D4C.lrc',
    cover: '/sxiaohe_source/music/cover/BARRETE!(SLOWED%20+%20REVERB)%20.avif'
  },
  {
    name: '无人扶我青云志',
    artist: 'ZMAGE-Y',
    url: '/sxiaohe_source/music/songs/ZMAGE-Y.mp3',
    lrc: '/sxiaohe_source/music/lrc/无人扶我青云志%20(ZMAGE-Y%20remix)%20(Remix)-ZMAGE-Y.lrc',
    cover: '/sxiaohe_source/music/cover/无人扶我青云志%20(ZMAGE-Y%20remix).avif'
  }
])

const audioPlayer = ref<HTMLAudioElement | null>(null);
const currentSongIndex = ref(0);
const isPlaying = ref(false);
const progress = ref(0);
const progressTimer = ref<number | null>(null); // 添加进度更新定时器

const currentSong = computed(() => {
  if (musicList.value.length === 0) return null;
  return musicList.value[currentSongIndex.value] || null;
});

function playSong(index: number) {
  if (musicList.value.length === 0) return;
  currentSongIndex.value = Math.max(0, Math.min(index, musicList.value.length - 1));
  const song = musicList.value[currentSongIndex.value];
  if (!song?.url) return;

  if (audioPlayer.value) {
    // 重置状态
    audioPlayer.value.pause();
    audioPlayer.value.currentTime = 0;
    // 设置新源并加载
    audioPlayer.value.src = song.url;
    audioPlayer.value.load(); // 必须调用load()才会发起请求
    
    // 清除旧定时器
    if (progressTimer.value) {
      clearInterval(progressTimer.value);
      progressTimer.value = null;
    }
    
    // 播放并处理结果
    audioPlayer.value.play()
      .then(() => {
        isPlaying.value = true;
        progressTimer.value = window.setInterval(updateProgress, 1000);
        console.log('播放成功:', song.name);
      })
      .catch(err => {
        console.error('播放失败:', err);
        isPlaying.value = false;
      });
  }
}

function playOrPause(index: number) {
  if (currentSongIndex.value === index && isPlaying.value) {
    // 当前歌曲正在播放，点击后暂停
    audioPlayer.value?.pause();
    isPlaying.value = false;
    if (progressTimer.value) {
      clearInterval(progressTimer.value);
      progressTimer.value = null;
    }
  } else {
    // 播放新歌曲或继续播放当前歌曲
    if (currentSongIndex.value !== index) {
      // 切换新歌曲
      playSong(index);
    } else {
      // 继续播放当前歌曲
      audioPlayer.value?.play().then(() => {
        isPlaying.value = true;
        progressTimer.value = window.setInterval(updateProgress, 1000);
      }).catch(err => {
        console.error('继续播放失败:', err);
      });
    }
  }
}

function togglePlay() {
  if (!audioPlayer.value) return;
  
  if (isPlaying.value) {
    audioPlayer.value.pause();
    // 暂停时清除定时器
    if (progressTimer.value) {
      clearInterval(progressTimer.value);
      progressTimer.value = null;
    }
  } else {
    // 如果当前没有歌曲在播放，播放当前索引的歌曲
    if (audioPlayer.value.paused) {
      playSong(currentSongIndex.value);
    } else {
      audioPlayer.value.play().catch(err => {
        console.error('继续播放失败:', err);
      });
    }
  }
  isPlaying.value = !isPlaying.value;
}

function nextSong() {
  if (musicList.value.length === 0) return;
  currentSongIndex.value = (currentSongIndex.value + 1) % musicList.value.length;
  playSong(currentSongIndex.value);
}

function updateProgress() {
  if (!audioPlayer.value || audioPlayer.value.duration === Infinity) return;
  
  progress.value = (audioPlayer.value.currentTime / audioPlayer.value.duration) * 100;
}

// 添加键盘快捷键支持
// document.addEventListener('keydown', (e) => {
//   if (e.code === 'Space') {
//     e.preventDefault();
//     togglePlay();
//   } else if (e.code === 'ArrowRight') {
//     nextSong();
//   }
// });

onMounted(() => {
  // 初始化播放器
  if (musicList.value.length > 0) {
    // 不自动播放，等待用户交互
    audioPlayer.value = new Audio();
  }
});

onUnmounted(() => {
  // 清理资源
  if (audioPlayer.value) {
    audioPlayer.value.pause();
  }
  if (progressTimer.value) {
    clearInterval(progressTimer.value);
  }
});

watch(musicList, () => {
  if (musicList.value.length > 0 && !audioPlayer.value) {
    audioPlayer.value = new Audio();
    playSong(currentSongIndex.value);
  }
}, { deep: true });
</script>

<template lang="pug">
.music-main
  .music-list(class="p-6 portrait:p-5 portrait:lg:p-6 landscape:p-8 sfc-main-section")
    div
      .music-container
        table.w-full
          tbody.portrait
            tr.info(class="" v-for="(list, index) in musicList" :key="index")
              td.td-long.td-sort
                .songLogo.py-4.pl-4
                  .h-full
                    .h-full
                      img.h-16.w-16(:src="list.cover")
              td.songName.py-4.pl-4
                .center.space-x
                  .flex-1
                    .text-1 {{ list.name }}
              td.songArtist.py-4 {{ list.artist }}
              td.songEnd.py-4.pr-4.text-end
                .flex.items-center.space-x-4.justify-end(style="justify-content: flex-end;")
                  button(@click="playOrPause(index)" class="animation ZyButton-default medium min-h-4 min-w-4 p-0 m-0 flex items-center justify-center relative !p-2 !rounded-full portrait:!bg-transparent portrait:!text-text-1 portrait:!border-none portrait:after:hidden")
                    span.flex.items-center.flex-1.justify-center
                      .ZyIcon.relative.inline-flex.items-center.justify-center(style="--size: 1rem; width: 1rem; height: 1rem !important;")
                        figure(class="icon-default flex items-center justify-center" style="--icon-color: inherit;")
                          span(v-if="currentSongIndex === index && isPlaying" class="iconfly ph:pause-duotone")
                          span(v-else="currentSongIndex.value !== index" class="iconfly ph:play-duotone")
</template>

<style lang="css" scoped>
@import '@/zhiyuange/-webkit-line-clamp.css';
@import '@/zhiyuange/aspect-ratio.css'; 
@import '@/zhiyuange/border.css';
@import '@/zhiyuange/container.css';
@import '@/zhiyuange/display.css';
@import '@/zhiyuange/flex.css';
@import '@/zhiyuange/grid-column.css';
@import '@/zhiyuange/height.css';
@import '@/zhiyuange/inset.css';
@import '@/zhiyuange/margin.css';
@import '@/zhiyuange/pointer-envents.css';
@import '@/zhiyuange/position.css';
@import '@/zhiyuange/translate.css';
@import '@/zhiyuange/visibility.css';
@import '@/zhiyuange/width.css';
@import '@/zhiyuange/z-index.css';
.ZyButton-default:after {
    border-radius: var(--border-radius-sm);
    box-shadow: 0 .5rem 1rem var(--color);
    --color: var(--theme-color-switch);
    --theme-color-switch: var(--theme-color-500);
    --theme-color-500: #425aef;
    content: "";
    height: 100%;
    left: 0;
    opacity: .3;
    position: absolute;
    top: 0;
    width: 100%;
}
.ZyButton-default {
    background-color: var(--color);
    border: 2px solid var(--color);
    color: var(--bg-level-4);
    position: relative;
    --color: var(--theme-color-switch);
    --theme-color-switch: var(--theme-color-500);
    --theme-color-500: #425aef;
    border-radius: 9999px;
    font-size: .9em;
    padding: .4rem .6rem;
    padding: .5rem !important;
}
/* 页面class基础框架（不包含landscape模式） */
.pt-main {
    padding-top: var(--pt-main);
}
.sfc-main-section {
    display: flow-root;
}
.sfc-main-section {
    display: flow-root;
}
.p-6 {
    padding: 1.5rem;
}
.w-full {
    width: 100%;
}
.text-text-2 {
    color: var(--text-2);
}
.uppercase {
    text-transform: uppercase;
}
.border-borderColor {
    border-color: var(--border-color);
}
.border-dashed {
    border-style: dashed;
}
.border-b {
    border-bottom-width: 1px;
}
.text-start {
    text-align: start;
}
.pl-4 {
    padding-left: 1rem;
}
.py-4 {
    padding-bottom: 1rem;
    padding-top: 1rem;
}
.pr-4 {
    padding-right: 1rem;
}
.object-cover {
    -o-object-fit: cover;
    object-fit: cover;
}
.rounded-xs {
    border-radius: var(--border-radius-xs);
}
.w-full {
    width: 100%;
}
.w-16 {
    width: 4rem;
}
.h-full {
    height: 100%;
}
.h-16 {
    height: 4rem;
}
.relative {
    position: relative;
}
.w-full {
    width: 100%;
}
.h-full {
    height: 100%;
}
.text-end {
    text-align: end;
}
img[data-v-a2022939] {
    transition: opacity .3s ease-in-out;
}

img[data-v-a2022939] {
    transition: opacity .3s ease-in-out;
}
.opacity-100 {
    opacity: 1;
}
.object-cover {
    -o-object-fit: cover;
    object-fit: cover;
}
.rounded-xs {
    border-radius: var(--border-radius-xs);
}
/* 页面landscape模式 */
@media (orientation: landscape) {
    .landscape\:p-8 {
        padding: 2rem;
    }
}
@media (orientation: landscape) {
    .landscape\:font-medium {
        font-weight: 500;
    }
}
@media (orientation: landscape) {
    .landscape\:table-cell {
        display: table-cell;
    }
}

/* 表格样式 */
table {
    border-collapse: collapse;
    border-color: inherit;
    text-indent: 0;
}

/* 页面主样式 */
.music-container {
    margin: 0 auto;
    max-width: var(--centered-width);
}

@media (min-width: 1500px) {
    .music-container {
        max-width: 1500px;
    }
}
@media (min-width: 1200px) {
    .music-container {
        max-width: 1200px;
    }
}
@media (min-width: 900px) {
    .music-container {
        max-width: 900px;
    }
}
@media (min-width: 600px) {
    .music-container {
        max-width: 600px;
    }
}
.music-container {
    width: 100%;
}
</style>