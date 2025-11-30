// store.ts (Vuex)
import { createStore } from 'vuex';
import type { QQMusicPlaylist, SongBase } from '~/types/music';
import { MusicAPI } from '~~/server/api/QQMusic.get';

export default createStore({
  state: () => ({
    currentSong: {} as SongBase,
    playlist: [] as SongBase[],
    isPlaying: false,
    showLyric: false,
    currentLyric: ''
  }),
  mutations: {
    setPlaylist(state: { playlist: any; }, playlist: any) {
      state.playlist = playlist;
    },
    setCurrentSong(state: { currentSong: any; }, song: any) {
      state.currentSong = song;
    },
    togglePlay(state: { isPlaying: boolean; }) {
      state.isPlaying = !state.isPlaying;
    },
    setShowLyric(state: { showLyric: any; }, status: any) {
      state.showLyric = status;
    },
    setCurrentLyric(state: { currentLyric: any; }, lyric: any) {
      state.currentLyric = lyric;
    }
  },
  actions: {
    async fetchPlaylist({ commit }: any, date: any) {
      const playlist = await MusicAPI.getPlaylist(date);
      commit('setPlaylist', playlist.songlist);
    },
    async playSong({ commit, state }: any, song: any) {
      commit('setCurrentSong', song);
      commit('togglePlay');
      // 初始化播放器逻辑
    },
    async fetchLyric({ commit }: any, songId: any) {
      const lyric = await MusicAPI.getSongLyric(songId);
      commit('setCurrentLyric', lyric);
    }
  }
});