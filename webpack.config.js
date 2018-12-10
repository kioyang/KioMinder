const path = require('path');
const ConsoleLogOnBuildWebpackPlugin = require(path.resolve(__dirname, 'ConsoleLogOnBuildWebpackPlugin.js'));
module.exports = {
  entry: {
    app: './src/index.ts',
  },
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
  },
    devtool: 'source-map',
    resolve: {
        extensions: [ ".js", ".ts"]
    },
    module: {
      rules: [
          { test: /\.ts?$/, loader: "ts-loader" }
      ],
    },
    mode: 'development',
    plugins: [
        new ConsoleLogOnBuildWebpackPlugin(),
    ]
};
