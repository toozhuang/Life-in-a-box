/****
 *  下面是webpack的模版
 * @type {path.PlatformPath | path}

 module.exports = {
  entry: "",
  output: {},
  module: {},
  plugins: []
};
 */

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: "./src/index.tsx",
  output: {
    // filename: 'bundle.[hash].js',
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist')
  },
  // output: {
  //   path: path.resolve(__dirname, "build"),
  //   filename: "bundle.js"
  // },

  // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,  // 以tsx结尾的
        loader: 'awesome-typescript-loader'
      },
      // css-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
      // scss-loader
      {
        test: /\.s[ac]ss$/i,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
  ],
  devtool: 'eval-source-map'
};
