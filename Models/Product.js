import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: [true, "Please provide the  Product Name"],
    },
    category: {
      type: mongoose.Types.ObjectId,
      'ref':'Category',
    },
    properties: {
      type:Object
    },
 
    images: [{
      type: String,
      required:[true, "Please provide the description"]
    }],
    desc: {
      type: String,
      required:[true, "Please provide the description"]
    },
    price: {
      type: Number,
      required:[true, "Please provide the price"]
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
