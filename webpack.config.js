const path = require('path');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
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
    extensions: ['.ts', '.js'],
    fallback:{
            "@sap/hana-client": false,
            "hdb-pool": false,
            "@google-cloud/spanner": false
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
    plugins: [
        //ignore the drivers you don't want. This is the complete list of all drivers -- remove the suppressions for drivers you want to use.
        new FilterWarningsPlugin({
            exclude: [/mongodb/, /mssql/, /mysql/, /mysql2/, /oracledb/, /pg/, /pg-native/, /pg-query-stream/, /react-native-sqlite-storage/, /redis/, /sql.js/, /typeorm-aurora-data-api-driver/]
        })
    ]
};


