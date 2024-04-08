const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "./",
  transpileDependencies: ["agora-fls-sdk", "element-ui"],
  devServer: {
    https: true,
  },
});
