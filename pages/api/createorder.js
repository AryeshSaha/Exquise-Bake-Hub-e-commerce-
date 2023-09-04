import dbCon from "@/middlewares/dbCon";
import Order from "@/models/Order";
import Product from "@/models/Product";
import Razorpay from "razorpay";
import pincodes from "../../pincodes.json"
import Auth from "@/middlewares/auth";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { name, email, products, amount, address, phone, pincode } = req.body

    let product;
    for(let i in products){
      product = await Product.findOne({ slug: i })

      // * Pincode check
      if(!Object.keys(pincodes).includes(pincode)){
        console.log(pincode)
        res.status(500).json({ success: false, error: "Sorry, We don't provide service in your area." })
        return;
      }

      // * if amount = 0 then no transaction
      if (amount === 0) {
        res.status(403).json({ success: false, error: "Can't pay just Rs.0.00 Come on now" })
        return;
      }
      
      // * if availableQty  is less than ordered qty
      if (product.availableQty < products[i].qty) {
        res.status(500).json({ success: false, error: "Unavailable, try reducing the quantity." })
        return;
      }

      // * tampering of cart items is getting checked
      if (product.price != products[i].price) {
        res.status(403).json({ success: false, error: "Prices have been tampered with. Try again." })
        return;
      }
    }

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

    if (!order) res.status(500).json({ success: false, error: "couldn't create order" });
    else res.status(200).json({ success: true, order });
  } else {
    res.status(400).json({ success: false, error: "bad request" });
  }
};

export default dbCon(Auth(handler));
