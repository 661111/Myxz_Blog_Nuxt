<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { siteLinkItems, siteLinkWidgetInfo } from '../../sitelink'
const activeTab = ref(0); // 默认激活第一个标签页
</script>

<template>
  <BlogWidget card v-for="WidgetInfo in siteLinkWidgetInfo" :key="WidgetInfo.title" :title="WidgetInfo.title">
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
  </BlogWidget>
</template>

<style lang="scss" scoped>
.float-in-leave-active {
	position: revert;
}

.center {
	width: fit-content;
	max-width: 100%;
	margin-inline: auto;
}

.tabs {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 0.5em;
	position: relative;
	width: fit-content;
	margin: 0 auto;
	font-size: 0.9em;
	line-height: 1.4;
}

button {
	position: relative;
	margin-bottom: 0.5em;
	padding: 0.3em 0.5em;
	border-radius: 0.4em;
	color: var(--c-text-2);
	transition: all 0.2s;

	&:hover {
		background-color: var(--c-bg-soft);
		color: var(--c-text);
	}

	&::before, &::after {
		display: block;
		position: absolute;
		bottom: -0.5em;
		inset-inline: 0.8em;
		height: 2px;
		border-radius: 1em;
		pointer-events: none;
	}

	&::after {
		content: "";
		inset-inline: -0.8em;
		background-color: var(--c-border);
	}

	&.active {
		box-shadow: 0 1px 0.5em var(--ld-shadow);
		background-color: var(--ld-bg-card);
		color: var(--c-text);

		&::before {
			content: "";
			background-color: var(--c-primary);
			z-index: 1;
		}
	}
}

.tab-content {
	padding: 0.5em 0;
}

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