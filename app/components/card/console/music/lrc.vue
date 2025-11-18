<script setup lang="ts">
const props = defineProps<{
  lyrics: any[];
  currentLine: number;
}>();
</script>

<template>
  <div class="lyric-display">
    <p 
      v-for="(line, index) in lyrics" 
      :key="index" 
      :class="{ active: index === currentLine }"
    >
      {{ line.text }}
    </p>
  </div>
</template>

<style scoped>
.lyric-display {
  height: 200px;
  overflow-y: auto;
  padding: 1rem;
  background: #f0f2f5;
  border-radius: 4px;
}

p {
  margin: 0;
  padding: 0.5rem 0;
  color: #666;
  
  &.active {
    color: #333;
    font-weight: bold;
  }
}
</style>