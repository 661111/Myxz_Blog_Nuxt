// plugins/meting-client.js
import { defineNuxtPlugin } from '#app'
import APlayer from 'aplayer'

export default defineNuxtPlugin((nuxtApp) => {
  // 定义客户端专用组件
  nuxtApp.vueApp.component('MetingPlayer', {
    props: {
      server: String,
      type: String,
      id: String,
      auto: Boolean,
      // 其他原有属性...
      lrcType: {
        type: Number,
        default: 3
      }
    },
    data() {
      return {
        player: null,
        songInfo: null
      }
    },
    mounted() {
      if (typeof window === 'undefined') return
      
      this.initPlayer()
    },
    methods: {
      async initPlayer() {
        try {
          // 优先使用服务端预取数据
          if (this.songInfo) {
            this.createPlayer(this.songInfo)
            return
          }

          // 客户端动态获取数据
          const response = await fetch(
            this.buildApiUrl()
          )
          const data = await response.json()
          this.createPlayer(data)
        } catch (error) {
          console.error('MetingJS 加载失败:', error)
        }
      },
      buildApiUrl() {
        return this.api
          .replace(':server', this.server)
          .replace(':type', this.type)
          .replace(':id', this.id)
          .replace(':auth', this.auth || '')
          .replace(':r', Math.random())
      },
      createPlayer(data) {
        const defaultOptions = {
          audio: data,
          mutex: true,
          lrcType: this.lrcType,
          storageName: 'metingjs'
        }

        // 合并自定义配置
        const options = {
          ...defaultOptions,
          ...this.$attrs
        }

        // 处理布尔值转换
        Object.keys(options).forEach(key => {
          if (options[key] === 'true' || options[key] === 'false') {
            options[key] = options[key] === 'true'
          }
        })

        this.player = new APlayer({
          container: this.$refs.playerContainer,
          ...options
        })
      }
    },
    beforeUnmount() {
      if (this.player) {
        this.player.destroy()
      }
    }
  })
})