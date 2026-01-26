<script setup lang="ts">
import { authorData } from '~/data/about/author'

const appConfig = useAppConfig()
</script>

<template>
  <div class="author-main" v-for="author in authorData" :key="author.头像">
    <div class="author-tag-left" v-for="left in author.左侧" :key="left.标签1">
      <span class="author-tag">{{ left.标签1 }}</span>
      <span class="author-tag">{{ left.标签2 }}</span>
      <span class="author-tag">{{ left.标签3 }}</span>
      <span class="author-tag">{{ left.标签4 }}</span>
    </div>
    
    <div class="mainports">
      <div class="author-box">
        <div class="author-img">
          <NuxtImg 
            class="no-lightbox author-avatar" 
            :src="appConfig.author.avatar" 
            :alt="appConfig.author.name || '作者头像'"
            loading="eager"
            fetchpriority="high"
            width="180"
            height="180"
          />
        </div>
      </div>
    </div>
    
    <div class="author-tag-right" v-for="right in author.右侧" :key="right.标签1">
      <span class="author-tag">{{ right.标签1 }}</span>
      <span class="author-tag">{{ right.标签2 }}</span>
      <span class="author-tag">{{ right.标签3 }}</span>
      <span class="author-tag">{{ right.标签4 }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* 使用SCSS变量提高可维护性 */
$avatar-size: 180px;
$tag-animation-delay: 0.6s;

.author-main {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  user-select: none;
}

.mainports {
  margin: 0 20px;
}

.author-box {
  position: relative;
  width: $avatar-size;
  height: $avatar-size;
  background: rgba(253, 253, 253, 0.8);
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  span {
    position: absolute;
    inset: 5px;
    border-radius: 50%;
    background: rgba(253, 253, 253, 0.8);
    z-index: 1;
  }
}

.author-img {
  margin: 0 30px;
  border-radius: 50%;
  width: $avatar-size;
  height: $avatar-size;
  position: relative;
  background: var(--heo-secondbg);
  user-select: none;
  transition: transform 0.3s ease; /* 使用GPU加速 */
  
  &:hover {
    transform: scale(1.02); /* 使用transform代替width/height变化 */
  }
}

.author-avatar {
  width: $avatar-size;
  height: $avatar-size;
  object-fit: cover; /* 确保图片比例正确 */
}

.author-tag-left,
.author-tag-right {
  display: flex;
  flex-direction: column;
}

.author-tag-left {
  align-items: flex-end;
  
  .author-tag {
    &:first-child,
    &:last-child {
      margin-right: -16px;
    }
  }
}

.author-tag-right {
  align-items: flex-start;
}

.author-tag {
  transform: translateY(-4px); /* 仅垂直方向平移，性能更优 */
  padding: 1px 8px;
  background: var(--heo-card-bg);
  border: var(--style-border-always);
  border-radius: 40px;
  margin-top: 6px;
  font-size: 14px;
  font-weight: 700;
  box-shadow: var(--heo-shadow-lightblack);
  
  /* 优化动画：使用transform和opacity确保GPU加速 */
  animation: tag-float 6s ease-in-out infinite;
  
  /* 使用SCSS循环生成延迟，提高可维护性 */
  @for $i from 1 through 4 {
    &:nth-child(#{$i}) {
      animation-delay: $tag-animation-delay * ($i - 1);
    }
  }
}

/* 关键帧动画优化 - 使用transform确保GPU加速 */
@keyframes tag-float {
  0%, 100% {
    transform: translateY(-4px) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateY(-8px) scale(1.05);
    opacity: 0.9;
  }
}

/* 减少布局抖动 - 为动画元素创建层 */
.author-tag {
  will-change: transform, opacity;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .author-main {
    flex-direction: column;
    gap: 16px;
  }
  
  .author-tag-left,
  .author-tag-right {
    align-items: center;
    
    .author-tag {
      &:first-child,
      &:last-child {
        margin-right: 0;
      }
    }
  }
  
  .author-tag {
    animation-duration: 4s; /* 移动端减少动画时长 */
  }
}
</style>