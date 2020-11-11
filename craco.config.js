const CracoLessPlugin = require('craco-less');
const CracoEslintWebpackPlugin = require('craco-eslint-webpack-plugin');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
                '@primary-color': '#D6C3DF',
                '@heading-color': '#efebf2',
                '@text-color': '#efebf2',
                '@text-color-secondary': '#ebe5f3',
                '@link-color': '#5a4f6a',
                '@body-background': 'rgb(26, 26, 26)',
                '@component-background': 'rgb(26, 26, 26)',
                '@layout-body-background': 'rgb(26, 26, 26)',
                '@layout-header-background': 'rgb(26, 26, 26)',
            },
            javascriptEnabled: true,
          },
        },
        skipPreflightCheck: true,
        eslintOptions: {
          files: 'src/**/*.{js,jsx,ts,tsx}',
          lintDirtyModulesOnly: true,
        },
      },
    },
  ],
};