<script setup lang="ts">
defineProps<{
  type: '默认' | '自定义'
  content: string
  aitype: string | '腾讯元宝'
}>()
</script>
<template>
  <div v-show="type === '默认'">
    <Icon name="simple-icons:openai" class="ai-gpt-icon"/>
    <span>本文章通过`{{ aitype }}`生成，内容仅供参考。</span>
  </div>
  <div v-show="type === '自定义'">
    <Icon name="simple-icons:openai" class="ai-gpt-icon"/>
    <span v-html="content"></span>
  </div>
</template>