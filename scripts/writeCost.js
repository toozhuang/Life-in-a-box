const mongoose = require("mongoose");
const credential = require("../config/keys");

mongoose.connect(
  credential.mongodb,
  { useNewUrlParser: true }
);

require("../model/Cost");

const data = require("../dumpdataset/cost.data");

console.log(data);

const moment = require("moment");

const Cost = mongoose.model("cost");

// console.log(moment().unix("2018-10-27 17:24:13"));

data.forEach(item => {
  Cost.create(
    {
      userId: "5bcf1c1acd36de22a09abcf2",
      category: item.category,
      subCategory: item.subCategory,
      costDate: moment().unix(item.costDate),
      cost: item.cost,
      note: item.note,
      accountBook: item.accountBook
    },
    (err, result) => {
      if (err) {
        console.log("ahaha , err");
      }
      console.log("generate the cost item");
    }
  );
});
