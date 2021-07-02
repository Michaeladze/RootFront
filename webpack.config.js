// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
// получаем путь проекта
const dividor = __dirname.split('/').length - 1 ? '/' : '\\';

const __project = __dirname
  .split(dividor)
  .slice(0, -3)
  .join(dividor);


// =========================================================================
// открываем все свойства .env
const env = process.argv[process.argv.indexOf('--env') + 1] || 'development';
const fileEnv = dotenv.config({ path: `${__project}/.env.${env}` }).parsed;
// меняем версию
const envKeys = Object.keys(fileEnv)
  .reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});
// eslint-disable-next-line @typescript-eslint/no-var-requires
envKeys['process.env.REACT_APP_V'] = `"${require('../../../package.json').version}"`;
// =========================================================================


// =========================================================================
// console.clear();
console.log('\x1b[32m', '#########################################');
console.log('\x1b[36m', 'ENVIRONMENT:  ', env);
console.log(' PROJECT:     ', __project);
console.log(' ENV_PATH:    ', `${__project}/.env.${env}`);
console.log(' VER:         ', `${envKeys['process.env.REACT_APP_V']}`);
console.log('\x1b[32m', '#########################################');
console.log(envKeys);
// =========================================================================
module.exports = {
  entry: ['./src/singleSpaEntry.tsx'],
  output: {
    library: 'single-spa-worktime',
    libraryTarget: 'umd',
    filename: 'index.js',
    path: path.resolve(__project, 'module')
  },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.json'
    ],
    modules: [__dirname, 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: [path.resolve(__dirname, 'node_modules'), /spec\.(js|jsx|ts|tsx)$/]
      },
      {
        test: /\.html$/i,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.css|\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'scoped-css-loader'
          },
          {
            loader: 'sass-loader'
          }
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
        use: {
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        options: { name: 'assets/fonts/[name].[ext]' }
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'file-loader'
        },
        options: { name: 'assets/fonts/[name].[ext]' }
      }
    ]
  },
  node: { fs: 'empty' },
  stats: 'errors-only',

  plugins: [
    new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: [`../modules/${__project}`] }),
    new webpack.PrefetchPlugin('react'),
    new webpack.DefinePlugin(envKeys),
    new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
  ],
  externals: [],
  devServer: {
    historyApiFallback: true,
    writeToDisk: true
  }
};
