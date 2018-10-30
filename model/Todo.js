const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoListSchema = new Schema(
  {
    userID: String,
    listName: String,
    taskList: [
      {
        content: String,
        deadLine: String,
        status: Boolean
      }
    ]
  },
  {
    collection: "todolist",
    timestamps: true
  }
);

mongoose.model("todolist", todoListSchema);
