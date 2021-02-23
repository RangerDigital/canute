module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        // target: 'http://127.0.0.1:3000',
        target: 'https://canute.bednarski.dev/api/',
        pathRewrite: {
          '^/api': '',
        },
        changeOrigin: true,
        secure: false,
        debug: true,
      },
    },
  },
};
