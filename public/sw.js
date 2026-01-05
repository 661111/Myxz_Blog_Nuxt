const CACHE_VERSION = 'v1767606123828';
const CACHE_PREFIX = 'nuxt-ssg-cache';

const CACHE_CONFIG = {
  css: {
    name: `${CACHE_PREFIX}-css-${CACHE_VERSION}`,
    patterns: [
      /\/fonts\/.*\.css$/,
      /\/_nuxt\/.*\.css$/,
      /\/lxgw-wenkai-screen-webfont\/.*\.css$/,
    ],
    strategy: 'CacheFirst'
  },
  fonts: {
    name: `${CACHE_PREFIX}-fonts-${CACHE_VERSION}`,
    patterns: [/\.woff2?$/, /\.ttf$/, /\.otf$/, /\/fonts\//, /\/lxgw-wenkai-screen-webfont\//],
    strategy: 'CacheFirst'
  },
  pages: {
    name: `${CACHE_PREFIX}-pages-${CACHE_VERSION}`,
    patterns: [/\.html$/, /^\/$/, /^\/[^.]*$/],
    strategy: 'NetworkFirst'
  },
  assets: {
    name: `${CACHE_PREFIX}-assets-${CACHE_VERSION}`,
    patterns: [/\/_nuxt\/.*\.(js|mjs)$/],
    strategy: 'CacheFirst'
  }
};

const ALL_CACHE_NAMES = Object.values(CACHE_CONFIG).map(c => c.name);

function matchCacheConfig(url) {
  for (const cfg of Object.values(CACHE_CONFIG)) {
    if (cfg.patterns.some(p => p.test(url))) return cfg;
  }
  return null;
}

self.addEventListener('install', e => {
  console.log('[SW]', CACHE_VERSION);
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(names => Promise.all(
        names.filter(n => n.startsWith(CACHE_PREFIX) && !ALL_CACHE_NAMES.includes(n))
             .map(n => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin && !url.hostname.includes('source.yjluo.top')) return;
  
  const cfg = matchCacheConfig(url.pathname);
  if (!cfg) return;

  if (cfg.strategy === 'CacheFirst') {
    e.respondWith(
      caches.match(e.request).then(c => c || fetch(e.request).then(r => {
        if (r.ok) caches.open(cfg.name).then(cache => cache.put(e.request, r.clone()));
        return r;
      }))
    );
  } else {
    e.respondWith(
      fetch(e.request).then(r => {
        if (r.ok) caches.open(cfg.name).then(cache => cache.put(e.request, r.clone()));
        return r;
      }).catch(() => caches.match(e.request))
    );
  }
});

self.addEventListener('message', e => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
});