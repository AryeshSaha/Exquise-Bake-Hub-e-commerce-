import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import getOTP from "@/otp/getOTP";

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
    phone: String,
    address: String,
    pincode: String,
    emailVerificationOTP: String,
    emailVerificationOTPExpire: Date,
    changePasswordOTP: String,
    forgotPasswordTokenExpire: Date,
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

// get password reset otp
UserSchema.methods.GetPasswordResetOTP = async function () {
  const OTP = getOTP();
  this.changePasswordOTP = crypto
    .createHash("sha256")
    .update(OTP)
    .digest("hex");
  this.forgotPasswordTokenExpire = Date.now() + 5 * 60 * 1000;
  return OTP;
};

// get Email Verification
UserSchema.methods.GetEmailVerificationOTP = async function () {
  const OTP = getOTP();
  this.emailVerificationOTP = crypto
    .createHash("sha256")
    .update(OTP)
    .digest("hex");
  this.emailVerificationOTPExpire = Date.now() + 5 * 60 * 1000;
  return OTP;
};

mongoose.models = {}; //clear cache for recompilation
const User = mongoose.model("User", UserSchema);

export default User;
