// sw.ts
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'

declare let self: ServiceWorkerGlobalScope

// 清理旧缓存
cleanupOutdatedCaches()

// 预缓存所有由Vite PWA插件生成的文件
precacheAndRoute(self.__WB_MANIFEST || [])

// 自定义缓存策略示例：图片缓存
registerRoute(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      {
        cacheWillUpdate: async ({ response }) => {
          // 只缓存状态码为200的响应
          return response.status === 200 ? response : null
        }
      }
    ]
  })
)

// 接收跳过等待消息
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
}) 