const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    products: {
      type: Object,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    // dump of the whole transaction
    paymentInfo: {
      type: Object,
      default: {},
    },
    status: {
      type: String,
      default: "Initiated", // Pending or Not paid
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

mongoose.models = {}

const Order = mongoose.model("Order", OrderSchema);

export default Order;