const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {

  const isProd = argv.mode === 'production'
  const isDev = !isProd

  const filename = ext => isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`

  if(isProd) {
    console.log('production')
  } else {
    console.log('development')
  }

  return {
    target: 'web',
    entry: {
        main: ['@babel/polyfill', './index.js']
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    context: path.resolve(__dirname, 'src'),

    resolve: {
        extensions: ['.js'],
        alias: {
            // '@modules': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    devServer: {
      port: '3600',
      open: true,
      hot: true
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CopyPlugin({
            patterns: [
              { from: path.resolve(__dirname, 'src', 'favicon.ico'), 
              to: path.resolve(__dirname, 'dist')},
              { from: path.resolve(__dirname, 'src/img'), 
              to: path.resolve(__dirname, 'dist/img')}
            ],
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ],
    devtool: isDev ? 'source-map' : false,
    module: {
        rules: [
          {
            test: /\.s[ac]ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                  loader: "postcss-loader",
                  options: {
                    postcssOptions: {
                      plugins: () => [
                        autoprefixer
                      ],
                    },
                  },
                },
                'sass-loader'
            ],
          },
          {
            test: /\.m?js$/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ],
      },
}
}