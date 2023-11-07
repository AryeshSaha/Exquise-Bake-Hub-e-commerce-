import Auth from "@/middlewares/auth";
import dbCon from "@/middlewares/dbCon"
import Review from "@/models/Reviews";

const handler = async (req, res) => {
    if(req.method !== "DELETE") {
        res.status(400).json({ success: false, error: "bad request" })
    }
    
    const { id } = req.query;
    const deletedReview = await Review.findByIdAndDelete(id);

    res.status(200).json({ success: true, deletedReview })
}

export default dbCon(Auth(handler))