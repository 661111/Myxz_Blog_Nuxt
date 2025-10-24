// middleware/retryBiliApi.js
export default function ({ $axios, route }) {
  // 仅针对哔哩哔哩 API 路径生效（根据实际 API 前缀调整）
  const biliApiPrefix = '/api/bili'; // 示例前缀，替换为你的实际 API 路径

  if (route.path.startsWith(biliApiPrefix)) {
    // 为当前请求添加重试逻辑
    return new Promise((resolve, reject) => {
      let retryCount = 0;
      const maxRetries = 3; // 最大重试次数
      const retryDelay = 1000; // 重试间隔（毫秒）

      const sendRequest = () => {
        $axios.$get(route.fullPath) // 替换为你的实际请求方法（如 post、put 等）
          .then(resolve)
          .catch((error) => {
            if (
              error.response?.status === 502 && 
              retryCount < maxRetries
            ) {
              retryCount++;
              setTimeout(sendRequest, retryDelay);
            } else {
              reject(error); // 超过重试次数或非 502 错误，抛出异常
            }
          });
      };

      sendRequest();
    });
  }

  // 非哔哩哔哩 API 直接放行
  return Promise.resolve();
}