const path = require('path');
const {ContextReplacementPlugin} = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: { server: './server.ts' },
  resolve: { extensions: ['.js', '.ts'] },
  target: 'node',
  mode: 'production',
  // in order to ignore all modules in node_modules folder
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }]
  },
  plugins: [
    // Temporary Fix for issue: https://github.com/angular/angular/issues/11580
    // for 'WARNING Critical dependency: the request of a dependency is an expression'
    new ContextReplacementPlugin(
      /(.+)?angular([\\/])core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {} // a map of your routes
    ),
    new ContextReplacementPlugin(
      /(.+)?express([\\/])(.+)?/,
      path.join(__dirname, 'src'),
      {}
    )
  ]
};
