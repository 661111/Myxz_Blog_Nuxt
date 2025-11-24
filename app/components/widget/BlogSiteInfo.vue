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
            <!-- <img width="80" height="80" :alt="site.name" class="cover" :src="site.image"> -->
            <main>
              <header class="header">
                <div class="title">
                  {{ site.name }}
                </div>
                <div class="desc">
                  {{ site.desc }}
                </div>
              </header>
              <section>
                <div class="badges" v-for="service in site.service" :key="service.name">
                  <Badge :img="service.image" :link="service.link" :name="service.name" style="margin-bottom: -3rem;">
                    {{ service.name }}
                  </Badge>
                </div>
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

<style lang="scss" scoped>
.sitelink-list {
  gap: 1rem;
  display: grid;
  margin-top: 0.5rem;
  .sitelink-item {
    display: flex;
    gap: 1rem;

    main{
      align-items: center;
      display: grid;

      .header {
        display: flex;
        gap: 5px;
        justify-content: space-between;
        align-items: center;

        .title {
          font-weight: 700;
        }
        .desc {
          font-weight: 500;
          font-size: 10px;
        }
      }
      section {
        display: flex;
        margin-top: 5px;
        flex-wrap: wrap;
      }
    }
  }
}
</style>