const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        main: './index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    context: path.resolve(__dirname, 'src'),

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CopyPlugin({
            patterns: [
              { from: path.resolve(__dirname, 'src', 'favicon.ico'), 
              to: path.resolve(__dirname, 'dist')},
            ],
          })
    ],

}