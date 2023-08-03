import dbCon from "@/middlewares/dbCon";
import Product from "@/models/Product";

const handler = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({ products });
};

export default dbCon(handler);
