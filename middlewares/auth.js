import User from "@/models/User";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

const Auth = (handler) => async (req, res) => {
  console.log("Auth o cholche");
  
  if (!req.headers.cookie) {
    return res.status(401).json({ success: false, message: "Authentication token is missing" });
  }
  
  // Extract the token
  // const token = req.headers.authorization; 
  const cookie = parse(req.headers.cookie);
  const token = cookie.jwt

  if (!token) {
    return res.status(401).json({ success: false, message: "Authentication token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password")
    // console.log("user: ", user)
    req.user = user;
    req.success = true; // Attach the decoded user data to the request object
    return handler(req, res);
  } catch (error) {
    // return res.status(500).json({ success: false, message: "Invalid token" });
    console.log("error: ", error)
  }
};

export default Auth;
