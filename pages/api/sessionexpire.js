import dbCon from "@/middlewares/dbCon";
import { parse, serialize } from "cookie";

const handler = async (req, res) => {
  if (req.headers.cookie) {
    const cookie = parse(req.headers.cookie);
    const token = cookie.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication token is missing" });
    }

    try {
      const clearCookie = serialize("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
        path: "/",
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
      });
      res.setHeader("Set-Cookie", clearCookie);
      res.status(200).json({
        success: true,
        msg: "Session Expired. Please Login Again",
      });
    } catch (error) {
      res.status(500).json({ msg: "error", error });
    }
  }
};

export default dbCon(handler);
