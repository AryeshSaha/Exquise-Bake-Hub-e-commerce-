import dbCon from "@/middlewares/dbCon";
import Order from "@/models/Order";
import User from "@/models/User";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { token } = req.body;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded?.id);
      const orders = await Order.find({ email: user?.email });
      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else res.status(400).json({ msg: "bad request" });
};
export default dbCon(handler);
