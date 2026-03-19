"use strict";

document.getElementById("uv-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const address = document.getElementById("uv-address");
    const searchEngine = document.getElementById("uv-search-engine");
    const error = document.getElementById("uv-error");
    const errorCode = document.getElementById("uv-error-code");
    
    // Connect to your local 2-line worker.js file
    const connection = new BareMux.BareMuxConnection("/worker.js");

    try {
        // 1. Register the Service Worker (sw.js)
        await registerSW();
        
        // 2. Prepare the destination URL
        const url = search(address.value, searchEngine.value);
        
        // 3. Set the Transport to your permanent Pi address
        // Note: We use the /bare/ endpoint which Ultraviolet-Node provides
        const bareTarget = "https://raspiultraviolet.share.zrok.io/bare/";

        await connection.setTransport("https://cdn.jsdelivr.net/npm/@mercuryworkshop/bare-mux@2/dist/bare.mjs", [{
            bare: bareTarget
        }]);

        console.log("Handshake confirmed with: " + bareTarget);

        // 4. Show the frame and load the site
        let frame = document.getElementById("uv-frame");
        frame.style.display = "block";
        frame.src = __uv$config.prefix + __uv$config.encodeUrl(url);

    } catch (err) {
        error.textContent = "Failed to connect to the Raspberry Pi.";
        errorCode.textContent = err.toString();
        console.error(err);
    }
});
