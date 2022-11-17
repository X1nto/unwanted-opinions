'use strict';

const path = require('path');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  build: path.resolve(__dirname, '../build'),
  buildChrome: path.resolve(__dirname, '../build-chrome'),
  buildFirefox: path.resolve(__dirname, '../build-firefox'),
};

module.exports = PATHS;
