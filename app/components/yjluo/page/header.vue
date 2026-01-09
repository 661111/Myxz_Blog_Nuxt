<template>
  <div class="page-banner">
    <div class="cover-wrapper">
      <NuxtImg :src="background" class="warpper-image" />
    </div>
    <div class="header-wrapper">
      <h3 class="title">{{ title }}</h3>
      <span class="desc">{{ desc }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  background: string
  title: string
  desc: string
}>()
</script>

<style lang="scss" scoped>
.page-banner {
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 1rem;
	.cover-wrapper {
    border-radius: 1rem;
    height: 300px;
    overflow: hidden;
    overflow: clip;
    position: relative;
		@media (max-width: 768px) {
			height: auto;
		}
		.warpper-image {
			height: 100%;
			-o-object-fit: cover;
			object-fit: cover;
			width: 100%;
		}
	}
  .header-wrapper {
    margin-top: 12px;
    padding: 0.8rem 1.3rem;
    border-radius: 1rem;
    background-color: var(--c-bg-2);
  }
}
</style>