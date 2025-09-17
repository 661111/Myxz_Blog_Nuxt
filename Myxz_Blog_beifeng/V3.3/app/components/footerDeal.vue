<script lang="ts" setup>
import { dealLeft, dealMiniLogo } from '~/deal.ts'
</script>

<template>
  <div id="footer_deal">
		<a class="deal_link" target="_blank" rel="noopener" :href="dealLeft.link" :title="dealLeft.name">
			<i :class="dealLeft.icon"></i>
		</a>
		<div class="nolazyload footer_mini_logo" id="footer_mini_logo" :title="dealMiniLogo.name" onclick="sco.toTop()">
			<img :src="dealMiniLogo.icon" :alt="dealMiniLogo.name">
		</div>
	</div>
</template>

<style lang="scss" scoped>
#footer_deal {
    justify-content: center;
    display: flex;
    padding-top: 2rem;
    align-items: center;

	#footer_deal .deal_link {
		display: flex;
		color: var(--efu-card-bg);
		width: 32px;
		height: 32px;
		justify-content: center;
		align-items: center;
		margin: 1rem 27px;
		border-radius: 3rem;
		background: var(--efu-fontcolor);
		transition: 0.3s;
		#footer_deal i {
			font-size: 0.8rem;
			line-height: 0.9rem;
			height: 0.9rem;
		}
	}

	#footer_deal .footer_mini_logo {
		width: 50px;
		height: 50px;
		cursor: pointer;
		user-select: none;
		margin: 0px 1rem;
		transition: 0.5s cubic-bezier(0, 0, 0, 1.29);
		border-radius: 50px;
		overflow: hidden;
	}
}
</style>