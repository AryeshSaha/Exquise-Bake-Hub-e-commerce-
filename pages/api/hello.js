// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Auth from "@/middlewares/auth"
import dbCon from "@/middlewares/dbCon"

const handler = (req, res) => {
  const { user } = req
  res.status(200).json({ name: 'John Doe' })
}

export default dbCon(Auth(handler))