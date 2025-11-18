<script setup lang="ts">
import { ref, computed } from 'vue';

const inputText = ref('');

const handleInputChange = (text: string) => {
  inputText.value = text;
};

// 根据输入内容生成动态样式
const dynamicStyle = computed(() => ({
  color: inputText.value.length > 10 ? 'red' : 'green',
  fontSize: `${inputText.value.length * 0.5 + 12}px`,
  border: inputText.value.includes('error') ? '2px solid red' : 'none'
}));
</script>
<template>
  <div class="color">
    <div class="header">
      <div class="label">
        主题颜色代码
      </div>
      <div class="description">
        可更改当前主题颜色（未写完）
      </div>
    </div>
    <div class="input-group">
      <input type="text" class="text_input" @input-change="handleInputChange" placeholder="#ff1a8c">
      <div class="preview" :style="dynamicStyle"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.color {
  display: flex;
  flex-direction: column;
  gap: .8em;
  margin-bottom: 1.2em;

  .header {
    display: flex;
    flex-direction: column;
    gap: .2em;

    .label {
      color: var(--c-text-1);
      font-size: .9em;
      font-weight: 500;
    }
    .description {
      color: var(--c-text-3);
      font-size: .75em;
    }
  }
  .input-group {
    align-items: center;
    display: flex;
    gap: .6em;

    .text_input {
      background-color: var(--ld-bg-card);
      border: 1px solid var(--c-border);
      border-radius: .5em;
      box-shadow: 0 1px 2px #0000000d;
      color: var(--c-text);
      flex: 1;
      font-family: Courier New, monospace;
      font-size: .9em;
      padding: .5em .7em;
      transition: all .2s ease;
    }
    .preview {
      border: 1px solid var(--c-border);
      border-radius: .5em;
      box-shadow: 0 2px 6px #0000001a;
      height: 2.4em;
      transition: all .2s;
      width: 2.4em;
    }
  }
}
</style>