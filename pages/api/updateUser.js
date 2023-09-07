import Auth from "@/middlewares/auth";
import dbCon from "@/middlewares/dbCon";
import User from "@/models/User";

const handler = async (req, res) => {
  if (req.method == "PUT") {
    const { user } = req;
    const { name, address, phone, pincode } = req.body;
    const updates = {}

    if (name !== "" && typeof name!=='undefined') updates.name = name
    if (address !== "" && typeof address!=='undefined')updates.address=address 
    if (phone !== "" && typeof phone!=='undefined') updates.phone = phone
    if (pincode !== "" && typeof pincode!=='undefined') updates.pincode = pincode

    try {
      const userExists = await User.findById(user.id);
      if (!userExists) res.status(401).json({ msg: "User doesn't exist" });

      const updatedUser = await User.findOneAndUpdate(
        { email: userExists.email },
        {
          ...updates,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({ msg: "update success", updatedUser });
    } catch (error) {
      res.status(500).json({ msg: "update error", error });
    }
  } else res.status(400).json({ msg: "bad request" });
};

export default dbCon(Auth(handler));
