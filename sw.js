const staticCache = 'static-00',
    dynamicCache = 'dynamic-00';

const Resources = async () => {
    let assets = [
        './',
        './index.html',
        'js/min/app.min.js',
        'js/min/loader.min.js',
        'js/min/main.min.js',
        'js/script.js',
        'js/install.js',
        'css/style.min.css',
        'img/icon-cross.svg',
        'img/icon-moon.svg',
        'img/icon-sun.svg'
    ];

    let cache = await caches.open(staticCache);
    return cache.addAll(assets);
}

self.addEventListener('install', e => {
    e.waitUntil(Resources())
});

const updateCache = async () => {
    let key = await caches.keys();
    return Promise.all(
        key.filter(chave => chave !== staticCache && chave !== dynamicCache).map(chave => caches.delete(chave))
    )
}

self.addEventListener('activate', e => {
    e.waitUntil(updateCache())
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(cacheResponse => {
            return cacheResponse || fetch(e.request)
                .then(fetchResponse => {
                    return caches.open(dynamicCache)
                        .then(cache => {
                            cache.put(e.request.url, fetchResponse.clone());
                            return fetchResponse;
                        })
                });
        })
            .catch(erro => {
                console.log(erro)
            })
    );
});