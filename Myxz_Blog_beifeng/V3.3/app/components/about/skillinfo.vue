<script setup lang="ts">
import { computed } from 'vue';
// 导入外部数据
import { creativityData } from '~/creativity';

// 从 creativityData 中提取技能数据（假设取第一个分类）
const skills = computed(() => {
  const firstCategory = creativityData?.[0];
  if (!firstCategory?.creativity_list) return null;
  
  // 补充原始代码中需要的字段（根据实际数据结构调整）
  return {
    ...firstCategory,
    title: firstCategory.class_name,  // 映射 class_name 到 title
    subtitle: firstCategory.subtitle  // 直接使用 subtitle
  };
});

// 计算属性：技能标签分组（每两个一组）- 使用 reduce 重构
const skillTagGroups = computed(() => {
  if (!skills.value?.creativity_list) return [];
  
  return skills.value.creativity_list.reduce((groups, currentTag) => {
    // 取最后一个分组（可能未填满）
    const lastGroup = groups[groups.length - 1];
    
    if (lastGroup?.length === 2) {
      // 当前分组已满，创建新分组
      groups.push([currentTag]);
    } else {
      // 当前分组未满，添加到最后一个分组
      lastGroup ? lastGroup.push(currentTag) : groups.push([currentTag]);
    }
    
    return groups;
  }, []); // 初始值为空数组
});
</script>
<template>
    <div v-if="skills" class="author-content-item skills" style="max-width: 60%;">
      <div class="card-content">
        <div class="author-content-item-tips">{{ skills.class_name }}</div>
        <span class="author-content-item-title">{{ skills.subtitle }}</span>
        
        <div class="skills-style-group">
          <!-- 标签分组展示（每两个一组） -->
          <div class="tags-group-all">
            <div class="tags-group-wrapper">
              <div 
                v-for="(group, groupIdx) in skillTagGroups" 
                :key="groupIdx" 
                class="tags-group-icon-pair"
              >
                <div 
                  v-for="(tag, tagIdx) in group" 
                  :key="tagIdx" 
                  class="tags-group-icon" 
                  :style="{ background: tag.color }"
                >
                  <img 
                    class="entered loading"
                    :src="tag.icon" 
                    :title="tag.name"
                    :style="{ color: tag.icon_color || '' }"
                    alt=""
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- 全部技能列表 -->
          <!-- <div class="skills-list">
            <div 
              v-for="(tag, tagIdx) in skills.creativity_list" 
              :key="tagIdx" 
              class="skill-info"
            >
              <div 
                class="skill-icon" 
                :style="{ background: tag.color }"
              >
                <img 
                  v-if="tag.img" 
                  :src="tag.icon" 
                  :title="tag.name"
                  :style="{ color: tag.icon_color || '' }"
                  alt=""
                >
              </div>
              <div class="skill-name">
                <span>{{ tag.name }}</span>
              </div>
            </div>
            <div class="etc ...">...</div>
          </div> -->
        </div>
      </div>
    </div>
</template>

<style lang="css" scoped>
/* 轮播skill */
.author-content-item.skills {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
}

.author-content-item.skills .skills-style-group {
    position: relative;
}

.author-content-item.skills .tags-group-all {
    display: flex;
    transform: rotate(0);
    transition: .3s;
}

.author-content-item.skills .tags-group-wrapper {
    margin-top: 40px;
    display: flex;
    flex-wrap: nowrap;
    animation: rowleft 60s linear infinite;
}

.tags-group-icon-pair {
    margin-left: 1rem;
    user-select: none;
}

.tags-group-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 66px;
    font-weight: 700;
    box-shadow: var(--heo-shadow-blackdeep);
}

.tags-group-icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    position: relative;
}

.tags-group-icon img {
    width: 60%;
}

.author-content-item.skills .skills-list {
    display: flex;
    opacity: 0;
    transition: .3s;
    position: absolute;
    width: 50%;
    top: 0;
    left: 0;
    flex-wrap: wrap;
    flex-direction: row;
    margin-top: 10px;
    max-height: 310px;
    overflow: hidden;
}

.author-content-item.skills .skill-info {
    display: flex;
    align-items: center;
    margin-right: 10px;
    margin-top: 10px;
    background: var(--heo-background);
    border-radius: 40px;
    padding: 8px 12px 8px 8px;
    border: var(--style-border);
    box-shadow: var(--heo-shadow-border);
}

.author-content-item.skills .skill-icon {
    width: 32px;
    height: 32px;
    border-radius: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    user-select: none;
}

.author-content-item.skills .skill-icon img {
    width: 18px;
    height: 18px;
}

.author-content-item.skills .skill-name {
    font-weight: 700;
    line-height: 1;
}

.tags-group-icon-pair .tags-group-icon:nth-child(even) {
    margin-top: 1rem;
    transform: translate(-60px);
}

.author-content-item.skills .etc {
    margin-right: 10px;
    margin-top: 14px;
}
</style>