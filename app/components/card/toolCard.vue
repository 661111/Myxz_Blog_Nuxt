<script setup lang="ts">
import type ArticleProps from '~/types/article'
const props = defineProps<{ useUpdated?: boolean } & ArticleProps>()
const appConfig = useAppConfig()
const showAllDate = isTimeDiffSignificant(props.date, props.updated)
const categoryLabel = computed(() => props.categories?.[0])
const categoryColor = computed(() => appConfig.article.categories[categoryLabel.value!]?.color)
const categoryIcon = computed(() => getCategoryIcon(categoryLabel.value))
</script>

<template>
  <ZRawLink class="CardMain">
    <div class="header">
      <div class="icon" :style="`background-image: url(${image})`"></div>
      <div class="content">
        <div class="name">{{ title }}</div>
      </div>
    </div>

    <div class="body">
      <div class="descMain">
        <div class="line">
          <div class="desc">
            {{ description }}
          </div>
        </div>
      </div>
      <div class="button">
        <div class="left">
          <Icon name="ph:calendar-dots-bold" class="dateIcon" />
          {{ getPostDate(date) }}
        </div>
        <div class="right">
          <span> 获取 </span>
        </div>
      </div>
    </div>
  </ZRawLink>
</template>

<style lang="scss" scoped>
.CardMain {
  display: block;
  cursor: pointer;
  margin: 0 10px 20px 10px;
  background: #fff;
  border: 1px solid #dee0e3;
  border-radius: 6px;
  overflow: hidden;
  .header {
    position: relative;
    margin: 12px 16px 0;
    height: 54px;

    .icon {
      position: absolute;
      left: 0;
      top: 0;
      height: 54px;
      width: 54px;
      border-radius: 6px;
      background-color: #f5f5f5;
      background-size: 80%;
      background-position: center;
      background-repeat: no-repeat;
      overflow: hidden;
      :before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border: 1px solid rgba(0, 0, 0, .1);
        border-radius: 6px;
      }
    }
    .content {
      margin-left: 66px;
      position: relative;
      line-height: 24px;
      color: #1f2329;
      height: 48px;

      .name, .test {
        font-size: 16px;
        font-weight: 600;
        color: #606060;
        padding-right: 7px;
        display: block;
        max-width: 260px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }

  .body {
    position: relative;
    margin-left: 16px;
    margin-right: 16px;
    .descMain {
      position: relative;
      margin-top: 10px;
      height: 36px;
      color: #646a73;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .line {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        .desc {
          display: inline-block;
          position: relative;
          max-width: 100%;
        }
      }
    }
    .button {
      margin-top: 10px;
      margin-bottom: 10px;
      height: 24px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        font-size: 13px;
        color: #757575;
        margin-left: -10px;

        .dateIcon {
          width: 14px;
          height: 14px;
          fill: #757575;
          margin: 0 5px 0 10px;
        }
      }

      .right {
        position: relative;
        display: inline-block;
        height: 24px;
        min-width: 60px;
        padding: 0 12px;
        font-size: 14px;
        color: #0dce9e;
        line-height: 22px;
        text-align: center;
        border: 1px solid #0dce9e;
        border-radius: 12px;
        float: right;
      }
    }
  }
}
</style>