export default async function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  try {
    // 解析请求路径和参数
    const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const path = req.query['*'] || '';
    
    // 构造 B 站 API URL
    const biliUrl = `https://api.bilibili.com${path}?${searchParams.toString()}`;
    
    // 转发请求到 B 站 API
    const response = await fetch(biliUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        'Host': 'api.bilibili.com',
        'Referer': 'https://www.bilibili.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      body: req.method !== 'GET' ? req.body : undefined
    });

    if (!response.ok) {
      throw new Error(`Bilibili API error: ${response.status}`);
    }

    // 返回 B 站 API 响应
    const data = await response.json();
    res.status(200).json(data);
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      code: -412,
      message: '代理请求失败: ' + error.message 
    });
  }
}