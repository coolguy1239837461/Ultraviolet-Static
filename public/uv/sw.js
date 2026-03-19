"use strict";

/**
 * Using the full CDN URL to ensure the engine loads 
 * even if the local file path is being blocked.
 */
try {
    importScripts('https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.2.6/dist/uv.bundle.js');
    importScripts('./uv.config.js');

    if (typeof UVServiceWorker !== 'undefined') {
        const sw = new UVServiceWorker();

        self.addEventListener('fetch', (event) => {
            event.respondWith(sw.fetch(event));
        });
    } else {
        console.error("Ultraviolet bundle still failed to load from CDN.");
    }
} catch (e) {
    console.error("Service Worker Error:", e);
}
