const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
                '@primary-color': '#9883b6',
                '@heading-color': '#f3ecfa',
                '@text-color': '#f3ecfa',
                '@text-color-secondary': '#ebe5f3',
                '@link-color': '#5a4f6a',
                '@body-background': '#201e25',
                '@body-background': '#201e25',
                '@component-background': '#201e25',
                '@layout-body-background': '#201e25',
                '@layout-header-background': '#201e25',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};