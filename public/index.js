"use strict";

/**
 * Ensures the page and CDN scripts are fully loaded before executing BareMux logic.
 * This prevents the "BareMux is not defined" error.
 */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("uv-form");
    const address = document.getElementById("uv-address");
    const searchEngine = document.getElementById("uv-search-engine");
    const error = document.getElementById("uv-error");
    const errorCode = document.getElementById("uv-error-code");

    // Connect to the stable @2 worker
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
            /**
             * Sets the transport to your Raspberry Pi via zrok.
             * We use the stable @2 bare.mjs to match the connection.
             */
            await connection.setTransport("https://cdn.jsdelivr.net/npm/@mercuryworkshop/bare-mux@2/dist/bare.mjs", [{
                bare: "https://raspiultraviolet.share.zrok.io/bare/"
            }]);

            frame.src = __uv$config.prefix + __uv$config.encodeUrl(url);
        } catch (err) {
            error.textContent = "Failed to set Bare transport.";
            errorCode.textContent = err.toString();
            console.error(err);
        }
    });
});
