import dbCon from "@/middlewares/dbCon"
import Review from "@/models/Reviews";

const handler = async (req, res) => {
    if(req.method !== "POST") {
        res.status(400).json({ success: false, error: "bad request" })
    }
    
    const { title } = req.body;
    const reviews = await Review.find({ title }).populate("author");

    res.status(200).json({ success: true, reviews })
}

export default dbCon(handler)