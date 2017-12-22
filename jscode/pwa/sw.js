var cacheName = "latestNews-v1";

// Cache our known resources during install
self.addEventListener("install", event => {
  console.log("install");
  event.waitUntil(
    // 这里的caches为CacheStorage 对象
    caches
      .open(cacheName)
      .then(cache =>
      // 这里的cache则为Cache对象
        cache.addAll([
          "./js/main.js",
          "./js/article.js",
          "./images/newspaper.svg",
          "./css/site.css",
          "./data/latest.json",
          "./data/data-1.json",
          "./article.html",
          "./index.html"
        ]))
      //self.skipWaiting()是为了在页面更新的过程当中, 新的 Service Worker 脚本能立即激活和生效

      .then(() => self.skipWaiting())
    // 如果执行了reject方法，说明这次加载失败
    // Promise.reject()
  );
});

// Cache any new resources as they are fetched
self.addEventListener("fetch", function(event) {
  console.log(event);
  event.respondWith(
    caches
      .match(event.request, { ignoreSearch: true })
      .then(function(response) {
        if (response) {
          return response;
        }
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(function(response) {
          if (!response || response.status !== 200) {
            return response;
          }

          var responseToCache = response.clone();
          caches.open(cacheName).then(function(cache) {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
  );
});
// 删除过期的缓存资源
self.addEventListener("activate", function(e) {
  e.waitUntil(
    Promise.all(
      caches.keys().then(cacheNames => {
        return cacheNames.map(name => {
          if (name !== cacheName) {
            return caches.delete(name);
          }
        });
      })
    ).then(() => {
      // 可以直接控制未受控制的客户端，无需刷新页面
      return self.clients.claim();
    })
  );
});
