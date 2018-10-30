const mongoose = require("mongoose");

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
