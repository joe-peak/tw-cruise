const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  devServer: {
  },
  resolve: {
    extensions: ['.js', 'jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        use: {
          loader: 'url-loader',
          options: {
              limit: 1024,
          }
        }
      },
      {
        test: /\.svg$/,
        use: ['file-loader', 'svg-inline-loader']
      },
      // {
      //   test: /\.svg$/,
      //   exclude: /node_modules/,
      //   use: [
      //     'file-loader',
      //     {
      //       loader: 'svg-react-loader',
      //       options: {
      //           tag: 'symbol',
      //           // attrs: {
      //           //     title: 'log',
      //           // },
      //           name: 'SVG',
      //       },
      //   }],
      // }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
};