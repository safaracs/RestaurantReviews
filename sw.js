var cache_name = "restaurant-cache";
var urlsToCahce = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
]

 // Installation of the Service Worker
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cache_name)
    .then(cache => {
      console.log('opened cache:'+cache);
      return cache.addAll(urlsToCahce);
    }).catch(error => {
        console.log('Opening caches failed:' + error);
    })
  )
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName.startsWith('restaurant-') && cacheName !== cache_name;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(resp => {
            if (resp) {
                return resp;
            } else {
                return fetch(event.request);
            }
        }) .catch(err => console.log(err, event.request))
    );
});