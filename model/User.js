// 创建 mongodb 的model
const mongoose = require("mongoose");

// 下面是新的es6的声明方法
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

// 注意这个string是大写的String
const userSchema = new Schema({
  googleId: String,
  username: String,
  password: String
});

mongoose.model("users", userSchema);
