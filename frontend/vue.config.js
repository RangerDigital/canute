module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://127.0.0.1:3000',
        // target: 'https://canute.bednarski.dev/api/',
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
    manifestOptions: {
      short_name: 'Canute',
      name: 'Canute',
      icons: [
        {
          src: '/icon_1024.png',
          type: 'image/png',
          sizes: '1024x1024',
          purpose: 'maskable',
        },
        {
          src: '/icon_1024.png',
          type: 'image/png',
          sizes: '1024x1024',
        },
        {
          src: '/icon_512.png',
          type: 'image/png',
          sizes: '512x512',
        },
      ],
      start_url: '/dashboard',
      background_color: '#151414',
      display: 'standalone',
      scope: '/',
    },

    iconPaths: {
      favicon32: null,
      favicon16: null,
      appleTouchIcon: null,
      maskIcon: null,
      msTileImage: null,
    },

    themeColor: '#151414',
  },
};
