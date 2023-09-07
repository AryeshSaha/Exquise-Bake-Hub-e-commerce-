import dbCon from "@/middlewares/dbCon";
import User from "@/models/User";
import crypto from "node:crypto";

const handler = async (req, res) => {
  if (req.method !== "POST") res.status(401).json({ message: "bad request" });

  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) res.status(503).json({ message: "Sorry! Couldn't find user." });

    const expectedToken = crypto.createHash("sha256").update(otp).digest("hex");

    if (
      user.changePasswordOTP !== expectedToken ||
      user.forgotPasswordTokenExpire < new Date()
    )
      res.status(500).json({ message: "OTP has expired." });

    res
      .status(200)
      .json({ message: "Update your password now", expectedToken });
  } catch (error) {
    res.status(500).json({ message: "Error Occured.", error });
  }
};

export default dbCon(handler);
