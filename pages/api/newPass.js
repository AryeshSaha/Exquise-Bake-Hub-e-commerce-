import dbCon from "@/middlewares/dbCon";
import User from "@/models/User";

const handler = async (req, res) => {
  if (req.method !== "POST") res.status(500).json({ message: "bad request" });

  const { email, token, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) res.status(500).json({ message: "User doesn't exist" });

    if (user.changePasswordOTP !== token)
      res.status(500).json({ message: "otp expired" });

    user.password = password;
    user.changePasswordOTP = undefined;
    user.forgotPasswordTokenExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password changed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "couldn't update password" });
  }
};

export default dbCon(handler);
