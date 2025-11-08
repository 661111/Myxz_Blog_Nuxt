<script setup lang="ts">
const appConfig = useAppConfig()
const runtimeConfig = useRuntimeConfig()
import { NuxtTime } from '#components'

// 归档ts代码
const { data: stats } = useFetch('/api/stats')
const yearlyTip = computed(() => {
	if (!stats.value)
		return ''
	return Object.entries(stats.value.annual).reverse().map(([year, item]) =>
		`${year}年：${item.posts}篇，${formatNumber(item.words)}字`,
	).join('\n')
})

const blogStats = [{
  label: '文章数',
  value: computed(() => stats.value ? formatNumber(stats.value.total.posts) : ''),
  tip: yearlyTip,
}, {
  label: '总分类',
  value: computed(() => stats.value ? formatNumber(stats.value.totalCategories) : ''),
}, {
  label: '总标签',
  value: computed(() => stats.value ? formatNumber(stats.value.totalTags) : ''),
}]

const blogAccountInfo = [{
  herf: 'https://my.myxz.top/',
  title: '个人主页'
}]

const iconNav= [
  { icon: 'ph:github-logo-bold', text: 'GitHub: L33Z22L11', url: 'https://github.com/L33Z22L11' },
  { icon: 'ph:rss-simple-bold', text: 'Atom订阅', url: '/atom.xml' },
  { icon: 'ph:subway-bold', text: '开往', url: 'https://www.travellings.cn/go-by-clouds.html' },
]
</script>

<template>
  <ZWidget card title="作者信息">
    <div class="cardInfo">
      <div class="is-center">
        <div class="avatar-img">
          <img :src="appConfig.favicon">
        </div>
        <div class="author-info__name">
          {{ appConfig.title }}
        </div>
        <div class="author-info__description">
          {{ appConfig.subtitle }}
        </div>
      </div>
      <div class="card-info-data site-data is-center">
        <ZDlGroup :items="blogStats" size="small" />
      </div>
      <a class="cardInfoButton" v-for="accountInfo in blogAccountInfo" target="_blank" :href="accountInfo.herf" :key="accountInfo.title">
        {{ accountInfo.title }}
      </a>
      <div class="cardInfoSocialIcons is-center">
        <ZIconNavList :list="iconNav" />
      </div>
    </div>
  </ZWidget>
</template>

<style lang="scss" scoped>
.cardInfo {
  .is-center {
    text-align: center;
    .avatar-img {
      width: 110px;
      height: 110px;
      overflow: hidden;
      margin: 0px auto;
      border-radius: 70px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: filter 375ms ease-in 0.2s, transform 0.3s;
      }
    }
    .author-info__name{
      margin-top: 14px;
      font-size: 1.5em;
    }
    .author-info__description {
      font-size: 15px;
    }
  }
  .card-info-data.site-data.is-center {
    margin-top: 14px;
  }
  .cardInfoButton {
    display: block;
    margin-top: 14px;
    background-color: var(--c-bg-soft);
    color: var(--c-text);
    text-align: center;
    line-height: 2.4;
    border-radius: 0.5em;
  }
  .cardInfoSocialIcons {
    margin-top: 14px;
  }
}
</style>