<script lang="ts" setup >
import blogConfig from '~~/blog.config'
const footer_card_info = [{
    desc: '欢迎来到我的博客',
    link: '/about',
    link_button_name: '关于我的'
}]
</script>

<template lang="pug">
.FooterCard
  .head
    p.title {{ blogConfig.title }}
    p.desc(v-for="(info, index) in  footer_card_info" :key="index") {{ info.desc }}
  .footer
    .button_div
      a(v-for="(info, index) in  footer_card_info" :key="index" :href="info.link" target="_blank") {{ info.link_button_name }}
</template>

<style lang="css" scoped>
.FooterCard {
    text-align: center;
}
p.title {
    font-size: 1.2rem;
    font-weight: 900;
}
p.desc {
    font-size: 1rem;
}
.footer {
    margin-top: 1rem;
}
.button_div {
    padding: 0.5rem;
    background: hsla(184, 100%, 50%, 0.837);
    border-radius: 1rem;
    margin: 0 auto;
    max-width: 20%;
}
</style>