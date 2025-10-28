<script setup lang="ts">
import type { VideoItem } from '../../../types/discovery'
</script>

<template lang="pug">
  ul.row-video
    li.row-video-card(v-for="(video, index) in VideoItem" :key="index")
      .video-card
        a(herf=`'https://www.bilibili.com/video/'${Video.bvid}`)
          .video-card-inner
            .card-image
              .relative.w-full.h-full
                .relative.w-full.h-full
                  img.w-full.h-full.object-cover.opacity-100(:src="Video.pic")
            .card-title
              .flex.flex-col.justify-center
                .m-0.mt-2.text-sm.line-clamp-2 {{ video.title }}
                .mt-2.flex.justify-between.font-light
                  .text-sm.opacity-80 {{ video.date }}
                  .flex.items-center
                    .text-sm.opacity-80 {{ video.play }}
</template>