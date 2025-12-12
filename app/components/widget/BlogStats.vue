<script setup lang="ts">
import { UtilDate } from '#components'

const appConfig = useAppConfig()
const runtimeConfig = useRuntimeConfig()

const { data: stats } = useFetch('/api/stats')

const yearlyTip = computed(() => {
	if (!stats.value)
		return ''
	return Object.entries(stats.value.annual).reverse().map(([year, item]) =>
		`${year}年：${item.posts}篇，${formatNumber(item.words)}字`,
	).join('\n')
})

const blogStats = [{
	label: '运营时长',
	value: timeElapse(appConfig.timeEstablished),
	tip: `博客于${appConfig.timeEstablished}上线`,
}, {
	label: '上次更新',
	value: () => h(UtilDate, {
		date: runtimeConfig.public.buildTime,
		relative: true,
		tipPrefix: '构建于',
	}),
}, {
	label: '总字数',
	value: computed(() => stats.value ? formatNumber(stats.value.total.words) : ''),
	tip: yearlyTip,
}]


import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
dayjs.extend(relativeTime)
</script>

<template>
<BlogWidget card title="博客统计">
	<div class="avatar">
    <div class="avatar-img">
      <img :src="appConfig.favicon">
    </div>
		<div class="author-info">
			<div class="author-info__name">
				{{ appConfig.title }}
			</div>
			<div class="author-info__description">
				{{ appConfig.subtitle }}
			</div>
			<div class="status"> 
				在{{ dayjs(runtimeConfig.public.buildTime).locale('zh-cn').fromNow().replaceAll(/\s+/g,'') }}
			</div>
		</div>
  </div>
	<ZDlGroup :items="blogStats" size="small" />
</BlogWidget>
</template>

<style lang="scss">
$status_backgroud: var(--status_backgroud);

.avatar {
	display: flex;
	gap: 10px;
	margin-bottom: 5px;

	.avatar-img {
		width: 70px;
    	height: 70px;

		img {
			width: 100%;
			height: 100%;
			-o-object-fit: cover;
			object-fit: cover;
			border-radius: 10px;
			transition: filter 375ms ease-in 0.2s, transform 0.3s;
		}
	}
	.author-info {
		.author-info__name {
			font-size: 1.1em;
			color: var(--c-text);
			font-weight: 550;
		}
		.status {
			background: $status_backgroud;
			--status_backgroud: rgba(60, 120, 60, .7);
			text-align: center;
			border-radius: 0.4rem;
			margin-top: 7.7px;
		}
	}
}
</style>
