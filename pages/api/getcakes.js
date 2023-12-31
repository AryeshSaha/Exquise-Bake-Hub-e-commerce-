import dbCon from "@/middlewares/dbCon";
import Product from "@/models/Product";

const handler = async (req, res) => {
  try {
    const data = await Product.find({ category: "cakes" });
    const cakes = {};
    for (let cake of data) {
      const {
        title,
        desc,
        previewImg,
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
          previewImg,
          img,
          category,
          flavor,
          weight,
          price,
          availableQty,
        });
        //   }
      } else {
        cakes[title] = [
          {
            slug,
            desc,
            previewImg,
            img,
            category,
            flavor,
            weight,
            price,
            availableQty,
          },
        ];
      }
    }

    res.status(200).json({ cakes });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default dbCon(handler);
