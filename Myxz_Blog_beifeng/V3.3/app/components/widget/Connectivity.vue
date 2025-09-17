<script setup lang="ts">
import type { CSSProperties } from 'vue'

const appConfig = useAppConfig()

const contentStyle = computed<CSSProperties>(() => ({
	'--seasonal-bg': appConfig.seasonal.widgetBackground
		? `url(${appConfig.seasonal.widgetBackground})`
		: undefined,
	'--seasonal-emoji': appConfig.seasonal.emoji,
}))
</script>

<template>
<ZWidget
	card
	title="可访问性"
	content-class="seasonal"
	:style="contentStyle"
>
    <!-- TODO: 优化技术架构展示 -->
    <p>
        🔗 域名 续费至2026年 <br>
        📑 博客 由 Nuxt Content 进行驱动 <br>
        📷 图片 托管于 缤纷云 <br>
    </p>
    <p>
        🀄️ 框架: Nuxt <br>
        🎴 加速: Vercel CDN <br>
        📷 图床: 缤纷云 <br>
    </p>
</ZWidget>
</template>

<style lang="scss" scoped>
.seasonal {
	position: relative;
	overflow: hidden;
	z-index: 0;

	&::before {
		content: "";
		position: absolute;
		opacity: 0.2;
		inset: 0;
		background: center / cover;
		background-image: var(--seasonal-bg);
		z-index: -1;
	}
}

.seasonal-emoji::before, .seasonal-emoji::after {
	// 文明用语😋
	content: var(--seasonal-emoji, "\1F595");
}
</style>
