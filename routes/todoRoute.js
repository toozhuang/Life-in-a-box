// import third libraries
var _ = require("lodash");

const mongoose = require("mongoose");
const moment = require("moment");

const Task = mongoose.model("task");
const Todo = mongoose.model("todo");

module.exports = app => {
  // 创建task列表
  app.post("/api/task/create", (req, res) => {
    console.log("come here");
    if (req.user) {
      if (req.body._id) {
      } else {
        // console.log(req.body);
        let todo = {};
        todo = req.body;
        todo = {
          ...todo,
          ...{ userId: req.user.id }
        };
        Task.find({ listName: req.body.listName }).then(result => {
          if (result && result.length != 0) {
            console.log("search result", result);
            res.json({
              status: 200,
              message: "already have this list"
            });
            return;
          } else {
            console.log("do not have ?");
            Task.create(todo).then(result => {
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

  // 创建属于task的todo item
  app.post("/api/todo", (req, res) => {
    if (req.user) {
      // todo:这个以后可以添加一个判断, 就是能存储的todoitem必须要属于某个task
      let todo = {};
      // console.log(req.body.taskList);
      // then is update function
      todo = req.body.taskList;
      console.log("todo: ", todo);
      if (req.body.taskList._id) {
        Todo.findById(todo._id).then(result => {
          //  这个要更改所有的值, 在这个里面
          result.title = todo.title;
          result.status = todo.status;
          result.note = todo.note;
          result.subTodo = todo.subTodo;
          console.log("so : ,", result);
          // TODO:
          result.save().then(value => {
            console.log("test ", value);
            res.json({
              status: 200,
              message: "success update the todo ",
              todo: value
            });
          });
        });
      } else {
        todo = { ...todo, ...{ userId: req.user.id } };
        Todo.create(todo).then(result => {
          console.log(result);
          res.json({
            message: "success",
            status: 200,
            todo: result
          });
        });
      }
    }
  });

  app.post("/api/todo/list/:listid", (req, res) => {
    if (req.user) {
      Task.findById(req.params.listid).then(result => {
        result.taskList.forEach((element, index) => {
          console.log(
            typeof element._id,
            req.body.taskList._id,
            element._id.toString() === req.body.taskList._id
          );
          if (element._id.toString() === req.body.taskList._id) {
            console.log(" come in ?");
            result.taskList[index] = {
              content: req.body.taskList.content,
              status: req.body.taskList.status
            };
          }
        });

        // console.log("demo: ", result.taskList);
        Task.update({ listName: result.listName }, result).then(value => {
          console.log(value);
          res.json({
            message: "success update the todo Item",
            status: 200
          });
        });
      });
    }
  });

  //获取某一个task
  app.get("/api/task/:task", (req, res) => {
    console.log(req.user._id)
    if (req.user) {
      console.log(req.params.task);
      Task.find({ name: req.params.task , userId: req.user._id}).then(result => {
        console.log("get all", result);
        res.json(result);
      });
    }
  });

  //获取task下面的所有todo
  app.get("/api/todo/:taskId/list", (req, res) => {
    if (req.user) {
      console.log(req.params.task);
      Todo.find({ taskId: req.params.taskId }).then(result => {
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
