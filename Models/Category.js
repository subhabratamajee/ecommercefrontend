import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    catName: {
      type: String,
      default: "",
      required: [true, "Please provide the Category"],
    },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    properties: [{ type: Object }],
  },
  { timestamps: true }
);

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
