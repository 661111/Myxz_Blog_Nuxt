<script setup lang="ts">
import { ref, inject, watch } from 'vue'
// ------------------------------
// 1. 类型定义（严格约束十六进制颜色）
// ------------------------------
type HexColor = `#${string}` // 或使用更精确的正则类型：`#([0-9A-F]{3}){1,2}`i

// ------------------------------
// 2. 全局状态注入与本地状态
// ------------------------------
const globalColor = inject<Ref<HexColor>>('globalPrimaryColor')
const localColor = ref<HexColor>(globalColor?.value || '#ff1100')
const errorMsg = ref('')
const systemPicker = ref<HTMLInputElement | null>(null)

// ------------------------------
// 3. 核心工具函数
// ------------------------------
/** 验证是否为合法十六进制颜色（支持#fff和#ffffff） */
const isValidHex = (color: string): color is HexColor => {
  return /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(color.trim())
}

// ------------------------------
// 4. 事件处理：文本输入验证
// ------------------------------
const validateInput = (e: Event) => {
  const inputEl = e.target as HTMLInputElement
  const value = inputEl.value.trim()

  if (!value) {
    errorMsg.value = ''
    return
  }

  if (isValidHex(value)) {
    localColor.value = value // ✅ 类型守卫确保此处value是HexColor
    errorMsg.value = ''
  } else {
    errorMsg.value = '无效的十六进制颜色值，格式应为 #RRGGBB'
    inputEl.value = localColor.value // 强制恢复合法值
  }
}

// ------------------------------
// 5. 事件处理：系统颜色选择器
// ------------------------------
const openSystemPicker = () => {
  systemPicker.value?.click()
}

const handleSystemColorChange = (e: Event) => {
  const inputEl = e.target as HTMLInputElement
  localColor.value = inputEl.value // ✅ 原生控件保证返回标准#rrggbb格式
  errorMsg.value = ''
}

// ------------------------------
// 6. 全局状态同步
// ------------------------------
const updateGlobalColor = (color: HexColor) => {
  if (globalColor) {
    globalColor.value = color
  }
}

watch(localColor, updateGlobalColor, { immediate: true })
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
      <div
        class="preview"
        :style="{ backgroundColor: localColor }"
        @click="openSystemPicker"
      ></div>

      <input
        type="text"
        v-model="localColor"
        @input="validateInput"
        class="text_input"
        placeholder="#RRGGBB（如#ff1100）"
        maxlength="7"
      />
    </div>
    <div v-if="errorMsg" class="error-tip">{{ errorMsg }}</div>
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
      background-color: var(--ld-bg-card);
      border: 1px solid var(--c-border);
      border-radius: .5em;
      box-shadow: 0 1px 2px #0000000d;
      cursor: pointer;
      height: 3em;
      transition: all .2s ease;
      width: 3em;
    }
  }
  .error-tip {
    color: #ff6b6b;
    font-size: .8em;
    margin: -.4em 0 .4em;
  }
}
</style>