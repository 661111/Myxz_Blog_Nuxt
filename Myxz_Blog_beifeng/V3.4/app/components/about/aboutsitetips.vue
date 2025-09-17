<script setup lang="ts">
import { about } from '../../about'
</script>

<template>
    <div class="aboutsiteTips author-content-item" v-for="(myinfo, index) in about" :key="index">
        <div v-for="(info, index) in myinfo.myinfo" :key="index">
            <div v-for="card in info.card" :key="card.tips">
                <div class="author-content-item-tips">
                    {{ card.tips }}
                </div>
                <h2>
                    {{ card.conect1 }}
                    <br />
                    {{ card.conect2 }}
                    <span class="inline-word">
                        {{ card.inlineword }}
                    </span>
                    <div class="mask" v-for="mask in card.mask" :key="mask.firstTips">
                        <span class="first-tips">
                            {{ mask.firstTips }}
                        </span>
                        <span>
                            {{ mask.span }}
                        </span>
                        <span data-up="data-up">
                            {{ mask.up }}
                        </span>
                        <span data-show="data-show">
                            {{ mask.show }}
                        </span>
                    </div>
                </h2>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* aboutsiteTips */
.author-content-item {
  &.aboutsiteTips {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    flex: 3;
  }
  .author-content-item-tips {
    opacity: .8;
    font-size: .6rem;
    margin-bottom: .5rem;
  }
}
.aboutsiteTips {
  h2 {
    margin-right: auto;
    font-size: 36px;
    font-family: Helvetica;
    line-height: 1.06;
    letter-spacing: -.02em;
    color: var(--heo-fontcolor);
    margin-top: 0;
  }
  .mask {
    height: 36px;
    position: relative;
    overflow: hidden;
    margin-top: 4px;
    span {
      display: block;
      box-sizing: border-box;
      position: absolute;
      top: 36px;
      padding-bottom: var(--offset);
      background-size: 100% 100%;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      background-repeat: no-repeat;
      &:nth-child(1) {
        background-image: linear-gradient(45deg,#0ecffe 50%,#07a6f1);
      }
      &:nth-child(2) {
        background-image: linear-gradient(45deg,#18e198 50%,#0ec15d);
      }
      &:nth-child(3) {
        background-image: linear-gradient(45deg,#8a7cfb 50%,#633e9c);
      }
      &:nth-child(4) {
        background-image: linear-gradient(45deg,#fa7671 50%,#f45f7f);
      }
    }
    span[data-show] {
      transform: translateY(-100%);
      transition: .5s transform ease-in-out;
    }
    span[data-up] {
      transform: translateY(-200%);
      transition: .5s transform ease-in-out;
    }
  }
}
</style>