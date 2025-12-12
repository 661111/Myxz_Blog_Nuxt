<template lang="pug">
.FooterCard
  .head
    p.title {{ blogConfig.title }}
    p.desc(v-for="(info, index) in footer_card_info" :key="index") {{ info.desc }}
  .footer
    .button_div
      a.button(
        v-for="(info, index) in footer_card_info" 
        :key="index" 
        :href="info.link" 
        target="_blank"
      ) {{ info.link_button_name }}
</template>

<script lang="ts" setup>
// 提前导入配置，减少运行时延迟
import blogConfig from '~~/blog.config'

// 使用const声明，确保编译时常量优化
const footer_card_info = [{
  desc: '欢迎来到我的博客',
  link: '/about',
  link_button_name: '关于我的'
}]
</script>

<style lang="scss" scoped>
.FooterCard {
  text-align: center;
  
  .head {
    .title {
      font-size: 1.2rem;
      font-weight: 900;
    }
    
    .desc {
      font-size: 1rem;
    }
  }
  
  .footer {
    margin-top: 1rem;
    
    .button_div {
      padding: 0.5rem;
      background: var(--c-bg-2);
      border-radius: 1rem;
      margin: 0 auto;
      max-width: 20%;
      
      .button {
        // 移除默认链接样式
        text-decoration: none;
        color: inherit;
        display: inline-block;
        // 添加过渡效果提升用户体验
        transition: opacity 0.2s ease;
        
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>