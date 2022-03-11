const path = require('path');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV == 'development';

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  devtool: (isDevelopment ? 'cheap-module-source-map' : false),
  devServer: {
    port: 8888,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization"
    },
    hot: true
  },
  context: __dirname,
  entry: {
    main: './main.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../public/packs')
  },
  module: {
    rules: [
      {
        // CSS (.css, .scss)
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [
                  path.resolve(__dirname, 'stylesheets/modules')
                ],
                outputStyle: 'compressed'
              }
            }
          }
        ]
      },
      { // Javascript (.js, .jsx)
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                plugins: [
                  'babel-plugin-root-import',
                  '@babel/plugin-syntax-dynamic-import',
                  isDevelopment && require.resolve('react-refresh/babel')
                ].filter(Boolean),
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react'
                ]
              },
            },
          ],
      },
      { // static assets (images)
        test: /\.(jpg|png|gif|webp|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            }
          }
        ]
      }
    ]
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin()
  ].filter(Boolean)
}
