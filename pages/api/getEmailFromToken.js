import dbCon from "@/middlewares/dbCon";

const { default: User } = require("@/models/User");

const handler = async (req, res) => {
  if (req.method !== "GET") res.status(400).json({ message: "bad request" });

  const token = req.headers.authorization;

  if (!token) res.status(500).json({ message: "Token does not exist" });

  try {
    const user = await User.findOne({ changePasswordOTP: token });
    if (!user) res.status(500).json({ message: "User does not exist" });

    user.changePasswordOTP = undefined;
    user.forgotPasswordTokenExpire = undefined;
    await user.save()

    res.status(200).json({
      message: "User found",
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "User not found", error });
  }
};

export default dbCon(handler);
