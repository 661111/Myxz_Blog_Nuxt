<script setup lang="ts">
import { about } from '~/about'

const appConfig = useAppConfig()
</script>

<template>
    <div class="author-main" v-for="(aboutItem, aboutIndex) in about" :key="aboutIndex">
        <div id="author-main" v-for="(author, authorIndex) in aboutItem.author":key="authorIndex">
            <div class="author-tag-left" v-for="left in author.left" :key="left.tag1">
                <span class="author-tag">{{ left.tag1 }}</span>
                <span class="author-tag">{{ left.tag2 }}</span>
                <span class="author-tag">{{ left.tag3 }}</span>
                <span class="author-tag">{{ left.tag4 }}</span>
            </div>
            <div class="mainports" style="margin: 0 20px;">
                <!-- <NuxtImg :src="appConfig.header" class="avatarFrame" alt="头像框占位"/> -->
                <div class="author-box" style="z-index:0">
                    <div class="author-img">
                        <img class="no-lightbox" :src="author.logo" style="width: 180px;">
                    </div>
                </div>
            </div>
            <div class="author-tag-right" v-for="right in author.right" :key="right.tag1">
                <span class="author-tag">{{ right.tag1 }}</span>
                <span class="author-tag">{{ right.tag2 }}</span>
                <span class="author-tag">{{ right.tag3 }}</span>
                <span class="author-tag">{{ right.tag4 }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.avatarFrame {
  position: absolute;
  top: 3px;
  transform: scale(1.3);
  width: 180px;
  z-index: 1;
}
/* author */
#author-main {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -o-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  margin: 0 0 16px 0;
  user-select: none;
}
.author-box {
  position: relative;
  width: 180px;
  height: 180px;
  background: rgba(253, 253, 253, .8);
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    position: absolute;
    inset: 5px;
    border-radius: 50%;
    background: rgba(253, 253, 253, .8);
    z-index: 1;
  }
}
.author-info {
  display: flex;
  align-items: center;
  margin: 0 0 16px 0;
}
.author-tag-left {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.author-tag-left .author-tag:first-child, .author-tag-left .author-tag:last-child {
  margin-right: -16px;
}
.author-tag-right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.author-tag {
  transform: translate(0, -4px);
  padding: 1px 8px;
  background: var(--heo-card-bg);
  border: var(--style-border-always);
  border-radius: 40px;
  margin-top: 6px;
  font-size: 14px;
  font-weight: 700;
  box-shadow: var(--heo-shadow-lightblack);
  animation: 6s ease-in-out 0s infinite normal none running floating;
  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: .6s;
  }
  &:nth-child(3) {
    animation-delay: 1.2s;
  }
  &:nth-child(4) {
    animation-delay: 1.8s;
  }
}
.author-img {
  margin: 0 30px;
  border-radius: 50%;
  width: 180px;
  height: 180px;
  position: relative;
  background: var(--heo-secondbg);
  user-select: none;
  transition: .3s;
  #lottie_avatar {
    border-radius: 200px;
    overflow: hidden;
    width: 180px;
    height: 180px;
  }
}

</style>