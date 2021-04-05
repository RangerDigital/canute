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
  pwa: {
    short_name: 'Canute',
    name: 'Canute OS',
    icons: [
      {
        src: '/maskable_icon.png',
        type: 'image/png',
        sizes: '1024x1024',
        purpose: 'maskable',
      },
    ],
    start_url: '/dashboard',
    background_color: '#151719',
    display: 'standalone',
    scope: '/',
    theme_color: '#151719',
  },
};
