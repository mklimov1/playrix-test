const TerserPlugin = require(`terser-webpack-plugin`);

const getConfig = () => ({
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
});

module.exports = getConfig;
