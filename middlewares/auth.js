import User from "@/models/User";
import jwt from "jsonwebtoken";

const Auth = (handler) => async (req, res) => {
  console.log("Auth o cholche");
  const token = req.headers.authorization; // Extract the token

  if (!token) {
    return res.status(401).json({ success: false, message: "Authentication token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password")
    req.user = user;
    req.success = true; // Attach the decoded user data to the request object
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default Auth;
