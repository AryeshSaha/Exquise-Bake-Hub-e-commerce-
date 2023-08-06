import dbCon from "@/middlewares/dbCon";
import Product from "@/models/Product";

const handler = async (req, res) => {
  const data = await Product.find({ category: "cakes" });
  const cakes = {};
  for (let cake of data) {
    // the title becomes unique in the cakes object
    if (cake.title in cakes) {
      if (
        // if cake of weight 1 pound already exists in cake obj then don't add else add 1 pound is also available(variety of weight is the point here)
        !cakes[cake.title].weight.includes(cake.weight) &&
        // if that particular cake item of a particular weight is available or not
        cake.availableQty > 0
      ) {
        cakes[cake.title].weight.push(cake.weight);
      }
    } else {
      // create a new entry in the cakes object with this title
      cakes[cake.title] = JSON.parse(JSON.stringify(cake));
      if (cake.availableQty > 0) {
        // make the weight key an array data structure
        cakes[cake.title].weight = [cake.weight];
      }
    }
  }

  res.status(200).json({ cakes });
};

export default dbCon(handler);
