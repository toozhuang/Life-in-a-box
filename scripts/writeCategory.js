const mongoose = require("mongoose");

const credential = require("../config/keys");

mongoose.connect(
  credential.mongodb,
  { useNewUrlParser: true }
);

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    userId: String,
    category: String,
    subCategory: [String],
    accountBook: String
  },
  {
    collection: "category",
    timestamps: true
  }
);

mongoose.model("category", categorySchema);

// set some dump data for now

const dumpData = [
  {
    category: "家庭投资",
    subCategory: [
      "Toowong水费开销",
      "Toowong物业费",
      "Manilla市政开销",
      "Toowong市政费",
      "Manilla物业开销",
      "Manilla水费"
    ],
    accountBook: "日常账本"
  },
  {
    category: "休闲娱乐",
    subCategory: ["饭局聚会", "旅游交通"],
    accountBook: "日常账本"
  },
  {
    category: "提升储备",
    subCategory: ["孝敬父母", "学习培训", "人情侣物"],
    accountBook: "日常账本"
  },
  {
    category: "购物消费",
    subCategory: ["数码产品", "衣物鞋帽", "家具电器", "美妆护肤", "家具日用"],
    accountBook: "日常账本"
  },
  {
    category: "居家生活",
    subCategory: [
      "油费",
      "水电燃气",
      "手机网费",
      "食品酒水",
      "房租住店",
      "外出吃饭",
      "公共交通",
      "医疗药品"
    ],
    accountBook: "日常账本"
  }
];

dumpData.forEach(item => {
  mongoose
    .model("category")
    .create({
      category: item.category,
      subCategory: item.subCategory,
      userId: "5bcf1c1acd36de22a09abcf2",
      accountBook: item.accountBook
    })
    .then((err, result) => {
      if (err) {
        console.log(err);
      }
      console.log("result: ", result);
    });
});
