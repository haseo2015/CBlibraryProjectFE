const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const { NODE_ENV = 'production' } = process.env;
const config = {
  mode: NODE_ENV,
  target: 'node',
  entry: './app.js',
  watch: NODE_ENV === 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals: [ nodeExternals() ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/dist/',
    port: 3000
  }
};

module.exports = config;