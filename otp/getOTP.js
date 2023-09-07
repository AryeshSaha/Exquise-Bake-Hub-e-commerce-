import otpGen from "otp-generator";

const getOTP = () => {
  const otp = otpGen.generate(6, {
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  return otp;
};

export default getOTP;
