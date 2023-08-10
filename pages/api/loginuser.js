import getToken from "@/jwt/getToken";
import dbCon from "@/middlewares/dbCon";
import User from "@/models/User";

const handler = async (req, res) => {
  if (req.method != "POST") res.status(400).json({ msg: "bad request" });
  if (req.body.email == "" || req.body.password == "")
    res.status(403).json({
      msg: "Validation Error. Please check to fill all the fields.",
    });

  try {
    const uexists = await User.findOne({ email: req.body.email });
    if (!uexists) res.status(500).json({ msg: "User doesn't exist" });
    if (await uexists.CheckPassword(req.body.password)) {
      const token = getToken(uexists._id);
      res
        .status(200)
        .json({
          msg: "successful login",
          token
        });
    } else res.status(403).json({ msg: "Invalid Credentials" });
  } catch (error) {
    res.status(500).json({ msg: "error", error });
  }
};

export default dbCon(handler);
