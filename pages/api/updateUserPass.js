import Auth from "@/middlewares/auth";
import dbCon from "@/middlewares/dbCon";
import User from "@/models/User";

const handler = async (req, res) => {
  if (req.method !== "PUT") {
    res.status(400).json({ message: "bad request" });
  }

  const { id } = req.user;
  const { password, nPassword, cPassword } = req.body;
  
  if (!password || !nPassword || !cPassword) {
    res
      .status(500)
      .json({ message: "Empty inputs" });
  }

  if (nPassword !== cPassword) {
    res
      .status(500)
      .json({ message: "New and Confirm Passwords do not match." });
  }
  try {
    const user = await User.findById(id);
    if (!user) res.status(403).json({ message: "User doesn't exist. " });

    if (await user.CheckPassword(password)) {
      user.password = nPassword;
      await user.save();
      res
        .status(200)
        .json({ message: "Password is updated" });
    } else {
      res.status(500).json({ message: "Old password is not matched" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};

export default dbCon(Auth(handler));
