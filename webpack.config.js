'use strict';

const path = require('path');
const env = process.env.NODE_ENV || 'development';

module.exports = {
  mode: env,
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/env',
              '@babel/typescript',
            ],
            plugins: [
              '@babel/proposal-class-properties',
              '@babel/proposal-object-rest-spread',
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
  },
};

