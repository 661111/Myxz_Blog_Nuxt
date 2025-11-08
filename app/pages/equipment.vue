<script lang="ts" setup>
import { ref, computed } from 'vue'
import equipment from '~/equipment'
import { useLayoutStore } from '~/stores/layout'

const layoutStore = useLayoutStore()
layoutStore.setAside(['blog-account', 'blog-stats', 'blog-tech', 'blog-site-info', 'blog-log'])

// 新增状态管理
const activeCategory = ref('硬件')

// 计算属性过滤设备
const filteredEquipment = computed(() => 
  equipment.filter(item => item.categroy === activeCategory.value),
)
function handleTabClick(category: string) {
  activeCategory.value = category
}

function goComment(content: string) {
  const textarea = document.querySelector('.atk-textarea') as HTMLTextAreaElement
  if (textarea) {
    textarea.value = `> ${content.replace(/<[^>]+>/g, '')}\n\n`
    textarea.focus()
    textarea.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
</script>

<template>
  <div id="icat-equipment">
    <div class="equipment-category">
      <!-- 顶部导航栏 -->
      <div class="categories-tabs">
        <div class="tabs-container">
          <div 
            v-for="category in ['硬件', '外设']" 
            :key="category"
            class="category-tab"
            :class="{ active: activeCategory === category }"
            @click="handleTabClick(category)"
            style="--tab-color: var(--c-primary)"
          >
            {{ category }}
          </div>
        </div>
      </div>

      <!-- 设备展示区 -->
      <div class="equipment-list">
        <div class="equipment-item">
          <div v-for="(item, index) in filteredEquipment" :key="item.name + index" class="equipment-card">
            <div class="equipment-image">
              <img
                :src="item.image"
                :alt="item.name"
                loading="lazy"
              >
            </div>
            <div class="equipment-content">
              <div class="equipment-header">
                <h3 class="card-name">
                  {{ item.name }}
                </h3>
                <div class="card-category" style="--category-color: var(--c-primary)">
                  {{ item.categroy }}
                </div>
              </div>
              <div class="equipment-opinion">
                {{ item.desc }}
              </div>
              <div class="card-specs">
                <div class="spec-item" v-for="([key, value]) in Object.entries(item.info ?? {})" :key="key">
                  <div class="spec-label">
                    {{ key }}
                  </div>
                  <div class="spec-value">
                    {{ value }}
                  </div>
                </div>
              </div>
              <div class="card-tags">
                <span class="tag" v-for="([key, value]) in Object.entries(item.tag ?? {})" :key="key">
                  {{ value }}
                </span>
              </div>
              <div class="card-footer">
                <div class="purchase-info">
                  <icon name="ph:calendar-bold" style="font-size: 16px;"/>
                  {{ item.date }}
                </div>
                <div class="price-info">
                  ￥{{ item.money }}
                </div>
              </div>
              <div class="equipment-actions">
                <a class="equipment-link" :href="item.src" :title="`跳转到${item.name}的产品详情`" target="_blank" el="noopener noreferrer">
                  详情
                </a>
                <button class="comment-btn" type="button" @click="goComment(item.desc)" aria-label="快速评论">
                  <icon name="ph:chats-bold icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <PostComment key="/equipment" />
</template>

<style lang="scss" scoped>
// 装备页面样式优化 (苏晓河编写，2025年2月5日)
// 优化重点：提升加载性能，使用SCSS嵌套结构，语义化类名

#icat-equipment {
  padding-bottom: 12px;
  --category-color-one: #3af;
  --category-color-two: #3ba;
  
  .equipment-category {
    margin: 1rem;
    padding-top: 1rem;

    .categories-tabs {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;

      .tabs-container {
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
        justify-content: center;
        padding: .5rem;
        
        .category-tab {
          align-items: center;
          background: transparent;
          border: 2px solid var(--c-border);
          border-radius: .6rem;
          color: var(--c-text-2);
          cursor: pointer;
          display: flex;
          font-size: .95rem;
          gap: .5rem;
          padding: .6rem 1.2rem;
          transition: all .3s ease;
          white-space: nowrap;
        }
        .active {
          background: color-mix(in srgb, var(--tab-color) 10%, transparent);
          font-weight: 600;
        }
        .active, :hover {
          border-color: var(--tab-color);
          color: var(--tab-color);
        }
      }
    }
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
      grid-template-columns: repeat(2, 1fr);
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
            align-items: center;
            display: flex;
            height: 240px;
            justify-content: center;
            position: relative;
            width: 100%;
            background: rgb(255, 255, 255);
            overflow: hidden;
            
            img {
              height: 100%;
              object-fit: contain;
              width: 100%;
              padding: 0.8rem;
              transition: transform 0.3s;
              
              &::before {
                background-color: var(--c-border);
                color: var(--c-bg-soft);
                content: attr(alt);
                display: grid;
                position: absolute;
                text-align: center;
                text-shadow: none;
                word-break: normal;
                font: 700 1.5rem / 1.2 var(--font-serif);
                inset: 0px;
                overflow: visible;
                padding: 0.5em;
                place-content: center;
              }
            }
          }
          
          .equipment-content {
            padding: 16px;
            flex: 1;
            flex-direction: column;
            gap: .8rem;
            min-width: 0;
            padding: 1rem;
            display: flex;
            
            .equipment-header {
              align-items: flex-start;
              gap: .8rem;
              display: flex;
              justify-content: space-between;

              .card-name {
                color: var(--icat-fontcolor);
                font-size: 1.125rem;
                font-weight: 700;
                line-height: 1.2;
                margin-bottom: 8px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .card-category {
                background: color-mix(in srgb, var(--category-color) 10%, transparent);
                border-radius: .4rem;
                color: var(--category-color);
                flex-shrink: 0;
                font-size: .75rem;
                font-weight: 600;
                padding: .3rem .8rem;
                white-space: nowrap;
              }
            }
            
            .card-specs {
              background: transparent;
              border-radius: 0;
              display: grid;
              font-size: .8rem;
              gap: .4rem;
              grid-template-columns: repeat(2, 1fr);
              padding: 0;

              .spec-item {
                display: flex;
                flex-direction: column;
                gap: .1rem;
                .spec-label {
                  color: var(--c-text-2);
                  font-size: .7rem;
                  font-weight: 500;
                }
                .spec-value {
                  color: var(--c-text);
                  font-size: .8rem;
                  word-break: break-word;
                }
              }
            }
            
            .equipment-opinion {
              color: var(--c-text-2);
              display: -webkit-box;
              font-size: .9rem;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              line-height: 1.4;
              margin: 0;
              -webkit-box-orient: vertical;
              overflow: hidden;
              word-break: break-word;
            }
            .card-tags {
              display: flex;
              flex-wrap: wrap;
              gap: .3rem;

              .tag {
                background: color-mix(in srgb, var(--c-primary) 10%, transparent);
                border-radius: .3rem;
                color: var(--c-primary);
                display: inline-block;
                font-size: .7rem;
                padding: .15rem .5rem;
                white-space: nowrap;
              }
            }
            .card-footer, .card-footer div {
              align-items: center;
              display: flex;
            }
            .card-footer {
              border-top: 1px solid var(--c-border);
              color: var(--c-text-2);
              flex-wrap: wrap;
              font-size: .75rem;
              gap: .8rem;
              padding-top: .6rem;
              div {
                gap: .3rem;
              }
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
    grid-template-columns: repeat(2, 1fr);
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