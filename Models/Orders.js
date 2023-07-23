import mongoose from "mongoose";
mongoose.Promise = global.Promise;
const OrderSchema = new mongoose.Schema(
  {
    line_items: {
      type: Object,
    },
    name: {
      type: String,
      required:[true, "Please provide the name"]
    },
    email: {
      type: String,
      required:[true, "Please provide the email"]
    },
    mobile: {
      type: Number,
      required:[true, "Please provide the mobile"]
    },
    address: {
      type: String,
      required:[true, "Please provide the address"]
    },
    city: {
      type: String,
      required:[true, "Please provide the city"]
    },
    pin: {
      type: Number,
      required:[true, "Please provide the pin code"]
    },
    paid: {
      type: Boolean,
      default:false,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.models.order || mongoose.model("order", OrderSchema);
