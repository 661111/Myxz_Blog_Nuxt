<script lang="ts" setup>
const rewardInfo = ref({
	titleInfo: "感谢你赐予我前进的力量",
  shoukuan: {
    微信: "https://oss.hlcode.cn/server/2025/12/09/8va1765275351031.png",
    支付宝: "https://oss.hlcode.cn/server/2025/12/09/8va1765275351031.png",
  },
  link: "/"
})
</script>

<template>
  <span class="reward-title">
    {{ rewardInfo.titleInfo }}
  </span>
  <ul class="reward-group">
    <li class="reward-item" v-for="([key, value]) in Object.entries(rewardInfo.shoukuan ?? {})" :key="key">
      <ZRawLink :to="value" target="_blank" class="reward-image-url">
        <NuxtImg :src="value" class="reward-image"></NuxtImg>
      </ZRawLink>
      <div class="reward-desc">
        {{ key }}
      </div>
    </li>
  </ul>
  <ZRawLink :to="rewardInfo.link" target="_blank" class="reward-all-info">
    <div class="reward-all-info-text">赞赏者名单</div>
    <div class="reward-all-info-desc">因为你们的支持让我意识到写文章的价值🙏</div>
  </ZRawLink>
</template>

<style lang="scss">
.reward-title {
  font-weight: 700;
  color: var(--heo-red);
}
.reward-group {
  display: flex;
  margin-top: .5rem;
  .reward-item {
    display: inline-block;
    padding: 0 8px;
    list-style-type: none;
    vertical-align: top;
    :first-child {
      .reward-image-url {
        .reward-image {
          border-color: var(--heo-green);
          --heo-green: #3e9f50;
          box-shadow: var(--heo-shadow-lightblack);
          border-radius: 12px;
          border: var(--style-border-always);
        }
      }
    }
    :first-child {
      .reward-image-url {
        .reward-image {
          border-color: var(--heo-blue);
          --heo-blue: #425AEF;
          box-shadow: var(--heo-shadow-lightblack);
          border-radius: 12px;
          border: var(--style-border-always);
        }
      }
    }

    .reward-image-url {
      background-color: transparent;
      color: var(--heo-fontcolor);
      text-decoration: none;
      transition: all .3s ease-out 0s;
      overflow-wrap: break-word;
      -webkit-user-drag: none;
      .reward-image {
        width: 130px;
        height: 130px;
        border-radius: 8px;
      }
    }
    .reward-desc {
      padding-top: 0;
      margin-top: -8px;
      width: 130px;
      color: #858585;
      flex-direction: column;
      display: flex;
      align-items: center;
    }
  }
}

.reward-all-info {
  background: var(--heo-secondbg);
  color: var(--heo-fontcolor);
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 10px 30px;
  border: var(--style-border-always);
  margin: 8px;
  width: calc(100% - 16px);
  &:hover {
    color: var(--heo-white);
    background: var(--heo-red);
    background-image: url(https://myxzblog.cn-nb1.rains3.com/JgNrST23690481619450556342.avif);
    box-shadow: var(--heo-shadow-red);
    border-color: var(--heo-red);
  }
  .reward-all-info-text {
    margin-bottom: 0;
    font-weight: 700;
    align-items: center;
    flex-direction: column;
    display: flex;
    font-size: 1rem;
  }
  .reward-all-info-desc {
    font-size: 0.78rem;
    align-items: center;
    flex-direction: column;
    display: flex;
  }
}
</style>