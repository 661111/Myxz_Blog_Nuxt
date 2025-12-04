<script setup lang="ts">
const props = defineProps<{
	excerpt: string
}>()

const appConfig = useAppConfig()

const excerpt = ref(props.excerpt)
const caret = ref('')

if (appConfig.component.excerpt?.animation !== false) {
	// onBeforeMount(() => {
	excerpt.value = ''
	// })
	onMounted(async () => {
		caret.value = appConfig.component.excerpt?.caret ?? '_'
		for (const char of props.excerpt) {
			excerpt.value += char
			await delay(50)
		}
		caret.value = ''
	})
}

if (import.meta.dev) {
	watch(() => props.excerpt, (newExcerpt) => {
		excerpt.value = newExcerpt
	})
}
</script>

<template>
<div class="ai-excerpt md-excerpt">
	<div class="excerpt-header">
		<div class="excerpt-title">
			<span class="excerpt-icon">
				<Icon name="simple-icons:openai" class="ai-gpt-icon"/>
			</span>
			<span class="excerpt-label">
				智能摘要
			</span>
		</div>
		<div class="excerpt-badge">
			Post-Abstract-AI
		</div>
	</div>
	<div class="excerpt-content">
		{{ excerpt }}{{ caret }}
	</div>
	<!-- <Icon name="ph:highlighter-bold" />{{ excerpt }}{{ caret }} -->
</div>
</template>

<style lang="scss">
// 旧配置样式
// @keyframes fadein {
// 	from { opacity: 0; }
// 	to { opacity: 1; }
// }

// .md-excerpt {
// 	margin: 1rem;
// 	padding: 0.5rem;
// 	font-size: 0.9em;
// 	color: var(--c-text-2);

// 	// animation: fadein 3s;

// 	.iconify {
// 		margin-inline-end: 0.3em;
// 	}

// 	&:hover {
// 		color: currentcolor;
// 	}
// }

.ai-excerpt {
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  background: transparent;
  border: 1px solid var(--c-border);
  border-radius: .5em;
  padding: .8em;
  transition: transform .18s ease, background .18s ease, color .18s ease;
  --ai-pad-inline: .4em;
  --ai-icon-size: 1.1em;
  --ai-icon-gap: .22em;
  --ai-content-left: calc(var(--ai-pad-inline) + var(--ai-icon-size) + var(--ai-icon-gap));
	.excerpt-header {
    gap: 1em;
    justify-content: space-between;
    margin-bottom: .8em;
    padding: 0 .2em;
		align-items: center;
    display: flex;

		.excerpt-title {
			align-items: center;
			display: flex;
			.excerpt-icon {
				align-items: center;
				display: inline-flex;
				height: var(--ai-icon-size);
				justify-content: center;
				margin-right: var(--ai-icon-gap);
				width: var(--ai-icon-size);
				.ai-gpt-icon {
					color: var(--c-text-2);
					font-size: 1.1em;
					margin-top: 0;
				}
			}
			.excerpt-label {
				color: var(--c-text-1);
				font-size: .93em;
				font-weight: 700;
				margin-left: 0;
				vertical-align: middle;
				letter-spacing: .02em;
				margin-top: 0;
				font-family: var(--font-creative);
			}
		}
		.excerpt-badge {
			align-self: center;
			background: transparent;
			border-radius: 999px;
			color: var(--c-text-2);
			font-size: .82em;
			opacity: .9;
			padding: .06em .3em;
		}
	}
	.excerpt-content {
		background: var(--c-bg-2);
    border: 1px solid var(--c-border);
    border-radius: .4em;
    color: var(--c-text-2);
    font-family: var(--font-basic);
    font-size: 1em;
    line-height: 1.9;
    margin-top: 0;
    padding: .8em;
    text-align: left;
    transition: max-height .25s cubic-bezier(.4,0,.2,1);
    white-space: pre-line;
		@media (min-width: 900px) {
      max-height: none;
      overflow: visible;
		}
	}
}

.md-excerpt {
  color: var(--c-text-2);
  font-size: .9em;
  margin: .6rem .5rem;
  // padding: .25rem .4rem;
}
</style>
