const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = (req, res) => {
   let target = 'https://api.bilibili.com/';
   createProxyMiddleware({
       target,
       changeOrigin: true,
       pathRewrite: { '^/api/bilibili': '' },
   })(req, res);
};