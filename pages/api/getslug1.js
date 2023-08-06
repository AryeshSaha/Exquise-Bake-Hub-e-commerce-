import dbCon from "@/middlewares/dbCon";
import Product from "@/models/Product";

const handler = async (req, res) => {
  const mousse = await Product.findOne({ slug: req.body.slug });
  const variantsArr = await Product.find({ title: mousse.title });
  const variants = {}
  for (let variant of variantsArr) {
    if(variants[variant.flavor]){
        variants[variant.flavor].push({slug: variant.slug, weight: variant.weight})
    } else {
        variants[variant.flavor] = [{slug: variant.slug, weight: variant.weight}]
    }
  }

  res.status(200).json({ mousse, variants });
};

export default dbCon(handler);
