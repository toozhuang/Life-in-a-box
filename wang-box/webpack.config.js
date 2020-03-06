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

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  module:{
    rules:[
      {
        test: /\.tsx?$/,  // 1⃣以tsx结尾的
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  plugins:[]
};
