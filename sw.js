const staticCache = 'static-03';

const Resources = async () => {
    let assets = [
        './',
        './index.html',
        'js/script.js',
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
        key.filter(chave => chave !== staticCache).map(chave => caches.delete(chave))
    )
}

self.addEventListener('activate', e => {
    e.waitUntil(updateCache())
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(cacheResponse => {
            return cacheResponse || fetch(e.request)
        })
    ).catch(erro => {
        console.log(erro)
    })
})