const path = require('path');

module.exports = require('./webpack.config.base')({
  mode: "development",
  devtool: 'eval-source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    overlay:true,
    compress: true,
    port: 9000,
    historyApiFallback: true,
    hot: true,
  },
  performance: {
    hints: false,
  },
});
