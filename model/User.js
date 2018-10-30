// // 创建 mongodb 的model
// const mongoose = require("mongoose");

// // 下面是新的es6的声明方法
// // const Schema = mongoose.Schema;
// const { Schema } = mongoose;

// // 注意这个string是大写的String
// const userSchema = new Schema({
//   googleId: String,
//   username: String,
//   password: String,
//   email:String,
// });

// mongoose.model("users", userSchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// note: 注意 如果没有备注collection的名字, 那么就会默认创建一个user负数的collection, users
const userSchema = new Schema(
  {
    username: { type: String },
    password: String,
    usertype: String,
    type: String,
    email: {
      type: String,
      lowercase: true,
      required: [true, "can not be blank"],
      index: true
    },
    token: String,
    comment: String
  },
  { collection: "user", timestamps: true }
);


// userSchema.methods.setPassword = (password)=>{

// }

mongoose.model("user", userSchema);

// module.exports = User;
