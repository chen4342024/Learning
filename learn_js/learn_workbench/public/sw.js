var VERSION = "v2";

var assetsToCache = ["test.js", "img/test.92a03544.jpg"];

assetsToCache = assetsToCache.map(path => {
    return new URL(path, this.location).toString();
});

console.log("assetsToCache", assetsToCache);

//白名单匹配策略
function matchAssets(requestUrl) {
    if (assetsToCache.indexOf(requestUrl) !== -1) {
        return true;
    }
    return false;
}

this.addEventListener("install", function(event) {
    console.log("install");
    event.waitUntil(
        caches.open(VERSION).then(function(cache) {
            console.log("安装成功");
            return cache.addAll(["/test.js"]);
        })
    );
});

this.addEventListener("activate", function(event) {
    console.log("activate");
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== VERSION) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

this.addEventListener("fetch", function(event) {
    var requestUrl = event.request.url;
    var isGET = event.request.method === "GET";
    var assetMatches = matchAssets(requestUrl);
    if (!assetMatches || !isGET) {
        return;
    }

    console.log("matched url", requestUrl);

    event.respondWith(
        caches.match(event.request).then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            var fetchRequest = event.request.clone();
            return fetch(fetchRequest).then(function(res) {
                // Check if we received a valid response
                if (!res || res.status !== 200 || res.type !== "basic") {
                    return res;
                }

                var responseToCache = res.clone();
                return caches.open("v1").then(function(cache) {
                    cache.put(event.request, responseToCache);
                    return res;
                });
            });
        })
    );
});
