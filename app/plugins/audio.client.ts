export default defineNuxtPlugin(() => {
  const playerStore = usePlayerStore()
  let audio: HTMLAudioElement | null = null
  
  const initAudio = () => {
    audio = new Audio()
    audio.volume = playerStore.volume
    
    audio.addEventListener('timeupdate', () => {
      playerStore.currentTime = audio?.currentTime || 0
      playerStore.updateLyricIndex()
    })
    
    audio.addEventListener('ended', () => {
      playerStore.nextSong()
    })
    
    audio.addEventListener('loadedmetadata', () => {
      if (playerStore.currentSong) {
        playerStore.currentSong.duration = audio?.duration || 0
      }
    })
  }
  
  watch(() => playerStore.currentSong, (newSong) => {
    if (newSong && audio) {
      audio.src = newSong.url
      if (playerStore.isPlaying) {
        audio.play().catch(console.error)
      }
    }
  })
  
  watch(() => playerStore.isPlaying, (playing) => {
    if (!audio) return
    
    if (playing) {
      audio.play().catch(console.error)
    } else {
      audio.pause()
    }
  })
  
  watch(() => playerStore.currentTime, (time) => {
    if (audio && Math.abs(audio.currentTime - time) > 1) {
      audio.currentTime = time
    }
  })
  
  watch(() => playerStore.volume, (volume) => {
    if (audio) {
      audio.volume = volume
    }
  })
  
  onMounted(() => {
    initAudio()
  })
  
  return {
    provide: {
      audio: {
        getInstance: () => audio
      }
    }
  }
})