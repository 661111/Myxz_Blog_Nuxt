<script setup lang="ts">
import Aplayer from './music/index.vue'
</script>

<template>
  <div class="music-settings">
    <div class="preview-group">
      <div class="preview-container">
        <Aplayer />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.music-settings {
  display: flex;
  flex-direction: column;
  gap: 1.2em;
}
</style>