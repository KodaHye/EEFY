if (!self.define) {
  let e,
    s = {};
  const n = (n, c) => (
    (n = new URL(n + '.js', c).href),
    s[n] ||
      new Promise(s => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = n), (e.onload = s), document.head.appendChild(e);
        } else (e = n), importScripts(n), s();
      }).then(() => {
        let e = s[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, a) => {
    const t = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[t]) return;
    let i = {};
    const r = e => n(e, t),
      o = { module: { uri: t }, exports: i, require: r };
    s[t] = Promise.all(c.map(e => o[e] || r(e))).then(e => (a(...e), i));
  };
}
define(['./workbox-7c2a5a06'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/Img/회원가입.png', revision: '1d7e49183301630131638804cfc2ab4f' },
        { url: '/_next/app-build-manifest.json', revision: '3a7427bafb5af84bfbfab6537fb8cdb5' },
        { url: '/_next/static/XSTALGcV1-g5MZAZ8kTum/_buildManifest.js', revision: '50654c4134ba6f71b423498e9447ee91' },
        { url: '/_next/static/XSTALGcV1-g5MZAZ8kTum/_ssgManifest.js', revision: 'b6652df95db52feb4daf4eca35380933' },
        { url: '/_next/static/chunks/326-5945e74dc2aace25.js', revision: 'XSTALGcV1-g5MZAZ8kTum' },
        { url: '/_next/static/chunks/472-12f3153ed6e81bc2.js', revision: 'XSTALGcV1-g5MZAZ8kTum' },
        { url: '/_next/static/chunks/504-4693ba26d67f8e15.js', revision: 'XSTALGcV1-g5MZAZ8kTum' },
        { url: '/_next/static/chunks/app/_not-found-5a24a86d9f181524.js', revision: 'XSTALGcV1-g5MZAZ8kTum' },
        { url: '/_next/static/chunks/app/class/layout-05b0643a3d560129.js', revision: 'XSTALGcV1-g5MZAZ8kTum' },
        { url: '/_next/static/chunks/app/class/page-fe668048bfcf86fb.js', revision: 'XSTALGcV1-g5MZAZ8kTum' },
        { url: '/_next/static/chunks/app/layout-5aed7de0e6840b2e.js', revision: 'XSTALGcV1-g5MZAZ8kTum' },
        { url: '/_next/static/chunks/app/login/page-06d16dc22f246228.js', revision: 'XSTALGcV1-g5MZAZ8kTum' },
        { url: '/_next/static/chunks/app/main/layout-6ad9b5f664d34057.js', revision: 'XSTALGcV1-g5MZAZ8kTum' },
        { url: '/_next/static/chunks/app/main/page-4ca52a155c4e5819.js', revision: 'XSTALGcV1-g5MZAZ8kTum' },
        { url: '/_next/static/chunks/app/page-26fbf5a32cdc08f9.js', revision: 'XSTALGcV1-g5MZAZ8kTum' },
        { url: '/_next/static/chunks/fd9d1056-223ee135c8a1e461.js', revision: 'XSTALGcV1-g5MZAZ8kTum' },
        { url: '/_next/static/chunks/framework-8883d1e9be70c3da.js', revision: 'XSTALGcV1-g5MZAZ8kTum' },
        { url: '/_next/static/chunks/main-437779295fe913af.js', revision: 'XSTALGcV1-g5MZAZ8kTum' },
        { url: '/_next/static/chunks/main-app-ab1a962dca321cc3.js', revision: 'XSTALGcV1-g5MZAZ8kTum' },
        { url: '/_next/static/chunks/pages/_app-1534f180665c857f.js', revision: 'XSTALGcV1-g5MZAZ8kTum' },
        { url: '/_next/static/chunks/pages/_error-b646007f40c4f0a8.js', revision: 'XSTALGcV1-g5MZAZ8kTum' },
        { url: '/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js', revision: '837c0df77fd5009c9e46d446188ecfd0' },
        { url: '/_next/static/chunks/webpack-48c6f36873498a72.js', revision: 'XSTALGcV1-g5MZAZ8kTum' },
        { url: '/_next/static/css/36998839629ec96a.css', revision: '36998839629ec96a' },
        { url: '/_next/static/css/afc5fa57fcc012cd.css', revision: 'afc5fa57fcc012cd' },
        { url: '/icon-192x192.png', revision: '76fcd20cd2feaa441edf3b069c672b65' },
        { url: '/icon-256x256.png', revision: '57945fb489acae6781be59b471100d97' },
        { url: '/icon-384x384.png', revision: '5137873f70752f5c8975060481099805' },
        { url: '/icon-512x512.png', revision: 'bd53395c30ccf5d090affeac6b8f1bcf' },
        { url: '/logo.png', revision: '80edab507375153931f236468aa97ae5' },
        { url: '/manifest.json', revision: '61a0bc810da79674b1dcf6f45c500dab' },
        { url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        { url: '/vercel.svg', revision: '61c6b19abff40ea7acd577be818f3976' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: n, state: c }) =>
              s && 'opaqueredirect' === s.type ? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers }) : s,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({ cacheName: 'google-fonts-webfonts', plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })] }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({ cacheName: 'google-fonts-stylesheets', plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })] }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({ cacheName: 'static-font-assets', plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })] }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({ cacheName: 'static-image-assets', plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })] }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({ cacheName: 'next-image', plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })] }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({ cacheName: 'static-js-assets', plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({ cacheName: 'static-style-assets', plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({ cacheName: 'next-data', plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({ cacheName: 'static-data-assets', plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({ cacheName: 'apis', networkTimeoutSeconds: 10, plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })] }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({ cacheName: 'others', networkTimeoutSeconds: 10, plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({ cacheName: 'cross-origin', networkTimeoutSeconds: 10, plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })] }),
      'GET'
    );
});