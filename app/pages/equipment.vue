<template lang="pug">
#icat-equipment
  .equipment-category(v-for="category in equipment" :key="category.class_name")
    h2.category-title(:id="category.class_name") {{ category.class_name }}
    .category-desc {{ category.class_desc }}
    .equipment-list
      .equipment-item(v-for="item in category.List" :key="item.name")
        .equipment-card
          .equipment-image
            img(
              :src="item.image"
              :alt="item.name"
              loading="lazy"
            )
          .equipment-content
            h3.equipment-name {{ item.name }}
            .equipment-custom {{ item.custom }}
            .equipment-opinion {{ item.opinion }}
            .equipment-actions
              a.equipment-link(:href="item.details_flink" :title="`跳转到${category.infoname}的产品详情`" target="_blank" el="noopener noreferrer") {{ category.infoname }}
              button.comment-btn( type="button" @click="goComment(item.opinion)" aria-label="快速评论")
                i.iconify(class="i-ph:chats-bold icon")
  PostComment(key="/equipment")
</template>

<script lang="ts" setup>
import { equipment } from '../equipment'
import { useLayoutStore } from '~/stores/layout'

const layoutStore = useLayoutStore()
layoutStore.setAside(['blog-stats', 'blog-tech', 'blog-site-info', 'blog-log', 'blog-account'])

function goComment(content: string) {
  const textContent = content.replace(/<[^>]+>/g, '')
  const textarea = document.querySelector('.atk-textarea-wrap .atk-textarea') as HTMLTextAreaElement
  if (textarea) {
    textarea.value = `> ${textContent}\n\n`
    textarea.focus()
    textarea.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
</script>

<style lang="scss" scoped>
// 装备页面样式优化 (苏晓河编写，2025年2月5日)
// 优化重点：提升加载性能，使用SCSS嵌套结构，语义化类名

#icat-equipment {
  padding-bottom: 12px;
  
  .equipment-category {
    margin: 1rem;
    padding-top: 1rem;
    
    .category-title {
      margin: 20px 7px 0;
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--icat-fontcolor);
    }
    
    .category-desc {
      margin: 0.5rem 7px 1rem;
      color: var(--icat-secondtext);
      font-size: 0.9rem;
      line-height: 1.4;
    }
    
    .equipment-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
      padding: 10px 0 0;
      
      .equipment-item {
        .equipment-card {
          border: 1px solid var(--icat-secondbg);
          background: var(--icat-card-bg);
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          
          .equipment-image {
            overflow: hidden;
            
            img {
              width: 100%;
              height: 200px;
              object-fit: cover;
              animation: fadeIn 1s;
              transition: transform 0.4s ease-in-out;
              cursor: pointer;
              
              &:hover {
                transform: scale(1.03);
              }
            }
          }
          
          .equipment-content {
            padding: 16px;
            
            .equipment-name {
              color: var(--icat-fontcolor);
              font-size: 1.125rem;
              font-weight: 700;
              line-height: 1.2;
              margin-bottom: 8px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            
            .equipment-custom {
              font-size: 0.75rem;
              color: var(--icat-secondtext);
              line-height: 1.2;
              margin-bottom: 12px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            
            .equipment-opinion {
              line-height: 1.25;
              color: var(--icat-secondtext);
              height: 60px;
              display: -webkit-box;
              overflow: hidden;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              margin-bottom: 16px;
            }
            
            .equipment-actions {
              display: flex;
              justify-content: space-between;
              align-items: center;
              
              .equipment-link {
                font-size: 0.75rem;
                background: var(--icat-gray-op);
                color: var(--icat-fontcolor);
                padding: 6px 12px;
                border-radius: 6px;
                letter-spacing: 0.5px;
                text-decoration: none;
                transition: all 0.3s ease;
                
                &:hover {
                  color: var(--icat-white);
                  background: var(--icat-blue);
                  box-shadow: 0 8px 16px -4px var(--icat-black-op);
                }
              }
              
              .comment-btn {
                background: var(--icat-gray-op);
                color: var(--icat-fontcolor);
                border: none;
                border-radius: 6px;
                padding: 6px 10px;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                
                &:hover {
                  color: var(--icat-white);
                  background: var(--icat-blue);
                  box-shadow: 0 8px 16px -4px var(--icat-black-op);
                }
                
                .icon {
                  font-size: 1rem;
                }
              }
            }
          }
        }
      }
    }
  }
}

// 动画定义
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

// 响应式设计
@media screen and (max-width: 1024px) {
  #icat-equipment .equipment-category .equipment-list {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 12px;
  }
}

@media screen and (max-width: 768px) {
  #icat-equipment .equipment-category {
    margin: 0.5rem;
    
    .equipment-list {
      grid-template-columns: 1fr;
      gap: 10px;
      
      .equipment-item .equipment-card .equipment-image img {
        height: 180px;
      }
    }
  }
}

@media screen and (max-width: 480px) {
  #icat-equipment .equipment-category {
    margin: 0.25rem;
    
    .category-title {
      margin: 10px 7px 0;
      font-size: 1.25rem;
    }
    
    .equipment-list .equipment-item .equipment-card .equipment-image img {
      height: 160px;
    }
  }
}
</style>