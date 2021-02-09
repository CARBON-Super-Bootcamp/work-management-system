const path = require('path');

module.exports = {
  entry: {
    task: './src/task/app.js',
    worker: './src/worker/app.js',
    performance: './src/performance/api/app.js',

  },
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './www',
    port: 5757,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
