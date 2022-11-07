const { merge } = require(`webpack-merge`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const { CleanWebpackPlugin } = require(`clean-webpack-plugin`);
const paths = require(`./paths`);

const projectConfig = require(`./project.config`);
const isAvailable = {
  engine2d: () => projectConfig.engine2d,
};

const getEntry = () => {
  const entries = {};

  if (isAvailable.engine2d()) {
    entries.engine2d = paths.engine2d;
  }

  // return {
  //   ...entries,
  //   main: `${paths.src}/scripts/main.js`,
  // };
  return [
    ...Object.values(entries),
    `${paths.src}/scripts/main.js`,
  ];
};

const getConfig = (env) => {
  const mode = env.mode || `production`;
  const defaultConfig = {
    mode,
    entry: getEntry(),
    output: {
      path: paths.dist,
      filename: `[name].js`,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [`babel-loader`],
        },
        {
          test: /\.(s[ac]ss|css)$/,
          use: [
            { loader: `style-loader` },
            { loader: `css-loader` },
            {
              loader: `postcss-loader`,
              options: {
                postcssOptions: {
                  config: `wp_config/postcss.config.js`,
                },
              },
            },
            { loader: `sass-loader` },
          ],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          use: [
            {
              loader: `url-loader`,
            },
          ],
          type: `javascript/auto`,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `${paths.src}/template/index.html`,
        filename: `index.html`,
      }),
      new CleanWebpackPlugin(),
    ],
  };
  const modePathMap = {
    production: `prod.config`,
    development: `dev.config`,
  };
  const modeConfig = require(`./${modePathMap[mode]}`);

  return merge(defaultConfig, modeConfig(env));
};

module.exports = getConfig;
