// 定义缓存名称和版本缓存名称，以及最大访问缓存时间（单位：秒）
const CACHE_NAME = "苏晓河";
const VERSION_CACHE_NAME = "sxiaoheTime";
const MAX_ACCESS_CACHE_TIME = 345600;

// 获取当前时间戳的函数
function time() {
    return new Date().getTime();
}

// 数据库操作助手对象，包含读取、写入和删除缓存的方法
const dbHelper = {
    // 读取缓存的方法，返回一个 Promise
    read: (request) => new Promise((resolve) => {
        caches.match(request)
          .then((response) => {
                if (!response) {
                    resolve(null);
                } else {
                    response.text().then((data) => resolve(data));
                }
            })
          .catch(() => {
                resolve(null);
            });
    }),
    // 写入缓存的方法，返回一个 Promise
    write: (request, data) => new Promise((resolve, reject) => {
        caches.open("ChuckleTime")
          .then((cache) => {
                cache.put(request, new Response(data));
                resolve();
            })
          .catch(() => {
                reject();
            });
    }),
    // 删除缓存的方法
    delete: (request) => {
        caches.match(request)
          .then((response) => {
                if (response) {
                    caches.open("ChuckleTime").then((cache) => cache.delete(request));
                }
            });
    }
};

// 数据库时间操作对象，用于读取、写入和删除时间相关的缓存
const dbTime = {
    read: (key) => dbHelper.read(new Request(`https://LOCALCACHE/${encodeURIComponent(key)}`)),
    write: (key, data) => dbHelper.write(new Request(`https://LOCALCACHE/${encodeURIComponent(key)}`), data),
    delete: (key) => dbHelper.delete(new Request(`https://LOCALCACHE/${encodeURIComponent(key)}`))
};

// 数据库访问操作对象，用于更新访问时间和检查缓存是否过期
const dbAccess = {
    // 更新访问时间的方法
    update: (url) => dbHelper.write(new Request(`https://ACCESS-CACHE/${encodeURIComponent(url)}`), time()),
    // 检查缓存是否过期的方法，返回一个布尔值
    check: async (url) => {
        const request = new Request(`https://ACCESS-CACHE/${encodeURIComponent(url)}`);
        const lastAccessTime = await dbHelper.read(request);
        if (lastAccessTime) {
            dbHelper.delete(request);
            return time() - lastAccessTime < MAX_ACCESS_CACHE_TIME;
        }
        return false;
    }
};

// 安装事件监听器，跳过等待阶段
self.addEventListener("install", () => self.skipWaiting());

// 缓存列表对象，包含不同类型的缓存规则
const cacheList = {
    sxiaohecdn: {
        url: /(^(https:\/\/jsd\.myxz\.top)).*\.(css|html|webp|png|jpg|gif|ico|js|woff2|woff|ttf|json|svg)$/g,
        time: 31536000,
        clean: false
    },
    hyperos: {
        url: /(^(https:\/\/cdn-file\.hyperos\.mi\.com)).*\.(css|html|webp|png|jpg|gif|ico|js|woff2|woff|ttf|json|svg|avif)$/g,
        time: 31536000,
        clean: false
    },
    source_s3_bitful: {
        url: /(^(https:\/\/sourceimage\.s3\.bitiful\.net)).*\.(css|html|webp|png|jpg|gif|ico|js|woff2|woff|ttf|json|svg|avif)$/g,
        time: 31536000,
        clean: false
    },
    alfonts: {
        url: /(^(https:\/\/at\.alicdn\.com).*@\d.*)/g,
        time: 31536000,
        clean: false
    },
    fastly: {
        url: /(^(https:\/\/fastly\.jsdelivr\.net).*@\d.*)/g,
        time: 31536000,
        clean: false
    },
    resources: {
        url: /(^(https:\/\/www\.myxz\.top)).*\.(css|html|webp|png|jpg|gif|ico|js|woff2|woff|ttf|json|svg)$/g,
        time: 31536000,
        clean: false
    },
    myxz_site_blog: {
        url: /(^(https:\/\/blog\.myxz\.top)).*\.(css|html|webp|png|jpg|gif|ico|js|woff2|woff|ttf|json|svg)$/g,
        time: 31536000,
        clean: false
    }
};

// 替换列表对象，用于请求替换
const replaceList = {};

// 查找匹配的缓存规则的函数
function findCache(url) {
    for (const key in cacheList) {
        const rule = cacheList[key];
        if (url.match(rule.url)) {
            return rule;
        }
    }
    return null;
}

// 替换请求的函数，返回替换后的请求或 null
function replaceRequest(request) {
    let url = request.url;
    let replaced = false;
    for (const key in replaceList) {
        const rule = replaceList[key];
        for (const source of rule.source) {
            if (url.match(source)) {
                url = url.replace(source, rule.dist);
                replaced = true;
            }
        }
    }
    return replaced ? new Request(url) : null;
}

// 阻止请求的函数，返回布尔值
function blockRequest(request) {
    return false;
}

// 处理 fetch 事件的异步函数
async function fetchEvent(request, cachedResponse, cacheRule) {
    const currentTime = time();
    dbAccess.update(request.url);
    const cacheTime = cacheRule.time;
    let shouldFetch = false;

    if (cachedResponse) {
        const lastUpdatedTime = await dbTime.read(request.url);
        if (lastUpdatedTime && currentTime - lastUpdatedTime < cacheTime) {
            return cachedResponse;
        }
        shouldFetch = true;
    }

    const fetchResource = () => fetch(request)
      .then((response) => {
            dbTime.write(request.url, currentTime);
            if (response.ok || response.status === 0) {
                const clonedResponse = response.clone();
                caches.open("Chuckle").then((cache) => cache.put(request, clonedResponse));
            }
            return response;
        });

    return shouldFetch
      ? Promise.race([
            new Promise((resolve) => setTimeout(() => resolve(cachedResponse), 400)),
            fetchResource()
        ]).catch((error) => {
            console.error(`不可达的链接：${request.url}\n错误信息：${error}`);
        })
      : fetchResource();
}

// fetch 事件监听器，处理请求
self.addEventListener("fetch", async (event) => {
    const replacedRequest = replaceRequest(event.request);
    const finalRequest = replacedRequest || event.request;
    const cacheRule = findCache(finalRequest.url);

    if (blockRequest(finalRequest)) {
        event.respondWith(new Response(null, { status: 204 }));
    } else if (cacheRule) {
        event.respondWith(
            caches.match(finalRequest).then(async (cachedResponse) => {
                return fetchEvent(finalRequest, cachedResponse, cacheRule);
            })
        );
    } else if (replacedRequest) {
        event.respondWith(fetch(finalRequest));
    }
});

// message 事件监听器，处理刷新消息
self.addEventListener("message", (event) => {
    if (event.data === "refresh") {
        caches.open("Chuckle").then((cache) => {
            cache.keys().then((requests) => {
                requests.forEach((request) => {
                    const cacheRule = findCache(request.url);
                    if (!cacheRule || (cacheRule.clean &&!dbAccess.check(request.url))) {
                        cache.delete(request);
                        dbTime.delete(request);
                    }
                });
                event.source.postMessage("success");
            });
        });
    }
});

// 缓存列表数组
let cachelist = [];

// 安装事件监听器，打开缓存并添加缓存列表中的资源
self.addEventListener("install", async (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open("Chuckle").then((cache) => {
            console.log("Opened cache");
            return cache.addAll(cachelist);
        })
    );
});

// CDN 配置对象，包含不同类型的 CDN 地址
const cdn = {
    gh: {
        jsdelivr: { url: "https://jsdelivr.pai233.top/gh" },
        tianli: { url: "https://cdn1.tianli0.top/gh" },
        fastly: { url: "https://fastly.jsdelivr.net/gh" },
        sxiaohe: { url: "https://jsd.sxiaohe.top/gh" }
    },
    combine: {
        jsdelivr: { url: "https://jsdelivr.pai233.top/combine" },
        tianli: { url: "https://cdn1.tianli0.top/combine" },
        jsdelivr_fastly: { url: "https://fastly.jsdelivr.net/combine" }
    },
    npm: {
        eleme: { url: "https://npm.elemecdn.com" },
        pai: { url: "https://jsdelivr.pai233.top/npm" },
        zhimg: { url: "https://unpkg.zhimg.com" },
        unpkg: { url: "https://unpkg.com" },
        tianli: { url: "https://cdn1.tianli0.top/npm" },
        fastly: { url: "https://fastly.jsdelivr.net/npm" },
        sxiaohe: { url: "https://jsd.sxiaohe.top/npm" }
    }
};

// 处理错误响应的异步函数
const handleerr = async (request, error) => new Response(`<h1>CDN分流器遇到了致命错误</h1>\n      <b>${error}</b>`, {
    headers: { "content-type": "text/html; charset=utf-8" }
});

// 处理请求的异步函数
const handle = async function (request) {
    const url = request.url;
    const domain = url.split("/")[2];
    let alternatives = [];

    for (const category in cdn) {
        for (const key in cdn[category]) {
            if (domain === cdn[category][key].url.split("https://")[1].split("/")[0] && url.match(cdn[category][key].url)) {
                alternatives = [];
                for (const altKey in cdn[category]) {
                    alternatives.push(url.replace(cdn[category][key].url, cdn[category][altKey].url));
                }
                return url.indexOf("@latest/") > -1
                 ? lfetch(alternatives, url)
                  : caches.match(request).then((cachedResponse) => {
                        return cachedResponse || lfetch(alternatives, url).then((response) => {
                            return caches.open("Chuckle").then((cache) => {
                                cache.put(request, response.clone());
                                return response;
                            });
                        });
                    });
            }
        }
    }
    return fetch(request);
};

// 并行请求多个 URL 的异步函数
const lfetch = async (urls, originalUrl) => {
    let abortController = new AbortController();
    const createResponse = async (response) => new Response(await response.arrayBuffer(), {
        status: response.status,
        headers: response.headers
    });

    if (!Promise.any) {
        Promise.any = function (promises) {
            return new Promise((resolve, reject) => {
                let remaining = promises.length;
                let errors = [];
                if (remaining === 0) {
                    return reject(new AggregateError("All promises were rejected"));
                }
                promises.forEach((promise) => {
                    promise.then((value) => {
                        resolve(value);
                    }).catch((error) => {
                        remaining--;
                        errors.push(error);
                        if (remaining === 0) {
                            reject(new AggregateError(errors));
                        }
                    });
                });
            });
        };
    }

    return Promise.any(
        urls.map((url) =>
            new Promise((resolve, reject) => {
                fetch(url, { signal: abortController.signal })
                  .then(createResponse)
                  .then((response) => {
                        if (response.status === 200) {
                            abortController.abort();
                            resolve(response);
                        } else {
                            reject(response);
                        }
                    });
            })
        )
    );
};