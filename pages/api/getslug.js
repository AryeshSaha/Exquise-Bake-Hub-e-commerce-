import dbCon from "@/middlewares/dbCon";
import Product from "@/models/Product";

const handler = async (req, res) => {
  const cake = await Product.findOne({ slug: req.body.slug });
  const variants = await Product.find({ title: cake.title });

  // ds = {flavor:{weight:{slug}}}
  let flavorWeightSlug = {};
  for (let item of variants) {
    // check if ds already exists -> {flavor:{weight:{}}} and then add slug
    if (Object.keys(flavorWeightSlug).includes(item.flavor)) {
      flavorWeightSlug[item.flavor][item.weight] = { slug: item.slug };
    } else {
      // else first create ds -> {flavor:{}} then create "weight" key for "slug" value which acts as "flavor" key's value
      flavorWeightSlug[item.flavor] = {};
      flavorWeightSlug[item.flavor][item.weight] = { slug: item.slug };
    }
  }

  res.status(200).json({ cake, variants: flavorWeightSlug });
};

export default dbCon(handler);
