import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import terser from "@rollup/plugin-terser";
import babel from "@rollup/plugin-babel";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  mode: "production",
  plugins: [
    babel({
      extensions: [".js", ".ts"],
      babelHelpers: "runtime",
      include: ["src/**"],
      presets: [["@babel/preset-env"]],
      plugins: [
        ["@babel/plugin-transform-runtime", { corejs: 3 }],
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-transform-class-properties", { loose: true }],
        ["@babel/plugin-transform-private-methods", { loose: true }],
        ["@babel/plugin-transform-private-property-in-object", { loose: true }],
      ],
    }),
    vue(),
    terser(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
