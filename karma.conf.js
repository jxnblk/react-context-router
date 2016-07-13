
var webpack = require('webpack')

var configuration = {
  browsers: [
    'Firefox'
  ],

  singleRun: true,

  files: [
    'karma.js'
  ],

  frameworks: [
    'mocha'
  ],

  plugins: [
    'karma-firefox-launcher',
    'karma-mocha',
    'karma-mocha-reporter',
    'karma-webpack'
  ],

  preprocessors: {
    'karma.js': [ 'webpack' ]
  },

  reporters: [ 'mocha' ],

  webpack: {
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        }
      ]
    },
    plugins: [
      new webpack.IgnorePlugin(/react\/lib\/ReactContext/),
      new webpack.IgnorePlugin(/react\/lib\/ExecutionEnvironment/)
    ]
  },

  webpackMiddleware: {
    noInfo: true
  },

  client: {
    mocha: {
      reporter: 'html',
      ui: 'bdd'
    }
  }
}

module.exports = function (config) {
  config.set(configuration)
}

