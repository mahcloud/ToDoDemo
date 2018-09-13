const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = (env, argv) => {
  const plugins = [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname,"assets/webpack_template.html"),
      filename: "index.html",
      inject: "body"
    })
  ];

  return {
    mode: env.production ? "production" : "development",
    devServer: {
      historyApiFallback: true,
      port: 3663
    },
    devtool: env.production || env.nodevtools ? false : "inline-eval-cheap-source-map",
    entry: {
      index: ["babel-polyfill", "./src/index.js"]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            { loader: "babel-loader" },
            {
              loader: "eslint-loader",
              options: {
                emitWarning: true,
                failOnWarning: false
              }
            }
          ]
        }, {
          test: /\.style.js$/,
          exclude: /node_modules/,
          loader: "stylelint-custom-processor-loader",
          options: {
            emitWarning: true
          }
        }, {
          test: /\.(svg|png|gif|jpe?g)$/,
          exclude: /node_modules/,
          use: [{
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]"
            }
          }]
        }
      ]
    },
    output: {
      filename: "[name].[chunkhash].js",
      path: path.join(__dirname, "public")
    },
    plugins: plugins
  }
};
