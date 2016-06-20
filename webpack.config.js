
const config = {
  entry: {
    bundle: './demo/entry.js',
    base: './demo/base.js',
    mini: './demo/mini.js',
    'react-router': './demo/react-router.js'
  },
  output: {
    path: __dirname + '/bundles',
    filename: '[name].js'
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
  devServer: {
    contentBase: 'demo',
    historyApiFallback: true
  }
}

module.exports = config

