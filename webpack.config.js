const path = require('path');

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  mode: NODE_ENV || 'production',
  entry: { 'main.js': './src/main/javascript/main.js' },
  output: {
    path: path.resolve(__dirname, './src/main/resources/META-INF/resources/'),
    filename: '[name]',
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
      },
    ],
  },
};
