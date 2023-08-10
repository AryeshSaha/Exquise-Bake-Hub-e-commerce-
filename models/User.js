const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// encrypt password before save --Hooks
UserSchema.pre("save", async function (next) {
  // Only run this function if password was not moddified
  if (!this.isModified("password")) return next();
  // Hash password with strength of 10
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//match password
UserSchema.methods.CheckPassword = async function (user__input__password) {
  return await bcrypt.compare(user__input__password, this.password);
};

mongoose.models = {}; //clear cache for recompilation
const User = mongoose.model("User", UserSchema);

export default User;
