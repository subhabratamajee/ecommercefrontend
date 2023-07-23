import mongoose from "mongoose";
mongoose.Promise = global.Promise;
const ProductSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: [true, "Please provide the  Product Name"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.models.product || mongoose.model("product", ProductSchema);
// module.exports = MyProduct;
