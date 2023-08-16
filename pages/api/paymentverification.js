import dbCon from "@/middlewares/dbCon";
import Order from "@/models/Order";
import crypto from "node:crypto";

const Handler = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  // verify payment
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.RZP_KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  //   console.log("sign received: ", razorpay_signature);
  //   console.log("sign generated: ", expectedSign);

  //   update order collection
  try {
    if (expectedSign == razorpay_signature) {
      const order = await Order.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { status: "Paid", paymentInfo: req.body }
      );
      res.status(200).redirect(`/order?orderId=${order.orderId}`);
    } else {
      const order = await Order.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { status: "Pending", paymentInfo: req.body }
      );
      res.status(400).json({ msg: "Payment Verification Failed" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default dbCon(Handler);
