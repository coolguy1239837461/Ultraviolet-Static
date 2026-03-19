"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("uv-form");
    const address = document.getElementById("uv-address");
    const searchEngine = document.getElementById("uv-search-engine");
    const error = document.getElementById("uv-error");
    const errorCode = document.getElementById("uv-error-code");

    // Connect to your local worker.js
    const connection = new BareMux.BareMuxConnection("/worker.js");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        try {
            // 1. Register the Service Worker
            await registerSW();
            
            const url = search(address.value, searchEngine.value);
            let frame = document.getElementById("uv-frame");

            // 2. FIXED TRANSPORT: Using the direct BareMux transport class
            // This avoids the "Failed to fetch dynamically imported module" error
            await connection.setTransport("https://cdn.jsdelivr.net/npm/@mercuryworkshop/bare-mux@2/dist/bare.mjs", [{
                bare: "https://raspiultraviolet.share.zrok.io/bare/"
            }]);

            console.log("Handshake confirmed with Pi on 8002.");

            frame.style.display = "block";
            frame.src = __uv$config.prefix + __uv$config.encodeUrl(url);

        } catch (err) {
            error.textContent = "Transport Error: The connection to the Pi failed.";
            errorCode.textContent = err.toString();
            console.error(err);
        }
    });
});
