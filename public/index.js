"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("uv-form");
    const address = document.getElementById("uv-address");
    const searchEngine = document.getElementById("uv-search-engine");
    const error = document.getElementById("uv-error");
    const errorCode = document.getElementById("uv-error-code");

    // Connect to your local 2-line worker.js in the public folder
    const connection = new BareMux.BareMuxConnection("/worker.js");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        try {
            // This calls the registerSW function from your existing register-sw.js
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
            // This connects the browser to the Bare server on your Pi
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
