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
	label: '总字数',
	value: computed(() => stats.value ? formatNumber(stats.value.total.words) : ''),
	tip: yearlyTip,
}]
</script>

<template>
  <ZWidget card title="博客统计">
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
    </div>
  </ZWidget>
</template>

<style lang="scss" scoped>
.cardInfo {
  .is-center {
    text-align: center;
  }
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
    margin-top: 0.7rem;
    font-weight: 800;
    font-size: 1.8em;
  }
  .author-info__description {
    margin-top: 0.7rem;
    font-size: 16.5px;
    font-weight: 700;
  }
}
</style>