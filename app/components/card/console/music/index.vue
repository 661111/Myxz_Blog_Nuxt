<script setup lang="ts">
import MusicPlayer from '~/components/card/console/music/MusicPlayer.vue';
import { musicList } from '~/music';

defineProps({
  defaultIndex: {
    type: Number,
    default: 0
  }
});
</script>

<template>
  <div class="music-player-container">
    <MusicPlayer :musicList="musicList"/>
  </div>
</template>

<style lang="scss">
.music-player-container {
  display: flex;
  flex-direction: column;
  gap: 1em;
  max-width: 600px;
  margin: 0 auto;
}
</style>