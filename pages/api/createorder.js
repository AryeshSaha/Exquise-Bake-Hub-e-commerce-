import dbCon from "@/middlewares/dbCon";
import Order from "@/models/Order";
import Razorpay from "razorpay";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { name, email, products, amount, address, phone, pincode } = req.body

    // Review: tampering of cart items
    
    // Review: details validity

    // Review: if items are out of stock

    const rzp = new Razorpay({
      key_id: process.env.RZP_KEY_ID,
      key_secret: process.env.RZP_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      notes: {
        name,
        phone,
        email,
        pincode,
        address,
      },
    };
    // create an order
    const order = await rzp.orders.create(options);

    // create a doc of the order and store it in the db collection
    const order1 = await Order.create({
      email,
      products,
      orderId: order.id,
      amount,
      address,
    })

    if (!order) console.log("no order is created");
    else res.status(200).json({ order });
  } else {
    res.status(400).json({ msg: "bad request" });
  }
};

export default dbCon(handler);
