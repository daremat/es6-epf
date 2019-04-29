const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  watch: false, //watch changes to rebuild automatically ; otherwise you can use webpack-dev-server ('npm run dev' then localhost:8080)
  // mode: 'production',
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  entry: {
    welcome: './src/app/modules/welcome/welcome.js',
    game: './src/app/modules/game/game.js',
    end: './src/app/modules/end/end.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      files: {
        chunks: {
          welcome: {
            entry: './src/app/modules/welcome/welcome.js'
          },
          game: {
            entry: './src/app/modules/game/game.js'
          },
          end: {
            entry: './src/app/modules/end/end.js'
          }
        }
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/app/modules/welcome/welcome.html',
      chunks: ['welcome']
    }),
    new HtmlWebpackPlugin({
      filename: 'game.html',
      template: './src/app/modules/game/game.html',
      chunks: ['game']
    }),
    new HtmlWebpackPlugin({
      filename: 'end.html',
      template: './src/app/modules/end/end.html',
      chunks: ['end']
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash:8].js'
  },
  resolve: {
    alias: {
      App: path.resolve(__dirname, 'src/app/'),
      Assets: path.resolve(__dirname, 'src/assets/'),
      Styles: path.resolve(__dirname, 'src/styles/')
    }
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'link:href']
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};
