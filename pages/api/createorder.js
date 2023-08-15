import dbCon from "@/middlewares/dbCon";
import Razorpay from "razorpay";

const handler = async (req, res) => {

    const { amount } = req.body;

    const rzp = new Razorpay({ key_id: process.env.RZP_KEY_ID, key_secret: process.env.RZP_KEY_SECRET });

    const options = {
        amount: amount*100,  // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
      };
    const order = await rzp.orders.create(options)

    if (!order) console.log("no output")
    else res.status(200).json({ order });
}

export default dbCon(handler)