import dbCon from "@/middlewares/dbCon";
import Product from "@/models/Product";

const handler = async (req, res) => {
    if (req.method == "PUT") {
        try {
            for (let i = 0; i<req.body.length; i++) {
                let prods = await Product.findByIdAndUpdate(req.body[i]._id, req.body[i])
            }
            res.status(200).json({ msg: "update success" });
        } catch (error) {
            res.status(500).json({ msg: "update error", error });
        }
    } else res.status(400).json({ msg: "bad request" });

};

export default dbCon(handler);
