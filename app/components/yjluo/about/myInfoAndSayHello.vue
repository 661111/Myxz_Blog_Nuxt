<script setup lang="ts">
// 自动导入 composables 目录下的函数
const Config = useMyInfo()
</script>

<template>
  <div 
    class="author-content-item myInfoAndSayHello" 
    v-for="info in Config" 
    :key="info.内容一"
    style="text-align: center; width: 100%"
  >
    <div class="title1">{{ info.标题一 }}</div>
    <div class="title2">
      {{ info.标题二 }}
      <span class="inline-word">{{ info.博主名称 }}</span>
    </div>
    <div class="title1">
      {{ info.内容一 }}
      <span class="inline-word">{{ info.内容二 }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* 定义变量便于维护和换肤 */
$gradient-start: #5b27ff;
$gradient-end: #00d4ff;
$text-color: var(--heo-white);
$font-size-large: 36px;
$font-weight-bold: 700;
$opacity-value: 0.8;
$line-height-normal: 1.3;
$line-height-tight: 1.1;
$min-height: 175px;
$margin-vertical: 0.5rem;

/* 嵌套优化，避免重复样式 */
.myInfoAndSayHello {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: $text-color;
  background: linear-gradient(120deg, $gradient-start 0, $gradient-end 100%);
  background-size: 200%;
  min-height: $min-height;

  .title1 {
    opacity: $opacity-value;
    line-height: $line-height-normal; /* 移除重复属性 */
  }

  .title2 {
    font-size: $font-size-large;
    font-weight: $font-weight-bold;
    line-height: $line-height-tight;
    margin: $margin-vertical 0;
  }

  .inline-word {
    word-break: keep-all;
    white-space: nowrap; /* 移除重复属性 */
  }
}
</style>