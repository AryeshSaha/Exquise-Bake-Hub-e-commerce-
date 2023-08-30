import dbCon from "@/middlewares/dbCon";
import Product from "@/models/Product";

const handler = async (req, res) => {
  const cake = await Product.findOne({ slug: req.body.slug });
  const variantsArr = await Product.find({ title: cake.title });

  const variants = {};
  for (let variant of variantsArr) {
    
    // simpler logic
    // variants : { flavor : [{ slug, weight }, more variants...], more flavors...}
    if(variants[variant.flavor]){
      variants[variant.flavor].push({slug: variant.slug, weight: variant.weight})
    } else {
      variants[variant.flavor] = [{slug: variant.slug, weight: variant.weight}]
    }
    
    // complex logic
    // variants : { flavor : { weight : { slug }}}
    // // check if ds already exists -> {flavor:{weight:{}}} and then add slug
    // if (Object.keys(variants).includes(variant.flavor)) {
    //   variants[variant.flavor][variant.weight] = { slug: variant.slug };
    // } else {
    //   // else first create ds -> {flavor:{}} then create "weight" key for "slug" value which acts as "flavor" key's value
    //   variants[variant.flavor] = {};
    //   variants[variant.flavor][variant.weight] = { slug: variant.slug };
    // }
  }

  res.status(200).json({ cake, variants });
};

export default dbCon(handler);
