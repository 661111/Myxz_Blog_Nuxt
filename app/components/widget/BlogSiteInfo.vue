<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { siteLinkItems, siteLinkWidgetInfo } from '../../sitelink'
const activeTab = ref(0); // 默认激活第一个标签页
</script>

<template>
  <ZWidget card v-for="WidgetInfo in siteLinkWidgetInfo" :key="WidgetInfo.title" :title="WidgetInfo.title">
    <div class="BlogSiteGroup">
      <div class="tabs-container">
        <div class="tabs">
          <button v-for="(tab, index) in siteLinkItems" :key="tab.name" @click="activeTab = index" :class="{ 'active': activeTab === index }">
            {{ tab.name }}
          </button>
        </div>
        <div class="sitelink-list">
          <div class="sitelink-item" v-for="(site, index) in siteLinkItems[activeTab].Item" :key="index">
            <img width="80" height="80" :alt="site.name" class="cover" :src="site.image">
            <main>
              <header class="header">
                <div class="title">
                  <a :href="site.link" rel="noopener noreferrer" target="_blank">
                    {{ site.name }}
                  </a>
                  <span class="iconify i-ph:link-duotone" aria-hidden="true" style="font-size: 0.8em;"></span>
                </div>
              </header>
              <section>
                <div class="badges" v-for="service in site.service" :key="service.name">
                  <a :href="service.link" rel="noopener noreferrer" target="_blank" class="badge badge-img">
                    <img :alt="service.name" class="badge-icon" :src="service.image">
                    <span class="badge-text">
                      {{ service.name }}
                    </span>
                  </a>
                </div>
                <p class="description">
                  {{ site.desc }}
                </p>
              </section>
              <!-- <footer>
                <h5 class="rss">
                  <span class="iconify i-ph:rss-fill" aria-hidden="true"></span>
                  <a :href="site.link" rel="noopener noreferrer" target="_blank">
                    {{ site.link }}
                  </a>
                </h5>
              </footer> -->
            </main>
          </div>
        </div>
      </div>
    </div>
  </ZWidget>
</template>

<style src="../../assets/css/widget/tab.css" scoped></style>
<style src="../../assets/css/widget/badge.css"></style>
<style lang="css" scoped>
  .sitelink-list {
    gap: 1rem;
    display: grid;
    margin-top: 0.5rem;
  }
  .sitelink-item {
    display: flex;
    gap: 1rem;
  }
  .sitelink-item main{
    align-items: center;
    display: grid;
  }
  .sitelink-item img{
    border-radius: .8em;
  }
  .badges {
    margin-bottom: 1.5rem;
  }
</style>