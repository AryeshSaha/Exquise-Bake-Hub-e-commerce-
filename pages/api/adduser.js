import getToken from "@/jwt/getToken";
import dbCon from "@/middlewares/dbCon";
import User from "@/models/User";

const handler = async (req, res) => {
  if (req.method != "POST") res.status(400).json({ msg: "bad request" });
  if (req.body.name == "" || req.body.email == "" || req.body.password == "")
    res.status(403).json({
      msg: "Validation Error. Please check to fill all the fields.",
    });

  const uexists = await User.findOne({ email: req.body.email });
  if (uexists) res.status(500).json({ msg: "User already exists" });

  try {
    const u = new User(req.body);
    await u.save();
    const token = getToken(u._id);
    res.status(200).json({ msg: "Account Creation Successful", token });
  } catch (error) {
    res.status(500).json({ msg: "Account Creation Unsuccessful", error });
  }
};

export default dbCon(handler);
