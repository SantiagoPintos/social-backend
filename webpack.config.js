const path = require('path');
const glob = require('glob');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

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
  externals: {
    "sqlite3": 'commonjs sqlite3',
    "better-sqlite3": 'commonjs better-sqlite3',
  },
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
    extensions: ['.ts', '.js'],
    fallback:{
            "@sap/hana-client": false,
            "hdb-pool": false,
            "@google-cloud/spanner": false
    }
  },
  output: {
    clean: true,
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: false,
  },
  plugins: [
      new FilterWarningsPlugin({
          exclude: [/mongodb/, /mssql/, /mysql/, /mysql2/, /oracledb/, /pg/, /pg-native/, /pg-query-stream/, /react-native-sqlite-storage/, /redis/, /sql.js/, /typeorm-aurora-data-api-driver/]
      })
  ]
};


