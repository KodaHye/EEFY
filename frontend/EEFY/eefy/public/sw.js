if (!self.define) {
  let e,
    s = {};
  const c = (c, a) => (
    (c = new URL(c + '.js', a).href),
    s[c] ||
      new Promise(s => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = c), (e.onload = s), document.head.appendChild(e);
        } else (e = c), importScripts(c), s();
      }).then(() => {
        let e = s[c];
        if (!e) throw new Error(`Module ${c} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, n) => {
    const i = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[i]) return;
    let t = {};
    const r = e => c(e, i),
      d = { module: { uri: i }, exports: t, require: r };
    s[i] = Promise.all(a.map(e => d[e] || r(e))).then(e => (n(...e), t));
  };
}
define(['./workbox-7c2a5a06'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/Img/취소.png', revision: '3adc23cf1eec21a04fe5a59077368001' },
        { url: '/Img/화살표.png', revision: '274fc73517dfb4127b8f961c71e2d288' },
        { url: '/Img/회원가입.png', revision: '1d7e49183301630131638804cfc2ab4f' },
        { url: '/_next/app-build-manifest.json', revision: '0192ea8eb9f4a40af644f1dab7b84ac4' },
        { url: '/_next/static/chunks/24-d80b402f568412a6.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/282-96074f98858d4000.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/319.f711d4d793d80eea.js', revision: 'f711d4d793d80eea' },
        { url: '/_next/static/chunks/341-119c08fe6e9b9357.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/396-f5e90ebee03871b8.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/460-4955190ac204b339.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/503-bc219dd9fc2d5282.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/531-b171691fc11ab206.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/594-354240e308abd283.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/641.5f9a4fa8ec9f9157.js', revision: '5f9a4fa8ec9f9157' },
        { url: '/_next/static/chunks/73-c6a27ed3f0e27e51.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/752-8d92a20049da1d6e.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/763-fae52ac01aed96a5.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/7a49ec60-ebb5dcf8360730a0.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/849-986ef3a73dc07488.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/93854f56-91b5b1788ae21335.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/app/_not-found-4bed3fc6e9788a91.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/app/class/dashboard/page-cbdb56a702415050.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/app/class/layout-be9ab9ace1c8e9ae.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/app/class/lecture/page-425d5fb7cee871bb.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/app/class/notice/page-0fa4d921bbb5ff49.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/app/class/page-9f676a22e7a49cf5.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/app/class/question/page-dee142021fffabc7.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/app/class/studydetail/page-f13803de840b6e96.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/app/class/studylist/page-be0c0fd67e27f51e.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/app/layout-c9b9d9820059a7b4.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/app/library/layout-3d3c5acbb5f8c3da.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/app/library/page-9a775b82236dd0c5.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/app/library/student/page-14f7e4787e64e1c7.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/app/library/teacher/homework/create/page-34f0e2bc1de96fb3.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/app/library/teacher/page-aa740ee4ae82d555.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/app/login/page-d4b208830b0fb725.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/app/main/classlist/page-b9b2b47be8975070.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/app/main/layout-f0adfeb6486837a0.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/app/main/page-1f86443078b53315.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/app/page-63432f386db493fd.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/f4e5f4e1-f1efbcf816ca3ddd.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/fd9d1056-5ee88540e4b8869d.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/framework-8883d1e9be70c3da.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/main-5f3c5a648667e338.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/main-app-b7f43c014f033157.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/pages/_app-3a50294cbab9ad72.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/pages/_error-a42915f8be41e7b5.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js', revision: '837c0df77fd5009c9e46d446188ecfd0' },
        { url: '/_next/static/chunks/webpack-a995ff3f725a2441.js', revision: 'k5eHMv1xKcWd3UrJeEdBp' },
        { url: '/_next/static/css/04b6843a328eee1c.css', revision: '04b6843a328eee1c' },
        { url: '/_next/static/css/4d41614584f4fe54.css', revision: '4d41614584f4fe54' },
        { url: '/_next/static/css/6122e5b27df29a0c.css', revision: '6122e5b27df29a0c' },
        { url: '/_next/static/css/ba6057dd988749d5.css', revision: 'ba6057dd988749d5' },
        { url: '/_next/static/k5eHMv1xKcWd3UrJeEdBp/_buildManifest.js', revision: '4cf11dae26751ec7716fa6d4d33723c3' },
        { url: '/_next/static/k5eHMv1xKcWd3UrJeEdBp/_ssgManifest.js', revision: 'b6652df95db52feb4daf4eca35380933' },
        { url: '/_next/static/media/회원가입.98773a12.png', revision: '1d7e49183301630131638804cfc2ab4f' },
        { url: '/asset-headphonebook-450x450.png', revision: 'c6d6e982650f1076980a355c7c6d0fde' },
        { url: '/icon-192x192.png', revision: '76fcd20cd2feaa441edf3b069c672b65' },
        { url: '/icon-256x256.png', revision: '57945fb489acae6781be59b471100d97' },
        { url: '/icon-384x384.png', revision: '5137873f70752f5c8975060481099805' },
        { url: '/icon-512x512.png', revision: 'bd53395c30ccf5d090affeac6b8f1bcf' },
        { url: '/logo.png', revision: '80edab507375153931f236468aa97ae5' },
        { url: '/manifest.json', revision: 'baeca1a8e628820dbd20db13a1d632f5' },
        { url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        { url: '/start-logo.svg', revision: '7e88a00bbb85e52623977645295eb895' },
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
            cacheWillUpdate: async ({ request: e, response: s, event: c, state: a }) =>
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