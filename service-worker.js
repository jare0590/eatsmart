var dataCacheName = 'EATsmart-v1.1';
var cacheName = 'EATsmartPWA';
var filesToCache = [
  '/',
  // '/index.html',
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900',
  'https://fonts.googleapis.com/css?family=Permanent+Marker',
  '/fonts/eatsmart.eot',
  '/fonts/eatsmart.svg',
  '/fonts/eatsmart.ttf',
  '/fonts/eatsmart.woff',
  '/js/eatsmart.min.js',
  '/css/eatsmart.min.css',
  '/img/home/caro_rodriguez.jpg',
  '/img/home/gabriela_mijangos.jpg',
  '/img/home/home_fondo_familia.jpg',
  '/img/home/home_fondoOverlay_clinico.jpg',
  '/img/home/home_fondoOverlay_deportivo.jpg',
  '/img/home/home_fondoOverlay_general.jpg',
  '/img/home/home_info.jpg',
  '/img/home/isa_bolivar.jpg',
  '/img/home/sebas_miranda.jpg',
  '/img/home/thumb_familia_corredor.jpg',
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  /*
   * Fixes a corner case in which the app wasn't returning the latest data.
   * You can reproduce the corner case by commenting out the line below and
   * then doing the following steps: 1) load app for first time so that the
   * initial New York City data is shown 2) press the refresh button on the
   * app 3) go offline 4) reload the app. You expect to see the newer NYC
   * data, but you actually see the initial data. This happens because the
   * service worker is not yet activated. The code below essentially lets
   * you activate the service worker faster.
   */
  return self.clients.claim();
});

self.addEventListener('fetch', function(e){
	// Skip cross-origin requests, like those for Google Analytics.
	if (e.request.url.startsWith(self.location.origin)) {
		e.respondWith(
			caches.match(e.request).then(function(cachedResponse) {
				if (cachedResponse) {
					return cachedResponse;
				}

				return caches.open(cacheName).then(function(cache) {
					return fetch(e.request).then(function(response) {
						// Put a copy of the response in the runtime cache.
						return cache.put(e.request, response.clone()).then(function() {
							return response;
						});
					});
				});
			})
		);
	}
});
