import dbCon from "@/middlewares/dbCon";
import User from "@/models/User";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.EMAIL_ID,
    pass: process.env.APP_PASS,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
},
});

const handler = async (req, res) => {
  if (req.method !== "POST") res.status(401).json({ message: "bad request" });
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) res.status(500).json({ message: "User not found." });

    const OTP = await user.GetPasswordResetOTP();
    await user.save();

    // send mail with defined transporter object
    await transporter.sendMail({
      from: {
        name: "ExquiseBakeHub.com Support",
        address: process.env.EMAIL_ID,
      }, // sender address
      to: [`${email}`], // list of receivers
      subject: "Password Reset OTP", // Subject line
      html: `<p>This is your 6 digit OTP to reset password, it will expire within 5 minutes</p><br><b style="font-size: 24px; color: #770077;">${OTP}</b>`, // html body
    });
    res.status(200).json({ message: "OTP sent successfully." });
  } catch (error) {
    res.status(500).json({ message: "Couldn't send OTP", error });
  }
};

export default dbCon(handler);
