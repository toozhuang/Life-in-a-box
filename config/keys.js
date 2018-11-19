// prod.js 用来把

if (process.env.NODE_ENV == "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
