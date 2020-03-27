importScripts('https://cdn.jsdelivr.net/npm/workbox-sw@4.3.1/build/workbox-sw.min.js');

if (workbox) {
    console.log("Yay! Workbox is loaded 🎉");
} else {
    console.log("Boo! Workbox didn't load 😬");
}

var cacheFiles = [
    {
        url: '/index.html',
        revision: 'bvnwiki4444' // 加revision，版本改了以後，sw.js 在 application 上會更新
    }
];
workbox.precaching.precacheAndRoute(cacheFiles);

workbox.routing.registerRoute(
    'https://cdn.jsdelivr.net/npm/pwacompat@2.0.9/pwacompat.min.js',
    new workbox.strategies.StaleWhileRevalidate()
);

//缓存文件
workbox.routing.registerRoute(
    /\.css$/,   //通过正则匹配需要缓存哪些文件
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'css-cache-v1'  //缓存名，可在application-> Cache storage下找到
    })
);

workbox.routing.registerRoute(
    /\.(?:js)$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'js-cache-v1'
    })
);

workbox.routing.registerRoute(
    // Cache image files.
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    // Use the cache if it's available.
    new workbox.strategies.CacheFirst({
        // Use a custom cache name.
        cacheName: 'image-cache-v1'
    })
);