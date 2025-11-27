<script setup lang="ts">
import MusicPlayerCard from './MusicPlayer.vue';

</script>

<template>
  <div class="musicCard player">
    <div class="mainContainer">
      <MusicPlayerCard />
    </div>
  </div>
</template>

<style lang="scss">
.musicCard {
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
  height: auto;
  width: 100%;
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  border-radius: 0.6rem;
  gap: 0.4rem;
  overflow: hidden;
  padding: 0.6rem;
  transition: 0.3s;
  .mainContainer {
    display: flex;
    flex-direction: column;
    max-height: 4rem;
    min-height: 3rem;
    position: relative;
    flex: 1 1 0%;
    overflow: hidden;
  }
}
.player {
  flex-shrink: 0;
  border-bottom: 1px solid var(--c-border);
  border-top: 1px solid var(--c-border);
  padding: 0.8rem max(0.6rem, 5%);
}
</style>