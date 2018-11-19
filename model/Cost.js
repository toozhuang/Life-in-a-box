// 基础设备的设置, 引入需要的library
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//  下面是一个非常basic的cost的design
const costSchema = new Schema(
  {
    userId: String,
    cost: String,
    category: String,
    subCategory: String,
    costDate: String, // use epoc to save storage
    note: String,
    accountBook: String
  },
  { collection: "cost", timestamps: true }
);

mongoose.model("cost", costSchema);
