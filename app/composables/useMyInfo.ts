// composables/useSiteConfig.ts
export default function () {
  // 现在 useAppConfig() 在组合式函数内调用，上下文正确
  const appConfig = useAppConfig()

  // 返回你的配置对象
  return [{
    标题一: "你好，很高兴认识你👋",
    标题二: "我叫",
    博主名称: appConfig.author?.name || "未填入名称", // 使用可选链操作符更安全
    内容一: "是一名 前端工程师、学生、",
    内容二: "博主",
    卡片: [{
      标题: "追求",
      内容一: "源于",
      内容二: "热爱而去",
      显示: "感受",
      轮播: [{
        第一: "学习",
        第二: "生活",
        第三: "程序",
        第四: "体验",
      }]
    }]
  }]
}