"use strict";

const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const searchEngine = document.getElementById("uv-search-engine");
const error = document.getElementById("uv-error");
const errorCode = document.getElementById("uv-error-code");

// Connect to the Bare-Mux worker
const connection = new BareMux.BareMuxConnection("/baremux/worker.js");

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
        // This is the magic part: It tells the frontend to use your Pi's Bare server
        // instead of looking for a local Netlify backend.
        await connection.setTransport("/baremux/bare.mjs", [{
            bare: "https://raspiultraviolet.share.zrok.io/bare/"
        }]);

        frame.src = __uv$config.prefix + __uv$config.encodeUrl(url);
    } catch (err) {
        error.textContent = "Failed to set Bare transport.";
        errorCode.textContent = err.toString();
    }
});
