"use strict";

// This listener ensures the page and CDN scripts are fully loaded before running
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("uv-form");
    const address = document.getElementById("uv-address");
    const searchEngine = document.getElementById("uv-search-engine");
    const error = document.getElementById("uv-error");
    const errorCode = document.getElementById("uv-error-code");

    // 1. UPDATED: Connect to the stable @2 version of the worker
    const connection = new BareMux.BareMuxConnection("https://cdn.jsdelivr.net/npm/@mercuryworkshop/bare-mux@2/dist/worker.js");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        try {
            await registerSW();
        } catch (err) {
            error.textContent = "Failed to register service worker.";
            errorCode.textContent = err.toString();
            throw err;
        }

        const url = search(address.value, searchEngine.value);

        let frame = document.getElementById("uv-frame");
        frame.style.display = "block";

        try {
            // 2. UPDATED: Use the stable @2 version of the bare.mjs transport
            // This points directly to your Raspberry Pi via the zrok tunnel
            await connection.setTransport("https://cdn.jsdelivr.net/npm/@mercuryworkshop/bare-mux@2/dist/bare.mjs", [{
                bare: "https://raspiultraviolet.share.zrok.io/bare/"
            }]);

            frame.src = __uv$config.prefix + __uv$config.encodeUrl(url);
        } catch (err) {
            error.textContent = "Failed to set Bare transport.";
            errorCode.textContent = err.toString();
        }
    });
});
