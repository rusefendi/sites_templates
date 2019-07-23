const path = require('path');
const glob = require('glob');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const generateHTMLPlugins = () =>
  glob.sync('./src/*.html').map(
    dir =>
      new HtmlWebpackPlugin({
        filename: path.basename(dir),
        template: dir
      })
  );

module.exports = {
  entry: {
    main: path.resolve('src', 'js', 'index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.scss/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 2 }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'static/img'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...generateHTMLPlugins(),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css'
    })
  ]
};
