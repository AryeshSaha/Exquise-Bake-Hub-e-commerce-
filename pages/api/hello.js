// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import Auth from "@/middlewares/auth"
import dbCon from "@/middlewares/dbCon"
import nodemailer from "nodemailer"

  
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.EMAIL_ID,
    pass: process.env.APP_PASS,
  },
});

const handler = async (req, res) => {
  // const { user } = req
  
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: {
      name: "Exquise Bake Hub Support",
      address: process.env.EMAIL_ID,
    }, // sender address
    to: ["aryeshsaha5302@gmail.com"], // list of receivers
    subject: "Email Testing Using Nodemailer", // Subject line
    text: "Don't reply to this email", // plain text body
    html: "<b>hihii</b>", // html body
  });

  res.status(200).json({ name: 'John Doe' })
}

export default dbCon(handler)