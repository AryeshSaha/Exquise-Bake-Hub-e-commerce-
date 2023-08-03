import dbCon from "@/middlewares/dbCon";
import Product from "@/models/Product";

const handler = async (req, res) => {
    if (req.method == "POST") {
        try {
            for (let i = 0; i<req.body.length; i++) {
                let p = new Product({
                    title: req.body[i].title,
                    desc: req.body[i].desc,
                    img: req.body[i].img,
                    category: req.body[i].category,
                    flavor: req.body[i].flavor,
                    weight: req.body[i].weight,
                    slug: req.body[i].slug,
                    price: req.body[i].price,
                    availableQty: req.body[i].availableQty,
                  });
                  await p.save()
            }
            res.status(200).json({ msg: "success" });
        } catch (error) {
            res.status(500).json({ msg: "error", error });
        }
    } else res.status(400).json({ msg: "bad request" });

};

export default dbCon(handler);
