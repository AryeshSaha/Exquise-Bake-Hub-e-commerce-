import Auth from "@/middlewares/auth";
import dbCon from "@/middlewares/dbCon";
import Order from "@/models/Order";

const handler = async (req, res) => {
  if (req.method == "GET") {
    const { orderId } = req.query;
    const order = await Order.findOne({ orderId });

    res.status(200).json({ order });
  } else res.status(400).json({ msg: "bad request" });
};

export default dbCon(Auth(handler));
