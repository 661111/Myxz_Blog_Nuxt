<script setup lang="ts">
import { LazyPopoverLightbox } from '#components'
import ArtalkManager from '~/utils/artalk-manager'

const appConfig = useAppConfig()
const route = useRoute()
const colorMode = useColorMode()

const artalkManager = ArtalkManager.getInstance()
const popoverStore = usePopoverStore()

// KaTeX 加载状态管理
const katexState = ref<{
  loaded: boolean
  loading: boolean
  error: boolean
}>({
  loaded: false,
  loading: false,
  error: false,
})

// KaTeX 类型声明
declare global {
  interface Window {
    katex?: {
      renderToString: (tex: string, options?: {
        displayMode?: boolean
        throwOnError?: boolean
        errorColor?: string
      }) => string
    }
  }
}

// 动态加载 KaTeX 脚本（优化版）
async function loadKaTeX() {
  // SSG 环境检测
  if (import.meta.server) return null

  // 已加载检查
  if (katexState.value.loaded && window.katex) {
    return window.katex
  }

  // 正在加载中，等待完成
  if (katexState.value.loading) {
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (katexState.value.loaded && window.katex) {
          clearInterval(checkInterval)
          resolve(window.katex)
        }
      }, 100)
      
      // 超时保护
      setTimeout(() => {
        clearInterval(checkInterval)
        resolve(null)
      }, 5000)
    })
  }

  katexState.value.loading = true

  try {
    // 检查是否已存在 script 标签
    const existingScript = document.querySelector('script[src*="katex"]')
    
    if (existingScript) {
      return new Promise((resolve, reject) => {
        if (window.katex) {
          katexState.value.loaded = true
          katexState.value.loading = false
          resolve(window.katex)
          return
        }
        
        existingScript.addEventListener('load', () => {
          katexState.value.loaded = true
          katexState.value.loading = false
          resolve(window.katex)
        })
        
        existingScript.addEventListener('error', () => {
          katexState.value.error = true
          katexState.value.loading = false
          reject(new Error('KaTeX script load failed'))
        })
      })
    }

    // 创建新 script 标签
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://lib.baomitu.com/KaTeX/0.16.9/katex.min.js'
      script.async = true
      script.defer = true
      
      script.onload = () => {
        katexState.value.loaded = true
        katexState.value.loading = false
        resolve(window.katex)
      }
      
      script.onerror = () => {
        katexState.value.error = true
        katexState.value.loading = false
        console.error('KaTeX script failed to load')
        reject(new Error('KaTeX script load failed'))
      }
      
      document.head.appendChild(script)
    })
  }
  catch (error) {
    katexState.value.error = true
    katexState.value.loading = false
    console.error('Failed to load KaTeX:', error)
    return null
  }
}

// KaTeX 渲染函数（优化版）
async function renderMathInComments() {
  if (import.meta.server) return

  try {
    const katex = await loadKaTeX()
    if (!katex) {
      console.warn('KaTeX not available')
      return
    }

    const commentElements = document.querySelectorAll('#artalk .atk-content:not(.math-processed)')
    
    if (commentElements.length === 0) return

    commentElements.forEach((element: Element) => {
      element.classList.add('math-processed')

      const originalContent = element.innerHTML
      let content = originalContent

      // 渲染块级公式 $$...$$
      content = content.replace(/\$\$([^$]+?)\$\$/g, (match, formula) => {
        try {
          const rendered = global.window.katex?.renderToString(formula.trim(), {
            displayMode: true,
            throwOnError: false,
            errorColor: '#cc0000',
          })
          return `<span class="math-display">${rendered}</span>`
        }
        catch (e) {
          console.warn('KaTeX display render error:', e, formula)
          return match
        }
      })

      // 渲染行内公式 $...$（避免重复渲染已处理的内容）
      content = content.replace(/\$([^$\n]+?)\$/g, (match, formula) => {
        // 跳过已经渲染的 math 标签
        if (/<span class="math-/.test(match)) {
          return match
        }
        
        try {
          const rendered = global.window.katex?.renderToString(formula.trim(), {
            displayMode: false,
            throwOnError: false,
            errorColor: '#cc0000',
          })
          return `<span class="math-inline">${rendered}</span>`
        }
        catch (e) {
          console.warn('KaTeX inline render error:', e, formula)
          return match
        }
      })

      // 渲染代码块公式 ```math...```
      content = content.replace(/```math\s*([\s\S]*?)```/g, (match, formula) => {
        try {
          const rendered = global.window.katex?.renderToString(formula.trim(), {
            displayMode: true,
            throwOnError: false,
            errorColor: '#cc0000',
          })
          return `<div class="math-block">${rendered}</div>`
        }
        catch (e) {
          console.warn('KaTeX math block render error:', e, formula)
          return match
        }
      })

      // 只在内容真正改变时更新 DOM
      if (content !== originalContent) {
        element.innerHTML = content
      }
    })
  }
  catch (error) {
    console.error('Failed to render math:', error)
    
    // 失败重试（最多 3 次）
    if (!katexState.value.error) {
      setTimeout(() => renderMathInComments(), 1500)
    }
  }
}

// 为评论区图片添加灯箱功能
function addLightboxToImages() {
  if (import.meta.server) return

  const commentImages = document.querySelectorAll('#artalk .atk-content img:not(.lightbox-processed)')
  
  commentImages.forEach((img: Element) => {
    const imgElement = img as HTMLImageElement
    imgElement.classList.add('lightbox-processed')
    imgElement.style.cursor = 'zoom-in'
    
    // 使用 addEventListener 替代重复绑定
    imgElement.addEventListener('click', handleImageClick, { once: false })
  })
}

function handleImageClick(event: Event) {
  const imgElement = event.currentTarget as HTMLImageElement
  const { open } = popoverStore.use(() => h(LazyPopoverLightbox, {
    el: imgElement,
  }))
  open()
}

let commentObserver: MutationObserver | null = null
let renderMathTimer: ReturnType<typeof setTimeout> | null = null
let lightboxTimer: ReturnType<typeof setTimeout> | null = null

// 监听评论区变化（优化防抖）
function watchCommentChanges() {
  if (import.meta.server) return

  const artalkContainer = document.getElementById('artalk')
  if (!artalkContainer) return

  // 清理旧的观察器
  if (commentObserver) {
    commentObserver.disconnect()
  }

  commentObserver = new MutationObserver((mutations) => {
    let shouldUpdateImages = false
    let shouldRenderMath = false

    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element
            
            if (element.tagName === 'IMG' || element.querySelector('img')) {
              shouldUpdateImages = true
            }
            
            if (element.classList?.contains('atk-content') || element.querySelector('.atk-content')) {
              shouldRenderMath = true
            }
          }
        })
      }
    })

    // 防抖处理
    if (shouldUpdateImages) {
      if (lightboxTimer) clearTimeout(lightboxTimer)
      lightboxTimer = setTimeout(() => addLightboxToImages(), 150)
    }

    if (shouldRenderMath) {
      if (renderMathTimer) clearTimeout(renderMathTimer)
      renderMathTimer = setTimeout(() => renderMathInComments(), 300)
    }
  })

  commentObserver.observe(artalkContainer, {
    childList: true,
    subtree: true,
  })
}

// 初始化 Artalk
async function initArtalk() {
  if (import.meta.server) return

  try {
    await artalkManager.init({
      el: '#artalk',
      pageKey: route.path,
      pageTitle: document.title.replace(` | ${appConfig.title}`, ''),
      server: appConfig.artalk?.server,
      site: appConfig.artalk?.sitename,
      emoticons: appConfig.artalk?.owo_src,
      darkMode: colorMode.value === 'dark',
    })

    // 等待 DOM 更新
    await nextTick()

    // 初始化灯箱和数学公式渲染
    setTimeout(() => {
      addLightboxToImages()
      renderMathInComments()
      watchCommentChanges()
    }, 300)
  }
  catch (error) {
    console.error('评论系统初始化失败:', error)
  }
}

// 清理函数
function cleanup() {
  if (commentObserver) {
    commentObserver.disconnect()
    commentObserver = null
  }
  
  if (renderMathTimer) {
    clearTimeout(renderMathTimer)
    renderMathTimer = null
  }
  
  if (lightboxTimer) {
    clearTimeout(lightboxTimer)
    lightboxTimer = null
  }
}

// 生命周期
onMounted(() => {
  if (import.meta.client) {
    // 预加载 KaTeX CSS
    import('~/assets/css/katex.min.css')
    
    // 初始化 Artalk
    nextTick(() => {
      setTimeout(initArtalk, 100)
    })
  }
})

// 监听路由变化
watch(() => route.path, () => {
  cleanup()
  nextTick(() => {
    setTimeout(initArtalk, 100)
  })
})

// 监听颜色模式变化
watch(() => colorMode.value, (newMode) => {
  artalkManager.setDarkMode(newMode === 'dark')
})

// 卸载时清理
onUnmounted(() => {
  cleanup()
})
</script>

<template>
  <section class="z-comment">
    <h3 class="text-creative">
      <div class="comment-tip">评论</div>
    </h3>
    <div class="commentCard">
      <div id="artalk">
        <p class="loading-box">
          <Icon name="line-md:loading-twotone-loop" class="loading-img" />评论加载中...
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.z-comment {
  margin: 3rem 0.5rem;

  > h3 {
    margin-top: 3rem;
    margin-left: 0.2rem;
    font-size: 1.25rem;
  }
}
.text-creative {
  display: flex;
  
  > .comment-tip{
    font-size: 1.45rem;
    margin-right: 0.8rem;
    margin-bottom: 1rem;
  }
  > .comment-nav {
    font-size: 1.45rem;
    margin-right: 0.8rem;
    margin-bottom: 1rem;
  }
}
.comment-tip{
  font-size: 1.45rem;
  margin-right: 0.8rem;
}
#artalk {
  .loading-box{
    text-align: center;
    font-size: 1.1rem;
    .loading-img{
      margin-right: 0.6rem;
    }
  }
  margin-top: 1rem;

  .atk-main-editor {
    border-radius: 0.8rem !important;
    background-color: var(--ld-bg-card);
    box-shadow: 0 0.1em 0.2em var(--ld-shadow);
    border:none !important;
    transition: all 0.2s ease;
    &:hover{
      box-shadow: 0 0.5em 1em var(--ld-shadow);
      transform: translateY(-2px);
    }
  }
  .atk-textarea{
    background-color: var(--ld-bg-card);
  }

  .atk-send-btn {
    background-color: var(--c-primary) !important;
    border-radius: 16px !important;
    transition: all 0.2s;
  }

  .atk-comment-wrap {
    margin: 0.6rem 0;
    background-color: var(--ld-bg-card);;
    border-radius: 0.8rem;
    box-shadow: 0 0.1em 0.2em var(--ld-shadow);
  }

  .atk-comment-wrap .atk-comment {
    padding: 10px;
  }

  .atk-comment-children > .atk-comment-wrap {
    margin: 10px 0 0 0;
    background-color: transparent;
    border-radius: 0;
    box-shadow: none;
  }

  .atk-comment > .atk-avatar img {
    border-radius: 50% !important;
  }

  .atk-nick a {
    font-size: 0.9rem !important;
    color: var(--c-brand) !important;
  }

  .atk-reply-at > .atk-nick {
    font-size: 0.8rem !important;
    color: var(--c-brand) !important;
  }

  .atk-comment > .atk-main > .atk-header {
    padding-top: 5px;
  }

  .atk-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }

  .atk-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 4px;
  }

  .atk-common-action-btn, .atk-actions span {
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }

  .atk-dropdown {
    list-style: none !important;
    margin: 0 !important;
    padding: 0 !important;

    .atk-dropdown-item {
      list-style: none !important;
      margin: 0 !important;
      padding: 8px 12px !important;

      span{
        padding: 0 1rem !important;
      }
      &::marker {
        display: none !important;
      }

      &::before {
        display: none !important;
      }
    }
  }

  @media (max-width: 576px) {
    .atk-comment-wrap {
      margin: 12px 0;
    }

    .atk-comment-wrap .atk-comment {
      padding: 12px;
    }
  }

  .dark & {
    .atk-comment-wrap {
      background-color: var(--c-bg-2);
    }

    .atk-main-editor {
      background-color: var(--c-bg-2) !important;
      box-shadow: 0 0.1em 0.2em var(--ld-shadow);
      color: var(--c-text-1) !important;
      border:none !important;
    }

    .atk-content p {
      color: var(--c-text-1) !important;
      font-size: 0.9rem !important;
    }

    .atk-nick a {
      color: var(--c-brand-light) !important;
    }

    .atk-reply-at > .atk-nick {
      color: var(--c-brand-light) !important;
    }
  }

  .atk-time {
    color: var(--c-text-3);
  }

  .atk-content {
    margin-top: 0.1rem;

    img {
      border-radius: 0.5em;
    }
  }

  .atk-nick {
    font-family: var(--font-basic);
    font-weight: bold;
  }

  pre {
    border-radius: 0.5rem;
    font-size: 0.8125rem;
  }

  p {
    margin: 0.2em 0;
  }

  .atk-emotion {
    width: auto;
    height: 1.4em;
    vertical-align: text-bottom;
  }

  /* KaTeX math rendering styles */
  .math-block {
    margin: 1rem 0;
    text-align: center;
    overflow-x: auto;
  }

  .katex {
    font-size: 1.1em;
  }

  .katex-display {
    margin: 1rem 0;
    text-align: center;
  }

  menu, ol, ul:not(.atk-dropdown) {
    margin: 0.5em 0;
    padding: 0 0 0 1.5em;
    list-style: revert;

    > li {
      margin: 0.2em 0;

      &::marker {
        font-size: 0.8em;
        color: var(--c-primary);
      }
    }
  }

  blockquote {
    margin: 0.5em 0;
    padding: 1.2rem;
    border-left: 4px solid var(--c-border);
    border-radius: 4px;
    background-color: var(--c-bg-2);
    font-size: 0.9rem;

    > .z-codeblock {
      margin: 0 -0.8rem;
    }
  }
}
</style>