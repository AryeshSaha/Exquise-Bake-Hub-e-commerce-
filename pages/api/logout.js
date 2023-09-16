import Auth from "@/middlewares/auth";
import dbCon from "@/middlewares/dbCon";
import User from "@/models/User";
import { serialize } from "cookie";

const handler = async (req, res) => {
  if (req.method != "GET") res.status(400).json({ msg: "bad request" });
  const { id } = req.user;

  try {
    const uexists = await User.findById(id);
    if (!uexists) res.status(500).json({ msg: "User doesn't exist" });
    const clearCookie = serialize("jwt", '', {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });
    res.setHeader("Set-Cookie", clearCookie);
    res.status(200).json({
      msg: "successful logout",
    });
  } catch (error) {
    res.status(500).json({ msg: "error", error });
  }
};

export default dbCon(Auth(handler));
