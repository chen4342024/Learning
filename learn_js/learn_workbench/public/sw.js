this.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open("v1").then(function(cache) {
            console.log("安装成功");
            return cache.addAll(["/test.js"]);
        })
    );
});

this.addEventListener("fetch", function(event) {
    console.log(event);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            console.log(response);
            return (
                response ||
                fetch(event.request).then(function(res) {
                    return caches.open("v1").then(function(cache) {
                        console.log("new content");
                        cache.put(
                            event.request,
                            new Response(
                                "window.test = Hello from your friendly neighbourhood service worker!"
                            )
                        );
                        return res;
                    });
                })
            );
        })
    );
});
