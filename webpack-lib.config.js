// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// =========================================================================
module.exports = {
  entry: ['./src/index.ts'],
  output: {
    filename: 'index.js',
    publicPath: '',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'commonjs'
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
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: 'babel-loader',
        exclude: [path.resolve(__dirname, 'node_modules'), /spec\.(js|jsx|ts|tsx)$/]
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
          'resolve-url-loader'
        ]
      },
      {
        test: /\.css|\.scss$/,
        use: ['scoped-css-loader'],
        exclude: [path.resolve(__dirname, 'node_modules'), /src\/styles\/vendor\/*/]
      },
      {
        test: /\.css|\.scss$/,
        loader: ['sass-loader']
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
  externals: {
    'react': "react",
    'react-dom': "react-dom",
    'react-router-dom':"react-router-dom"
  },
  devServer: {
    historyApiFallback: true,
    writeToDisk: true
  }
};
