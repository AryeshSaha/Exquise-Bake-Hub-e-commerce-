/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { BaseUrl } from "@/global/Atoms";

const Forgotpass = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sendOtp, setSendOtp] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    if (e.target.name === "email") setEmail(e.target.value);
    else if (e.target.name === "otp") setOtp(e.target.value);
  };

  const sendOTP = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${BaseUrl}/api/forgetPass`,
        {
          email,
        },
        config
      );
      if (data.message) setSendOtp(true);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOTP = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${BaseUrl}/api/verifyPassOtp`,
        {
          email,
          otp,
        },
        config
      );
      if (data.expectedToken)
        router.push(
          `${BaseUrl}/changePass?token=${data.expectedToken}`
        );
    } catch (error) {
      setSendOtp(false);
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </Link>
        <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
          {!sendOtp && (
            <>
              <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Forgot your password?
              </h1>
              <p className="font-light text-gray-500">
                Dont fret! Just type in your email and we will send you a code
                to reset your password!
              </p>

              <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
                  />
                </div>

                <button
                  onClick={sendOTP}
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Send OTP
                </button>
              </div>
            </>
          )}
          {sendOtp && (
            <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <div>
                <label
                  htmlFor="otp"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Enter the code
                </label>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  value={otp}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="XZW712"
                  required
                />
              </div>

              <button
                onClick={verifyOTP}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Verify
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Forgotpass;
