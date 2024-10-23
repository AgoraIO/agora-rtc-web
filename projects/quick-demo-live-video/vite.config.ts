import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ssl from "@vitejs/plugin-basic-ssl";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  mode: "development",
  plugins: [
    legacy({
      targets: ["chrome 32", "safari 9"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
      renderLegacyChunks: true,
    }),
    vue(),
    ssl(),
  ],
  // plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "chrome32,safari9",
    sourcemap: true,
  },
  server: {
    https: true,
    port: 3000,
  },
});
