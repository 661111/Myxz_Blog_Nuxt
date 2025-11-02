<script setup lang="ts">
import type ArticleProps from '~/types/article'
const props = defineProps<ArticleProps>()

</script>

<template>
  <div class="l_cover wiki">
    <article class="cover-wrap md-text">
      <div class="preview cover">
        <NuxtImg class="post-cover" src="https://sourceimage.s3.bitiful.net/myxz.avif" :alt="title" />
      </div>
      <div class="cover-title">
        {{ props.title }}
      </div>
      <div class="description">
        {{ props.description }}
      </div>
    </article>
  </div>
</template>

<style lang="scss" scoped>
// 公用CSS
.md-text {
  max-width: 100%;
  color: var(--text-p1);
  line-height: 1.6;
  word-break: break-word;
  padding: 1rem;

  > div {
    margin: var(--gap-p) 0;
  }

  img {
    display: block;
    margin: auto;
  }
}
// 框架CSS
.l_cover {
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  .wiki .cover-wrap {
    max-width: 500px;
  }

  .cover-wrap {
    margin-bottom: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: var(--fsp);

    .preview {
      margin-bottom: 2rem;
      
      img {
        object-fit: contain;
        min-width: 96px;
        min-height: 96px;
        max-height: 35vh;
        max-width: 100%;
      }
    }

    .cover-title {
      font-weight: 700;
      font-size: 1.5rem;
      line-height: 1.2;
      color: var(--text);
      margin: 1rem 0px;
    }

    .description {
      margin: 1rem 0px;
    }
  }
}
</style>