if(!self.define){let e,n={};const s=(s,i)=>(s=new URL(s+".js",i).href,n[s]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=n,document.head.appendChild(e)}else e=s,importScripts(s),n()})).then((()=>{let e=n[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,a)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(n[t])return;let c={};const r=e=>s(e,t),l={module:{uri:t},exports:c,require:r};n[t]=Promise.all(i.map((e=>l[e]||r(e)))).then((e=>(a(...e),c)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Img/취소.png",revision:"3adc23cf1eec21a04fe5a59077368001"},{url:"/Img/화살표.png",revision:"274fc73517dfb4127b8f961c71e2d288"},{url:"/Img/회원가입.png",revision:"1d7e49183301630131638804cfc2ab4f"},{url:"/_next/app-build-manifest.json",revision:"f126917efd14d4f2816bb36ee0a37e4c"},{url:"/_next/static/chunks/131-270359b8b9ca7d0c.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/341-c81c76a3138cf62b.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/390-d7b992c080dbbff5.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/396-e430f9cfee9b6060.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/413-ed0e71d376ca79b7.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/472-fd04dd8b909249be.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/594-c1e1f34bc6457f55.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/73-c14b07e68953a4c3.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/775-384605d062fde49b.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/7a49ec60-ebb5dcf8360730a0.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/825-c68e6064ac686a51.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/901-c1e84f5e9bc82444.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/93854f56-91b5b1788ae21335.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/947-ceee9b4bc2bbb81a.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/app/_not-found-8407815f64902bd6.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/app/class/dashboard/page-573bb822dcb21eff.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/app/class/layout-9b7a6ad16bb64d3f.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/app/class/lecture/page-213fc389bbc2ba0e.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/app/class/notice/page-60cea671add51814.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/app/class/page-4516617fe66d8cfa.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/app/class/question/page-2c485e446697b9b6.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/app/class/studydetail/page-002b2cc1b75e00fd.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/app/class/studylist/page-9e3778f078306d13.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/app/layout-b7df95c75c153ef4.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/app/library/layout-d318186034b45038.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/app/library/page-2ba7f4947db857b2.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/app/library/student/page-2ccb401d67e5d175.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/app/library/teacher/homework/create/page-a370453fd66ab5ff.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/app/library/teacher/page-f09b88a96b24fc91.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/app/login/page-7929b59c2019612a.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/app/main/classlist/page-3f70c98a7a551a85.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/app/main/layout-d13761f5aa0fd23d.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/app/main/page-0af5a8b9052aeab0.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/app/page-0cce61c782d32cdc.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/f4e5f4e1-f1efbcf816ca3ddd.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/fd9d1056-5ee88540e4b8869d.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/main-0fad94cd65a57717.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/main-app-c8a575f17e89bc54.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/pages/_app-1534f180665c857f.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/pages/_error-b646007f40c4f0a8.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-e2f95b01612c9f00.js",revision:"vJSVkgx-xizjfMEgAlnhn"},{url:"/_next/static/css/04b6843a328eee1c.css",revision:"04b6843a328eee1c"},{url:"/_next/static/css/4d41614584f4fe54.css",revision:"4d41614584f4fe54"},{url:"/_next/static/css/6122e5b27df29a0c.css",revision:"6122e5b27df29a0c"},{url:"/_next/static/css/ba6057dd988749d5.css",revision:"ba6057dd988749d5"},{url:"/_next/static/vJSVkgx-xizjfMEgAlnhn/_buildManifest.js",revision:"50654c4134ba6f71b423498e9447ee91"},{url:"/_next/static/vJSVkgx-xizjfMEgAlnhn/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/asset-headphonebook-450x450.png",revision:"c6d6e982650f1076980a355c7c6d0fde"},{url:"/icon-192x192.png",revision:"76fcd20cd2feaa441edf3b069c672b65"},{url:"/icon-256x256.png",revision:"57945fb489acae6781be59b471100d97"},{url:"/icon-384x384.png",revision:"5137873f70752f5c8975060481099805"},{url:"/icon-512x512.png",revision:"bd53395c30ccf5d090affeac6b8f1bcf"},{url:"/logo.png",revision:"80edab507375153931f236468aa97ae5"},{url:"/manifest.json",revision:"baeca1a8e628820dbd20db13a1d632f5"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/start-logo.svg",revision:"7e88a00bbb85e52623977645295eb895"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:n,event:s,state:i})=>n&&"opaqueredirect"===n.type?new Response(n.body,{status:200,statusText:"OK",headers:n.headers}):n}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const n=e.pathname;return!n.startsWith("/api/auth/")&&!!n.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
