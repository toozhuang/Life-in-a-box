// import third libraries
var _ = require("lodash");

const mongoose = require("mongoose");
const moment = require("moment");

const Todolist = mongoose.model("todolist");

module.exports = app => {
  // 创建列表
  app.post("/api/todo/create", (req, res) => {
    console.log("come here");
    if (req.user) {
      if (req.body._id) {
      } else {
        // console.log(req.body);
        let todo = {};
        todo = req.body;
        Todolist.find({ listName: req.body.listName }).then(result => {
          if (result && result.length != 0) {
            console.log("search result", result);
            res.json({
              status: 200,
              message: "already have this list"
            });
            return;
          } else {
            console.log("do not have ?");
            Todolist.create(todo).then(result => {
              console.log("save ?", result);
              res.json({
                status: 200,
                message: "success generate this list"
              });
            });
          }
        });

        // res.json(req.body);
      }
    }
  });

  app.get("/api/todo/list", (req, res) => {
    if (req.user) {
      Todolist.find({}).then(result => {
        console.log("get all", result);
        res.json(result);
      });
    }
  });

  /**
   * 获取某一个todolist
   */
  app.get("/api/todo/get/:id", (req, res) => {
    console.log(req.params);
    res.json("haha");
  });
};
