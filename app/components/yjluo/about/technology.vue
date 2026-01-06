<script setup lang="ts">
import { about } from '~/about'
</script>

<template>
    <div class="author-content-item like-technology" v-for="(technologyItem, index) in about" :key="index">
        <div v-for="technology in technologyItem.technology" :key="technology.tip">
            <div class="card-content">
                <div class="author-content-item-tips">
                    {{ technology.tip }}
                </div>
                <span class="author-content-item-title">
                    {{ technology.title }}
                </span>
                <div class="content-bottom">
                    <div class="tips">
                        {{ technology.bottomTip }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* technology */
.author-content-item {
  &.like-technology {
    background: url(https://sourceimage.s3.bitiful.net/img/default_cover_25.avif) no-repeat;
    background-size: cover;
    min-height: 230px;
  }
  .author-content-item-tips {
    opacity: .8;
    font-size: .6rem;
    margin-bottom: .5rem;
  }
  .card-content {
    .author-content-item-title {
      margin-bottom: .5rem;
    }
  }
  .author-content-item-title {
    font-size: 36px;
    font-weight: 700;
    line-height: 1;
  }
  .content-bottom {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    min-height: 40px;
    .tips {
      max-width: calc(100% - 6rem);
      line-height: 1.2;
    }
  }
}

</style>