import Auth from "@/middlewares/auth";
import dbCon from "@/middlewares/dbCon";
import Order from "@/models/Order";

const handler = async (req, res) => {
  if (req.method == "GET") {
    const { user } = req;
    try {
      const orders = await Order.find({ email: user.email });
      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json({ msg: "Try signing in again" });
    }
  } else res.status(400).json({ msg: "bad request" });
};
export default dbCon(Auth(handler));
