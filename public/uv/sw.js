/* Ultraviolet Service Worker Engine */
try {
    importScripts('/uv/uv.bundle.js');
    importScripts('/uv/uv.config.js');

    // Check if the bundle actually loaded before trying to use it
    if (typeof UVServiceWorker !== 'undefined') {
        const sw = new UVServiceWorker();

        self.addEventListener('fetch', (event) => {
            event.respondWith(sw.fetch(event));
        });
    } else {
        console.error("Ultraviolet bundle failed to load inside sw.js");
    }
} catch (e) {
    console.error("Service Worker Error:", e);
}
