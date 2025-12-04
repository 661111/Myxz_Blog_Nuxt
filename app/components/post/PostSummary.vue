<style lang="scss">
  .post-TianliGPT {
    gap: 1em;
    justify-content: space-between;
    margin-bottom: .8em;
    padding: 0 .2em;
    .tianliGPT-title {
      align-items: center;
      display: flex;
      .tianliGPT-title-text {
        font-weight: bold;
        margin-left: 8px;
        line-height: 1;
      }
      .tianliGPT-title-icon {
        width: 24px;
        height: 24px;
        display: flex;
        background: var(--heo-lighttext);
        color: var(--heo-card-bg);
        font-size: 14px;
        border-radius: 20px;
        justify-content: center;
        align-items: center;
      }
    }

    .tianliGPT-explanation {
      margin-top: 12px;
      padding: 8px 12px;
      background: var(--heo-card-bg);
      border-radius: 8px;
      border: var(--style-border-always);
      font-size: 15px;
      line-height: 1.4;
      display: block;
      color: var(--heo-fontcolor);
    }

    .tianliGPT-suggestions {
      display: flex;
      flex-wrap: wrap;
      .tianliGPT-suggestions-item {
        margin-top: 12px;
        padding: 8px 12px;
        background: var(--heo-card-bg);
        border-radius: 8px 8px 8px 0;
        border: var(--style-border-always);
        font-size: 15px;
        line-height: 1.4;
        display: flex;
        width: fit-content;
        margin-right: 12px;
        cursor: pointer;
        transition: 0.3s;
        :hover {
          background: var(--heo-main);
          color: var(--heo-white);
        }
      }
    }
  }
</style>

<template>
<transition name="" tag="div">
  
</transition>
</template>