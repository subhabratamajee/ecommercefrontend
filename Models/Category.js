import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    catName: {
      type: String,
      default: "",
      required: [true, "Please provide the Category"],
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    properties: [{ type: Object }],
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
