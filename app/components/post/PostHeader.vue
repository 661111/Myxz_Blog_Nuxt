<script setup lang="ts">
import type ArticleProps from '~/types/article'

defineOptions({ inheritAttrs: false })
const props = defineProps<ArticleProps>()

const appConfig = useAppConfig()

const categoryLabel = computed(() => props.categories?.[0])
const categoryIcon = computed(() => getCategoryIcon(categoryLabel.value))

const shareText = `【${appConfig.title}】${props.title}\n\n${
	props.description ? `${props.description}\n\n` : ''}${
	new URL(props.path!, appConfig.url).href}`

const { copy, copied } = useCopy(shareText)
</script>

<template>
<!-- 💩夸克浏览器，桌面端只有IE不支持 :has() 了 -->
<div class="post-header" :class="{ 'has-cover': image, 'text-revert': meta?.coverRevert }">
	<!-- <NuxtImg v-if="image" class="post-cover" :src="image" :alt="title" />
	<div class="post-nav">
		<div class="operations">
			<ZButton
				:icon="copied ? 'ph:check-bold' : 'ph:share-bold' "
				@click="copy()"
			>
				文字分享
			</ZButton>
		</div>

		<div v-if="!meta?.hideInfo" class="post-info">
			<time
				v-if="date"
				v-tip="`创建于 ${getLocaleDatetime(props.date)}`"
				:datetime="getIsoDatetime(date)"
			>
				<Icon name="ph:calendar-dots-bold" />
				{{ getPostDate(props.date) }}
			</time>

			<time
				v-if="isTimeDiffSignificant(date, updated, .999)"
				v-tip="`修改于 ${getLocaleDatetime(props.updated)}`"
				:datetime="getIsoDatetime(updated)"
			>
				<Icon name="ph:calendar-plus-bold" />
				{{ getPostDate(props.updated) }}
			</time>

			<span v-if="categoryLabel">
				<Icon :name="categoryIcon" />
				{{ categoryLabel }}
			</span>

			<span>
				<Icon name="ph:paragraph-bold" />
				{{ formatNumber(readingTime?.words) }} 字
			</span>
		</div>
	</div>

	<h1 class="post-title" :class="getPostTypeClassName(type)">
		{{ title }}
	</h1> -->
	<div class="cover-wrapper">
		<NuxtImg v-if="image" class="post-cover" :src="image" :alt="title"/>
	</div>
	<div class="cover-nav">
		<div class="post-info">
			<span class="date">
				<UtilDate
					v-if="date"
					v-tip
					tip-prefix="创建于"
					:date="date"
					icon="ph:calendar-dots-bold"
				/>
			</span>
			<span class="categroy" v-if="categoryLabel">
				<Icon :name="categoryIcon" />
				{{ categoryLabel }}
			</span>
			<span class="wordsCount">
				<Icon name="ph:paragraph-bold" />
				{{ formatNumber(readingTime?.words) }} 字
			</span>
			<span class="update">
				<UtilDate
					v-if="updated && isTimeDiffSignificant(date, updated, .999)"
					v-tip
					tip-prefix="修改于"
					:date="updated"
					icon="ri:24-hours-line"
				/>
			</span>
			<span class="tagItem">
				<Icon name="ph:tag-bold" />
				<span class="tag" v-for="([key, value]) in Object.entries(tags ?? {})" :key="key">
					{{ value }}
				</span>
			</span>
		</div>
		<div class="post-title" :class="getPostTypeClassName(type)">
			{{ title }}
		</div>
	</div>
</div>
</template>

<style lang="scss" scoped>
.post-header.has-cover {
	background-color: var(--c-bg-2);
  background-color: transparent;
  border-radius: 1rem 1rem 0 0;
  flex-direction: column;
  gap: 0;
  margin: .5rem;
	.cover-wrapper {
    border-radius: 1rem 1rem 0 0;
    height: 360px;
    overflow: hidden;
    overflow: clip;
    position: relative;
		@media (max-width: 768px) {
			height: auto;
		}
		.post-cover {
			height: 100%;
			-o-object-fit: cover;
			object-fit: cover;
			width: 100%;
		}
	}
	.cover-nav {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    background: transparent;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    gap: .3rem;
    padding: 1.6rem 1.2rem;
		.post-info {
			align-items: center;
			color: var(--c-text-soft);
			display: flex;
			flex-wrap: wrap;
			gap: .6em 1.2em;
			-moz-column-gap: clamp(1em, 3%, 1.5em);
			column-gap: clamp(1em, 3%, 1.5em);
			font-size: .85rem;
			line-height: 1.5;
			margin: 0;
			order: -1;
			padding: 0;
			span {
				align-items: center;
				display: flex;
				gap: .3em;
			}
			.tagItem {
				align-items: center;
				display: flex;
				flex-wrap: wrap;
				gap: .3em .6em;
				.tag {
					background-color: var(--c-bg-soft);
					border-radius: .4em;
					color: var(--c-text-soft);
					font-size: .9em;
					padding: .25em .6em;
					transition: all .2s;
					&:hover {
						background-color: var(--c-primary-soft);
						color: var(--c-primary);
					}
				}
			}
		}
		.post-title {
			-webkit-backdrop-filter: none;
			backdrop-filter: none;
			background: none;
			border: none;
			box-shadow: none;
			color: var(--c-text);
			font-size: 1.6rem;
			font-weight: 600;
			line-height: 1.4;
			margin: 0;
			padding: 0;
		}
	}
}

.post-header {
  border-radius: 1rem;
  color: var(--c-text);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: .5rem;
	.cover-wrapper {
    overflow: hidden;
    overflow: clip;
    position: relative;
	}
	.cover-nav {
    display: flex;
    flex-direction: column;
    gap: .3rem;
    opacity: .9;
    padding: 1.6rem 1.2rem;
    position: relative;
		.post-info {
			align-items: center;
			color: var(--c-text-soft);
			display: flex;
			flex-wrap: wrap;
			gap: .6em 1.2em;
			-moz-column-gap: clamp(1em, 3%, 1.5em);
			column-gap: clamp(1em, 3%, 1.5em);
			font-size: .85rem;
			line-height: 1.5;
			margin: 0;
			order: -1;
			padding: 0;
		}
	}
}
</style>

<!-- 隐藏起来的样式 -->
<!-- <style lang="scss" scoped>
.post-header {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 1rem;
	margin: 0.5rem;
	border-radius: 1rem;
	background-color: var(--c-bg-2);
	color: var(--c-text);

	@media (max-width: $breakpoint-mobile) {
		margin: 0;
		border-radius: 0;
	}

	&:hover .operations {
		opacity: 1;
	}

	&.has-cover {
		aspect-ratio: 16 / 9;
    color: #fff;
    min-height: 200px;
    overflow: hidden;
    overflow: clip;
    position: relative;
    transition: font-size .2s;

		&:hover {
			font-size: 0.8em;
		}

		.post-info {
			filter: drop-shadow(0 1px 2px #000);
		}

		.post-title {
			background-image: linear-gradient(transparent, #0003, #0005);
			text-shadow: 0 1px 1px #0003, 0 1px 2px #0003;

			&.text-story {
				text-align: center;
			}
		}

		&.text-revert {
			text-shadow: 0 0 2px #FFF, 0 1px 0.5em #FFF;
			color: #333;

			.post-title {
				background-image: linear-gradient(transparent, #FFF3, #FFF5);
			}
		}
	}
}

.operations {
	position: absolute;
	opacity: 0;
	inset-inline-end: 1em;
	color: var(--c-text-1);
	transition: opacity 0.2s;
	z-index: 1;
}

.post-cover {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.post-title {
	padding: 0.8em 1rem;
	font-size: 1.6em;
	line-height: 1.2;
	z-index: 1;
}

.post-nav {
	position: relative;
	opacity: 0.9;
	padding: 0.8em 1rem;

	// 如果在父级设置字体尺寸，会影响祖先字体尺寸改变的行为
	// 并且设置相对尺寸会导致过渡
	>* {
		font-size: 0.8rem;
	}

	.post-info {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em 1.2em;
		column-gap: clamp(1em, 3%, 1.5em);
	}
}
</style> -->
