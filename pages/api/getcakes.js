import dbCon from "@/middlewares/dbCon";
import Product from "@/models/Product";

const handler = async (req, res) => {
  const data = await Product.find({ category: "cakes" });
  const cakes = {};
  for (let cake of data) {
    console.log("cake: ", cake)
    const {
      title,
      desc,
      img,
      category,
      flavor,
      weight,
      slug,
      price,
      availableQty,
    } = cake;
    // the title becomes unique in the cakes object
    if (title in cakes) {
        cakes[title].push({
          slug,
          desc,
          img,
          category,
          flavor,
          weight,
          price,
          availableQty,
        });
    //   }
    } else {
      cakes[title] = [{ slug, desc, img, category, flavor, weight, price, availableQty },]
    }
  }

  res.status(200).json({ cakes });
};

export default dbCon(handler);
