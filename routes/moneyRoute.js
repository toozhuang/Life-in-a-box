const passport = require("passport");
var _ = require("lodash");
const cors = require("cors");

const mongoose = require("mongoose");
const moment = require("moment");

const Cost = mongoose.model("cost");
const Category = mongoose.model("category");

/**
 * This is a route relate to the money route
 */
module.exports = app => {
  app.use(cors());

  /**
   * return all the cost list
   */
  app.get("/api/money/costList", (req, res) => {
    if (req.user) {
      // console.log("登录成功了", Cost);
      // console.log(req.user.id);
      const options = { sort: { costDate: 1 } };
      Cost.find({ userId: req.user.id })
        .sort({ costDate: - 1 })
        .then(results => {
          // filter the date type
          results.forEach(item => {
            item.costDate = moment
              .unix(item.costDate)
              .format("MM-DD-YYYY HH:mm");
          });
          // console.log(results);
          res.json(results);
        });

      //   res.send("登录成功");
      return;
    }

    console.log(req.user);
    res.send("jpwa re upi");
  });

  app.get("/api/money/categoryList", (req, res) => {
    if (req.user) {
      Category.find({ userId: req.user.id }).then(result => {
        // console.log('come here ? ')
        res.json(result);
      });
    }
  });

  app.get("/api/money/accountBookList", (req, res) => {
    if (req.user) {
      Category.find({ userId: req.user.id }).then(result => {
        // console.log("come here ? ", result);
        let typeList = [];
        result.forEach(item => {
          console.log(item.accountBook);
          typeList.push(item.accountBook);
        });

        // typeList.filter((value, index, self) => {
        //   return self.indexOf(value) === index;
        // });
        // console.log("typescript: ", typeList);
        res.json(_.uniq(typeList));
      });
    }
  });

  app.post("/api/money/cost", (req, res) => {
    if (req.user) {
      // console.log(req.body);
      // 判断传入的操作是更新还是插入
      if (req.body._id) {
        Cost.findById(req.body._id).then(result => {
          // console.log("result", result);
          // result = {
          //   ...result,
          //   ...req.body
          // };
          result.cost = req.body.cost;
          result.note = req.body.note;
          result.category = req.body.category;
          result.subCategory = req.body.subCategory;
          result.accountBook = req.body.accountBook;
          result.costDate = moment().unix(req.body.costDate);
          result.save().then(result => {
            // console.log("save ?");
            res.json({
              status: 200,
              message: "保存成功"
            });
          });
        });
      } else {
        let cost = {};

        // 那么这个时候就不是更新, 而是创建新的
        cost.cost = req.body.cost;
        cost.note = req.body.note;
        cost.category = req.body.category;
        cost.subCategory = req.body.subCategory;
        cost.accountBook = req.body.accountBook;
        cost.costDate = moment().unix(req.body.costDate);
        cost.userId = req.user._id;

        console.log("come here to create : ", cost);
        Cost.create(cost).then(result => {
          console.log("save ?");
          res.json({
            status: 200,
            message: " 创建成功"
          });
        });
      }
    }
  });
};
