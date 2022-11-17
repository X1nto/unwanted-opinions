'use strict';

const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const common = require('./webpack.common.js');
const PATHS = require('./paths');

const chrome = {
  output: {
    path: PATHS.buildChrome,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/manifest.json',
          context: 'public',
        },
      ],
    }),
  ],
};

const firefox = {
  output: {
    path: PATHS.buildFirefox,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/manifest.v2.json',
          to: 'manifest.json',
          context: 'public',
        },
      ],
    }),
  ],
};

const dev = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/manifest*',
          context: 'public',
        },
      ],
    }),
  ],
};

// Merge webpack configuration files
const config = (env, args) => {
  const scripts = {
    entry: {
      popup: PATHS.src + '/popup.ts',
      opinionator: PATHS.src + '/opinionator.ts',
      content: PATHS.src + '/content.ts',
    },
    devtool: args.mode === 'production' ? false : 'source-map',
  };
  switch (env.target) {
    case 'chrome':
      return merge(common, scripts, chrome);
    case 'firefox':
      return merge(common, scripts, firefox);
    default:
      return merge(common, scripts, dev);
  }
};

module.exports = config;
