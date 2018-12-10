const path = require('path');
const ConsoleLogOnBuildWebpackPlugin = require(path.resolve(__dirname, 'ConsoleLogOnBuildWebpackPlugin.js'));
module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
  },
    mode: 'development',
    plugins: [
        new ConsoleLogOnBuildWebpackPlugin(),
    ]
};
