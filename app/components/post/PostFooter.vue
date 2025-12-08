<script setup lang="ts">
import { PostFooter } from '#components';
import type ArticleProps from '~/types/article'
const { data: stats } = useFetch('/api/stats')

defineOptions({ inheritAttrs: false })
const props = defineProps<ArticleProps>()

const appConfig = useAppConfig()

const item = {
	作者: appConfig.author.name,
	发布时间: getLocalePostDatetime(props.date),
	更新时间: getLocalePostDatetime(props.updated),
	许可协议: "CC BY-NC-SA 4.0",
}

import { sort } from 'radash'

const { data: listRaw } = await useAsyncData<ArticleProps[]>('index_posts', () => useArticleIndex().then(data => data.data.value))

const articlesByTag = computed(() => {
	const result: Record<string, any[]> = {}
	const articles = sort(listRaw.value || [], a => new Date(a.date || 0).getTime(), true)
	for (const article of articles) {
		if (article.tags) {
			for (const tag of article.tags) {
				if (!result[tag]) {
					result[tag] = []
				}
				result[tag].push(article)
			}
		}
	}
	return result
})

const sortedTags = computed(() => {
	return Object.keys(articlesByTag.value).sort((a, b) => {
		const aCount = articlesByTag.value[a]?.length || 0
		const bCount = articlesByTag.value[b]?.length || 0
		return bCount - aCount
	})
})
</script>

<template>
<div class="post-footer">
	<!-- <section v-if="references" class="reference">
		<div id="references" class="title text-creative">
			参考链接
		</div>

		<div class="content">
			<ul>
				<li v-for="{ title, link }, i in references" :key="i">
					<ProseA :href="link || ''">
						{{ title ?? link }}
					</ProseA>
				</li>
			</ul>
		</div>
	</section>

	<section class="license">
		<div class="title text-creative">
			许可协议
		</div>

		<div class="content">
			<p>
				本文采用 <ProseA :href="appConfig.copyright.url">
					{{ appConfig.copyright.name }}
				</ProseA>
				许可协议，转载请注明出处。
			</p>
		</div>
	</section> -->
	<section class="authorCard">
		<div class="header">
			<span class="authorInfo">
				<h3 class="title">{{ title }}</h3>
				<ZRawLink :to="appConfig.url + path" class="url">
					{{ appConfig.url }}{{ path }}
				</ZRawLink>
			</span>
			<span class="authorIcon">
				<icon name="ph:copyright-bold" />
			</span>
		</div>
		<div class="meta">
      <div class="card-specs">
        <div class="spec-item" v-for="([key, value]) in Object.entries(item ?? {})" :key="key">
          <h3 class="spec-label">
            {{ key }}
          </h3>
          <h3 class="spec-value" v-if="key === '作者' || key === '发布时间' || key === '更新时间'">
            {{ value }}
          </h3>
					<ZRawLink class="spec-value" to="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans" v-if="key === '许可协议'">
						{{ value }}
					</ZRawLink>
        </div>
      </div>
		</div>
	</section>
	<section class="post-bottom">
		<div class="left">
			<div class="tagsItem">
				<ZRawLink class="tags" v-for="([key, value]) in Object.entries(tags ?? {})" :key="key" :to="'/?tags=' + value">
					{{ value }}
					<span class="tagNumber">{{ articlesByTag[value]?.length }}</span>
				</ZRawLink>
			</div>	
		</div>
	</section>
</div>
</template>

<style lang="scss" scoped>
.post-footer {
	margin: 2rem 0.5rem;
	border: 1px solid var(--c-border);
	border-radius: 1rem;
	background-color: var(--c-bg-2);
}

section {
	padding: 1rem;

	& + section {
		border-top: 1px solid var(--c-border);
	}
}

.authorCard {
  display: flex;
  flex-direction: column;
  position: relative;
	padding: 1.5rem;
	overflow: hidden;

	.header {
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
		.authorInfo {
			flex: 1;
			.title {
				font-size: 1.1rem;
				line-height: 1.4;
				margin: 0 0 .5rem;
			}
			.url {
				color: var(--c-text-soft);
				font-size: .85rem;
				margin: 0;
				word-break: break-all;
			}
		}
		.authorIcon {
			position: absolute;
			right: -26px;
			font-size: 200px;
			opacity: .2;
			z-index: 2;
			-webkit-transition: all .3s ease-in-out;
			-moz-transition: all .3s ease-in-out;
			-o-transition: all .3s ease-in-out;
			-ms-transition: all .3s ease-in-out;
			transition: all .3s ease-in-out;
			top: -25%
		}
	}
	.meta {
		flex: 1;
    margin-bottom: 1rem;

		.card-specs {
			background: transparent;
			border-radius: 0;
			display: grid;
			font-size: .8rem;
			gap: .8rem;
			grid-template-columns: repeat(5, 1fr);
			padding: 0;
			@media (max-width: 768px) {
				grid-template-columns: repeat(3, 1fr);
			}

			.spec-item {
				display: flex;
				flex-direction: column;
				gap: .1rem;
				.spec-label {
					color: var(--c-text-2);
					// font-size: .7rem;
					font-weight: 500;
				}
				.spec-value {
					color: var(--c-text);
					// font-size: .8rem;
					word-break: break-word;
					font-size: .9rem;
    			font-weight: 500;
				}
			}
		}
	}
}

.post-bottom {
	width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;

	.left {
    white-space: nowrap;
    display: flex;
    text-overflow: ellipsis;
    flex-wrap: wrap;

		.tagsItem {
			display: flex;
			padding: 0;
			width: 100%;
			flex-wrap: wrap;
			flex-direction: row;
			gap: 8px;

			.tags {
				background: var(--heo-card-bg);
				border: var(--style-border-always);
				color: var(--heo-fontcolor);
				border-radius: 8px;
				margin: 0;
				display: flex;
				align-items: center;
				white-space: nowrap;
				height: 32px;
				padding: 0 .6rem;
				width: fit-content;
				font-size: .85em;
				transition: all .2s ease-in-out 0s;

				.tagNumber {
					padding: 2px;
					background: var(--heo-fontcolor);
					min-width: 22.5px;
					display: inline-block;
					border-radius: 4px;
					text-align: center;
					font-size: 0.7rem;
					color: var(--heo-card-bg);
					margin-left: 4px;
					line-height: 1;
					transition: .2s;
				}
			}
		}
	}
}

// .title {
// 	font-weight: bold;
// 	color: var(--c-text);
// }

// .content {
// 	margin-top: 0.5em;
// 	font-size: 0.9rem;

// 	li {
// 		margin: 0.5em 0;
// 	}
// }
</style>
