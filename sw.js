// KARMA STELLA service worker（PWAの土台）
// 方針：まずネットから最新を取りにいき、つながらない時だけ保存済みを出す（network-first）。
// 通知（push）はまだ扱わない。
const CACHE_NAME = 'karma-stella-v1';

// オフラインでも最低限表示するためのファイル（軽いものだけ。キャラ画像は重いので事前保存しない）
const PRECACHE = [
  './',
  './index.html',
  './soul_descriptions.js',
  './manifest.json',
  './icons/icon.svg',
  './icons/icon-maskable.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // 外部（Googleフォント・決済ページ等）はブラウザに任せる
  if (url.origin !== self.location.origin) return;
  // 将来の api/ 呼び出し（ロック解除など）は保存しない
  if (url.pathname.startsWith('/api/')) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(req, { ignoreSearch: req.mode === 'navigate' }).then((hit) => {
          if (hit) return hit;
          if (req.mode === 'navigate') return caches.match('./index.html');
          return Response.error();
        })
      )
  );
});
