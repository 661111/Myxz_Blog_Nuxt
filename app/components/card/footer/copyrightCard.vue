<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template lang="pug">
.copyrightCard
  .copyrightNav
    .timeLoad 
      .Powerby ©{{ appConfig.timeStart }} — 2026 Powerby
      a.copyrightName(
        :href="appConfig.url" 
        :title="appConfig.title" 
        target="_blank"
      )
        img.logo(
          :alt="appConfig.title" 
          :src="appConfig.header.logo" 
          :class="{circle: appConfig.header.showTitle}"
          width="25"
          height="25"
          loading="lazy"
        )
        .title {{ appConfig.title }}
    .themes
      .Themesinfo 
        p 采用 
        a(href="https://github.com/L33Z22L11/blog-v3") {{appConfig.other.Themes_Info}}
        p 主题
</template>

<style lang="scss" scoped>
.copyrightCard {
  .copyrightNav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    .timeLoad {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.2rem;
      font-size: 0.9em;
      
      .Powerby, .copyrightName {
        display: flex;
        align-items: center;
        gap: 0.2rem;
      }
      
      .copyrightName {
        padding: 0.5rem;
        text-decoration: none;
        color: inherit;
        transition: opacity 0.2s;
        
        &:hover {
          opacity: 0.8;
        }
        
        .logo {
          width: 25px;
          height: 25px;
          min-width: 25px;
          min-height: 25px;
          border-radius: 50%;
          object-fit: cover;
          
          &.circle {
            border-radius: 50%;
          }
        }
        
        .title {
          font-size: 1em;
          font-weight: 500;
        }
      }
    }
    
    .themes {
      font-size: 0.85em;
      color: var(--c-text-secondary);

      .Themesinfo {
        display: flex;
        gap: 0.5rem;
      }
    }
  }
}
</style>