self.__uv$config = {
  prefix: "/uv/service/",
  /* This connects your Netlify frontend to your Pi */
  bare: "https://raspiultraviolet.share.zrok.io/bare/", 
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "/uv/uv.handler.js",
  client: "/uv/uv.client.js",
  bundle: "/uv/uv.bundle.js",
  config: "/uv/uv.config.js",
  sw: "/uv/uv.sw.js",
};
