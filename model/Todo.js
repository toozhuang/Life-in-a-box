const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    userId: String,
    name : String
  },
  {
    collection: "task",
    timestamps: true
  }
);

mongoose.model("task", taskSchema);

// 外面是task, 里面是一个个的list,
// 所以外面叫tasklist
// 里面叫todolist

const todoSchema = new Schema(
  {
    taskId: String,
    userId: String,
    title: String,
    note:String,
    deadLine: String,
    status: Boolean,
    subTodo:[{
      title:String,
      status: Boolean
    }]
    //  需要更多的 后面再添加就行了
  },
  {
    collection: "todo",
    timestamps: true
  }
);

mongoose.model("todo", todoSchema);
