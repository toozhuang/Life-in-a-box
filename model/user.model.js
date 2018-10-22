const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  usertype: String,
  type: String,
  email: String,
  token: String,
  comment: String
});

const User = mongoose.model("user", userSchema, "user");

module.exports = User;
