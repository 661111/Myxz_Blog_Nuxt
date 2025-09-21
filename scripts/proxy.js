import { createProxyMiddleware } from 'http-proxy-middleware';

// 配置代理中间件
const proxy = createProxyMiddleware({
  target: 'https://api.bilibili.com',
  changeOrigin: true,
  pathFilter: ['/x/space/bangumi/follow/list'],
  onProxyReq: (proxyReq, req, res) => {
    // 可以在这里添加请求头，例如用户认证的Cookie（从你的后端环境变量获取）
    // 注意：不要将Cookie硬编码在代码中，应该使用环境变量
    proxyReq.setHeader('Cookie', process.env.BILIBILI_COOKIE || '');
  },
});

export default proxy;