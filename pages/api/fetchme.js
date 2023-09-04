import Auth from "@/middlewares/auth";
import dbCon from "@/middlewares/dbCon"
import User from "@/models/User";
import jwt from "jsonwebtoken"

const handler = async(req, res) => {
    if (req.method !== "GET") {
        res.status(400).json({ success: false, error: "bad request" })
    } else {
        const { user } = req
        res.status(200).json({ success: true, user })
    }
}

export default dbCon(Auth(handler))