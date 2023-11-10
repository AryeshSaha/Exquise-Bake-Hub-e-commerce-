import dbCon from "@/middlewares/dbCon";
import User from "@/models/User";

const handler = async (req, res) => {
  if (req.method !== "POST") res.status(400).json({ message: "bad request" });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) res.status(500).json({ message: "User doesn't exist" });

    user.password = password;
    await user.save();

    res.status(200).json({ message: "Password changed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "couldn't update password" });
  }
};

export default dbCon(handler);
