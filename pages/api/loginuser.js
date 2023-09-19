import getToken from "@/jwt/getToken";
import dbCon from "@/middlewares/dbCon";
import User from "@/models/User";
import { serialize } from "cookie";

const handler = async (req, res) => {
  console.log("login api running")
  if (req.method != "POST") res.status(400).json({ msg: "bad request" });
  if (req.body.email == "" || req.body.password == "")
    res.status(500).json({
      msg: "Validation Error. Please check to fill all the fields.",
    });

  try {
    const uexists = await User.findOne({ email: req.body.email });
    if (!uexists) res.status(500).json({ msg: "User doesn't exist" });
    if (await uexists.CheckPassword(req.body.password)) {
      const token = getToken(uexists._id);
      const cookie = serialize("jwt", token, {
        httpOnly: true,
        maxAge: 10 * 60 * 60 * 1000, //10 hrs in millisecs
        path: "/",
      })
      res.setHeader("Set-Cookie", cookie)
      res
        .status(200)
        .json({
          msg: "successful login"
        });
    } else res.status(500).json({ msg: "Invalid Credentials" });
  } catch (error) {
    res.status(500).json({ msg: "error", error });
  }
};

export default dbCon(handler);
