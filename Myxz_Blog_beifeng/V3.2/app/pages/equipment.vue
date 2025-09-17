<script lang="ts" setup>
import { equipment } from "~/equipment"
</script>

<template>
    <div id="icat-equipment">
        <div v-for="i in equipment" :key="i.class_name">
            <h2 :id="i.class_name">
                {{ i.class_name }}
            </h2>
            <div class="equipment-desc">
                {{ i.class_desc }}
            </div>
            <div class="equipment" v-for="item in i.equipmentList" :key="item.name">
                <div class="icat-equipment-box" style="width: calc(35% - 12px)!important;">
                    <img :src="item.image">
                    <div class="icat-equipment-content">
                        <div class="icat-equipment-name">
                            {{ item.name }}
                        </div>
                        <div class="icat-equipment-custom">
                            {{ item.custom }}
                        </div>
                        <div class="icat-equipment-opinion">
                            {{ item.opinion }}
                        </div>
                        <div class="icat-equipment-box-more">
                            <a :herf="item.details_flink" title="跳转到{{ item.name }}的产品详情">
                                {{ i.infoname }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 装备页面美化（icat） */
/* 由苏晓河进行编写以及调整 */
/* 时间：2025年2月5日 */

#icat-equipment > h2 {
    margin: 20px 7px 0;
  }
  #icat-equipment .equipment-desc {
    margin: 0 7px;
    color: var(--icat-secondtext);
  }
  #icat-equipment {
    padding-bottom: 12px;
  }
  #icat-equipment .equipment {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0 0;
    gap: 16px;
  }
  /* 初始化 */
  
  #icat-equipment .equipment > .icat-equipment-box {
    border: 1px solid var(--icat-secondbg);
    background: var(--icat-card-bg);
    width: calc(100% / 4 - 12px);
    border-radius: 12px;
    overflow: hidden;
  }
  #icat-equipment .equipment .icat-equipment-box img {
    min-width: 100%;
    max-width: 100%;
    height: 200px;
    object-fit: cover;
    animation:fadeIn 1s;
    cursor:pointer;
    transition:all .4s ease-in-out;
  }
  #icat-equipment .equipment .icat-equipment-box img:hover {
      transform:scale(1.03);
  }
  #icat-equipment .equipment .icat-equipment-box .icat-equipment-content {
    padding: 16px;
  }
  #icat-equipment .equipment .icat-equipment-box .icat-equipment-content .icat-equipment-name {
    color: var(--icat-fontcolor);
    font-size: 18px;
    font-weight: bold;
    line-height: 1;
    margin-bottom: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  #icat-equipment .equipment .icat-equipment-box .icat-equipment-content .icat-equipment-custom {
    font-size: 12px;
    color: var(--icat-secondtext);
    line-height: 1;
    margin-bottom: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  #icat-equipment .equipment .icat-equipment-box .icat-equipment-content .icat-equipment-opinion {
    line-height: 20px;
    color: var(--icat-secondtext);
    height: 60px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    margin-bottom: 16px;
  }
  #icat-equipment .equipment .icat-equipment-box .icat-equipment-content .icat-equipment-box-more {
    display: flex;
    justify-content: space-between;
  }
  
  #icat-equipment .equipment .icat-equipment-box .icat-equipment-content .icat-equipment-box-more a {
    font-size: 12px;
    background: var(--icat-gray-op);
    color: var(--icat-fontcolor);
    padding: 4px 12px;
    border-radius: 6px;
    letter-spacing: 1px;
  }
  #icat-equipment .equipment .icat-equipment-box .icat-equipment-content .icat-equipment-box-more a:hover {
    color: var(--icat-white);
    background: var(--icat-blue);
    box-shadow: 0 8px 16px -4px var(--icat-black-op);
  }
  /* 好物页基础样式 */
  
  @media screen and (max-width: 900px) {
    #icat-equipment .equipment {
      gap: 10px;
    }
    #icat-equipment .equipment > .icat-equipment-box {
      width: calc(100% / 3 - 7px);
    }
  }
  @media screen and (max-width: 768px) {
    #icat-equipment .equipment {
      gap: 8px;
    }
    #icat-equipment .equipment > .icat-equipment-box {
      width: 100%;
    }
    #icat-equipment .equipment .icat-equipment-box img {
      height: 220px;
    }
  }
  /* 响应式 */
  
  /* 我的好物样式 */
</style>