<script setup lang="ts">
import Tab from '~/components/content/Tab.vue'  //分页管理
import CustomThemes from './custom.vue' // 主题控制
import TogglesButtom from './togglesButtom.vue'  // 控制中心
import MusicMain from './musicMain.vue'  // 音乐界面
import About_info from './about_info.vue'  // 关于界面
</script>

<template>
  <div class="has-border">
    <Tab :tabs="['全局', '功能', '音乐', '关于']">  <!-- 分页标头 -->
      <template v-slot:tab1>  <!-- 内容识别（与分页标头绑定） -->
        <div class="customizer-section">  <!-- 分页子元素（默认） -->
          <CustomThemes />  <!-- 与主题控制绑定示例 -->
        </div>
      </template>
      <template v-slot:tab2>
        <div class="customizer-section">
          <TogglesButtom />
        </div>
      </template>
      <template v-slot:tab3>
        <div class="customizer-section">
          <!-- <MusicMain /> -->
        </div>
      </template>
      <template v-slot:tab4>
        <div class="customizer-section">
          <About_info />
        </div>
      </template>
    </Tab>
  </div>
</template>
<style lang="scss" scoped>
.has-border {
  background-color: var(--ld-bg-card);
  border: 1px solid var(--c-border);
  border-radius: .8em;
  padding: 1.2em;
}
</style>