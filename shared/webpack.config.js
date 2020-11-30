const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const config = {
  target: 'node',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  externals: [ nodeExternals() ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = config;