const path = require('path');
const prefixer = require('postcss-prefix-selector');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const dotenv = require('dotenv');

const argv = process.argv.indexOf('--env') + 1;
const env = process.argv[argv] || 'development';

// Create the fallback path (the production .env)
const basePath = `${path.join(__dirname)}/.env.${env}`;
// Set the path parameter in the dotenv config
const fileEnv = dotenv.config({ path: basePath }).parsed;

// Reduce it to a nice object, the same as before (but with the variables from the file)
const envKeys = Object.keys(fileEnv)
  .reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

const __dirname_arr = __dirname.split('/');
const __dirname_up = [...__dirname_arr.slice(0, -1)].join('/');
const __project = __dirname_arr.slice(-1)[0];

console.clear();
console.log('\x1b[32m', '#########################################');
console.log('\x1b[36m', 'ENVIRONMENT:  ', env);
console.log(' DIR:         ', __dirname_up);
console.log(' PROJECT:     ', __project);
console.log(' ENV_PATH:    ', basePath);
console.log('\x1b[32m', '#########################################');

const prefix = envKeys['process.env.REACT_APP_NAME'] ? '#' + envKeys['process.env.REACT_APP_NAME'] : '';

if (!prefix) {
  throw new Error('Не задано название приложения REACT_APP_NAME');
}

module.exports = {
  entry: ['src/singleSpaEntry.tsx'],
  output: {
    library: 'single-spa-worktime',
    libraryTarget: 'umd',
    filename: 'index.js',
    path: path.resolve(__dirname_up, `_feedback/modules/${__project}`)
  },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js'
    ],
    modules: [__dirname, 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.tsx$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.js?$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: [
          'babel-loader', 'eslint-loader'
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.css|\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: require.resolve('postcss-loader'),
            options: {
              plugins: () => [
                prefixer({
                  prefix: prefix
                })
              ]
            }
          },
          'resolve-url-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader?limit=10000',
            options: { name: 'assets/img/[name].[ext]' }
          }
        ]
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'assets/svg/[name].[ext]' }
          }
        ]
      },
      {
        test: /\.(mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'assets/mp3/[name].[ext]' }
          }
        ]

      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        options: { name: 'assets/fonts/[name].[ext]' }
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: { name: 'assets/fonts/[name].[ext]' }
      }
    ]
  },
  node: { fs: 'empty' },
  stats: 'errors-only',

  plugins: [
    new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: [`../modules/${__project}`] }),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new webpack.PrefetchPlugin('react'),
    new webpack.DefinePlugin(envKeys),
    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ],
  devtool: 'source-map',

  externals: [],
  devServer: {
    historyApiFallback: true,
    writeToDisk: true
  }
};
