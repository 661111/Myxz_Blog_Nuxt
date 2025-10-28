// stores/player.ts - 修复类型错误
import { defineStore } from 'pinia'

export interface MusicItem {
  id: string
  name: string
  artist: string
  url: string
  lrc: string
  cover: string
  duration?: number
}

// 明确的空值类型
export type MaybeMusicItem = MusicItem | null | undefined;

export interface PlayerState {
  playlist: MusicItem[]
  currentIndex: number
  isPlaying: boolean
  currentTime: number
  volume: number
  showMiniPlayer: boolean
  showFullPlayer: boolean
  lyrics: string[]
  currentLyricIndex: number
}

export const usePlayerStore = defineStore('player', {
  state: (): PlayerState => ({
    playlist: [],
    currentIndex: -1, // 初始化为-1，表示没有选中歌曲
    isPlaying: false,
    currentTime: 0,
    volume: 0.7,
    showMiniPlayer: false,
    showFullPlayer: false,
    lyrics: [],
    currentLyricIndex: 0
  }),

  getters: {
    // 修复类型：明确返回 MaybeMusicItem 类型
    currentSong: (state): MaybeMusicItem => {
      if (state.currentIndex === -1 || state.playlist.length === 0) {
        return null
      }
      return state.playlist[state.currentIndex] || null
    },
    
    // 安全地访问属性
    currentSongName: (state): string => {
      const song = state.currentIndex >= 0 ? state.playlist[state.currentIndex] : null
      return song?.name || '未知歌曲'
    },
    
    currentSongArtist: (state): string => {
      const song = state.currentIndex >= 0 ? state.playlist[state.currentIndex] : null
      return song?.artist || '未知歌手'
    },
    
    currentSongCover: (state): string => {
      const song = state.currentIndex >= 0 ? state.playlist[state.currentIndex] : null
      return song?.cover || '/default-cover.jpg'
    },
    
    progress: (state) => {
      const song = state.currentIndex >= 0 ? state.playlist[state.currentIndex] : null
      if (!song?.duration) return 0
      return (state.currentTime / song.duration) * 100
    },
    
    formattedTime: (state) => {
      const minutes = Math.floor(state.currentTime / 60)
      const seconds = Math.floor(state.currentTime % 60)
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
  },

  actions: {
    setPlaylist(songs: MusicItem[]) {
      this.playlist = songs
      this.showMiniPlayer = songs.length > 0
      // 如果有歌曲，设置默认选中第一首
      if (songs.length > 0 && this.currentIndex === -1) {
        this.currentIndex = 0
      }
    },

    playSong(index: number) {
      if (index >= 0 && index < this.playlist.length) {
        this.currentIndex = index
        this.isPlaying = true
        this.loadLyrics()
      }
    },

    togglePlay() {
      if (this.currentIndex === -1 && this.playlist.length > 0) {
        this.currentIndex = 0 // 如果没有选中歌曲，选中第一首
      }
      this.isPlaying = !this.isPlaying
    },

    nextSong() {
      if (this.playlist.length === 0) return
      if (this.currentIndex === -1) {
        this.currentIndex = 0
      } else {
        this.currentIndex = (this.currentIndex + 1) % this.playlist.length
      }
      this.isPlaying = true
      this.loadLyrics()
    },

    prevSong() {
      if (this.playlist.length === 0) return
      if (this.currentIndex === -1) {
        this.currentIndex = 0
      } else {
        this.currentIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length
      }
      this.isPlaying = true
      this.loadLyrics()
    },

    seekTo(time: number) {
      this.currentTime = Math.max(0, time)
    },

    setVolume(volume: number) {
      this.volume = Math.max(0, Math.min(1, volume))
    },

    toggleMiniPlayer() {
      this.showMiniPlayer = !this.showMiniPlayer
    },

    toggleFullPlayer() {
      this.showFullPlayer = !this.showFullPlayer
    },

    async loadLyrics() {
      if (!this.currentSong?.lrc) {
        this.lyrics = ['暂无歌词，享受好音乐...']
        return
      }
      
      try {
        // 安全处理URL
        const lrcUrl = this.currentSong.lrc.startsWith('http') 
          ? this.currentSong.lrc 
          : `/music/lrc/${this.currentSong.lrc}`
        
        const response = await fetch(lrcUrl)
        if (!response.ok) throw new Error('歌词加载失败')
        
        const lrcText = await response.text()
        this.parseLyrics(lrcText)
      } catch (error) {
        console.error('歌词加载失败:', error)
        this.lyrics = ['暂无歌词，享受好音乐...']
      }
    },

    parseLyrics(lrcText: string) {
      const lines = lrcText.split('\n')
      const lyrics: string[] = []
      
      lines.forEach(line => {
        // 移除时间标签，只保留歌词文本
        const text = line.replace(/\[\d+:\d+\.\d+\]/g, '').trim()
        if (text && !text.startsWith('[offset:') && !text.startsWith('[ar:') && 
            !text.startsWith('[ti:') && !text.startsWith('[al:')) {
          lyrics.push(text)
        }
      })
      
      this.lyrics = lyrics.length > 0 ? lyrics : ['暂无歌词，享受好音乐...']
    },

    updateLyricIndex() {
      if (this.lyrics.length === 0) {
        this.currentLyricIndex = 0
        return
      }
      
      // 简化的歌词同步逻辑
      const estimatedIndex = Math.floor(this.currentTime / 5) % this.lyrics.length
      this.currentLyricIndex = estimatedIndex
    }
  }
})