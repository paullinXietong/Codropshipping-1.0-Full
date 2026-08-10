const { defineConfig } = require("@vue/cli-service");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
module.exports = defineConfig({
  publicPath: "/admin/",
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target:
          process.env.VUE_APP_COD_API_TARGET || "https://codropshipping.com",
        changeOrigin: true,
        secure: true,
      },
      "/listing-api": {
        target:
          process.env.VUE_APP_LISTING_API_TARGET || "http://127.0.0.1:8789",
        changeOrigin: true,
        pathRewrite: { "^/listing-api": "" },
      },
    },
  },
  // configureWebpack: {
  //   performance: {
  //     hints: "warning",
  //     maxEntrypointSize: 50000000,
  //     maxAssetSize: 30000000,
  //     assetFilter: function (assetFilename) {
  //       return assetFilename.endsWith(".js");
  //     },
  //   },
  // },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV !== "production") return;
    config.plugins.push(
      new CompressionWebpackPlugin({
        test: /\.(js|css|svg|woff|ttf|json|html)$/,
        threshold: 10240,
      })
    );
  },
});
