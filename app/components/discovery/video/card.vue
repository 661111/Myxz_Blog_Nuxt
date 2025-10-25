<script setup lang="ts">
import { VideoApiResponse, VideoItem } from '../../../types/discovery'
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
</template>