// pages/api/proxy.js
import { URLSearchParams } from 'url';

export default async function handler(req, res) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    // 获取请求参数
    const params = new URLSearchParams(req.url.split('?')[1]);
    const path = params.get('path');
    const vmid = '3546572553980802';
    const bangumiType = '1';
    const cinemaType = '2';

    // 验证必填参数
    if (!path && !seasonId && !mediaId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // 构建目标URL
    let targetUrl = 'https://api.bilibili.com';

    if (seasonId) {
      targetUrl += `/x/space/bangumi/follow/list?vmid=${vmid}&type=${bangumiType}&pn=1&follow_status=0&limit=1`;
    } else if (mediaId) {
      targetUrl += `/x/space/bangumi/follow/list?vmid=${vmid}&type=${cinemaType}&pn=1&follow_status=0&limit=1`;
    } else {
      targetUrl += path.startsWith('/') ? path : `/${path}`;
    }

    // 添加请求头（可根据需要调整）
    const headers = {
      'User-Agent': 'Mozilla/5.0 (compatible; Vercel-Proxy/1.0)',
      'Referer': 'https://www.bilibili.com',
      ...req.headers
    };

    // 转发请求
    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: req.method === 'POST' ? req.body : undefined,
      cache: 'no-store'
    });

    // 处理响应
    const contentType = response.headers.get('content-type');
    const data = await response.text();

    if (contentType.includes('application/json')) {
      return res.status(response.status).json(JSON.parse(data));
    } else {
      return res.status(response.status).send(data);
    }

  } catch (error) {
    console.error('Proxy Error:', error);
    return res.status(500).json({ error: 'Proxy request failed' });
  }
}