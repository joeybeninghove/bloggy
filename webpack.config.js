const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  devtool: "source-map",
  output: {
    filename: 'scripts.js',
    path: path.resolve(__dirname, 'assets'),
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [ /node_modules/ ],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["env"],
              plugins: ["transform-class-properties"]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'src/styles'),
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: true,
              }
            },
            'postcss-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: 'src/templates/base.html',
      filename: '../_layouts/base.html',
      hash: true
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    }),
    new CopyWebpackPlugin([{
      from: path.resolve('src/images')
    }]),
    new CopyWebpackPlugin([{
      from: path.resolve('src/images/favicons/favicon.ico'),
      to: path.resolve('./')
    }]),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:4000',
      files: ['_site', '_src']
    }),
    new MinifyPlugin()
  ],
};
