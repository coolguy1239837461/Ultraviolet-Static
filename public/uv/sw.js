/* This is the Ultraviolet Service Worker Engine */
importScripts('./uv.bundle.js');
importScripts('./uv.config.js');

// FIXED: Removed the reference to 'uv.sw.js' which was causing the 404 crash
importScripts(__uv$config.sw || './sw.js');

const sw = new UVServiceWorker();

self.addEventListener('fetch', (event) => {
    event.respondWith(sw.fetch(event));
});
