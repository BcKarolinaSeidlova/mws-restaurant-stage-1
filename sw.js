var staticCacheName = 'restaurant-reviews-v2'
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('staticCacheName').then(function(cache) {
      return cache.addAll([
        '/mws-restaurant-stage-1',
        'css/styles.css'
        'data/restaurants.json',
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg',
        'img/7.jpg',
        'img/8.jpg',
        'img/9.jpg',
        'img/10.jpg',
        'js/dbhelper.js',
        'js/main.js',
        'restaurant_info.js',
        'index.html',
        'restaurant.html'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
   caches.keys().then(function(cacheNames){
   	return Promise.all(
   		cacheNames.filter(function(cacheName) {
   			return cacheName.startsWith('restaurant-reviews-') &&
   					cacheName != staticCacheName
   		}).map(function(cacheName) {
   			return cache.delete(cacheName);
   		})

   	);
   })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});