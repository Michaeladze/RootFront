const path = require("path");

module.exports = {
  stories: ['../../src/**/*.stories.tsx',],
  addons: [
    '@storybook/preset-create-react-app',
    'storybook-addon-designs/register',
    '@storybook/addon-viewport/register',
    '@storybook/addon-links',
    '@storybook/addon-actions',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader']
    });
    return config;
  }
};
