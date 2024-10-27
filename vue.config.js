const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      })
    ],
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://url1619.shotguntheapp.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
});
