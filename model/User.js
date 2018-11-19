

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// note: 注意 如果没有备注collection的名字, 那么就会默认创建一个user负数的collection, users
const userSchema = new Schema(
  {
    username: { type: String },
    password: String,
    usertype: String,
    type: String,
    thirdId: String,
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
