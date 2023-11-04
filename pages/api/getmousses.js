import dbCon from "@/middlewares/dbCon";
import Product from "@/models/Product";

const handler = async (req, res) => {
  try {
    const data = await Product.find({ category: "mousse" });
    const mousses = {};
    for (const mousse of data) {
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
      } = mousse;

      if (title in mousses) {
        // If the title exists, add the mousse as a variant in the existing group
        mousses[title].push({
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
      } else {
        // If the title does not exist, create a new group and add the mousse as the main mousse
        mousses[title] = [
          { slug, desc, previewImg, img, category, flavor, weight, price, availableQty },
        ];
      }
    }

    res.status(200).json({ mousses });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default dbCon(handler);
