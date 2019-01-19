const path = require('path');
const ConsoleLogOnBuildWebpackPlugin = require(path.resolve(__dirname, 'ConsoleLogOnBuildWebpackPlugin.js'));
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.ts',
  },
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
  },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devtool: "inline-source-map",
    module: {
      rules: [
          { test: /\.ts?$/, loader: "ts-loader" },
          {
              test: /\.css$/,
              use: [
                  'style-loader',
                  { loader: 'css-loader', options: { importLoaders: 1 } },
                  'postcss-loader'
              ]
          },
          {
              test: /\.(png|svg|jpg|gif)$/,
              use: [
                  'file-loader'
              ]
          },
      ],
    },
    mode: 'development',
    plugins: [
        new ConsoleLogOnBuildWebpackPlugin(),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'KioMinder',
            template: path.resolve(__dirname, 'src/index.html'),
        })
    ]
};
