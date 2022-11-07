const webpack = require(`webpack`);

const getConfig = () => ({
  devtool: `inline-source-map`,
  devServer: {
    historyApiFallback: true,
    open: false,
    compress: false,
    hot: true,
    client: { overlay: false },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});

module.exports = getConfig;
