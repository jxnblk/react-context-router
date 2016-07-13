
const webpack = require('webpack')

const config = {
  entry: './demo/entry.js',
  output: {
    path: __dirname + '/demo',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  devServer: {
    contentBase: 'demo',
    historyApiFallback: true
  }
}

module.exports = config

