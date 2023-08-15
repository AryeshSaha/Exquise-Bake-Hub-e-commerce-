import dbCon from "@/middlewares/dbCon"

const Handler = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    res.status(200).json({ body: req.body })
}

export default dbCon(Handler)