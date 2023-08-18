import dbCon from "@/middlewares/dbCon"
import User from "@/models/User";
import jwt from "jsonwebtoken"

const handler = async(req, res) => {
    if (req.method !== "GET") {
        res.status(400).json({ success: false, error: "bad request" })
    } else {
        const token = req.headers.authorization;
        if(!token) {
            res.status(500).json({ success: false, error: "couldn't fetch details."})
        } else {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decode.id).select("-password")

            res.status(200).json({ success: true, user })
        }
    }
}

export default dbCon(handler)