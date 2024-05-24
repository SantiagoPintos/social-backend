const path = require('path');
const glob = require('glob');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: {
    app: './src/app.ts',
    ...glob.sync(path.resolve("src/migrations/*.ts")).reduce((entries, filename) => {
      const migrationName = path.basename(filename, ".ts");
      return Object.assign({}, entries, {
        ['migrations/' + migrationName]: filename,
      });
    }, {}),
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
        extensions: ['.ts', '.js'],
        logLevel: 'info',
        baseUrl: './src',
      })
    ],
    extensions: ['.ts', '.js']
  },
  output: {
    clean: true,
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: false,
  }
};


