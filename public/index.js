"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("uv-form");
    const address = document.getElementById("uv-address");
    const connection = new BareMux.BareMuxConnection("/worker.js");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        try {
            await registerSW();
            const url = search(address.value, document.getElementById("uv-search-engine").value);
            
            // This URL must match your Pi exactly
            const bareTarget = "https://raspiultraviolet.share.zrok.io/bare/";

            /**
             * THE STABLE FIX:
             * We use the string path to the mjs, but we ensure the BareMux 
             * library is ready first.
             */
            await connection.setTransport("https://cdn.jsdelivr.net/npm/@mercuryworkshop/bare-mux@2/dist/bare.mjs", [{
                bare: bareTarget
            }]);

            console.log("Handshake confirmed with Pi.");

            let frame = document.getElementById("uv-frame");
            frame.style.display = "block";
            frame.src = __uv$config.prefix + __uv$config.encodeUrl(url);

        } catch (err) {
            console.error("Transport Error:", err);
            document.getElementById("uv-error").textContent = "Connection Failed. Check Pi console.";
        }
    });
});
