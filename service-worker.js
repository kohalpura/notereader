
const CACHE_NAME = 'nepali-kanuun-cache-v2'; // Increment version for updates
const APP_SHELL_FILES = [
  '/',
  '/index.html',
  '/index.tsx', // Requested by index.html
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js',
  'https://esm.sh/react@^19.1.0',
  'https://esm.sh/react-dom@^19.1.0'
  // NOTE: Add any other critical static assets here (e.g., fonts, global CSS if separate)
  // Old local icon paths '/icons/icon-192x192.png' and '/icons/icon-512x512.png' are removed
  // as the manifest now points to an external URL.
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching app shell');
        const promises = APP_SHELL_FILES.map(url => {
          return cache.add(url).catch(err => {
            console.warn(`Service Worker: Failed to cache ${url} during install:`, err);
          });
        });
        return Promise.all(promises);
      })
      .then(() => {
        console.log('Service Worker: Install completed, skipping waiting.');
        return self.skipWaiting();
      })
      .catch(err => {
        console.error('Service Worker: Install failed:', err);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activate completed, claiming clients.');
      return self.clients.claim();
    })
    .catch(err => {
      console.error('Service Worker: Activate failed:', err);
    })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // For navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // If network successful, cache the page (optional for navigations if content is dynamic)
          // For this app, index.html is quite static, so caching is fine.
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => {
          // Network failed, try to serve from cache
          return caches.match(request)
            .then(cachedResponse => {
              return cachedResponse || caches.match('/index.html'); // Fallback to main index.html
            });
        })
    );
    return;
  }

  // For non-navigation requests (assets like JS, CSS, images)
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse; // Serve from cache if found
        }
        // Not in cache, fetch from network
        return fetch(request)
          .then(networkResponse => {
            if (networkResponse && networkResponse.ok) {
              // Cache the new resource if it's from our origin or a known CDN we want to cache
              if (request.url.startsWith(self.location.origin) || 
                  request.url.startsWith('https://esm.sh/') ||
                  request.url.startsWith('https://cdn.tailwindcss.com') ||
                  request.url.startsWith('https://cdnjs.cloudflare.com') ||
                  request.url.startsWith('https://img.freepik.com') // Cache icons from Freepik
                  ) {
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME)
                  .then(cache => {
                    cache.put(request, responseToCache);
                  });
              }
            }
            return networkResponse;
          })
          .catch(error => {
            console.warn(`Service Worker: Fetch failed for ${request.url}; ${error}`);
            // You could return a fallback response for specific asset types here if needed
            // e.g., a placeholder image for failed image requests.
          });
      })
  );
});
